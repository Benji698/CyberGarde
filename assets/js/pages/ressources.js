/* Script de la page ressources.html (séparé du HTML pour permettre une politique CSP stricte). */
(function () {
  var list = document.getElementById('glossary');
  var count = document.getElementById('glossary-count');
  var input = document.getElementById('glossary-search');
  function normalize(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function render(q) {
    var nq = normalize(q || '');
    var items = DATA_GLOSSAIRE.filter(function (g) { return !nq || normalize(g.terme + ' ' + g.def).indexOf(nq) !== -1; });
    list.innerHTML = items.map(function (g) {
      return '<div class="entry"><dt>' + UI.escape(g.terme) + '</dt><dd>' + UI.escape(g.def) + '</dd></div>';
    }).join('') || '<p class="muted">Aucun terme ne correspond à votre recherche.</p>';
    count.textContent = items.length + ' terme' + (items.length > 1 ? 's' : '') + (nq ? ' trouvé' + (items.length > 1 ? 's' : '') : '');
  }
  input.addEventListener('input', function () { render(input.value); });
  render('');
})();

document.getElementById('print-btn').addEventListener('click', function () { window.print(); });
