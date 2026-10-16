/* Parcours IT : 5 niveaux (cours + scénario) et badges.
   L’entreprise « NovaTech » et tous les noms, domaines et adresses IP sont fictifs. */
window.DATA_IT = {
  badges: [
    { id: 'premier-pas', emoji: '🎓', nom: 'Premier pas', desc: 'Valider le niveau 1.', test: function (r) { return r.levelId === 1 && r.passed; } },
    { id: 'zero-clic', emoji: '🛡️', nom: 'Zéro clic', desc: 'Terminer le niveau 1 sans aucune erreur.', test: function (r) { return r.levelId === 1 && r.passed && r.bads === 0; } },
    { id: 'sans-faute', emoji: '💯', nom: 'Sans faute', desc: 'Obtenir 100 % sur un niveau.', test: function (r) { return r.passed && r.pct === 100; } },
    { id: 'gardien', emoji: '💾', nom: 'Gardien des sauvegardes', desc: 'Choisir une stratégie de sauvegarde exemplaire.', test: function (r) { return r.choiceBadges.indexOf('gardien') !== -1; } },
    { id: 'eclair', emoji: '⚡', nom: 'Réflexe éclair', desc: 'Bonus de rapidité sur toutes les décisions d’un niveau chronométré.', test: function (r) { return r.chrono && r.speedAll; } },
    { id: 'lynx', emoji: '🔎', nom: 'Œil de lynx', desc: 'Obtenir au moins 90 % au niveau 4 (SOC).', test: function (r) { return r.levelId === 4 && r.passed && r.pct >= 90; } },
    { id: 'phenix', emoji: '🔥', nom: 'Phénix', desc: 'Valider un niveau après l’avoir échoué.', test: function (r) { return r.passed && r.previouslyFailed; } },
    { id: 'sang-froid', emoji: '🧊', nom: 'Sang-froid', desc: 'Valider le niveau 5 sans jamais dépasser le temps.', test: function (r) { return r.levelId === 5 && r.passed && r.timeouts === 0; } },
    { id: 'rssi', emoji: '👑', nom: 'RSSI accompli', desc: 'Valider les 5 niveaux.', test: function (r) { return r.levelsPassed.length === 5; } }
  ],

  niveaux: [
    /* =====================================================================
       NIVEAU 1 — STAGIAIRE
       ===================================================================== */
    {
      id: 1,
      rang: 'Stagiaire',
      titre: 'Les fondamentaux de l’hygiène numérique',
      resume: 'Mots de passe, authentification multifacteur, phishing, mises à jour et supports amovibles : les bases que tout professionnel de l’IT doit maîtriser et faire appliquer.',
      chrono: 0,
      menaceInitiale: 20,
      texteEchec: 'Vos identifiants et votre poste ont été compromis dès votre premier jour.',
      cours: [
        {
          titre: 'Mots de passe robustes',
          html:
            '<p>Un mot de passe protège l’accès à un compte. Sa robustesse dépend surtout de sa <strong>longueur</strong> et de son <strong>imprévisibilité</strong>, bien plus que de la présence d’un caractère spécial.</p>' +
            '<h3>Les attaques sur les mots de passe</h3>' +
            '<div class="table-wrap"><table><thead><tr><th>Attaque</th><th>Principe</th><th>Parade</th></tr></thead><tbody>' +
            '<tr><td><strong>Force brute</strong></td><td>Tester toutes les combinaisons possibles.</td><td>Longueur, verrouillage après échecs, MFA.</td></tr>' +
            '<tr><td><strong>Dictionnaire</strong></td><td>Tester des mots courants et leurs variantes (<code>Soleil2026!</code>).</td><td>Éviter les mots et schémas prévisibles.</td></tr>' +
            '<tr><td><strong>Credential stuffing</strong></td><td>Réutiliser des identifiants issus d’une fuite sur d’autres sites.</td><td>Un mot de passe unique par service.</td></tr>' +
            '<tr><td><strong>Password spraying</strong></td><td>Tester un mot de passe courant sur des milliers de comptes.</td><td>Interdire les mots de passe faibles, MFA.</td></tr>' +
            '</tbody></table></div>' +
            '<div class="callout retenir"><div class="callout-title">Les bonnes pratiques</div><ul>' +
            '<li>Au moins 12 caractères variés, ou mieux, une <strong>phrase de passe</strong> longue (« 4 mots aléatoires + séparateurs »).</li>' +
            '<li>Un mot de passe <strong>différent pour chaque service</strong>.</li>' +
            '<li>Un <strong>gestionnaire de mots de passe</strong> (par exemple KeePassXC, certifié par l’ANSSI) pour les générer et les stocker.</li>' +
            '<li>Jamais de mot de passe sur un post-it, dans un mail ou dans un fichier texte.</li></ul></div>'
        },
        {
          titre: 'Authentification multifacteur (MFA)',
          html:
            '<p>La MFA combine au moins deux facteurs de natures différentes. Même si un mot de passe est volé, l’attaquant reste bloqué sans le second facteur.</p>' +
            '<div class="grid grid-3">' +
            '<div class="example-box mt-0"><strong>Ce que je sais</strong><br>Mot de passe, code PIN.</div>' +
            '<div class="example-box mt-0"><strong>Ce que je possède</strong><br>Smartphone, clé de sécurité, carte à puce.</div>' +
            '<div class="example-box mt-0"><strong>Ce que je suis</strong><br>Empreinte digitale, visage.</div></div>' +
            '<h3 style="margin-top:16px">Tous les seconds facteurs ne se valent pas</h3>' +
            '<div class="table-wrap"><table><thead><tr><th>Méthode</th><th>Niveau</th><th>Remarque</th></tr></thead><tbody>' +
            '<tr><td>Code par SMS</td><td><span class="tag warn">Correct</span></td><td>Mieux que rien, mais vulnérable au SIM swapping et au phishing.</td></tr>' +
            '<tr><td>Application TOTP (code à 6 chiffres)</td><td><span class="tag info">Bon</span></td><td>Ne dépend pas de l’opérateur, mais le code peut être volé par une fausse page.</td></tr>' +
            '<tr><td>Notification push avec code de correspondance</td><td><span class="tag info">Bon</span></td><td>Limite la « fatigue MFA » (validation par lassitude).</td></tr>' +
            '<tr><td>Clé de sécurité FIDO2 / passkey</td><td><span class="tag ok">Excellent</span></td><td>Résiste au phishing : la clé vérifie le vrai domaine du site.</td></tr>' +
            '</tbody></table></div>'
        },
        {
          titre: 'Phishing : les techniques d’un attaquant',
          html:
            '<p>Le phishing reste l’un des principaux vecteurs d’accès initial. Côté IT, il faut connaître les techniques pour mieux former les utilisateurs et configurer les défenses.</p>' +
            '<ul>' +
            '<li><strong>Usurpation d’expéditeur (spoofing)</strong> : le champ « De » est falsifié. Les protections SPF, DKIM et DMARC (vues au niveau 4) permettent de le détecter.</li>' +
            '<li><strong>Typosquatting</strong> : un domaine qui ressemble au vrai (<code>novatech-it.com</code>, <code>n0vatech.fr</code>).</li>' +
            '<li><strong>Spear phishing</strong> : un message ciblé, préparé grâce aux informations publiques (LinkedIn, site web).</li>' +
            '<li><strong>Adversary-in-the-middle</strong> : une fausse page relaie la vraie connexion et vole le cookie de session, contournant une MFA classique.</li>' +
            '</ul>' +
            '<div class="callout faire"><div class="callout-title">✓ Le bon réflexe</div><p>Ne jamais cliquer pour « vérifier ». Signaler le message (bouton de signalement ou service informatique) : un seul signalement permet de bloquer le message pour toute l’entreprise.</p></div>'
        },
        {
          titre: 'Mises à jour et vulnérabilités',
          html:
            '<p>Une <strong>vulnérabilité</strong> est une faille dans un logiciel. Lorsqu’elle est rendue publique, elle reçoit un identifiant <strong>CVE</strong> (par exemple <code>CVE-2026-12345</code>) et un score de gravité <strong>CVSS</strong> de 0 à 10.</p>' +
            '<p>Une fois le correctif publié, les attaquants analysent souvent la mise à jour pour développer rapidement un exploit : c’est une course contre la montre. Une faille exploitée avant même l’existence d’un correctif est appelée <strong>zero-day</strong>.</p>' +
            '<div class="callout retenir"><div class="callout-title">À retenir</div><ul>' +
            '<li>Installer les mises à jour de sécurité rapidement, système <strong>et</strong> applications (navigateur, lecteur PDF…).</li>' +
            '<li>Ne pas repousser indéfiniment un redémarrage demandé.</li>' +
            '<li>Ne télécharger les logiciels que depuis les sources officielles ou le catalogue de l’entreprise.</li></ul></div>'
        },
        {
          titre: 'Supports amovibles et poste de travail',
          html:
            '<p>Une clé USB inconnue peut contenir un logiciel malveillant, ou être un faux clavier (type « Rubber Ducky ») qui tape des commandes à toute vitesse dès qu’on la branche.</p>' +
            '<ul>' +
            '<li>Ne jamais brancher un support trouvé ou d’origine inconnue : le remettre au service informatique, qui l’analysera sur une <strong>station blanche</strong> (poste isolé dédié à l’analyse).</li>' +
            '<li>Verrouiller sa session dès qu’on quitte son poste : <kbd>Windows</kbd> + <kbd>L</kbd> (ou <kbd>Ctrl</kbd> + <kbd>Cmd</kbd> + <kbd>Q</kbd> sur Mac).</li>' +
            '<li>Appliquer le « bureau propre » : pas de mots de passe ni de documents sensibles laissés en évidence.</li>' +
            '</ul>' +
            '<div class="callout warn"><div class="callout-title">⚠ Éteindre l’écran ne suffit pas</div><p>Un écran éteint ne verrouille pas la session : n’importe qui peut le rallumer et utiliser votre compte.</p></div>'
        }
      ],
      intro: {
        titre: 'Premier jour chez NovaTech',
        texte: '<p>Vous commencez aujourd’hui votre stage au service informatique de <strong>NovaTech</strong>, une PME de 250 salariés. Votre tuteur, Samir, vous remet votre ordinateur et vos premiers accès.</p><p>Objectif : traverser cette première journée sans offrir la moindre porte d’entrée aux attaquants… et montrer l’exemple aux utilisateurs.</p>'
      },
      debut: 'mdp',
      noeuds: {
        mdp: {
          etape: 'Le nouveau mot de passe',
          texte: '<p>Samir vous donne un mot de passe temporaire et vous demande de le changer à la première connexion. Quel mot de passe choisissez-vous ?</p>',
          choix: [
            { t: 'Une phrase de passe longue et unique, générée et stockée dans le gestionnaire de mots de passe de l’entreprise.', note: 'best', fb: 'Parfait : longue, unique, imprévisible et stockée de façon sûre.', suite: 'mfa' },
            { t: '<code>NovaTech2026!</code> : il contient majuscule, chiffres et caractère spécial.', note: 'bad', fb: 'Ce schéma « Entreprise + année + ! » est l’un des premiers testés par les attaquants (dictionnaire, password spraying).', suite: 'mfa' },
            { t: 'Le mot de passe que j’utilise pour mes comptes personnels, il est déjà très robuste.', note: 'bad', fb: 'Réutiliser un mot de passe expose au credential stuffing : si un site personnel fuit, le compte professionnel tombe aussi.', suite: 'mfa' },
            { t: 'Un mot de passe aléatoire de 16 caractères, noté dans un carnet rangé dans mon sac.', note: 'ok', fb: 'Le mot de passe est robuste, mais un carnet peut être perdu ou volé. Un gestionnaire de mots de passe est préférable.', suite: 'mfa' }
          ]
        },
        mfa: {
          etape: 'Activer la MFA',
          texte: '<p>À la connexion, Microsoft 365 vous propose d’activer l’authentification multifacteur. Vous avez le choix entre plusieurs méthodes.</p>',
          choix: [
            { t: 'J’active la MFA avec l’application d’authentification de l’entreprise sur mon téléphone professionnel.', note: 'best', fb: 'Très bien : une application d’authentification est bien plus sûre qu’un SMS et ne dépend pas de l’opérateur.', suite: 'mail' },
            { t: 'J’active la MFA par SMS, c’est plus simple.', note: 'ok', fb: 'C’est mieux que rien, mais le SMS est vulnérable au SIM swapping et à l’interception. Préférez une application ou une clé FIDO2.', suite: 'mail' },
            { t: 'Je clique sur « Me le rappeler plus tard » : je suis pressé et mon mot de passe est solide.', note: 'bad', fb: 'Un mot de passe, même solide, peut être volé par phishing. La MFA est l’une des mesures les plus efficaces contre la prise de contrôle de compte.', suite: 'mail' }
          ]
        },
        mail: {
          etape: 'Un mail de la « DSI »',
          texte: '<p>Une heure plus tard, vous recevez ce message :</p>',
          contexte: {
            type: 'doc', titre: 'Boîte de réception',
            contenu: '<p class="mb-0"><strong>De :</strong> Direction des SI &lt;dsi@novatech-it-support.com&gt;<br><strong>Objet :</strong> [URGENT] Validation obligatoire de votre nouveau compte<br><br>Bonjour,<br>Afin de finaliser la création de votre compte, merci de vous authentifier sous 2 heures via le lien suivant : <u>https://novatech-it-support.com/validation</u><br>Faute de validation, votre accès sera suspendu.</p>'
          },
          choix: [
            { t: 'Je ne clique pas et je le signale avec le bouton « Signaler un phishing » / au service informatique.', note: 'best', fb: 'Exactement : le domaine n’est pas celui de NovaTech, et l’urgence est un classique. Votre signalement permet de purger le mail chez tous les destinataires.', suite: 'usb' },
            { t: 'Je clique pour vérifier : je suis du service informatique, je saurai reconnaître une fausse page.', note: 'bad', fb: 'Même les informaticiens se font piéger. Cliquer « pour voir » peut suffire à exposer le poste, et les fausses pages sont parfois parfaites.', suite: 'clic' },
            { t: 'Je le supprime sans rien dire.', note: 'ok', fb: 'Vous ne vous êtes pas fait piéger, mais vos collègues ont probablement reçu le même mail. Le signaler aurait permis de les protéger.', suite: 'usb' }
          ]
        },
        clic: {
          etape: 'Identifiants saisis',
          texte: '<p>La page ressemblait trait pour trait à celle de Microsoft 365. Vous avez saisi votre identifiant et votre mot de passe… puis vous remarquez l’adresse <code>novatech-it-support.com</code>. Que faites-vous ?</p>',
          choix: [
            { t: 'Je change immédiatement mon mot de passe depuis le vrai portail et je préviens Samir pour qu’il vérifie les connexions et révoque les sessions.', note: 'best', fb: 'Bonne réaction : agir vite et prévenir permet de couper l’accès de l’attaquant avant qu’il ne l’exploite.', suite: 'usb' },
            { t: 'Je change mon mot de passe discrètement, sans en parler : j’ai trop honte.', note: 'ok', fb: 'Changer le mot de passe est utile, mais l’attaquant a pu voler un cookie de session ou se connecter entre-temps. L’équipe doit être informée pour vérifier.', suite: 'usb' },
            { t: 'Je ne fais rien, la MFA me protège sûrement.', note: 'bad', fb: 'Certaines fausses pages relaient aussi la MFA et volent la session. Et sans MFA activée, l’attaquant a désormais un accès complet.', suite: 'usb' }
          ]
        },
        usb: {
          etape: 'La clé USB de la salle de réunion',
          texte: '<p>En sortant d’une réunion, vous trouvez une clé USB sur la table, étiquetée <strong>« Primes 2026 — Confidentiel »</strong>.</p>',
          choix: [
            { t: 'Je la remets à Samir sans la brancher, pour qu’elle soit analysée sur la station blanche.', note: 'best', fb: 'Parfait : un support inconnu ne se branche jamais sur un poste du réseau. La station blanche permet de l’analyser sans risque.', suite: 'maj' },
            { t: 'Je la branche sur mon poste pour identifier son propriétaire.', note: 'bad', fb: 'C’est exactement ce qu’espère l’attaquant : l’étiquette attrayante est un appât. La clé peut infecter le poste ou simuler un clavier.', suite: 'maj' },
            { t: 'Je la branche sur un vieux PC non connecté au réseau, pour voir son contenu.', note: 'ok', fb: 'Vous limitez le risque, mais ce PC n’est pas une station d’analyse maîtrisée, et un éventuel malware pourrait se propager plus tard. Laissez faire la procédure.', suite: 'maj' }
          ]
        },
        maj: {
          etape: 'La mise à jour critique',
          texte: '<p>Une notification apparaît : « Des mises à jour de sécurité importantes sont prêtes. Redémarrez pour les installer. » Vous êtes en train de rédiger une procédure.</p>',
          choix: [
            { t: 'J’enregistre mon travail et je redémarre dès maintenant (ou à ma pause, d’ici une heure).', note: 'best', fb: 'Bien : les correctifs de sécurité doivent être appliqués rapidement, avant que les attaquants n’exploitent la faille.', suite: 'pause' },
            { t: 'Je reporte à ce soir, en partant.', note: 'ok', fb: 'Acceptable si vous le faites vraiment, mais le risque reste ouvert toute la journée. Mieux vaut ne pas attendre.', suite: 'pause' },
            { t: 'Je désactive les notifications de mise à jour, elles me déconcentrent.', note: 'bad', fb: 'Un poste non mis à jour est une cible facile. Les mises à jour de sécurité ne sont pas optionnelles.', suite: 'pause' }
          ]
        },
        pause: {
          etape: 'La pause café',
          texte: '<p>Votre collègue vous propose un café. Votre session est ouverte, avec le gestionnaire de mots de passe déverrouillé.</p>',
          choix: [
            { t: 'Je verrouille ma session avec <kbd>Windows</kbd> + <kbd>L</kbd> avant de partir.', note: 'best', fb: 'Le bon réflexe, à appliquer systématiquement, même pour deux minutes.', suite: 'fin' },
            { t: 'J’éteins l’écran, personne ne verra rien.', note: 'bad', fb: 'Éteindre l’écran ne verrouille pas la session : il suffit de le rallumer pour accéder à tout.', suite: 'fin' },
            { t: 'Je ne fais rien : je ne m’absente que cinq minutes et mes collègues sont de confiance.', note: 'bad', fb: 'Quelques secondes suffisent à une personne malveillante (visiteur, prestataire…) pour brancher un appareil ou envoyer un mail en votre nom.', suite: 'fin' }
          ]
        },
        fin: {
          fin: 'auto',
          succes: { titre: 'Une première journée exemplaire', texte: 'Samir est impressionné : vous appliquez déjà les règles d’hygiène que l’équipe doit faire respecter à tous les utilisateurs. Le niveau Technicien vous attend !' },
          partiel: { titre: 'Une première journée à risques', texte: 'Plusieurs de vos décisions auraient pu ouvrir une porte aux attaquants. Relisez le cours sur les fondamentaux et retentez la journée.' }
        }
      }
    },

    /* =====================================================================
       NIVEAU 2 — TECHNICIEN
       ===================================================================== */
    {
      id: 2,
      rang: 'Technicien',
      titre: 'Logiciels malveillants, sauvegardes et mobilité',
      resume: 'Reconnaître les familles de malwares, traiter un poste infecté, mettre en place des sauvegardes fiables et sécuriser les connexions en mobilité.',
      chrono: 0,
      menaceInitiale: 25,
      texteEchec: 'Le malware a eu le temps de voler des identifiants et de se propager à d’autres postes.',
      cours: [
        {
          titre: 'Les familles de logiciels malveillants',
          html:
            '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Comportement</th></tr></thead><tbody>' +
            '<tr><td><strong>Virus</strong></td><td>S’attache à un fichier ou programme légitime et se propage quand on l’exécute.</td></tr>' +
            '<tr><td><strong>Ver</strong></td><td>Se propage seul sur le réseau en exploitant une faille, sans action de l’utilisateur.</td></tr>' +
            '<tr><td><strong>Cheval de Troie</strong></td><td>Se fait passer pour un logiciel utile (convertisseur PDF gratuit, jeu, logiciel « cracké ») pour s’installer.</td></tr>' +
            '<tr><td><strong>Infostealer</strong></td><td>Vole les mots de passe enregistrés, cookies de session, portefeuilles de cryptomonnaies…</td></tr>' +
            '<tr><td><strong>Spyware / keylogger</strong></td><td>Espionne l’activité et enregistre les frappes clavier.</td></tr>' +
            '<tr><td><strong>Rançongiciel (ransomware)</strong></td><td>Chiffre les données et exige une rançon ; souvent précédé d’un vol de données (double extorsion).</td></tr>' +
            '<tr><td><strong>Rootkit</strong></td><td>Se cache au cœur du système pour rester invisible et persistant.</td></tr>' +
            '<tr><td><strong>Botnet</strong></td><td>Transforme la machine en « zombie » contrôlé à distance (spam, DDoS…).</td></tr>' +
            '</tbody></table></div>'
        },
        {
          titre: 'Traiter un poste infecté',
          html:
            '<p>Les signes possibles : lenteurs, fenêtres publicitaires, antivirus désactivé, fichiers renommés, connexions réseau inhabituelles, comptes utilisés à des heures étranges.</p>' +
            '<ol class="reflexes">' +
            '<li><span><strong>Isoler</strong> : déconnecter le poste du réseau (câble, Wi-Fi) ou l’isoler via l’EDR. <strong>Ne pas l’éteindre</strong> : la mémoire vive contient des preuves.</span></li>' +
            '<li><span><strong>Qualifier</strong> : identifier le malware, son vecteur d’entrée et ce qu’il a pu faire (analyse EDR, journaux).</span></li>' +
            '<li><span><strong>Contenir</strong> : réinitialiser les identifiants exposés, révoquer les sessions, rechercher d’autres postes touchés.</span></li>' +
            '<li><span><strong>Éradiquer et restaurer</strong> : réinstaller proprement (une simple suppression du fichier ne suffit pas à garantir l’absence de persistance).</span></li>' +
            '<li><span><strong>Tirer les leçons</strong> : corriger la cause (droits admin, logiciel non autorisé…).</span></li>' +
            '</ol>'
        },
        {
          titre: 'Antivirus, EDR et durcissement',
          html:
            '<p>Un <strong>antivirus</strong> classique repère surtout des signatures connues. Un <strong>EDR</strong> (Endpoint Detection and Response) analyse les comportements (processus suspects, injections, chiffrement massif), conserve un historique et permet d’isoler un poste à distance.</p>' +
            '<div class="callout retenir"><div class="callout-title">Durcir le poste de travail</div><ul>' +
            '<li><strong>Pas de droits administrateur</strong> pour les utilisateurs au quotidien.</li>' +
            '<li>Installation des logiciels uniquement via un <strong>catalogue validé</strong> (ou liste blanche d’applications).</li>' +
            '<li>Macros Office bloquées pour les fichiers venant d’Internet.</li>' +
            '<li>Chiffrement du disque (BitLocker, FileVault) en cas de vol.</li></ul></div>'
        },
        {
          titre: 'Les sauvegardes : la règle 3-2-1',
          html:
            '<p>Face à un rançongiciel, les sauvegardes sont souvent la dernière ligne de défense… à condition qu’elles aient survécu à l’attaque.</p>' +
            '<div class="grid grid-3">' +
            '<div class="example-box mt-0"><strong>3 copies</strong><br>Les données de production + 2 sauvegardes.</div>' +
            '<div class="example-box mt-0"><strong>2 supports</strong><br>Par exemple un NAS et une bande ou un stockage cloud.</div>' +
            '<div class="example-box mt-0"><strong>1 hors ligne / hors site</strong><br>Déconnectée ou immuable, inaccessible à un attaquant.</div></div>' +
            '<div class="callout warn" style="margin-top:16px"><div class="callout-title">⚠ Pièges fréquents</div><ul>' +
            '<li>Une <strong>synchronisation</strong> (OneDrive, Dropbox) n’est pas une sauvegarde : les fichiers chiffrés sont synchronisés aussi.</li>' +
            '<li>Un NAS joint au domaine et accessible en permanence est chiffré avec le reste.</li>' +
            '<li>Une sauvegarde jamais <strong>testée</strong> est une sauvegarde dont on ignore si elle fonctionne.</li></ul></div>'
        },
        {
          titre: 'Mobilité : Wi-Fi public et VPN',
          html:
            '<p>Sur un Wi-Fi public (hôtel, gare, café), le réseau peut être écouté ou imité par un faux point d’accès (« evil twin ») portant le même nom.</p>' +
            '<ul>' +
            '<li>Le <strong>VPN</strong> de l’entreprise chiffre tout le trafic entre l’appareil et le réseau de l’entreprise.</li>' +
            '<li>Le <strong>HTTPS</strong> protège le contenu échangé avec un site, mais ne protège pas tout (requêtes DNS, autres applications).</li>' +
            '<li>Le <strong>partage de connexion</strong> du téléphone professionnel est souvent une meilleure alternative au Wi-Fi public.</li>' +
            '<li>Un filtre de confidentialité sur l’écran limite les regards indiscrets.</li></ul>'
        }
      ],
      intro: {
        titre: 'Le PC de Mme Garnier',
        texte: '<p>Vous êtes désormais <strong>technicien support</strong> chez NovaTech. Lundi matin, le téléphone sonne : Mme Garnier, de la comptabilité, se plaint de son ordinateur.</p><p>Objectif : traiter l’incident proprement, sans laisser l’infection se propager, et corriger la cause.</p>'
      },
      debut: 'appel',
      noeuds: {
        appel: {
          etape: 'L’appel de Mme Garnier',
          texte: '<p>« Mon PC est très lent et des fenêtres de publicité s’ouvrent toutes seules depuis que j’ai installé un <strong>convertisseur PDF gratuit</strong> trouvé sur Internet vendredi. » Que lui demandez-vous ?</p>',
          choix: [
            { t: 'De débrancher le câble réseau et de couper le Wi-Fi, sans éteindre le PC, puis j’arrive.', note: 'best', fb: 'Parfait : isoler sans éteindre stoppe la propagation et l’exfiltration tout en préservant les preuves en mémoire.', suite: 'analyse' },
            { t: 'De lancer une analyse antivirus et de me rappeler si le problème persiste.', note: 'ok', fb: 'L’antivirus n’a déjà rien détecté vendredi, et le poste reste connecté pendant ce temps. L’isolement doit passer en premier.', suite: 'analyse' },
            { t: 'De redémarrer : ça règle souvent ce genre de lenteurs.', note: 'bad', fb: 'Redémarrer efface des preuves en mémoire et ne retire pas le malware, qui est probablement persistant. Le poste reste connecté au réseau.', suite: 'analyse' }
          ]
        },
        analyse: {
          etape: 'Sur le poste',
          texte: '<p>Vous examinez le poste avec la console EDR.</p>',
          contexte: {
            type: 'console', titre: 'EDR — Activité du poste CPT-GARNIER',
            contenu:
              '<span class="c-dim">[Processus]</span>\n' +
              'pdfconvert_helper.exe   PID 4412   Utilisateur : m.garnier (<span class="c-warn">administrateur local</span>)\n' +
              '<span class="c-dim">[Persistance]</span>\n' +
              'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\<span class="c-bad">PdfHelperUpdate</span>\n' +
              '<span class="c-dim">[Réseau]</span>\n' +
              '<span class="c-bad">PID 4412 → 203.0.113.47:443   envoi 38 Mo depuis vendredi</span>\n' +
              '<span class="c-dim">[Fichiers lus]</span>\n' +
              '%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\<span class="c-bad">Login Data</span>\n' +
              '%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Network\\<span class="c-bad">Cookies</span>'
          },
          choix: [
            { t: 'Je laisse le poste isolé, je qualifie la menace avec l’EDR (type de malware, données volées) avant toute action.', note: 'best', fb: 'Bonne démarche : avant d’effacer, il faut comprendre. L’EDR révèle un infostealer qui a lu les mots de passe et cookies du navigateur.', suite: 'identifiants' },
            { t: 'Je tue le processus, je supprime l’exécutable et la clé de registre, puis je rends le poste.', note: 'bad', fb: 'Vous traitez le symptôme sans savoir ce qui a été volé, ni s’il existe d’autres mécanismes de persistance. L’attaquant garde les identifiants exfiltrés.', suite: 'identifiants' },
            { t: 'Je réinstalle le poste tout de suite pour repartir sur une base saine.', note: 'ok', fb: 'Réinstaller est une bonne étape d’éradication, mais trop tôt : vous perdez les informations sur ce qui a été volé et sur l’étendue de l’attaque.', suite: 'identifiants' }
          ]
        },
        identifiants: {
          etape: 'Les identifiants volés',
          texte: '<p>L’analyse confirme un <strong>infostealer</strong> : il a exfiltré les mots de passe enregistrés dans le navigateur et les cookies de session (messagerie, banque de l’entreprise, logiciel de paie).</p>',
          choix: [
            { t: 'Je fais réinitialiser tous les mots de passe exposés, révoquer les sessions actives, et je préviens le RSSI.', note: 'best', fb: 'Indispensable : les cookies volés permettent de se connecter sans mot de passe ni MFA. Il faut révoquer les sessions et changer tous les identifiants.', suite: 'droits' },
            { t: 'Je fais changer uniquement le mot de passe Windows de Mme Garnier.', note: 'ok', fb: 'Insuffisant : les mots de passe des autres services et les cookies de session restent exploitables par l’attaquant.', suite: 'droits' },
            { t: 'Rien de plus : le malware est supprimé, le problème est réglé.', note: 'bad', fb: 'Les données sont déjà parties. Sans réinitialisation, l’attaquant peut accéder à la banque et au logiciel de paie dans les prochains jours.', suite: 'droits' }
          ]
        },
        droits: {
          etape: 'La cause racine',
          texte: '<p>Mme Garnier a pu installer ce logiciel parce que son compte est <strong>administrateur local</strong> de son poste, comme celui de la plupart des salariés.</p>',
          choix: [
            { t: 'Je propose de retirer les droits d’administrateur local et de passer par un catalogue de logiciels validés.', note: 'best', fb: 'Le moindre privilège supprime la cause : sans droits admin, la plupart des installations malveillantes échouent.', suite: 'sauvegarde' },
            { t: 'J’envoie un mail de rappel à tous : « N’installez pas de logiciels gratuits trouvés sur Internet ».', note: 'ok', fb: 'La sensibilisation est utile mais ne suffit pas : une mesure technique est nécessaire pour empêcher l’erreur.', suite: 'sauvegarde' },
            { t: 'Je ne change rien : retirer les droits va générer trop de tickets au support.', note: 'bad', fb: 'Le confort ne doit pas l’emporter sur la sécurité : le même incident se reproduira.', suite: 'sauvegarde' }
          ]
        },
        sauvegarde: {
          etape: 'Les sauvegardes',
          texte: '<p>Pendant la réinstallation, Mme Garnier demande à récupérer ses fichiers. Vous découvrez la politique de sauvegarde actuelle :</p>',
          contexte: {
            type: 'doc', titre: 'Politique de sauvegarde — comptabilité',
            contenu: '<ul class="mb-0"><li>Sauvegarde quotidienne sur un NAS, dans la même salle et le même réseau que les serveurs.</li><li>NAS accessible avec un compte administrateur du domaine.</li><li>Aucune restauration testée depuis l’installation, il y a 3 ans.</li></ul>'
          },
          choix: [
            { t: 'Je propose la règle 3-2-1 : une copie hors ligne ou immuable, un compte de sauvegarde dédié, et des tests de restauration réguliers.', note: 'best', badge: 'gardien', fb: 'Excellent : une sauvegarde isolée et testée est la meilleure assurance contre un rançongiciel.', suite: 'mobilite' },
            { t: 'Je propose d’ajouter un second disque au NAS pour doubler les copies.', note: 'ok', fb: 'Deux disques protègent d’une panne matérielle, mais pas d’un attaquant : tout reste sur le même équipement, accessible depuis le réseau.', suite: 'mobilite' },
            { t: 'Je conseille de tout synchroniser sur OneDrive, ce sera suffisant.', note: 'bad', fb: 'Une synchronisation n’est pas une sauvegarde : des fichiers chiffrés ou supprimés sont synchronisés à l’identique.', suite: 'mobilite' }
          ]
        },
        mobilite: {
          etape: 'Le déplacement',
          texte: '<p>Mme Garnier part la semaine prochaine en séminaire. Elle devra travailler depuis le Wi-Fi de l’hôtel, protégé par un mot de passe affiché à l’accueil.</p>',
          choix: [
            { t: 'Je lui conseille d’utiliser systématiquement le VPN de l’entreprise, ou le partage de connexion de son téléphone professionnel.', note: 'best', fb: 'Le VPN chiffre tout le trafic, même sur un réseau hostile. Le partage de connexion évite les réseaux partagés.', suite: 'fin' },
            { t: 'Je lui dis que tant que les sites sont en HTTPS, elle ne risque rien.', note: 'ok', fb: 'Le HTTPS protège beaucoup, mais pas tout (DNS, applications non chiffrées, faux portails captifs). Le VPN reste la règle.', suite: 'fin' },
            { t: 'Je la rassure : le Wi-Fi est protégé par un mot de passe, il est donc sécurisé.', note: 'bad', fb: 'Un mot de passe partagé avec tous les clients de l’hôtel ne protège pas des autres utilisateurs du réseau, ni d’un faux point d’accès.', suite: 'fin' }
          ]
        },
        fin: {
          fin: 'auto',
          succes: { titre: 'Incident maîtrisé', texte: 'L’infostealer est éradiqué, les accès volés sont neutralisés et la cause est corrigée. Le RSSI vous propose de rejoindre l’équipe d’administration système.' },
          partiel: { titre: 'Incident mal maîtrisé', texte: 'Le poste fonctionne à nouveau, mais l’attaquant dispose peut-être encore d’identifiants valides, et la cause n’est pas corrigée. Revoyez la méthode : isoler, qualifier, contenir, éradiquer, corriger.' }
        }
      }
    },

    /* =====================================================================
       NIVEAU 3 — ADMIN SYS
       ===================================================================== */
    {
      id: 3,
      rang: 'Admin sys',
      titre: 'Privilèges, Active Directory, réseau et journaux',
      resume: 'Moindre privilège, comptes à privilèges et Active Directory, pare-feu et segmentation, gestion des correctifs et journalisation : sécuriser l’infrastructure.',
      chrono: 60,
      menaceInitiale: 30,
      texteEchec: 'L’attaquant a obtenu le contrôle total du domaine Active Directory.',
      cours: [
        {
          titre: 'Moindre privilège et comptes à privilèges',
          html:
            '<p>Le <strong>principe du moindre privilège</strong> consiste à n’accorder à chaque compte que les droits strictement nécessaires à sa mission, et seulement le temps nécessaire.</p>' +
            '<ul>' +
            '<li><strong>Comptes séparés</strong> : un compte standard pour la bureautique (mail, web) et un compte d’administration distinct, utilisé uniquement pour administrer.</li>' +
            '<li><strong>Postes d’administration dédiés</strong> : on n’administre pas le domaine depuis le poste qui sert à lire ses mails.</li>' +
            '<li><strong>MFA obligatoire</strong> sur tous les comptes à privilèges et les accès distants.</li>' +
            '<li><strong>LAPS</strong> : un mot de passe administrateur local unique et aléatoire par poste, pour éviter qu’un seul mot de passe ouvre toutes les machines.</li>' +
            '<li><strong>Revue régulière</strong> des membres des groupes sensibles.</li></ul>'
        },
        {
          titre: 'Active Directory : la cible n°1',
          html:
            '<p>Active Directory (AD) gère les comptes, groupes et droits de tout le parc Windows. Un attaquant qui devient <strong>Admin du domaine</strong> contrôle toute l’entreprise : c’est pourquoi les rançongiciels visent l’AD avant de chiffrer.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>Technique</th><th>Principe</th></tr></thead><tbody>' +
            '<tr><td><strong>Pass-the-Hash</strong></td><td>Réutiliser l’empreinte (hash) d’un mot de passe volée en mémoire, sans connaître le mot de passe.</td></tr>' +
            '<tr><td><strong>Kerberoasting</strong></td><td>Demander des tickets de service puis casser hors ligne les mots de passe faibles des comptes de service.</td></tr>' +
            '<tr><td><strong>Golden Ticket</strong></td><td>Forger des tickets Kerberos après avoir volé la clé du compte <code>krbtgt</code> : persistance quasi totale.</td></tr>' +
            '</tbody></table></div>' +
            '<p>Événements Windows utiles à connaître :</p>' +
            '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Signification</th></tr></thead><tbody>' +
            '<tr><td><code>4624</code> / <code>4625</code></td><td>Ouverture de session réussie / échouée (type 10 = bureau à distance RDP).</td></tr>' +
            '<tr><td><code>4672</code></td><td>Privilèges spéciaux attribués à une session (connexion administrateur).</td></tr>' +
            '<tr><td><code>4720</code></td><td>Création d’un compte utilisateur.</td></tr>' +
            '<tr><td><code>4728</code> / <code>4732</code></td><td>Ajout d’un membre à un groupe de sécurité global / local.</td></tr>' +
            '</tbody></table></div>'
        },
        {
          titre: 'Pare-feu, ports et segmentation',
          html:
            '<p>Un pare-feu filtre les flux selon des règles. La bonne pratique est le <strong>refus par défaut</strong> : tout est interdit, sauf ce qui est explicitement autorisé et justifié.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>Port</th><th>Service</th><th>Point d’attention</th></tr></thead><tbody>' +
            '<tr><td>22</td><td>SSH</td><td>Authentification par clé, jamais exposé sans contrôle.</td></tr>' +
            '<tr><td>3389</td><td>RDP</td><td><strong>Ne jamais exposer sur Internet</strong> : passer par un VPN avec MFA ou une passerelle.</td></tr>' +
            '<tr><td>445</td><td>SMB</td><td>Partage de fichiers, très utilisé pour la latéralisation ; à bloquer entre postes.</td></tr>' +
            '<tr><td>53</td><td>DNS</td><td>Peut servir de canal d’exfiltration ; surveiller.</td></tr>' +
            '<tr><td>80 / 443</td><td>HTTP / HTTPS</td><td>Ne laisser passer que le nécessaire, via un proxy si possible.</td></tr>' +
            '</tbody></table></div>' +
            '<p>La <strong>segmentation</strong> (VLAN, zones, DMZ) découpe le réseau pour qu’une machine compromise ne puisse pas atteindre tout le reste. Dans un réseau « à plat », un seul poste infecté peut joindre tous les serveurs.</p>' +
            '<div class="callout warn"><div class="callout-title">⚠ Sécurité par l’obscurité</div><p>Changer le port RDP de 3389 à 33890 ne protège pas : les scanners d’Internet trouvent le service en quelques minutes.</p></div>'
        },
        {
          titre: 'Gestion des correctifs (patch management)',
          html:
            '<ol class="reflexes">' +
            '<li><span><strong>Inventorier</strong> : on ne peut pas corriger ce qu’on ne connaît pas (matériels, OS, logiciels, versions).</span></li>' +
            '<li><span><strong>Prioriser</strong> : gravité CVSS, mais surtout <strong>exploitation active</strong> (catalogue KEV de la CISA, alertes du CERT-FR) et exposition (Internet en premier).</span></li>' +
            '<li><span><strong>Tester</strong> sur un périmètre restreint avant le déploiement général.</span></li>' +
            '<li><span><strong>Déployer</strong> puis <strong>vérifier</strong> que le correctif est bien appliqué.</span></li>' +
            '</ol>' +
            '<p style="margin-top:12px">Une faille critique activement exploitée sur un service exposé justifie un correctif <strong>en urgence</strong>, hors du cycle mensuel habituel.</p>'
        },
        {
          titre: 'Journalisation',
          html:
            '<p>Sans journaux, impossible de savoir ce qu’un attaquant a fait. Une bonne journalisation suppose :</p>' +
            '<ul>' +
            '<li>La <strong>centralisation</strong> des journaux sur un serveur dédié ou un SIEM : un attaquant qui efface les journaux locaux ne touche pas la copie centrale.</li>' +
            '<li>Une <strong>synchronisation horaire</strong> (NTP) de toutes les machines pour pouvoir corréler les événements.</li>' +
            '<li>Une <strong>durée de conservation</strong> suffisante (souvent de 6 mois à 1 an) : les intrusions sont fréquemment découvertes des semaines après.</li>' +
            '<li>Une politique d’audit activant les événements utiles (connexions, création de comptes, modification de groupes).</li></ul>'
        }
      ],
      intro: {
        titre: 'Lundi, 7 h 42 : des connexions anormales',
        texte: '<p>Vous êtes <strong>administrateur systèmes</strong> chez NovaTech. En arrivant, vous remarquez une alerte : le compte <code>adm.martin</code>, membre des <strong>Admins du domaine</strong>, s’est connecté cette nuit à 3 h 12.</p><p>⏱ À partir de ce niveau, chaque décision est chronométrée. Objectif : chasser l’intrus et corriger les failles qui l’ont laissé entrer.</p>'
      },
      debut: 'alerte',
      noeuds: {
        alerte: {
          etape: 'L’alerte de connexion',
          texte: '<p>Vous consultez les journaux du serveur <code>SRV-RDP01</code> :</p>',
          contexte: {
            type: 'console', titre: 'Journal de sécurité — SRV-RDP01',
            contenu:
              '02:51:07  <span class="c-warn">4625</span>  Échec   adm.martin   Type 10 (RDP)   Source 198.51.100.23\n' +
              '<span class="c-dim">   … 1 846 échecs similaires entre 02:51 et 03:11 …</span>\n' +
              '03:12:44  <span class="c-bad">4624</span>  Succès  adm.martin   Type 10 (RDP)   Source 198.51.100.23\n' +
              '03:12:45  <span class="c-bad">4672</span>  Privilèges spéciaux attribués  adm.martin'
          },
          choix: [
            { t: 'Je désactive <code>adm.martin</code>, je coupe l’accès RDP exposé sur Internet et je préviens le RSSI.', note: 'best', fb: 'Excellente réaction : vous coupez l’accès de l’attaquant (le compte et la porte d’entrée) et vous lancez la gestion d’incident.', suite: 'persistance' },
            { t: 'J’appelle Martin pour lui demander s’il s’est connecté cette nuit.', note: 'ok', fb: 'La vérification est utile, mais 1 846 échecs depuis une IP externe ne laissent guère de doute. Il faut d’abord couper l’accès, puis vérifier.', suite: 'persistance' },
            { t: 'Je bloque l’adresse IP 198.51.100.23 sur le pare-feu.', note: 'bad', fb: 'L’attaquant changera d’IP en quelques secondes, et il possède toujours un compte Admin du domaine valide avec un accès RDP ouvert.', suite: 'persistance' }
          ]
        },
        persistance: {
          etape: 'Un compte de trop',
          texte: '<p>En remontant les journaux du contrôleur de domaine, vous trouvez ceci :</p>',
          contexte: {
            type: 'console', titre: 'Journal de sécurité — DC01',
            contenu:
              '03:19:02  <span class="c-bad">4720</span>  Compte créé : svc_backup2       par adm.martin\n' +
              '03:19:30  <span class="c-bad">4728</span>  svc_backup2 ajouté à « Admins du domaine »   par adm.martin\n' +
              '03:24:11  <span class="c-warn">4698</span>  Tâche planifiée créée : \\Microsoft\\Windows\\UpdateCheck   sur SRV-FIC01'
          },
          choix: [
            { t: 'Je désactive <code>svc_backup2</code>, je préserve les journaux et je recherche les autres persistances (tâches planifiées, GPO, services).', note: 'best', fb: 'Bien vu : un attaquant installe toujours plusieurs moyens de revenir. Désactiver plutôt que supprimer conserve les preuves.', suite: 'lateral' },
            { t: 'Je supprime <code>svc_backup2</code> et je considère l’incident clos.', note: 'ok', fb: 'Supprimer efface des éléments d’enquête, et la tâche planifiée suspecte sur SRV-FIC01 montre que d’autres persistances existent.', suite: 'lateral' },
            { t: 'Je laisse <code>svc_backup2</code> : son nom ressemble à un compte de sauvegarde légitime.', note: 'bad', fb: 'Les attaquants choisissent justement des noms crédibles. Un compte créé à 3 h 19 par un compte compromis n’est pas légitime.', suite: 'lateral' }
          ]
        },
        lateral: {
          etape: 'Le mouvement latéral',
          texte: '<p>Les flux réseau montrent que l’attaquant a rebondi depuis <code>SRV-RDP01</code> vers plusieurs postes de la comptabilité, puis vers le serveur de fichiers, en <strong>SMB (port 445)</strong>. Le réseau de NovaTech est entièrement « à plat » : tout le monde peut joindre tout le monde.</p>',
          choix: [
            { t: 'Je segmente : blocage des flux SMB entre postes, et seuls les flux nécessaires autorisés entre VLAN utilisateurs et serveurs.', note: 'best', fb: 'La segmentation limite la propagation : un poste compromis ne doit pas pouvoir joindre tous les autres.', suite: 'regle' },
            { t: 'Je coupe intégralement le réseau de l’entreprise jusqu’à nouvel ordre.', note: 'ok', fb: 'Couper tout le réseau peut se justifier lors d’un chiffrement en cours, mais ici c’est disproportionné : l’activité est paralysée alors qu’un confinement ciblé suffit.', suite: 'regle' },
            { t: 'J’installe un antivirus supplémentaire sur les serveurs.', note: 'bad', fb: 'L’attaquant utilise des comptes et outils légitimes (RDP, SMB) : un antivirus ne bloquera pas ce mouvement latéral.', suite: 'regle' }
          ]
        },
        regle: {
          etape: 'La porte d’entrée',
          texte: '<p>Vous trouvez l’origine de l’exposition RDP sur le pare-feu :</p>',
          contexte: {
            type: 'console', titre: 'Pare-feu — règles entrantes',
            contenu:
              '#12  <span class="c-bad">TEMP - accès prestataire</span>   ANY → SRV-RDP01:3389   AUTORISER   créée il y a 2 ans\n' +
              '#13  VPN-NOMADES                  ANY → FW:443          AUTORISER\n' +
              '#99  DEFAULT                      ANY → ANY             REFUSER'
          },
          choix: [
            { t: 'Je supprime la règle, j’impose le VPN avec MFA pour tout accès distant et je planifie une revue régulière des règles.', note: 'best', fb: 'Parfait : RDP ne doit jamais être exposé sur Internet, et les règles « temporaires » doivent avoir une date de fin et être revues.', suite: 'comptes' },
            { t: 'Je restreins la règle à l’adresse IP du prestataire.', note: 'ok', fb: 'C’est mieux, mais le service reste exposé sans MFA, et l’IP du prestataire peut changer ou être compromise. Le VPN avec MFA est la bonne solution.', suite: 'comptes' },
            { t: 'Je change le port RDP de 3389 à 33890.', note: 'bad', fb: 'C’est de la sécurité par l’obscurité : les scanners trouvent les services RDP quel que soit le port.', suite: 'comptes' }
          ]
        },
        comptes: {
          etape: 'Les habitudes de Martin',
          texte: '<p>Martin explique qu’il utilise <code>adm.martin</code> pour tout : lire ses mails, naviguer sur le web et administrer les serveurs. Son mot de passe était le même que celui d’un site personnel ayant subi une fuite de données.</p>',
          choix: [
            { t: 'J’impose des comptes séparés (standard au quotidien, admin uniquement pour administrer) avec MFA obligatoire sur les comptes à privilèges.', note: 'best', fb: 'C’est la base de la protection des comptes à privilèges : un phishing ou un malware sur la bureautique ne doit jamais toucher un compte admin.', suite: 'patch' },
            { t: 'J’impose seulement un mot de passe de 20 caractères pour les administrateurs.', note: 'ok', fb: 'Utile, mais sans MFA ni séparation des usages, un mot de passe long peut toujours être volé par phishing ou malware.', suite: 'patch' },
            { t: 'Je laisse Martin travailler comme il veut : il est administrateur, il sait ce qu’il fait.', note: 'bad', fb: 'Les administrateurs sont précisément les cibles prioritaires des attaquants. Les règles doivent s’appliquer d’abord à eux.', suite: 'patch' }
          ]
        },
        patch: {
          etape: 'Le scan de vulnérabilités',
          texte: '<p>Un scan de vulnérabilités sur les serveurs révèle 41 failles. L’une d’elles, sur le serveur RDP, a un score <strong>CVSS de 9,8</strong> et figure dans le catalogue des vulnérabilités <strong>activement exploitées</strong>. Les 40 autres sont de gravité faible ou moyenne.</p>',
          choix: [
            { t: 'Je traite en urgence la faille critique exploitée (test rapide puis déploiement), et je planifie les autres selon leur priorité.', note: 'best', fb: 'C’est la bonne priorisation : gravité + exploitation active + exposition. Le reste suit le cycle normal.', suite: 'logs' },
            { t: 'Je planifie les 41 correctifs pour la prochaine fenêtre de maintenance mensuelle.', note: 'ok', fb: 'Une faille activement exploitée ne peut pas attendre trois semaines, surtout sur un serveur qui vient d’être attaqué.', suite: 'logs' },
            { t: 'Je ne touche pas aux serveurs de production : une mise à jour pourrait tout casser.', note: 'bad', fb: 'Le risque de laisser une faille critique exploitée est bien plus grand qu’un éventuel dysfonctionnement maîtrisé par des tests.', suite: 'logs' }
          ]
        },
        logs: {
          etape: 'Les journaux manquants',
          texte: '<p>En voulant remonter plus loin, vous constatez que les journaux du contrôleur de domaine ne sont conservés que <strong>7 jours</strong>, en local : impossible de savoir depuis quand l’attaquant prépare son intrusion.</p>',
          choix: [
            { t: 'Je centralise les journaux sur un serveur dédié ou un SIEM, je synchronise l’heure (NTP) et je fixe une conservation adaptée (6 mois à 1 an).', note: 'best', fb: 'Centralisation, horodatage fiable et conservation suffisante : les trois piliers d’une journalisation utile en cas d’incident.', suite: 'fin' },
            { t: 'J’augmente la taille des journaux locaux sur chaque serveur.', note: 'ok', fb: 'La conservation s’allonge, mais un attaquant avec des droits admin peut toujours effacer les journaux locaux, et la corrélation reste difficile.', suite: 'fin' },
            { t: 'Je désactive une partie des journaux pour économiser de l’espace disque.', note: 'bad', fb: 'Sans journaux, l’équipe est aveugle : c’est exactement ce que recherche un attaquant.', suite: 'fin' }
          ]
        },
        fin: {
          fin: 'auto',
          succes: { titre: 'Intrus expulsé, infrastructure durcie', texte: 'L’attaquant a perdu ses accès avant de pouvoir déployer un rançongiciel, et les failles qui l’ont laissé entrer sont corrigées. Le SOC vous propose un poste d’analyste.' },
          partiel: { titre: 'Une intrusion mal contenue', texte: 'Certaines portes restent ouvertes : l’attaquant pourrait revenir. Revoyez le cours sur le moindre privilège, la segmentation et la gestion des correctifs.' }
        }
      }
    },

    /* =====================================================================
       NIVEAU 4 — ANALYSTE SOC
       ===================================================================== */
    {
      id: 4,
      rang: 'Analyste SOC',
      titre: 'Détection, analyse et réponse',
      resume: 'SIEM et triage d’alertes, indicateurs de compromission, authentification des mails (SPF, DKIM, DMARC), attaques réseau (MITM, DDoS) et attaques sur les identifiants.',
      chrono: 45,
      menaceInitiale: 30,
      texteEchec: 'Les vraies alertes ont été noyées ou mal qualifiées : l’attaquant a pu agir pendant toute la nuit.',
      cours: [
        {
          titre: 'Le SOC et le SIEM',
          html:
            '<p>Le <strong>SOC</strong> (Security Operations Center) surveille en continu le système d’information. Son outil central, le <strong>SIEM</strong>, collecte les journaux de toutes les sources (pare-feu, AD, EDR, proxy, messagerie…) et les <strong>corrèle</strong> pour lever des alertes.</p>' +
            '<div class="table-wrap"><table><thead><tr><th></th><th>Alerte levée</th><th>Pas d’alerte</th></tr></thead><tbody>' +
            '<tr><th>Attaque réelle</th><td><span class="tag ok">Vrai positif</span></td><td><span class="tag ko">Faux négatif</span> (le plus dangereux)</td></tr>' +
            '<tr><th>Activité légitime</th><td><span class="tag warn">Faux positif</span></td><td><span class="tag ok">Vrai négatif</span></td></tr>' +
            '</tbody></table></div>' +
            '<p>Le <strong>triage</strong> consiste à qualifier chaque alerte : est-ce réel ? quelle gravité ? quelle action ? Trop de faux positifs créent une « fatigue d’alerte » : il faut ajuster les règles, sans jamais les désactiver aveuglément.</p>'
        },
        {
          titre: 'Indicateurs de compromission et MITRE ATT&CK',
          html:
            '<p>Un <strong>IOC</strong> (Indicator of Compromise) est une trace technique d’une attaque : adresse IP, nom de domaine, URL, empreinte (hash) de fichier, nom de processus…</p>' +
            '<p>La « <strong>pyramide de la douleur</strong> » rappelle qu’un hash ou une IP se changent facilement, alors que les <strong>comportements</strong> (TTP : tactiques, techniques et procédures) sont bien plus difficiles à modifier pour l’attaquant.</p>' +
            '<p>Le référentiel <strong>MITRE ATT&amp;CK</strong> classe ces techniques par tactique : accès initial, exécution, persistance, élévation de privilèges, mouvement latéral, commande et contrôle (C2), exfiltration, impact…</p>' +
            '<div class="callout retenir"><div class="callout-title">Repérer un « beaconing »</div><p>Un malware contacte régulièrement son serveur de commande (C2). Des connexions à intervalle très régulier vers un domaine récent et inconnu sont un signal fort.</p></div>'
        },
        {
          titre: 'Authentification des mails : SPF, DKIM, DMARC',
          html:
            '<div class="table-wrap"><table><thead><tr><th>Mécanisme</th><th>Ce qu’il vérifie</th></tr></thead><tbody>' +
            '<tr><td><strong>SPF</strong></td><td>Le serveur d’envoi est-il autorisé par le domaine (enregistrement DNS listant les serveurs légitimes) ?</td></tr>' +
            '<tr><td><strong>DKIM</strong></td><td>Le message porte-t-il une signature cryptographique valide du domaine, prouvant qu’il n’a pas été modifié ?</td></tr>' +
            '<tr><td><strong>DMARC</strong></td><td>Le domaine visible dans « From » est-il aligné avec SPF/DKIM ? Que faire en cas d’échec : <code>p=none</code> (surveiller), <code>quarantine</code>, <code>reject</code> ?</td></tr>' +
            '</tbody></table></div>' +
            '<p>Dans les en-têtes, regardez la ligne <code>Authentication-Results</code>, et comparez <code>From</code>, <code>Return-Path</code> et <code>Reply-To</code> : un <code>Reply-To</code> vers une messagerie gratuite est typique d’une fraude.</p>'
        },
        {
          titre: 'Attaques réseau : MITM et DDoS',
          html:
            '<h3>L’attaque de l’homme du milieu (MITM)</h3>' +
            '<p>L’attaquant s’intercale entre la victime et sa destination pour lire ou modifier le trafic, par exemple par <strong>ARP spoofing</strong> (il se fait passer pour la passerelle sur le réseau local) ou via un faux point d’accès Wi-Fi.</p>' +
            '<p>Parades : chiffrement (TLS, HSTS), <strong>ne jamais ignorer un avertissement de certificat</strong>, Dynamic ARP Inspection sur les commutateurs, authentification réseau 802.1X.</p>' +
            '<h3>Le déni de service distribué (DDoS)</h3>' +
            '<div class="table-wrap"><table><thead><tr><th>Type</th><th>Exemple</th></tr></thead><tbody>' +
            '<tr><td>Volumétrique</td><td>Inondation UDP, amplification DNS : sature la bande passante.</td></tr>' +
            '<tr><td>Protocolaire</td><td>SYN flood : épuise les ressources des équipements.</td></tr>' +
            '<tr><td>Applicatif</td><td>Requêtes HTTP massives sur une page coûteuse.</td></tr>' +
            '</tbody></table></div>' +
            '<p>Parades : protection anti-DDoS de l’opérateur ou de l’hébergeur, CDN, limitation de débit. Un DDoS sert parfois de <strong>diversion</strong> pour masquer une autre attaque.</p>'
        },
        {
          titre: 'Attaques sur les identifiants : les reconnaître dans les journaux',
          html:
            '<div class="table-wrap"><table><thead><tr><th>Attaque</th><th>Signature dans les journaux</th></tr></thead><tbody>' +
            '<tr><td><strong>Force brute</strong></td><td>Beaucoup d’échecs sur <strong>un</strong> compte, depuis une ou quelques sources.</td></tr>' +
            '<tr><td><strong>Password spraying</strong></td><td>Peu d’échecs par compte (1 ou 2) mais sur <strong>de très nombreux</strong> comptes, pour éviter le verrouillage.</td></tr>' +
            '<tr><td><strong>Credential stuffing</strong></td><td>Couples identifiant/mot de passe variés, souvent issus d’une fuite, avec un taux de réussite anormal.</td></tr>' +
            '<tr><td><strong>Voyage impossible</strong></td><td>Connexions du même compte depuis deux pays éloignés en quelques minutes.</td></tr>' +
            '</tbody></table></div>'
        }
      ],
      intro: {
        titre: 'Garde de nuit au SOC',
        texte: '<p>Vous êtes <strong>analyste SOC</strong>. Il est 23 h, et vous êtes seul de garde. La file d’alertes du SIEM se remplit : à vous de trier le vrai du faux et de réagir correctement.</p><p>⏱ 45 secondes par décision. Lisez bien les journaux : certaines alertes sont de fausses alertes.</p>'
      },
      debut: 'spray',
      noeuds: {
        spray: {
          etape: 'Alerte 1 : échecs de connexion',
          texte: '<p>Le SIEM lève une alerte « Multiples échecs d’authentification » sur le portail Microsoft 365 :</p>',
          contexte: {
            type: 'console', titre: 'SIEM — Authentification (dernière heure)',
            contenu:
              'Source 203.0.113.88   Mot de passe testé : <span class="c-warn">Automne2026!</span>\n' +
              '  a.bernard   Échec\n  b.chen      Échec\n  c.dupont    Échec\n' +
              '<span class="c-dim">  … 512 comptes différents, 1 tentative chacun …</span>\n' +
              '  l.moreau    <span class="c-bad">SUCCÈS</span>\n  p.nguyen    <span class="c-bad">SUCCÈS</span>'
          },
          choix: [
            { t: 'Vrai positif : password spraying. Je fais réinitialiser et révoquer les sessions de l.moreau et p.nguyen, je bloque la source et j’escalade.', note: 'best', fb: 'Bonne qualification : un mot de passe testé sur 512 comptes, c’est du spraying. Deux comptes sont compromis et doivent être sécurisés immédiatement.', suite: 'mail' },
            { t: 'Vrai positif : force brute. Je fais verrouiller les comptes ciblés.', note: 'ok', fb: 'C’est bien une attaque, mais pas de la force brute : avec une seule tentative par compte, aucun verrouillage ne se déclenche. L’essentiel est de traiter les deux comptes compromis.', suite: 'mail' },
            { t: 'Faux positif : un utilisateur a sûrement oublié son mot de passe.', note: 'bad', fb: 'Un utilisateur ne teste pas 512 comptes différents ! Deux comptes sont désormais entre les mains de l’attaquant.', suite: 'mail' }
          ]
        },
        mail: {
          etape: 'Alerte 2 : un mail du « PDG »',
          texte: '<p>Une comptable signale un mail du PDG demandant un virement urgent. Vous analysez les en-têtes :</p>',
          contexte: {
            type: 'console', titre: 'En-têtes du message',
            contenu:
              'From:        "Marc Lefèvre" &lt;m.lefevre@novatech.fr&gt;\n' +
              'Return-Path: &lt;<span class="c-bad">bounce@mailer-promo.example</span>&gt;\n' +
              'Reply-To:    <span class="c-bad">marc.lefevre.pdg@outlook.example</span>\n' +
              'Authentication-Results: <span class="c-bad">spf=fail</span> (sender IP 192.0.2.77)\n' +
              '    <span class="c-bad">dkim=none</span>; <span class="c-bad">dmarc=fail</span> (p=none)'
          },
          choix: [
            { t: 'Usurpation confirmée : je purge le message de toutes les boîtes, je bloque l’expéditeur et je recommande de passer DMARC en <code>p=reject</code>.', note: 'best', fb: 'Exact : SPF et DMARC échouent, et le Reply-To pointe vers une messagerie externe. La politique DMARC <code>p=none</code> a laissé passer le message : il faut la durcir.', suite: 'backup' },
            { t: 'Je supprime le message de la boîte de la comptable qui l’a signalé.', note: 'ok', fb: 'D’autres salariés l’ont sans doute reçu. Il faut rechercher et purger le message dans toute la messagerie.', suite: 'backup' },
            { t: 'Faux positif : un échec SPF arrive souvent avec les transferts de mails.', note: 'bad', fb: 'Un transfert peut casser SPF, mais pas faire échouer DMARC avec un Reply-To vers une messagerie gratuite. C’est une arnaque au président.', suite: 'backup' }
          ]
        },
        backup: {
          etape: 'Alerte 3 : PowerShell encodé',
          texte: '<p>L’EDR signale « Exécution de PowerShell avec commande encodée » sur le serveur <code>SRV-BKP01</code>. Vous enquêtez :</p>',
          contexte: {
            type: 'console', titre: 'EDR — Détails',
            contenu:
              'Hôte : SRV-BKP01        Heure : 02:00:03 (identique chaque nuit depuis 8 mois)\n' +
              'Parent : <span class="c-ok">taskeng.exe</span> → tâche « Sauvegarde-Nocturne »\n' +
              'Script : D:\\Scripts\\backup.ps1   Signature : <span class="c-ok">valide (NovaTech IT)</span>\n' +
              'Ticket de changement associé : <span class="c-ok">CHG-2025-0412 (approuvé)</span>'
          },
          choix: [
            { t: 'Faux positif : je documente et j’ajoute une exception ciblée (script signé, chemin et tâche précis).', note: 'best', fb: 'Bonne analyse : tâche planifiée connue, script signé, ticket approuvé, comportement régulier. Une exception précise évite le bruit sans aveugler la détection.', suite: 'beacon' },
            { t: 'J’isole immédiatement le serveur de sauvegarde par précaution.', note: 'ok', fb: 'Prudent, mais disproportionné : vous interrompez les sauvegardes alors que tous les éléments indiquent une activité légitime.', suite: 'beacon' },
            { t: 'Je désactive complètement la règle de détection « PowerShell encodé ».', note: 'bad', fb: 'Les attaquants utilisent très souvent PowerShell encodé. Désactiver la règle crée un angle mort : il faut une exception ciblée.', suite: 'beacon' }
          ]
        },
        beacon: {
          etape: 'Alerte 4 : trafic régulier suspect',
          texte: '<p>Le proxy signale un poste qui contacte un domaine inconnu :</p>',
          contexte: {
            type: 'console', titre: 'Proxy — PC-RH-014',
            contenu:
              '23:41:00  rundll32.exe → <span class="c-bad">upd4te-cdn-micros0ft.example</span>  POST 512 o\n' +
              '23:42:00  rundll32.exe → <span class="c-bad">upd4te-cdn-micros0ft.example</span>  POST 512 o\n' +
              '23:43:00  rundll32.exe → <span class="c-bad">upd4te-cdn-micros0ft.example</span>  POST 512 o\n' +
              '<span class="c-dim">Whois : domaine enregistré il y a 3 jours</span>'
          },
          choix: [
            { t: 'Vrai positif (C2) : j’isole le poste via l’EDR, je collecte les IOC et je cherche les autres machines qui contactent ce domaine.', note: 'best', fb: 'Excellent : beaconing toutes les 60 s vers un domaine récent imitant Microsoft. La chasse aux menaces (threat hunting) permet de trouver les autres victimes.', suite: 'escalade' },
            { t: 'Je bloque le domaine sur le proxy et je clôture l’alerte.', note: 'ok', fb: 'Le blocage coupe ce canal, mais le malware reste sur le poste et utilisera un domaine de secours. Il faut isoler et rechercher l’étendue.', suite: 'escalade' },
            { t: 'Je lance un scan antivirus à distance et j’attends le résultat.', note: 'bad', fb: 'L’antivirus n’a rien vu jusqu’ici. Pendant ce temps, l’attaquant garde la main sur le poste.', suite: 'escalade' }
          ]
        },
        escalade: {
          etape: 'Un incident qui grossit',
          texte: '<p>La recherche dans les journaux DNS montre que <strong>3 autres postes</strong> (RH et direction) contactent le même domaine. Il est 0 h 20.</p>',
          choix: [
            { t: 'J’isole les 4 postes, j’ouvre un incident majeur et j’escalade immédiatement vers l’astreinte (N3 / RSSI).', note: 'best', fb: 'C’est le rôle de l’escalade : plusieurs postes compromis, dont la direction, dépassent le cadre d’un analyste seul. L’astreinte existe pour ça.', suite: 'mitm' },
            { t: 'J’isole les 4 postes et je ferai un rapport au RSSI demain matin.', note: 'ok', fb: 'Le confinement est bon, mais attendre 8 heures laisse l’attaquant agir ailleurs. Un incident de cette ampleur justifie l’astreinte.', suite: 'mitm' },
            { t: 'Je gère seul pour ne réveiller personne : je bloque juste le domaine.', note: 'bad', fb: 'Ne pas escalader un incident majeur est une erreur grave : l’équipe perd des heures précieuses et les postes restent compromis.', suite: 'mitm' }
          ]
        },
        mitm: {
          etape: 'Alerte 5 : certificat invalide',
          texte: '<p>Un développeur de nuit appelle : depuis le Wi-Fi de l’open space, l’intranet affiche un <strong>avertissement de certificat</strong>. Au même moment, le switch signale :</p>',
          contexte: {
            type: 'console', titre: 'Switch — Journal ARP',
            contenu:
              '<span class="c-warn">DUPLICATE IP</span> 10.20.0.1 (passerelle)\n' +
              '  MAC légitime : 00:1a:2b:3c:4d:5e  (port Gi0/1 — routeur)\n' +
              '  <span class="c-bad">MAC inconnue  : 6c:41:0e:99:12:ab  (port Gi0/37 — open space)</span>'
          },
          choix: [
            { t: 'ARP spoofing probable : je localise et désactive le port Gi0/37, je demande de ne pas ignorer l’alerte de certificat, et je propose Dynamic ARP Inspection / 802.1X.', note: 'best', fb: 'Bien vu : une seconde MAC qui se fait passer pour la passerelle, c’est une attaque de l’homme du milieu. L’avertissement de certificat a fait son travail.', suite: 'ddos' },
            { t: 'Je renouvelle le certificat de l’intranet, il a peut-être expiré.', note: 'ok', fb: 'Le certificat n’est pas en cause : le journal ARP montre qu’un appareil intercepte le trafic.', suite: 'ddos' },
            { t: 'Je lui dis de cliquer sur « Continuer quand même », l’intranet utilise un certificat interne.', note: 'bad', fb: 'Ignorer un avertissement de certificat, c’est exactement ce qui permet à l’attaquant de lire les identifiants envoyés.', suite: 'ddos' }
          ]
        },
        ddos: {
          etape: 'Alerte 6 : le site web tombe',
          texte: '<p>3 h 05 : le site public de NovaTech est inaccessible. Le lien Internet est saturé par <strong>40 Gbit/s de trafic UDP</strong> venant de milliers d’adresses. Un mail arrive : « Payez 2 BTC ou l’attaque continue. »</p>',
          choix: [
            { t: 'J’active la protection anti-DDoS de l’opérateur/hébergeur, je ne paie pas, je documente et je surveille d’autres alertes (diversion possible).', note: 'best', fb: 'Parfait : seule une protection en amont peut absorber un tel volume. Payer n’offre aucune garantie, et un DDoS masque parfois une intrusion.', suite: 'fin' },
            { t: 'Je coupe le site et j’attends la fin de l’attaque.', note: 'ok', fb: 'Cela évite peut-être d’autres dégâts, mais le service reste indisponible sans solution. La protection anti-DDoS doit être activée.', suite: 'fin' },
            { t: 'Je bloque les adresses IP une par une sur le pare-feu.', note: 'bad', fb: 'Impossible à cette échelle : des milliers d’adresses, et le lien est saturé avant même d’atteindre le pare-feu. La mitigation doit se faire en amont.', suite: 'fin' }
          ]
        },
        fin: {
          fin: 'auto',
          succes: { titre: 'Nuit de garde réussie', texte: 'Vous avez distingué les vraies attaques des fausses alertes, contenu les compromissions et escaladé au bon moment. Le RSSI part bientôt à la retraite… et pense à vous pour lui succéder.' },
          partiel: { titre: 'Une nuit difficile', texte: 'Des alertes ont été mal qualifiées : certaines attaques ont continué pendant que du temps était perdu ailleurs. Revoyez le triage et les signatures des attaques.' }
        }
      }
    },

    /* =====================================================================
       NIVEAU 5 — RSSI
       ===================================================================== */
    {
      id: 5,
      rang: 'RSSI',
      titre: 'Gestion de crise et gouvernance',
      resume: 'Piloter une crise de rançongiciel : cellule de crise, réponse à l’incident, PCA/PRA, obligations légales (RGPD, NIS 2), communication et retour d’expérience.',
      chrono: 40,
      menaceInitiale: 35,
      texteEchec: 'L’entreprise a perdu ses données, sa production et la confiance de ses clients.',
      cours: [
        {
          titre: 'Organiser la gestion de crise',
          html:
            '<p>Une crise cyber n’est pas qu’un sujet technique : elle touche toute l’entreprise. On distingue généralement :</p>' +
            '<ul>' +
            '<li>Une <strong>cellule décisionnelle</strong> (direction, RSSI, juridique, communication, RH, métiers) qui arbitre et décide.</li>' +
            '<li>Une <strong>cellule opérationnelle</strong> (équipes IT, prestataire de réponse à incident) qui investigue et restaure.</li></ul>' +
            '<div class="callout retenir"><div class="callout-title">Les réflexes d’organisation</div><ul>' +
            '<li>Tenir une <strong>main courante</strong> : chaque décision et action horodatée.</li>' +
            '<li>Communiquer par des <strong>canaux hors bande</strong> (téléphones, messagerie séparée) : la messagerie de l’entreprise peut être compromise ou indisponible.</li>' +
            '<li>Préparer à l’avance : annuaire de crise imprimé, procédures, exercices réguliers.</li></ul></div>'
        },
        {
          titre: 'Anatomie d’une attaque par rançongiciel',
          html:
            '<ol class="reflexes">' +
            '<li><span><strong>Accès initial</strong> : phishing, identifiants volés, VPN ou RDP exposé, faille non corrigée.</span></li>' +
            '<li><span><strong>Élévation de privilèges et latéralisation</strong> jusqu’aux comptes Admins du domaine.</span></li>' +
            '<li><span><strong>Exfiltration</strong> des données sensibles (souvent pendant des jours, discrètement).</span></li>' +
            '<li><span><strong>Destruction des sauvegardes</strong> accessibles.</span></li>' +
            '<li><span><strong>Chiffrement</strong> massif, souvent la nuit ou le week-end, puis demande de rançon avec menace de publication : la <strong>double extorsion</strong>.</span></li>' +
            '</ol>' +
            '<div class="callout warn" style="margin-top:16px"><div class="callout-title">⚠ Faut-il payer ?</div><p>Les autorités (ANSSI, cybermalveillance.gouv.fr) recommandent de <strong>ne pas payer</strong> : aucune garantie de récupérer les données ni qu’elles ne soient pas publiées, financement du crime, et risque d’être ciblé à nouveau. Il faut <strong>porter plainte</strong> et se faire accompagner (CERT-FR, prestataires qualifiés PRIS, 17Cyber).</p></div>'
        },
        {
          titre: 'PCA, PRA, RTO et RPO',
          html:
            '<div class="table-wrap"><table><thead><tr><th>Terme</th><th>Définition</th></tr></thead><tbody>' +
            '<tr><td><strong>PCA</strong> (plan de continuité d’activité)</td><td>Comment continuer les activités critiques pendant la crise, en mode dégradé.</td></tr>' +
            '<tr><td><strong>PRA</strong> (plan de reprise d’activité)</td><td>Comment restaurer le système d’information et revenir à la normale.</td></tr>' +
            '<tr><td><strong>BIA</strong> (analyse d’impact)</td><td>Identifie les activités critiques et l’impact de leur arrêt.</td></tr>' +
            '<tr><td><strong>RTO</strong></td><td>Durée maximale d’interruption acceptable d’un service.</td></tr>' +
            '<tr><td><strong>RPO</strong></td><td>Perte de données maximale acceptable (ex. : 24 h = sauvegarde quotidienne).</td></tr>' +
            '</tbody></table></div>' +
            '<p>Après un rançongiciel, on restaure dans un <strong>environnement assaini</strong> (vecteur d’entrée fermé, persistances supprimées, mots de passe et compte <code>krbtgt</code> réinitialisés), en commençant par les services critiques. Restaurer sur une infrastructure encore compromise, c’est se faire chiffrer à nouveau.</p>'
        },
        {
          titre: 'Les obligations légales',
          html:
            '<div class="table-wrap"><table><thead><tr><th>Texte</th><th>Obligation</th></tr></thead><tbody>' +
            '<tr><td><strong>RGPD, art. 33</strong></td><td>Notifier la <strong>CNIL</strong> d’une violation de données personnelles dans les <strong>72 heures</strong> après en avoir pris connaissance (sauf risque improbable). La notification peut être complétée par étapes.</td></tr>' +
            '<tr><td><strong>RGPD, art. 34</strong></td><td>Informer les <strong>personnes concernées</strong> si la violation présente un risque élevé pour leurs droits et libertés.</td></tr>' +
            '<tr><td><strong>Directive NIS 2</strong></td><td>Pour les entités concernées : alerte précoce sous 24 h, notification sous 72 h et rapport final sous un mois auprès de l’autorité (l’ANSSI en France).</td></tr>' +
            '<tr><td><strong>Plainte</strong></td><td>Déposer plainte (police, gendarmerie) : nécessaire pour l’enquête et souvent pour l’assurance.</td></tr>' +
            '</tbody></table></div>' +
            '<p>Pensez aussi aux obligations contractuelles (clients, assurance cyber) et à conserver les preuves.</p>'
        },
        {
          titre: 'Communication de crise et retour d’expérience',
          html:
            '<ul>' +
            '<li>Communiquer <strong>tôt, factuellement et de façon cohérente</strong> : ce que l’on sait, ce que l’on fait, quand viendra la prochaine information.</li>' +
            '<li>Ne pas <strong>nier</strong> ni minimiser : un démenti contredit par les faits détruit la confiance.</li>' +
            '<li>Ne pas spéculer ni donner de détails techniques qui aideraient l’attaquant.</li>' +
            '<li>Préparer des messages pour chaque public : salariés, clients, partenaires, presse.</li></ul>' +
            '<p>Après la crise, le <strong>retour d’expérience (RETEX)</strong> analyse ce qui a fonctionné ou non, <strong>sans chercher de coupable</strong> : l’objectif est d’améliorer le système, pas de punir. Il débouche sur un plan d’action priorisé et financé.</p>'
        }
      ],
      intro: {
        titre: 'Vendredi, 2 h 14 : tout est chiffré',
        texte: '<p>Vous êtes <strong>RSSI</strong> de NovaTech. Votre téléphone sonne en pleine nuit : l’ingénieur d’astreinte vous annonce que les fichiers des serveurs portent tous l’extension <code>.locked</code> et qu’une note de rançon s’affiche sur les écrans.</p><p>⏱ 40 secondes par décision. Vous pilotez la crise : chaque choix engage toute l’entreprise.</p>'
      },
      debut: 'isoler',
      noeuds: {
        isoler: {
          etape: 'Les premières minutes',
          texte: '<p>Le chiffrement est peut-être encore en cours. L’ingénieur d’astreinte attend vos instructions.</p>',
          choix: [
            { t: 'Isoler : couper les accès Internet et VPN, segmenter le réseau, sans éteindre les serveurs, puis déclencher la cellule de crise.', note: 'best', fb: 'Isoler stoppe la propagation et coupe l’attaquant, tout en préservant les preuves en mémoire. La cellule de crise organise la suite.', suite: 'cellule' },
            { t: 'Éteindre immédiatement tous les serveurs.', note: 'ok', fb: 'Cela peut arrêter le chiffrement, mais efface la mémoire (preuves, parfois clés de chiffrement) et peut endommager des données. Isoler du réseau est préférable.', suite: 'cellule' },
            { t: 'Attendre lundi pour réunir toute l’équipe.', note: 'bad', fb: 'Chaque heure compte : le chiffrement et l’exfiltration continuent tout le week-end.', suite: 'cellule' }
          ]
        },
        cellule: {
          etape: 'La cellule de crise',
          texte: '<p>Il est 3 h. Vous devez réunir les décideurs. La messagerie et Teams de NovaTech sont hébergés sur l’infrastructure compromise.</p>',
          choix: [
            { t: 'Je réunis direction, DSI, juridique, communication et RH par téléphone, sur un canal hors bande, et je fais ouvrir une main courante.', note: 'best', fb: 'Les bons acteurs, un canal que l’attaquant ne peut pas lire, et une trace de chaque décision : la crise est organisée.', suite: 'rancon' },
            { t: 'Je réunis uniquement l’équipe informatique ; la direction sera informée demain.', note: 'ok', fb: 'Une crise cyber est d’abord une crise d’entreprise : sans la direction, ni décisions métier, ni arbitrages, ni obligations légales gérées à temps.', suite: 'rancon' },
            { t: 'J’envoie un mail et une invitation Teams à toute l’équipe de direction.', note: 'bad', fb: 'L’attaquant contrôle peut-être la messagerie : il lirait vos échanges de crise en direct.', suite: 'rancon' }
          ]
        },
        rancon: {
          etape: 'La note de rançon',
          texte: '<p>La note réclame <strong>500 000 €</strong> en cryptomonnaie sous 72 heures, sinon les données volées seront publiées. Un échantillon de fichiers RH est joint comme preuve.</p>',
          contexte: {
            type: 'console', titre: 'LISEZ-MOI.txt',
            contenu:
              '<span class="c-bad">Vos fichiers sont chiffrés et 412 Go de données ont été copiés.</span>\n' +
              'Payez 500 000 € avant 72 h ou tout sera publié sur notre blog.\n' +
              'Ne contactez pas la police. N’essayez pas de restaurer vos fichiers.'
          },
          choix: [
            { t: 'Pas de paiement : dépôt de plainte, contact du CERT-FR ou d’un prestataire de réponse à incident, et évaluation de l’exfiltration.', note: 'best', fb: 'C’est la recommandation des autorités. Un accompagnement expert est essentiel, et il faut savoir précisément ce qui a été volé.', suite: 'restauration' },
            { t: 'Ouvrir un dialogue avec les attaquants pour gagner du temps, avec l’aide d’experts.', note: 'ok', fb: 'Cela se pratique parfois avec des spécialistes, mais ne doit pas retarder la plainte, la réponse à incident et la restauration.', suite: 'restauration' },
            { t: 'Payer rapidement pour récupérer les données au plus vite.', note: 'bad', fb: 'Aucune garantie : déchiffreur partiel ou défaillant, données publiées quand même, et l’entreprise sera identifiée comme payeuse et à nouveau ciblée.', suite: 'restauration' }
          ]
        },
        restauration: {
          etape: 'Les sauvegardes',
          texte: '<p>L’équipe fait le point sur les sauvegardes :</p>',
          contexte: {
            type: 'doc', titre: 'État des sauvegardes',
            contenu: '<ul class="mb-0"><li>❌ NAS de sauvegarde en ligne : <strong>chiffré</strong> par l’attaquant.</li><li>✅ Bandes hors ligne de dimanche dernier (J-5) : <strong>intactes</strong>.</li><li>✅ Copie cloud immuable quotidienne (J-1) : <strong>intacte</strong>.</li></ul>'
          },
          choix: [
            { t: 'Restaurer depuis les copies saines dans un environnement reconstruit, après avoir fermé le vecteur d’entrée et purgé les persistances, en commençant par les services critiques.', note: 'best', badge: 'gardien', fb: 'C’est la méthode : restaurer sur une base assainie, sinon l’attaquant chiffre à nouveau. La priorisation suit le PCA/BIA.', suite: 'rgpd' },
            { t: 'Rechercher d’abord un déchiffreur gratuit (projet No More Ransom) avant toute restauration.', note: 'ok', fb: 'Vérifier l’existence d’un déchiffreur est utile, mais ne doit pas bloquer le plan de reprise alors que des sauvegardes saines existent.', suite: 'rgpd' },
            { t: 'Restaurer immédiatement les sauvegardes sur les serveurs existants pour redémarrer au plus vite.', note: 'bad', fb: 'Les serveurs sont toujours compromis : l’attaquant y a encore ses accès et chiffrera les données restaurées.', suite: 'rgpd' }
          ]
        },
        rgpd: {
          etape: 'Les données personnelles',
          texte: '<p>L’analyse confirme que des <strong>données RH ont été exfiltrées</strong> : salaires, RIB et numéros de sécurité sociale de 250 salariés. Vous en avez la certitude depuis ce matin, 9 h.</p>',
          choix: [
            { t: 'Notifier la CNIL dans les 72 h (quitte à compléter ensuite) et informer les salariés concernés, vu le risque élevé.', note: 'best', fb: 'Exact : articles 33 et 34 du RGPD. La notification peut être faite par étapes, et les salariés doivent être prévenus pour se protéger (fraudes, phishing ciblé).', suite: 'presse' },
            { t: 'Notifier la CNIL, mais ne pas informer les salariés pour éviter la panique.', note: 'ok', fb: 'Avec des RIB et numéros de sécurité sociale, le risque est élevé : l’information des personnes est obligatoire et leur permet de se protéger.', suite: 'presse' },
            { t: 'Attendre la fin de l’enquête pour notifier, afin d’avoir toutes les informations.', note: 'bad', fb: 'Le délai de 72 h court dès la prise de connaissance. Une notification initiale incomplète vaut mieux qu’une notification hors délai.', suite: 'presse' }
          ]
        },
        presse: {
          etape: 'Le journaliste',
          texte: '<p>Un journaliste de la presse régionale appelle : « On parle d’une cyberattaque chez NovaTech, vous confirmez ? »</p>',
          choix: [
            { t: 'Je l’oriente vers un message factuel validé par la cellule de crise : incident confirmé, mesures prises, prochaine communication annoncée.', note: 'best', fb: 'Transparence maîtrisée : on confirme les faits sans spéculer ni donner d’informations utiles à l’attaquant.', suite: 'continuite' },
            { t: 'Je le renvoie vers le service communication, qui n’a pas encore préparé de message.', note: 'ok', fb: 'Renvoyer vers la communication est correct, mais un message d’attente aurait dû être préparé dès le début de la crise.', suite: 'continuite' },
            { t: 'Je démens : « Il ne s’agit que d’une simple panne informatique. »', note: 'bad', fb: 'Les attaquants publieront peut-être les données : un démenti contredit par les faits détruit durablement la confiance.', suite: 'continuite' }
          ]
        },
        continuite: {
          etape: 'La continuité d’activité',
          texte: '<p>La production est à l’arrêt depuis 36 heures. Des clients importants attendent leurs commandes, et la direction s’inquiète.</p>',
          choix: [
            { t: 'J’active les modes dégradés du PCA (procédures papier, priorisation des activités critiques) et je fais prévenir les clients clés.', note: 'best', fb: 'Le PCA permet de maintenir l’essentiel pendant la restauration, et informer les clients préserve la relation de confiance.', suite: 'retex' },
            { t: 'Je laisse tout à l’arrêt jusqu’à la restauration complète.', note: 'ok', fb: 'Prudent pour le SI, mais coûteux pour l’entreprise : des modes dégradés auraient permis de poursuivre les activités critiques.', suite: 'retex' },
            { t: 'Je fais redémarrer tous les services d’un coup, au plus vite.', note: 'bad', fb: 'Redémarrer sans priorisation ni vérification risque de remettre en ligne des systèmes encore compromis.', suite: 'retex' }
          ]
        },
        retex: {
          etape: 'Après la crise',
          texte: '<p>Trois semaines plus tard, l’activité a repris. L’enquête montre que l’accès initial venait d’un phishing ouvert par un commercial, suivi d’une élévation de privilèges sur un compte admin sans MFA.</p>',
          choix: [
            { t: 'J’organise un RETEX sans recherche de coupable et je fais valider un plan d’action financé : MFA généralisée, EDR, sauvegardes immuables, segmentation, exercices de crise.', note: 'best', fb: 'Le RETEX transforme la crise en progrès. Un plan priorisé et financé par la direction corrige les causes profondes.', suite: 'fin' },
            { t: 'J’achète un nouveau pare-feu de dernière génération et je clos le dossier.', note: 'ok', fb: 'Un outil seul ne corrige pas les causes (MFA absente, privilèges excessifs, sensibilisation) : sans plan global, l’incident peut se reproduire.', suite: 'fin' },
            { t: 'Je demande le licenciement du commercial qui a ouvert le mail.', note: 'bad', fb: 'Punir crée une culture de la peur : les salariés cesseront de signaler leurs erreurs. Le vrai problème est l’absence de défense en profondeur.', suite: 'fin' }
          ]
        },
        fin: {
          fin: 'auto',
          succes: { titre: 'Crise surmontée', texte: 'NovaTech a redémarré sans payer de rançon, a respecté ses obligations légales et sort de la crise plus solide. Félicitations : vous avez gravi tous les échelons, du stagiaire au RSSI !' },
          partiel: { titre: 'Une crise qui laisse des traces', texte: 'L’entreprise a survécu, mais certaines décisions ont aggravé les pertes, les risques juridiques ou la perte de confiance. Revoyez le cours sur la gestion de crise et retentez votre chance.' }
        }
      }
    }
  ]
};
