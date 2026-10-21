/* Script de la page it/jeu.html (séparé du HTML pour permettre une politique CSP stricte). */
var id = Math.min(5, Math.max(1, parseInt(UI.param('niveau'), 10) || 1));
var lvl = DATA_IT.niveaux[id - 1];
var host = document.getElementById('game');
document.title = 'Niveau ' + id + ' · ' + lvl.rang + ' — Scénario — CyberGarde';
document.getElementById('crumb').textContent = 'Niveau ' + id + ' · ' + lvl.rang;
if (!ScenarioEngine.Progress.isUnlocked(id)) {
  host.innerHTML = '<div class="card center"><div style="font-size:2.5rem" aria-hidden="true">🔒</div><h2>Niveau verrouillé</h2>' +
    '<p class="muted">Validez le niveau ' + (id - 1) + ' avec au moins ' + ScenarioEngine.PASS + ' % de bonnes décisions pour débloquer ce scénario.</p>' +
    '<div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="jeu.html?niveau=' + (id - 1) + '">Jouer le niveau ' + (id - 1) + '</a>' +
    '<a class="btn btn-secondary" href="cours.html?niveau=' + id + '">Lire le cours du niveau ' + id + '</a></div></div>';
} else {
  ScenarioEngine.mount(host, lvl);
}
