/* Script de la page salaries/index.html (séparé du HTML pour permettre une politique CSP stricte). */
var NB_FICHES = 12;
function render() {
  var lus = Store.get('salaries.coursLus', []).length;
  var quizBest = Store.get('salaries.quiz.best', null);
  var sims = Store.get('salaries.sims', {});
  var simDefs = window.DATA_SALARIES_SIMS.liste;
  var simsDone = simDefs.filter(function (s) { return sims[s.id] != null; }).length;

  var steps = [
    { label: 'Cours lus', value: lus + ' / ' + NB_FICHES, done: lus >= NB_FICHES, part: Math.min(1, lus / NB_FICHES) },
    { label: 'Simulateurs terminés', value: simsDone + ' / ' + simDefs.length, done: simsDone === simDefs.length, part: simsDone / simDefs.length },
    { label: 'QCM (meilleur score)', value: quizBest == null ? 'Pas encore passé' : quizBest + ' %', done: quizBest != null && quizBest >= 80, part: quizBest == null ? 0 : Math.min(1, quizBest / 80) }
  ];
  var overall = steps.reduce(function (s, x) { return s + x.part; }, 0) / steps.length * 100;
  document.getElementById('overall').innerHTML = UI.progressBar(overall, 'Parcours complété');
  document.getElementById('checklist').innerHTML = steps.map(function (s) {
    return '<li>' + (s.done ? '<span class="tag ok">✓ Fait</span>' : '<span class="tag">En cours</span>') +
      '<span>' + s.label + '</span><span class="state muted">' + s.value + '</span></li>';
  }).join('');
}
document.getElementById('reset').addEventListener('click', function () {
  if (confirm('Effacer toute votre progression du parcours salarié ?')) { Store.reset('salaries'); render(); }
});
render();
