/* Sauvegarde de la progression dans le navigateur (localStorage).
   Toutes les lectures/écritures sont protégées : le site fonctionne même si le stockage est bloqué. */
(function () {
  var KEY = 'cybertruck:v1';
  var memory = {}; // repli si localStorage est indisponible

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return memory;
    }
  }

  function save(state) {
    memory = state;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignoré */ }
  }

  // Accès par chemin : Store.get('it.levels.1.best', 0)
  function get(path, fallback) {
    var node = load();
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
      if (node == null || typeof node !== 'object' || !(parts[i] in node)) return fallback;
      node = node[parts[i]];
    }
    return node === undefined ? fallback : node;
  }

  function set(path, value) {
    var state = load();
    var parts = path.split('.');
    var node = state;
    for (var i = 0; i < parts.length - 1; i++) {
      if (node[parts[i]] == null || typeof node[parts[i]] !== 'object') node[parts[i]] = {};
      node = node[parts[i]];
    }
    node[parts[parts.length - 1]] = value;
    save(state);
    return value;
  }

  // Ajoute une valeur unique dans un tableau stocké
  function addToSet(path, value) {
    var list = get(path, []);
    if (!Array.isArray(list)) list = [];
    if (list.indexOf(value) === -1) {
      list.push(value);
      set(path, list);
      return true;
    }
    return false;
  }

  function reset(section) {
    if (!section) { save({}); return; }
    var state = load();
    delete state[section];
    save(state);
  }

  window.Store = { get: get, set: set, addToSet: addToSet, reset: reset };
})();
