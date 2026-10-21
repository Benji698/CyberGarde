/* Éléments communs : en-tête, pied de page, icônes et petites fonctions utilitaires. */
(function () {
  var ICONS = {
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 17 6-6-6-6M12 19h8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M6.5 17A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    clip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>'
  };

  var root = (document.body && document.body.getAttribute('data-root')) || '';
  var section = (document.body && document.body.getAttribute('data-section')) || '';

  function navLink(href, label, key) {
    var current = key === section ? ' aria-current="page"' : '';
    return '<a href="' + root + href + '"' + current + '>' + label + '</a>';
  }

  function renderHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    host.className = 'site-header';
    host.innerHTML =
      '<div class="container">' +
        '<a class="brand" href="' + root + 'index.html">' + ICONS.shield + '<span>CyberGarde</span></a>' +
        '<button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Ouvrir le menu">' + ICONS.menu + '</button>' +
        '<nav class="nav" id="main-nav" aria-label="Navigation principale">' +
          navLink('index.html', 'Accueil', 'home') +
          navLink('salaries/index.html', 'Salariés', 'salaries') +
          navLink('it/index.html', 'Étudiants IT', 'it') +
          navLink('ressources.html', 'Ressources', 'ressources') +
        '</nav>' +
        '<button class="icon-btn theme-toggle" type="button"></button>' +
      '</div>';

    var toggle = host.querySelector('.theme-toggle');
    function syncThemeButton() {
      var dark = window.Theme && Theme.current() === 'dark';
      toggle.innerHTML = dark ? ICONS.sun : ICONS.moon;
      toggle.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
      toggle.title = toggle.getAttribute('aria-label');
    }
    syncThemeButton();
    toggle.addEventListener('click', function () { Theme.toggle(); syncThemeButton(); });

    var menuBtn = host.querySelector('.menu-toggle');
    var nav = host.querySelector('.nav');
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  function renderFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    host.className = 'site-footer';
    host.innerHTML =
      '<div class="container">' +
        '<div><strong>CyberGarde</strong> — site de sensibilisation à la cybersécurité.<br>Projet réalisé dans le cadre d\'une alternance en administration système.</div>' +
        '<div>Victime d\'une cyberattaque ? <a href="https://www.17cyber.gouv.fr" target="_blank" rel="noopener">17Cyber</a> · ' +
        '<a href="https://www.cybermalveillance.gouv.fr" target="_blank" rel="noopener">cybermalveillance.gouv.fr</a><br>' +
        '<a href="' + root + 'ressources.html">Ressources et numéros utiles</a></div>' +
      '</div>';
    renderAccount(host.querySelector('.container'));
  }

  // Une fois hébergé sur Azure Static Web Apps, affiche le compte Microsoft connecté et un lien de déconnexion.
  // En local (fichier ou serveur de test), /.auth/me n'existe pas : rien ne s'affiche.
  function renderAccount(container) {
    if (!/^https?:$/.test(location.protocol) || !window.fetch) return;
    fetch('/.auth/me', { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var user = data && data.clientPrincipal;
        if (!user) return;
        container.insertAdjacentHTML('beforeend',
          '<div class="account">Connecté : <strong>' + escapeHtml(user.userDetails) + '</strong> · ' +
          '<a href="/.auth/logout?post_logout_redirect_uri=/">Se déconnecter</a></div>');
      })
      .catch(function () { /* hors Azure : pas d'information de connexion */ });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function param(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }

  function progressBar(percent, label, extraClass) {
    var p = Math.max(0, Math.min(100, Math.round(percent)));
    return (label ? '<div class="progress-label"><span>' + label + '</span><span>' + p + ' %</span></div>' : '') +
      '<div class="progress ' + (extraClass || '') + '" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p + '"' +
      (label ? ' aria-label="' + escapeHtml(label) + '"' : '') + '><span style="width:' + p + '%"></span></div>';
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  window.UI = {
    icons: ICONS,
    root: root,
    escape: escapeHtml,
    param: param,
    progressBar: progressBar,
    shuffle: shuffle
  };

  function renderIcons(scope) {
    (scope || document).querySelectorAll('[data-icon]').forEach(function (el) {
      var name = el.getAttribute('data-icon');
      if (ICONS[name]) el.innerHTML = ICONS[name];
    });
  }
  window.UI.renderIcons = renderIcons;

  // Boutons « Marquer comme lu » + coches du sommaire + barre de progression du cours
  window.UI.trackLessons = function (storePath, progressHost, scope) {
    scope = scope || document;
    var buttons = scope.querySelectorAll('.mark-read');
    var total = buttons.length;

    function refresh() {
      var read = Store.get(storePath, []);
      buttons.forEach(function (btn) {
        var done = read.indexOf(btn.getAttribute('data-lesson')) !== -1;
        btn.setAttribute('aria-pressed', String(done));
        btn.textContent = done ? '✓ Lu' : 'Marquer comme lu';
      });
      scope.querySelectorAll('.course-toc a[data-lesson]').forEach(function (a) {
        a.classList.toggle('read', read.indexOf(a.getAttribute('data-lesson')) !== -1);
      });
      if (progressHost) {
        var count = 0;
        buttons.forEach(function (btn) { if (read.indexOf(btn.getAttribute('data-lesson')) !== -1) count++; });
        progressHost.innerHTML = progressBar(total ? (count / total) * 100 : 0, count + ' / ' + total + ' lus', 'accent');
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-lesson');
        var read = Store.get(storePath, []);
        var i = read.indexOf(id);
        if (i === -1) read.push(id); else read.splice(i, 1);
        Store.set(storePath, read);
        refresh();
      });
    });
    refresh();
  };

  renderHeader();
  renderFooter();
  renderIcons();
})();
