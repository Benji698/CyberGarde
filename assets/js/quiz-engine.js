/* Moteur de QCM générique.
   Question : { situation, contexte?, choix: [{ t, ok }], explication }
   QuizEngine.mount(element, { questions, storeKey?, backHref?, backLabel?, onFinish? }) */
(function () {
  var LETTERS = 'ABCDEFGH';

  function mount(host, options) {
    var questions = UI.shuffle(options.questions).map(function (q) {
      return Object.assign({}, q, { choix: UI.shuffle(q.choix) });
    });
    var index = 0;
    var answers = []; // { question, choice, ok }

    function renderQuestion() {
      var q = questions[index];
      var html =
        '<div class="quiz card">' +
          '<div class="quiz-head"><span>Situation ' + (index + 1) + ' / ' + questions.length + '</span>' +
          '<span>Score : ' + countOk() + '</span></div>' +
          UI.progressBar((index / questions.length) * 100) +
          '<div style="height:20px"></div>' +
          (q.contexte ? '<div class="quiz-context">' + q.contexte + '</div>' : '') +
          '<p class="quiz-situation">' + q.situation + '</p>' +
          '<div class="choices" role="group" aria-label="Choix de réponse">' +
          q.choix.map(function (c, i) {
            return '<button type="button" class="choice" data-i="' + i + '"><span class="letter">' + LETTERS[i] + '</span><span>' + c.t + '</span></button>';
          }).join('') +
          '</div>' +
          '<div class="feedback-slot" aria-live="polite"></div>' +
        '</div>';
      host.innerHTML = html;
      host.querySelectorAll('.choice').forEach(function (btn) {
        btn.addEventListener('click', function () { answer(parseInt(btn.getAttribute('data-i'), 10)); });
      });
      var first = host.querySelector('.choice');
      if (first && index > 0) first.focus({ preventScroll: true });
    }

    function countOk() {
      return answers.filter(function (a) { return a.ok; }).length;
    }

    function answer(i) {
      var q = questions[index];
      var picked = q.choix[i];
      answers.push({ question: q, choice: picked, ok: !!picked.ok });

      host.querySelectorAll('.choice').forEach(function (btn, j) {
        btn.disabled = true;
        var c = q.choix[j];
        if (c.ok) {
          btn.classList.add('correct');
          btn.insertAdjacentHTML('beforeend', '<span class="verdict">✓ Bon réflexe</span>');
        } else if (j === i) {
          btn.classList.add('wrong');
          btn.insertAdjacentHTML('beforeend', '<span class="verdict">✗ Votre choix</span>');
        } else {
          btn.classList.add('dim');
        }
      });

      var last = index === questions.length - 1;
      host.querySelector('.feedback-slot').innerHTML =
        '<div class="feedback ' + (picked.ok ? 'ok' : 'ko') + '">' +
          '<strong class="verdict">' + (picked.ok ? '✓ Bonne réponse !' : '✗ Ce n\'est pas le bon réflexe.') + '</strong>' +
          '<p>' + q.explication + '</p>' +
        '</div>' +
        '<div class="quiz-actions"><button type="button" class="btn btn-primary next-btn">' +
          (last ? 'Voir mon résultat' : 'Situation suivante →') + '</button></div>';
      var next = host.querySelector('.next-btn');
      next.focus({ preventScroll: true });
      next.addEventListener('click', function () {
        index++;
        if (index < questions.length) renderQuestion(); else renderResult();
        host.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    function renderResult() {
      var ok = countOk();
      var pct = Math.round((ok / questions.length) * 100);
      var message;
      if (pct === 100) message = 'Sans faute ! Vous avez tous les bons réflexes.';
      else if (pct >= 80) message = 'Très bien ! Quelques points à revoir ci-dessous.';
      else if (pct >= 50) message = 'Pas mal, mais certaines situations restent piégeuses. Relisez les explications.';
      else message = 'Les cybercriminels comptent sur ces erreurs. Reprenez le cours puis retentez votre chance !';

      if (options.storeKey) {
        var best = Store.get(options.storeKey + '.best', 0);
        Store.set(options.storeKey + '.last', pct);
        if (pct > best) Store.set(options.storeKey + '.best', pct);
      }

      var missed = answers.filter(function (a) { return !a.ok; });
      host.innerHTML =
        '<div class="quiz card">' +
          '<div class="result-hero">' +
            '<div class="score-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
            '<h2>' + ok + ' / ' + questions.length + ' bons réflexes</h2>' +
            '<p class="muted">' + message + '</p>' +
          '</div>' +
          (missed.length ?
            '<h3>À revoir</h3><ul class="review-list">' +
            missed.map(function (a) {
              var good = a.question.choix.filter(function (c) { return c.ok; })[0];
              return '<li><strong>' + a.question.situation + '</strong>' +
                '<span class="tag ko">Votre réponse</span> ' + a.choice.t + '<br>' +
                '<span class="tag ok">Bon réflexe</span> ' + (good ? good.t : '') +
                '<p class="muted mb-0" style="margin-top:6px">' + a.question.explication + '</p></li>';
            }).join('') + '</ul>' : '') +
          '<div class="btn-row" style="margin-top:20px;justify-content:center">' +
            '<button type="button" class="btn btn-primary retry-btn">Recommencer</button>' +
            (options.backHref ? '<a class="btn btn-secondary" href="' + options.backHref + '">' + (options.backLabel || 'Retour') + '</a>' : '') +
          '</div>' +
        '</div>';
      host.querySelector('.retry-btn').addEventListener('click', function () { mount(host, options); });
      if (options.onFinish) options.onFinish({ score: ok, total: questions.length, percent: pct });
    }

    renderQuestion();
  }

  window.QuizEngine = { mount: mount };
})();
