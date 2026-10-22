/* Script de la page it/cours.html (séparé du HTML pour permettre une politique CSP stricte). */
var id = Math.min(5, Math.max(1, parseInt(UI.param('niveau'), 10) || 1));
var lvl = DATA_IT.niveaux[id - 1];
var P = ScenarioEngine.Progress;
document.title = 'Niveau ' + id + ' · ' + lvl.rang + ' — Cours — CyberGarde';
document.getElementById('level-tabs').innerHTML = DATA_IT.niveaux.map(function (n) {
  return '<a class="btn ' + (n.id === id ? 'btn-primary' : 'btn-secondary') + '" style="border-radius:999px" href="cours.html?niveau=' + n.id + '"' +
    (n.id === id ? ' aria-current="page"' : '') + '>' + n.id + '. ' + n.rang + '</a>';
}).join('');
document.getElementById('course-title').textContent = 'Niveau ' + id + ' · ' + lvl.rang + ' — ' + lvl.titre;
document.getElementById('course-lead').textContent = lvl.resume;
document.getElementById('toc').innerHTML = lvl.cours.map(function (s, i) {
  return '<li><a href="#s' + (i + 1) + '" data-lesson="n' + id + '-s' + (i + 1) + '">' + s.titre + '</a></li>';
}).join('');
var unlocked = P.isUnlocked(id);
document.getElementById('lessons').innerHTML = lvl.cours.map(function (s, i) {
  return '<article class="lesson card" id="s' + (i + 1) + '"><h2><span class="num">' + (i + 1) + '</span> ' + s.titre + '</h2>' + s.html +
    '<div class="lesson-foot"><button type="button" class="btn btn-secondary mark-read" data-lesson="n' + id + '-s' + (i + 1) + '" aria-pressed="false">Marquer comme lu</button></div></article>';
}).join('') +
  '<div class="card center"><h2>Passez à la pratique</h2>' +
  (unlocked
    ? '<p class="muted">Le scénario du niveau ' + id + ' vous attend : ' + lvl.intro.titre + '.</p><a class="btn btn-primary" href="jeu.html?niveau=' + id + '">🎮 Lancer le scénario</a>'
    : '<p class="muted">Validez d\'abord le niveau ' + (id - 1) + ' pour débloquer ce scénario.</p><a class="btn btn-primary" href="jeu.html?niveau=' + (id - 1) + '">Aller au niveau ' + (id - 1) + '</a>') +
  '</div>';
UI.trackLessons('it.coursLus', document.getElementById('course-progress'));
