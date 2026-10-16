/* Moteur de scénario à embranchements du parcours IT (XP, jauge de menace, chrono, badges).
   Un niveau : { id, rang, titre, chrono, menaceInitiale, intro, debut, noeuds }
   Nœud de décision : { etape, texte, contexte?, choix: [{ t, note: 'best'|'ok'|'bad', fb, suite, badge? }], timeout? }
   Nœud de fin : { fin: 'succes'|'partiel'|'echec', titre, texte } */
(function () {
  var esc = UI.escape;
  var XP = { best: 100, ok: 40, bad: 0 };
  var VALUE = { best: 1, ok: 0.5, bad: 0 };
  var MENACE = { best: -10, ok: 10, bad: 25 };
  var SPEED_BONUS = 25;
  var PASS = 70;
  var LETTERS = 'ABCDE';

  /* ---------- Progression (localStorage) ---------- */
  var Progress = {
    level: function (id) { return Store.get('it.levels.' + id, null); },
    isPassed: function (id) { var l = this.level(id); return !!(l && l.passed); },
    isUnlocked: function (id) { return id === 1 || this.isPassed(id - 1); },
    totalXp: function () {
      var total = 0;
      window.DATA_IT.niveaux.forEach(function (n) { var l = Progress.level(n.id); if (l) total += l.bestXp || 0; });
      return total;
    },
    passedIds: function () {
      return window.DATA_IT.niveaux.filter(function (n) { return Progress.isPassed(n.id); }).map(function (n) { return n.id; });
    },
    rank: function () {
      var passed = this.passedIds();
      if (!passed.length) return { nom: 'Recrue', desc: 'Réussissez le niveau 1 pour obtenir votre premier rang.' };
      var lvl = window.DATA_IT.niveaux[Math.max.apply(null, passed) - 1];
      return { nom: lvl.rang, desc: 'Niveau ' + lvl.id + ' validé' };
    },
    badges: function () { return Store.get('it.badges', []); },
    stars: function (pct) { return pct >= 90 ? 3 : pct >= 80 ? 2 : pct >= PASS ? 1 : 0; }
  };

  function starsHtml(n) {
    return '<span class="stars" aria-label="' + n + ' étoile(s) sur 3">' + '★★★'.slice(0, n) + '<span style="opacity:.3">' + '★★★'.slice(0, 3 - n) + '</span></span>';
  }

  function badgeHtml(b, owned) {
    return '<div class="badge' + (owned ? '' : ' locked') + '"><div class="medal" aria-hidden="true">' + b.emoji + '</div>' +
      '<strong>' + esc(b.nom) + '</strong><small>' + esc(b.desc) + '</small>' +
      (owned ? '' : '<span class="visually-hidden">(non obtenu)</span>') + '</div>';
  }

  function renderContexte(c) {
    if (!c) return '';
    if (c.type === 'console') {
      return '<div class="doc-title muted" style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">' + esc(c.titre || 'Terminal') + '</div>' +
        '<pre class="console" tabindex="0">' + c.contenu + '</pre>';
    }
    return '<div class="doc-box"><div class="doc-title">' + esc(c.titre || 'Document') + '</div>' + c.contenu + '</div>';
  }

  /* ---------- Partie ---------- */
  function mount(host, level) {
    var state, timerId = null;

    function reset() {
      state = { xp: 0, menace: level.menaceInitiale || 20, decisions: [], timeouts: 0, speedCount: 0, choiceBadges: [] };
    }

    function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

    function hud(stepNum) {
      var m = state.menace;
      var gaugeClass = m >= 70 ? 'high' : m >= 40 ? 'mid' : '';
      return '<div class="hud" aria-live="off">' +
        '<div class="hud-item"><small>Niveau ' + level.id + '</small><b>' + esc(level.rang) + '</b></div>' +
        '<div class="hud-item"><small>Décision</small><b>' + stepNum + '</b></div>' +
        '<div class="hud-item"><small>XP</small><b>' + state.xp + '</b></div>' +
        '<div class="hud-item"><small>Menace</small><b>' + m + ' %</b><div class="gauge ' + gaugeClass + '"><span style="width:' + m + '%"></span></div></div>' +
      '</div>';
    }

    function intro() {
      reset();
      host.innerHTML =
        '<div class="card scene">' +
          '<span class="scene-step">Niveau ' + level.id + ' · ' + esc(level.rang) + '</span>' +
          '<h2 style="margin-top:6px">' + esc(level.intro.titre) + '</h2>' +
          '<div class="scene-text">' + level.intro.texte + '</div>' +
          '<div class="callout retenir"><div class="callout-title">Règles du jeu</div><ul>' +
            '<li>Chaque décision rapporte de l\'XP : <strong>100</strong> pour la meilleure, <strong>40</strong> pour une réponse acceptable, <strong>0</strong> pour une erreur.</li>' +
            '<li>La <strong>jauge de menace</strong> monte à chaque mauvaise décision. À 100 %, l\'attaque a gagné.</li>' +
            (level.chrono ? '<li>⏱ Vous avez <strong>' + level.chrono + ' secondes</strong> par décision. Une bonne réponse rapide rapporte un bonus de ' + SPEED_BONUS + ' XP.</li>' : '') +
            '<li>Obtenez au moins <strong>' + PASS + ' %</strong> de bonnes décisions pour débloquer le niveau suivant.</li>' +
          '</ul></div>' +
          '<div class="btn-row"><button type="button" class="btn btn-primary start-btn">Lancer le scénario</button>' +
          '<a class="btn btn-secondary" href="cours.html?niveau=' + level.id + '">Revoir le cours</a></div>' +
        '</div>';
      host.querySelector('.start-btn').addEventListener('click', function () { node(level.debut); });
    }

    function node(id) {
      stopTimer();
      var n = level.noeuds[id];
      if (!n) { console.error('Nœud introuvable :', id); return; }
      if (n.fin) return end(n);

      var stepNum = state.decisions.length + 1;
      var choix = UI.shuffle(n.choix);
      host.innerHTML =
        hud(stepNum) +
        '<div class="card scene">' +
          (level.chrono ? '<div class="timer-bar" aria-hidden="true"><span style="width:100%"></span></div>' +
            '<p class="visually-hidden timer-sr" aria-live="polite"></p>' : '') +
          '<span class="scene-step">' + esc(n.etape || ('Décision ' + stepNum)) + (level.chrono ? ' · <span class="timer-txt">' + level.chrono + ' s</span>' : '') + '</span>' +
          '<div class="scene-text" style="margin-top:6px">' + n.texte + '</div>' +
          renderContexte(n.contexte) +
          '<p style="font-weight:700;margin-bottom:10px">Que faites-vous ?</p>' +
          '<div class="choices">' + choix.map(function (c, i) {
            return '<button type="button" class="choice" data-i="' + i + '"><span class="letter">' + LETTERS[i] + '</span><span>' + c.t + '</span></button>';
          }).join('') + '</div>' +
          '<div class="feedback-slot" aria-live="polite"></div>' +
        '</div>';

      var started = Date.now();
      host.querySelectorAll('.choice').forEach(function (b) {
        b.addEventListener('click', function () {
          decide(n, choix, parseInt(b.getAttribute('data-i'), 10), (Date.now() - started) / 1000);
        });
      });
      host.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (level.chrono) {
        var bar = host.querySelector('.timer-bar');
        var txt = host.querySelector('.timer-txt');
        var sr = host.querySelector('.timer-sr');
        timerId = setInterval(function () {
          var left = Math.max(0, level.chrono - (Date.now() - started) / 1000);
          bar.firstChild.style.width = (left / level.chrono * 100) + '%';
          bar.classList.toggle('hurry', left <= level.chrono / 4);
          txt.textContent = Math.ceil(left) + ' s';
          if (Math.ceil(left) === 10 && !sr.textContent) sr.textContent = 'Plus que 10 secondes.';
          if (left <= 0) { stopTimer(); decide(n, choix, -1, level.chrono); }
        }, 200);
      }
    }

    function decide(n, choix, i, seconds) {
      stopTimer();
      var timeout = i === -1;
      var c = timeout ? null : choix[i];
      var note = timeout ? 'bad' : c.note;
      var gained = XP[note];
      var speed = !timeout && level.chrono && note === 'best' && seconds <= level.chrono / 2;
      if (speed) { gained += SPEED_BONUS; state.speedCount++; }
      if (timeout) state.timeouts++;
      if (c && c.badge) state.choiceBadges.push(c.badge);
      state.xp += gained;
      state.menace = Math.max(0, Math.min(100, state.menace + MENACE[note]));

      var best = n.choix.filter(function (x) { return x.note === 'best'; })[0];
      state.decisions.push({
        etape: n.etape, question: n.resume || n.etape, choice: timeout ? 'Temps écoulé, aucune décision' : c.t,
        note: note, fb: timeout ? 'Pendant que vous hésitiez, l\'attaque a progressé.' : c.fb, best: best ? best.t : ''
      });

      host.querySelector('.hud').outerHTML = hud(state.decisions.length);

      host.querySelectorAll('.choice').forEach(function (b, j) {
        b.disabled = true;
        var cj = choix[j];
        var cls = cj.note === 'best' ? 'correct' : cj.note === 'ok' ? 'partial' : 'wrong';
        if (j === i || cj.note === 'best') {
          b.classList.add(cls);
          b.insertAdjacentHTML('beforeend', '<span class="verdict">' + (j === i ? 'Votre choix' : 'Meilleur choix') + '</span>');
        } else b.classList.add('dim');
      });

      var fbClass = note === 'best' ? 'ok' : note === 'ok' ? 'mid' : 'ko';
      var verdict = timeout ? '⏱ Temps écoulé !' : note === 'best' ? '✓ Excellente décision' : note === 'ok' ? '≈ Décision acceptable, mais pas optimale' : '✗ Mauvaise décision';
      var nextId = timeout ? (n.timeout || (n.choix.filter(function (x) { return x.note === 'bad'; })[0] || n.choix[0]).suite) : c.suite;
      var collapse = state.menace >= 100 && !(level.noeuds[nextId] && level.noeuds[nextId].fin);

      host.querySelector('.feedback-slot').innerHTML =
        '<div class="feedback ' + fbClass + '"><strong class="verdict">' + verdict + '</strong>' +
          '<p>' + (timeout ? 'Pendant que vous hésitiez, l\'attaque a progressé. En situation réelle, il faut savoir décider vite en s\'appuyant sur les procédures.' : c.fb) + '</p>' +
          (timeout && best ? '<p><strong>Meilleur choix :</strong> ' + best.t + '</p>' : '') +
          '<p class="mb-0"><span class="tag info">+' + gained + ' XP</span> ' + (speed ? '<span class="tag ok">⚡ Bonus rapidité</span> ' : '') +
          '<span class="tag ' + (MENACE[note] < 0 ? 'ok' : 'ko') + '">Menace ' + (MENACE[note] < 0 ? '' : '+') + MENACE[note] + '</span></p>' +
        '</div>' +
        '<div class="quiz-actions"><button type="button" class="btn btn-primary next-btn">' + (collapse ? 'Voir les conséquences' : 'Continuer →') + '</button></div>';
      var btn = host.querySelector('.next-btn');
      btn.focus({ preventScroll: true });
      btn.addEventListener('click', function () {
        if (collapse) end({ fin: 'echec', titre: 'L\'attaque a gagné', texte: 'La jauge de menace a atteint 100 %. ' + (level.texteEchec || 'Les décisions prises n\'ont pas permis de contenir l\'attaque.') });
        else node(nextId);
      });
    }

    function end(n) {
      stopTimer();
      var total = state.decisions.length;
      var score = state.decisions.reduce(function (s, d) { return s + VALUE[d.note]; }, 0);
      var pct = total ? Math.round(score / total * 100) : 0;
      // Fin « auto » : le texte dépend du score obtenu
      if (n.fin === 'auto') {
        var v = pct >= PASS ? n.succes : n.partiel;
        n = { fin: pct >= PASS ? 'succes' : 'partiel', titre: v.titre, texte: v.texte };
      }
      var passed = pct >= PASS && n.fin !== 'echec';

      // Sauvegarde
      var prev = Progress.level(level.id) || {};
      var previouslyFailed = !!prev.failed && !prev.passed;
      var rec = {
        best: Math.max(prev.best || 0, passed ? pct : 0),
        bestXp: Math.max(prev.bestXp || 0, state.xp),
        passed: !!prev.passed || passed,
        failed: !!prev.failed || !passed,
        attempts: (prev.attempts || 0) + 1
      };
      Store.set('it.levels.' + level.id, rec);

      // Badges
      var owned = Progress.badges();
      var result = {
        levelId: level.id, pct: pct, passed: passed, fin: n.fin, chrono: !!level.chrono,
        bads: state.decisions.filter(function (d) { return d.note === 'bad'; }).length,
        timeouts: state.timeouts, speedAll: total > 0 && state.speedCount === total,
        previouslyFailed: previouslyFailed, choiceBadges: state.choiceBadges, levelsPassed: Progress.passedIds()
      };
      var fresh = window.DATA_IT.badges.filter(function (b) {
        if (owned.indexOf(b.id) !== -1) return false;
        try { return b.test(result); } catch (e) { return false; }
      });
      fresh.forEach(function (b) { Store.addToSet('it.badges', b.id); });

      var next = window.DATA_IT.niveaux[level.id]; // niveau suivant (index = id)
      var cls = n.fin === 'succes' && passed ? 'ok' : passed ? 'mid' : 'ko';
      var headline = passed ? (level.id === 5 ? 'Parcours terminé, bravo !' : 'Niveau validé !') : 'Niveau non validé';
      host.innerHTML =
        '<div class="card scene">' +
          '<div class="result-hero">' +
            '<div class="score-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
            '<h2>' + headline + '</h2>' +
            '<p>' + starsHtml(Progress.stars(passed ? pct : 0)) + ' · <strong>' + state.xp + ' XP</strong> · menace finale ' + state.menace + ' %</p>' +
          '</div>' +
          '<div class="feedback ' + cls + '"><strong class="verdict">' + esc(n.titre) + '</strong><p>' + n.texte + '</p>' +
            (!passed ? '<p class="mb-0">Il faut au moins ' + PASS + ' % de bonnes décisions' + (n.fin === 'echec' ? ' et contenir l\'attaque' : '') + ' pour valider le niveau. Relisez le débriefing et réessayez !</p>' : '') +
          '</div>' +
          (fresh.length ? '<h3 style="margin-top:24px" class="center">🏅 Nouveau' + (fresh.length > 1 ? 'x badges' : ' badge') + ' !</h3><div class="new-badges">' +
            fresh.map(function (b) { return '<div style="width:170px">' + badgeHtml(b, true) + '</div>'; }).join('') + '</div>' : '') +
          '<h3 style="margin-top:24px">Débriefing</h3>' +
          '<ol class="debrief-list">' + state.decisions.map(function (d) {
            var tag = d.note === 'best' ? '<span class="tag ok">✓ Meilleur choix</span>' : d.note === 'ok' ? '<span class="tag warn">≈ Acceptable</span>' : '<span class="tag ko">✗ Erreur</span>';
            return '<li class="' + d.note + '"><span class="q">' + esc(d.question || '') + '</span>' + tag + ' ' + d.choice +
              '<p class="muted" style="margin:6px 0 0">' + d.fb + '</p>' +
              (d.note !== 'best' && d.best ? '<p style="margin:6px 0 0"><strong>Meilleur choix :</strong> ' + d.best + '</p>' : '') + '</li>';
          }).join('') + '</ol>' +
          '<div class="btn-row" style="margin-top:24px;justify-content:center">' +
            (passed && next ? '<a class="btn btn-primary" href="cours.html?niveau=' + next.id + '">Niveau ' + next.id + ' : ' + esc(next.rang) + ' →</a>' : '') +
            '<button type="button" class="btn ' + (passed && next ? 'btn-secondary' : 'btn-primary') + ' replay">Rejouer</button>' +
            '<a class="btn btn-secondary" href="index.html">Carte des niveaux</a>' +
          '</div>' +
        '</div>';
      host.querySelector('.replay').addEventListener('click', intro);
      host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    intro();
  }

  window.ScenarioEngine = { mount: mount, Progress: Progress, starsHtml: starsHtml, badgeHtml: badgeHtml, PASS: PASS };
})();
