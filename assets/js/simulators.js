/* Simulateurs du parcours salarié : chasse aux indices, vrai ou piège, le coup de fil. */
(function () {
  var DATA = window.DATA_SALARIES_SIMS;
  var esc = UI.escape;

  function saveBest(id, pct) {
    var prev = Store.get('salaries.sims.' + id, null);
    if (prev == null || pct > prev) Store.set('salaries.sims.' + id, pct);
  }

  /* =========================================================
     Onglets
     ========================================================= */
  var tabs = document.querySelectorAll('.sim-tabs [role="tab"]');
  var panels = document.querySelectorAll('.sim-panel');

  function showTab(id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-tab') === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) { p.hidden = p.id !== 'panel-' + id; });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      var id = t.getAttribute('data-tab');
      showTab(id);
      history.replaceState(null, '', '#' + id);
    });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      next.click();
    });
  });

  /* =========================================================
     1. Chasse aux indices
     ========================================================= */
  function initIndices() {
    var host = document.getElementById('panel-indices');
    var current = 0;

    function renderMail(mailIndex) {
      current = mailIndex;
      var mail = DATA.mails[mailIndex];
      var clueIds = Object.keys(mail.clues);
      var found = [];
      var finished = false;

      host.innerHTML =
        '<div class="btn-row" style="margin-bottom:16px">' +
          DATA.mails.map(function (m, i) {
            return '<button type="button" class="btn ' + (i === mailIndex ? 'btn-primary' : 'btn-secondary') + '" data-mail="' + i + '">' + esc(m.titre) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="sim-layout">' +
          '<div class="mail-client clue-mode">' +
            '<div class="mail-toolbar"><span class="dots"><i></i><i></i><i></i></span><span>Boîte de réception</span></div>' +
            '<div class="mail-header">' +
              '<div class="mail-subject">' + mail.sujet + '</div>' +
              '<dl class="mail-meta"><dt>De :</dt><dd>' + mail.fromHtml + '</dd><dt>À :</dt><dd>' + esc(mail.to) + '</dd><dt>Date :</dt><dd>' + esc(mail.date) + '</dd></dl>' +
            '</div>' +
            '<div class="mail-body">' + mail.corps +
              (mail.pj ? '<div><span class="mail-attach clue" data-clue="' + mail.pj.clue + '">' + UI.icons.clip.replace('<svg', '<svg width="16" height="16"') + esc(mail.pj.nom) + '</span></div>' : '') +
            '</div>' +
            '<div class="mail-status" aria-live="polite">Survolez un lien pour voir sa véritable adresse.</div>' +
          '</div>' +
          '<aside class="card">' +
            '<h3>Trouvez les indices</h3>' +
            '<p class="muted">Cliquez sur tous les éléments suspects de ce mail. Astuce : survolez les liens sans cliquer.</p>' +
            '<div class="clue-progress">' +
              '<div class="clue-progress-head"><span>Indices trouvés</span><span class="clue-score"><span class="clue-errors"></span><strong class="clue-counter" aria-live="polite"></strong></span></div>' +
              '<div class="clue-bar"><span></span></div>' +
            '</div>' +
            '<p class="clue-status" aria-live="polite">Cliquez sur un élément du mail.</p>' +
            '<ul class="clue-log"></ul>' +
            '<div class="btn-row clue-actions">' +
              '<button type="button" class="btn btn-secondary reveal-btn">Afficher la correction</button>' +
              '<button type="button" class="btn btn-ghost restart-btn">Recommencer</button>' +
            '</div>' +
          '</aside>' +
        '</div>';

      var client = host.querySelector('.mail-client');
      var status = host.querySelector('.mail-status');
      var counter = host.querySelector('.clue-counter');
      var bar = host.querySelector('.clue-bar span');
      var errorsEl = host.querySelector('.clue-errors');
      var errors = 0;
      var toast = host.querySelector('.clue-status');
      var log = host.querySelector('.clue-log');

      // Les indices sont focusables au clavier
      client.querySelectorAll('.clue').forEach(function (el) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
      });

      // Message d'état : 'ok' (vert), 'ko' (rouge) ou neutre
      function say(text, kind) {
        toast.textContent = text;
        toast.className = 'clue-status' + (kind ? ' ' + kind : '');
      }

      function logClue(c, missed) {
        log.insertAdjacentHTML('beforeend',
          '<li class="' + (missed ? 'missed' : 'found') + '">' +
            '<span class="clue-ico" aria-hidden="true">' + (missed ? '!' : UI.icons.check) + '</span>' +
            '<div><strong>' + (missed ? 'Manqué : ' : '') + esc(c.titre) + '</strong><p>' + esc(c.explication) + '</p></div>' +
          '</li>');
      }

      function updateCounter() {
        counter.textContent = found.length + ' / ' + clueIds.length;
        bar.style.width = (found.length / clueIds.length * 100) + '%';
        errorsEl.textContent = errors ? errors + (errors > 1 ? ' erreurs' : ' erreur') : '';
      }

      function finish(revealed) {
        if (finished) return;
        finished = true;
        client.classList.remove('clue-mode');
        var pct = Math.round((found.length / clueIds.length) * 100);
        // Chaque clic sur un élément sans rien de suspect coûte 10 points
        var score = Math.max(0, pct - errors * 10);
        saveBest('indices', score);
        clueIds.forEach(function (id) {
          if (found.indexOf(id) !== -1) return;
          client.querySelectorAll('[data-clue="' + id + '"]').forEach(function (el) { el.classList.add('revealed'); });
          logClue(mail.clues[id], true);
        });
        toast.className = 'clue-status' + (pct === 100 ? ' ok' : ' warn');
        var scoreLine = '<strong>Score : ' + score + ' %</strong>' +
          (errors ? ' (' + errors + (errors > 1 ? ' erreurs' : ' erreur') + ', −10 points chacune). ' : '. ');
        toast.innerHTML = pct === 100
          ? '<strong>Bravo, vous avez repéré tous les indices !</strong> ' + scoreLine + 'Ce mail est un phishing : ne cliquez pas et signalez-le.'
          : '<strong>' + (revealed ? 'Correction affichée.' : '') + '</strong> ' + scoreLine + 'Les indices manqués sont surlignés en orange. Ce mail est un phishing : ne cliquez pas et signalez-le.';
        host.querySelector('.reveal-btn').disabled = true;
      }

      function hit(el) {
        if (finished) return;
        var id = el.getAttribute('data-clue');
        if (found.indexOf(id) !== -1) {
          say('Indice déjà trouvé. Cherchez encore !');
          return;
        }
        found.push(id);
        client.querySelectorAll('[data-clue="' + id + '"]').forEach(function (n) { n.classList.add('found'); });
        logClue(mail.clues[id], false);
        say('Bien vu !', 'ok');
        updateCounter();
        if (found.length === clueIds.length) finish(false);
      }

      client.addEventListener('click', function (e) {
        var clue = e.target.closest('.clue');
        if (clue) { e.preventDefault(); hit(clue); return; }
        // Un clic dans le vide (marges du mail) ou un double-clic ne compte pas comme une erreur
        if (finished || e.detail > 1 || !e.target.closest('.mail-header, .mail-body')) return;
        if (e.target.matches('.mail-header, .mail-body, .mail-meta')) return;
        errors++;
        updateCounter();
        say('Rien de suspect ici… cherchez encore.', 'ko');
      });
      client.addEventListener('keydown', function (e) {
        var clue = e.target.closest('.clue');
        if (clue && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); hit(clue); }
      });

      // Survol des liens : affiche l'adresse réelle dans la barre d'état
      client.querySelectorAll('[data-url]').forEach(function (a) {
        function show() { status.textContent = a.getAttribute('data-url'); }
        function hide() { status.textContent = 'Survolez un lien pour voir sa véritable adresse.'; }
        a.addEventListener('mouseenter', show);
        a.addEventListener('focus', show);
        a.addEventListener('mouseleave', hide);
        a.addEventListener('blur', hide);
      });

      host.querySelectorAll('[data-mail]').forEach(function (b) {
        b.addEventListener('click', function () { renderMail(parseInt(b.getAttribute('data-mail'), 10)); });
      });
      host.querySelector('.reveal-btn').addEventListener('click', function () { finish(true); });
      host.querySelector('.restart-btn').addEventListener('click', function () { renderMail(current); });
      updateCounter();
    }

    renderMail(0);
  }

  /* =========================================================
     2. Vrai ou piège ?
     ========================================================= */
  function initVraiFaux() {
    var host = document.getElementById('panel-vraifaux');
    var items, index, score, errors;

    function start() {
      items = UI.shuffle(DATA.vraifaux);
      index = 0; score = 0; errors = [];
      renderItem();
    }

    function renderSupport(item) {
      if (item.type === 'sms') {
        return '<div class="phone"><div class="phone-top">' + esc(item.expediteur) + '</div>' +
          '<div class="bubble in">' + esc(item.contenu) + '</div></div>';
      }
      if (item.type === 'url') {
        return '<p class="muted center">Un lien vous emmène vers cette adresse :</p>' +
          '<div class="url-bar">' + UI.icons.globe + '<span>' + esc(item.contenu) + '</span></div>';
      }
      return '<div class="mail-client"><div class="mail-header">' +
          '<div class="mail-subject">' + esc(item.objet) + '</div>' +
          '<dl class="mail-meta"><dt>De :</dt><dd>' + esc(item.expediteur) + '</dd></dl></div>' +
        '<div class="mail-body">' + esc(item.contenu) + '</div></div>';
    }

    function renderItem() {
      var item = items[index];
      var label = { sms: 'SMS', url: 'Lien', mail: 'E-mail' }[item.type];
      host.innerHTML =
        '<div class="quiz card">' +
          '<div class="quiz-head"><span>Message ' + (index + 1) + ' / ' + items.length + ' · <span class="tag info">' + label + '</span></span><span>Score : ' + score + '</span></div>' +
          UI.progressBar((index / items.length) * 100) +
          '<div style="height:20px"></div>' +
          renderSupport(item) +
          '<div class="verdict-btns">' +
            '<button type="button" class="btn btn-secondary" data-answer="false">✓ Légitime</button>' +
            '<button type="button" class="btn btn-secondary" data-answer="true">⚠ Piège</button>' +
          '</div>' +
          '<div class="feedback-slot" aria-live="polite"></div>' +
        '</div>';
      host.querySelectorAll('[data-answer]').forEach(function (b) {
        b.addEventListener('click', function () { answer(b.getAttribute('data-answer') === 'true', b); });
      });
    }

    function answer(saysTrap, btn) {
      var item = items[index];
      var ok = saysTrap === item.piege;
      if (ok) score++; else errors.push(item);
      host.querySelectorAll('[data-answer]').forEach(function (b) { b.disabled = true; });
      btn.classList.remove('btn-secondary');
      btn.classList.add(ok ? 'btn-success' : 'btn-danger');
      var last = index === items.length - 1;
      host.querySelector('.feedback-slot').innerHTML =
        '<div class="feedback ' + (ok ? 'ok' : 'ko') + '">' +
          '<strong class="verdict">' + (ok ? '✓ Exact' : '✗ Raté') + ' — ce message est ' + (item.piege ? 'un piège.' : 'légitime.') + '</strong>' +
          '<p>' + esc(item.explication) + '</p></div>' +
        '<div class="quiz-actions"><button type="button" class="btn btn-primary next-btn">' + (last ? 'Voir mon résultat' : 'Message suivant →') + '</button></div>';
      var next = host.querySelector('.next-btn');
      next.focus({ preventScroll: true });
      next.addEventListener('click', function () {
        index++;
        if (index < items.length) renderItem(); else renderResult();
      });
    }

    function renderResult() {
      var pct = Math.round((score / items.length) * 100);
      saveBest('vraifaux', pct);
      host.innerHTML =
        '<div class="quiz card"><div class="result-hero">' +
          '<div class="score-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
          '<h2>' + score + ' / ' + items.length + ' bonnes réponses</h2>' +
          '<p class="muted">' + (pct >= 80 ? 'Bel œil ! Vous savez faire la différence entre un vrai message et un piège.' : 'Les pièges sont parfois subtils. Relisez les explications ci-dessous.') + '</p>' +
        '</div>' +
        (errors.length ? '<h3>À revoir</h3><ul class="review-list">' + errors.map(function (e) {
          return '<li><strong>' + esc(e.contenu) + '</strong>' + (e.piege ? '<span class="tag ko">Piège</span> ' : '<span class="tag ok">Légitime</span> ') + esc(e.explication) + '</li>';
        }).join('') + '</ul>' : '') +
        '<div class="btn-row" style="margin-top:20px;justify-content:center"><button type="button" class="btn btn-primary retry">Rejouer</button></div></div>';
      host.querySelector('.retry').addEventListener('click', start);
    }

    start();
  }

  /* =========================================================
     3. Le coup de fil
     ========================================================= */
  function initAppel() {
    var host = document.getElementById('panel-appel');

    function menu() {
      host.innerHTML =
        '<p class="muted">Votre téléphone sonne. Choisissez un appel, puis répondez à chaque réplique de votre interlocuteur.</p>' +
        '<div class="grid grid-2">' + DATA.appels.map(function (a, i) {
          return '<button type="button" class="card card-link path-card" style="text-align:left;font:inherit;color:inherit;cursor:pointer" data-call="' + i + '">' +
            '<div class="call-head" style="background:none;border:0;padding:0 0 12px"><span class="avatar">' + esc(a.initiales) + '</span><span><strong>' + esc(a.titre) + '</strong><br><span class="muted">' + esc(a.numero) + '</span></span></div>' +
            '<span class="btn btn-primary">📞 Décrocher</span></button>';
        }).join('') + '</div>';
      host.querySelectorAll('[data-call]').forEach(function (b) {
        b.addEventListener('click', function () { play(DATA.appels[parseInt(b.getAttribute('data-call'), 10)]); });
      });
    }

    function play(call) {
      var points = 0, steps = 0;
      host.innerHTML =
        '<div class="call-screen">' +
          '<div class="call-head"><span class="avatar">' + esc(call.initiales) + '</span>' +
            '<span><strong>' + esc(call.appelant) + '</strong><br><span class="muted">' + esc(call.numero) + '</span></span>' +
            '<span class="live">● Appel en cours</span></div>' +
          '<div class="call-log" aria-live="polite"></div>' +
          '<div class="call-choices"></div>' +
        '</div>';
      var log = host.querySelector('.call-log');
      var choicesHost = host.querySelector('.call-choices');

      function say(who, text, cls) {
        log.insertAdjacentHTML('beforeend', '<div class="bubble ' + cls + '"><span class="who">' + esc(who) + '</span>' + esc(text) + '</div>');
        log.scrollTop = log.scrollHeight;
      }

      function node(id) {
        var n = call.noeuds[id];
        if (n.fin) return end(n);
        say(call.appelant.split(' — ')[0], n.dit, 'in');
        choicesHost.innerHTML = '<p class="muted" style="margin:0 0 8px;font-size:.9rem">Que répondez-vous ?</p><div class="choices">' +
          n.choix.map(function (c, i) {
            return '<button type="button" class="choice" data-i="' + i + '"><span class="letter">' + 'ABC'[i] + '</span><span>' + esc(c.t) + '</span></button>';
          }).join('') + '</div>';
        choicesHost.querySelectorAll('.choice').forEach(function (b) {
          b.addEventListener('click', function () {
            var c = n.choix[parseInt(b.getAttribute('data-i'), 10)];
            steps++;
            points += c.note === 'best' ? 2 : c.note === 'ok' ? 1 : 0;
            say('Vous', c.t, 'out');
            var cls = c.note === 'best' ? 'ok' : c.note === 'ok' ? 'mid' : 'ko';
            var label = c.note === 'best' ? '✓ Bon réflexe' : c.note === 'ok' ? '≈ Peut mieux faire' : '✗ Mauvais réflexe';
            log.insertAdjacentHTML('beforeend', '<div class="feedback ' + cls + '" style="margin:0 0 12px;font-size:.9rem"><strong class="verdict">' + label + '</strong>' + esc(c.fb) + '</div>');
            choicesHost.innerHTML = '';
            setTimeout(function () { node(c.suite); }, 600);
          });
        });
      }

      function end(n) {
        var pct = steps ? Math.round((points / (steps * 2)) * 100) : 0;
        saveBest('appel', pct);
        host.querySelector('.live').textContent = 'Appel terminé';
        host.querySelector('.live').style.color = 'var(--text-muted)';
        var cls = n.fin === 'bon' ? 'ok' : n.fin === 'moyen' ? 'mid' : 'ko';
        choicesHost.innerHTML =
          '<div class="feedback ' + cls + '" style="margin-top:0"><strong class="verdict" style="font-size:1.15rem">' + esc(n.titre) + '</strong><p>' + esc(n.texte) + '</p>' +
          '<p class="mb-0"><strong>Score de l\'appel : ' + pct + ' %</strong></p></div>' +
          '<div class="btn-row" style="margin-top:16px"><button type="button" class="btn btn-primary replay">Rejouer cet appel</button>' +
          '<button type="button" class="btn btn-secondary other">Choisir un autre appel</button></div>';
        choicesHost.querySelector('.replay').addEventListener('click', function () { play(call); });
        choicesHost.querySelector('.other').addEventListener('click', menu);
      }

      node(call.debut);
    }

    menu();
  }

  initIndices();
  initVraiFaux();
  initAppel();
  var initial = (location.hash || '').replace('#', '');
  showTab(['indices', 'vraifaux', 'appel'].indexOf(initial) !== -1 ? initial : 'indices');
})();
