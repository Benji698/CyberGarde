/* Script de la page it/index.html (séparé du HTML pour permettre une politique CSP stricte). */
var P = ScenarioEngine.Progress;
function render() {
  var rank = P.rank();
  var passed = P.passedIds().length;
  document.getElementById('player').innerHTML =
    '<div class="player-rank"><div class="rank-icon">' + UI.icons.trophy + '</div><div><small class="muted">Rang actuel</small><br><strong style="font-size:1.3rem">' + rank.nom + '</strong><br><small class="muted">' + rank.desc + '</small></div></div>' +
    '<div>' + UI.progressBar(passed / 5 * 100, passed + ' / 5 niveaux validés', 'accent') + '</div>' +
    '<div class="center"><small class="muted">Expérience</small><br><strong style="font-size:1.6rem">' + P.totalXp() + ' XP</strong></div>';

  document.getElementById('levels').innerHTML = DATA_IT.niveaux.map(function (n) {
    var rec = P.level(n.id) || {};
    var unlocked = P.isUnlocked(n.id);
    var cls = rec.passed ? 'done' : unlocked ? '' : 'locked';
    var status = rec.passed
      ? ScenarioEngine.starsHtml(P.stars(rec.best)) + ' <span class="tag ok">✓ Validé · ' + rec.best + ' %</span>'
      : unlocked ? (rec.attempts ? '<span class="tag warn">À retenter</span>' : '<span class="tag info">Disponible</span>')
      : '<span class="tag">🔒 Validez le niveau ' + (n.id - 1) + '</span>';
    return '<article class="card level-card ' + cls + '">' +
      '<div class="level-num" aria-hidden="true">' + (unlocked ? n.id : '🔒') + '</div>' +
      '<div><h3>Niveau ' + n.id + ' · ' + n.rang + '</h3><p class="muted">' + n.resume + '</p>' + status + '</div>' +
      '<div class="level-actions">' +
        '<a class="btn btn-secondary" href="cours.html?niveau=' + n.id + '">📘 Cours</a>' +
        (unlocked ? '<a class="btn btn-primary" href="jeu.html?niveau=' + n.id + '">🎮 Scénario</a>'
                  : '<span class="btn btn-secondary" aria-disabled="true">🔒 Scénario</span>') +
      '</div></article>';
  }).join('');

  var owned = P.badges();
  document.getElementById('badge-count').textContent = owned.length + ' / ' + DATA_IT.badges.length + ' badges obtenus';
  document.getElementById('badges').innerHTML = DATA_IT.badges.map(function (b) {
    return ScenarioEngine.badgeHtml(b, owned.indexOf(b.id) !== -1);
  }).join('');
}
document.getElementById('reset').addEventListener('click', function () {
  if (confirm('Effacer toute votre progression du parcours IT (niveaux, XP, badges) ?')) { Store.reset('it'); render(); }
});
render();
