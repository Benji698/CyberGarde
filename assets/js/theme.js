/* Thème clair/sombre — chargé dans <head> pour éviter le flash au chargement. */
(function () {
  var KEY = 'cybertruck:theme';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function preferred() {
    var s = saved();
    if (s === 'light' || s === 'dark') return s;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  apply(preferred());

  window.Theme = {
    current: function () { return document.documentElement.getAttribute('data-theme') || 'light'; },
    toggle: function () {
      var next = this.current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* stockage indisponible */ }
      document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
      return next;
    }
  };
})();
