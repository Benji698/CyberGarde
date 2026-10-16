/* Données des simulateurs du parcours salarié.
   Les noms de domaine piégés sont fictifs et uniquement affichés (aucun lien réel). */
window.DATA_SALARIES_SIMS = {
  liste: [
    { id: 'indices', titre: 'Chasse aux indices', resume: 'Repérez les indices dans un faux mail.' },
    { id: 'vraifaux', titre: 'Vrai ou piège ?', resume: 'Classez des messages et des liens.' },
    { id: 'appel', titre: 'Le coup de fil', resume: 'Déjouez un appel frauduleux.' }
  ],

  /* ---------- Simulateur 1 : chasse aux indices ---------- */
  mails: [
    {
      id: 'm365',
      titre: 'Mail n°1 — Expiration du mot de passe',
      fromHtml: '<span class="clue" data-clue="exp">Service Microsoft 365 &lt;securite@micros0ft-support365.com&gt;</span>',
      to: 'vous@monentreprise.fr',
      date: 'Aujourd\'hui, 08:47',
      sujet: '<span class="clue" data-clue="urgence">⚠ ACTION REQUISE : votre mot de passe expire dans 24 heures</span>',
      corps:
        '<p><span class="clue" data-clue="salut">Cher utilisateur,</span></p>' +
        '<p>Nous avons détecté que le mot de passe de votre compte professionnel arrive à expiration. Pour continuer à accéder à vos mails et à vos fichiers, vous devez le confirmer dès maintenant.</p>' +
        '<p style="margin:20px 0"><a class="clue fake-btn" data-clue="lien" data-url="http://m365-verification-compte.xyz/login?id=8842" href="#">Conserver mon mot de passe actuel</a></p>' +
        '<p><span class="clue" data-clue="menace">Sans action de votre part, votre compte sera désactivé et toutes vos données seront supprimées définitivement.</span></p>' +
        '<p>Cordialement,<br>L\'équipe de sécurité Microsoft</p>',
      pj: null,
      clues: {
        exp: { titre: 'Adresse de l\'expéditeur', explication: '« micros0ft » s\'écrit avec un zéro, et le domaine n\'appartient pas à Microsoft. Le nom affiché (« Service Microsoft 365 ») ne prouve rien : seule l\'adresse complète compte.' },
        urgence: { titre: 'Urgence dans l\'objet', explication: 'Majuscules, émoji d\'alerte et délai de 24 h : le but est de vous faire agir dans la précipitation, sans réfléchir.' },
        salut: { titre: 'Formule impersonnelle', explication: '« Cher utilisateur » : le message est envoyé en masse. Un service interne connaît votre nom.' },
        lien: { titre: 'Lien frauduleux', explication: 'Survolez le bouton : il mène vers « m365-verification-compte.xyz », un site qui n\'a rien à voir avec Microsoft. C\'est une fausse page de connexion qui vole les identifiants.' },
        menace: { titre: 'Menace disproportionnée', explication: 'La suppression « définitive » de toutes vos données est une menace destinée à faire peur. Un vrai service n\'agit jamais ainsi.' }
      }
    },
    {
      id: 'facture',
      titre: 'Mail n°2 — Relance de facture',
      fromHtml: 'Service Comptabilité – Bureau Plus <span class="clue" data-clue="exp">&lt;compta.bureauplus@gmail-factures.net&gt;</span>',
      to: 'vous@monentreprise.fr',
      date: 'Hier, 17:52',
      sujet: 'RE: Facture N°48213 – <span class="clue" data-clue="urgence">RELANCE FINALE avant pénalités</span>',
      corps:
        '<p>Bonjour,</p>' +
        '<p>Sauf erreur de notre part, la facture N°48213 reste impayée à ce jour. Vous trouverez le document en pièce jointe.</p>' +
        '<p><span class="clue" data-clue="rib">Attention : suite à un changement de banque, merci d\'utiliser exclusivement le nouveau RIB indiqué dans la facture.</span></p>' +
        '<p><span class="clue" data-clue="macro">Si le document ne s\'affiche pas correctement, cliquez sur « Activer le contenu ».</span></p>' +
        '<p>À défaut de règlement sous 48 h, des pénalités de retard de 15 % seront appliquées.</p>' +
        '<p>Bien à vous,<br>Le service comptabilité</p>',
      pj: { nom: 'Facture_48213.pdf.exe', clue: 'pj' },
      clues: {
        exp: { titre: 'Adresse de l\'expéditeur', explication: 'Le nom « Bureau Plus » semble familier, mais l\'adresse utilise un domaine étrange (« gmail-factures.net ») qui n\'est pas celui du fournisseur.' },
        urgence: { titre: 'Pression et pénalités', explication: '« Relance finale », délai de 48 h, pénalités de 15 % : tout est fait pour vous presser.' },
        rib: { titre: 'Changement de RIB', explication: 'Un changement de coordonnées bancaires annoncé par mail est un signal d\'alerte majeur (fraude au faux RIB). Il doit toujours être vérifié par téléphone, au numéro connu du fournisseur.' },
        macro: { titre: '« Activer le contenu »', explication: 'Activer le contenu (les macros) d\'un document permet d\'exécuter du code malveillant sur votre ordinateur. Ne le faites jamais pour un document reçu par mail.' },
        pj: { titre: 'Double extension', explication: '« .pdf.exe » : ce n\'est pas un PDF mais un programme exécutable déguisé. L\'ouvrir installerait un logiciel malveillant.' }
      }
    }
  ],

  /* ---------- Simulateur 2 : vrai ou piège ? ---------- */
  vraifaux: [
    {
      type: 'sms', expediteur: '+33 7 56 12 98 44',
      contenu: 'Votre colis n°FR8822 est en attente. Des frais de réexpédition de 1,99 € sont requis : https://colis-suivi-fr.info/paiement',
      piege: true,
      explication: 'Le transporteur n\'écrit pas depuis un numéro de portable, et le lien ne mène pas vers son site officiel. Les frais minimes servent à voler votre carte bancaire.'
    },
    {
      type: 'url',
      contenu: 'https://www.impots.gouv.fr/accueil',
      piege: false,
      explication: 'Le domaine est bien « impots.gouv.fr », le site officiel de l\'administration fiscale. Les sites officiels de l\'administration se terminent par « .gouv.fr ».'
    },
    {
      type: 'url',
      contenu: 'https://www.impots.gouv.fr.remboursement-dossier.com/connexion',
      piege: true,
      explication: 'Piège du sous-domaine : le vrai site est « remboursement-dossier.com ». « impots.gouv.fr » n\'est qu\'un leurre placé au début de l\'adresse.'
    },
    {
      type: 'mail', expediteur: 'Service informatique <support@monentreprise.fr>', objet: 'Maintenance du réseau samedi',
      contenu: 'Bonjour à tous, une maintenance du réseau aura lieu samedi de 8 h à 12 h. Aucune action n\'est requise de votre part. Bon week-end, l\'équipe informatique.',
      piege: false,
      explication: 'Adresse interne cohérente, aucune demande, aucun lien, aucune pièce jointe, aucune urgence : c\'est un message d\'information légitime.'
    },
    {
      type: 'sms', expediteur: 'AMELI',
      contenu: 'Votre carte Vitale arrive à expiration. Renouvelez-la avant le 31/10 pour conserver vos remboursements : http://ameli-renouvellement-carte.com',
      piege: true,
      explication: 'La carte Vitale n\'a pas de date d\'expiration à renouveler en ligne, et le lien ne pointe pas vers ameli.fr. Le nom d\'expéditeur d\'un SMS peut être falsifié.'
    },
    {
      type: 'url',
      contenu: 'https://www.paypa1.com/signin',
      piege: true,
      explication: 'Regardez bien : « paypa1 » avec le chiffre 1 à la place du « l ». C\'est du typosquatting, une adresse qui imite une marque connue.'
    },
    {
      type: 'sms', expediteur: 'MaBanque',
      contenu: 'Votre code de validation pour l\'ajout d\'un bénéficiaire est 482913. Ne le communiquez jamais, même à un conseiller.',
      piege: false,
      explication: 'Ce SMS ne contient ni lien ni demande : il est légitime si c\'est bien vous qui venez d\'ajouter un bénéficiaire. Si ce n\'est pas le cas, quelqu\'un tente d\'utiliser votre compte : appelez votre banque.'
    },
    {
      type: 'mail', expediteur: 'Service Clients <gagnant@promo-mega-jeu.shop>', objet: '🎉 Félicitations, vous avez gagné un smartphone !',
      contenu: 'Vous avez été tiré au sort parmi nos clients fidèles ! Pour recevoir votre cadeau, payez seulement les frais de port (2 €) avant ce soir minuit.',
      piege: true,
      explication: 'Un gain inattendu à un jeu auquel vous n\'avez pas participé, des frais à payer et un délai très court : c\'est une arnaque classique.'
    },
    {
      type: 'url',
      contenu: 'https://login.microsoftonline.com/',
      piege: false,
      explication: '« microsoftonline.com » est bien un domaine officiel de Microsoft, utilisé pour se connecter à Microsoft 365. Dans le doute, tapez vous-même l\'adresse du service.'
    },
    {
      type: 'sms', expediteur: '+33 6 44 87 21 09',
      contenu: 'Coucou maman, j\'ai cassé mon téléphone, c\'est mon nouveau numéro. Tu peux m\'écrire sur WhatsApp ? J\'ai un souci urgent.',
      piege: true,
      explication: 'L\'arnaque « Coucou maman » : l\'escroc se fait passer pour un proche puis demande de l\'argent en urgence. Appelez votre proche sur son ancien numéro pour vérifier.'
    }
  ],

  /* ---------- Simulateur 3 : le coup de fil ---------- */
  appels: [
    {
      id: 'support',
      titre: 'Le faux support informatique',
      appelant: 'Kévin — Support informatique',
      numero: '01 84 60 22 17',
      initiales: 'K',
      debut: 'a1',
      noeuds: {
        a1: {
          dit: 'Bonjour, c\'est Kévin du support informatique. On détecte une activité suspecte sur votre compte, il faut agir vite. Vous pouvez me confirmer votre identifiant de connexion ?',
          choix: [
            { t: 'Bien sûr, c\'est prenom.nom.', note: 'bad', fb: 'Donner son identifiant facilite le travail de l\'escroc : il ne lui manque plus que le mot de passe ou le code de validation.', suite: 'a2' },
            { t: 'Pouvez-vous me donner votre nom complet ? Je vais rappeler le support au numéro interne habituel.', note: 'best', fb: 'Excellent réflexe : vous reprenez le contrôle en rappelant vous-même un numéro connu.', suite: 'a3' },
            { t: 'Ah bon ? C\'est grave ?', note: 'ok', fb: 'Vous ne donnez rien, mais vous laissez l\'appelant mener la conversation et faire monter la pression.', suite: 'a4' }
          ]
        },
        a2: {
          dit: 'Parfait, merci. Je vais vous envoyer un code par SMS : lisez-le-moi pour que je sécurise votre compte.',
          choix: [
            { t: 'D\'accord, le code est 739 204.', note: 'bad', fb: 'Le code reçu par SMS est la clé de votre compte : l\'escroc vient de s\'y connecter.', suite: 'fin_mauvais' },
            { t: 'Un code de validation ne se communique jamais. Je raccroche et j\'appelle le support.', note: 'best', fb: 'Bien rattrapé ! Signalez quand même avoir donné votre identifiant.', suite: 'fin_moyen' }
          ]
        },
        a3: {
          dit: 'Euh… on n\'a pas le temps pour ça, c\'est très urgent. Votre responsable est au courant, il m\'a dit que vous coopéreriez.',
          choix: [
            { t: 'Dans ce cas, je vais aussi l\'appeler. Je raccroche et je contacte le support moi-même.', note: 'best', fb: 'Parfait : invoquer l\'urgence et un supérieur sont deux techniques de manipulation. Vous ne cédez sur rien.', suite: 'fin_bon' },
            { t: 'Ah, si mon responsable est au courant… Que dois-je faire ?', note: 'bad', fb: 'L\'argument d\'autorité a fonctionné. Un vrai technicien accepte toujours que vous vérifiiez son identité.', suite: 'a4' }
          ]
        },
        a4: {
          dit: 'C\'est très grave : si on n\'agit pas dans les 5 minutes, vos fichiers vont être chiffrés. Installez simplement le logiciel que je vous envoie par mail, je m\'occupe du reste.',
          choix: [
            { t: 'D\'accord, je l\'installe tout de suite.', note: 'bad', fb: 'Ce logiciel de prise en main à distance donne à l\'escroc le contrôle total de votre ordinateur.', suite: 'fin_mauvais' },
            { t: 'Je n\'installe rien. Je raccroche et je préviens le service informatique.', note: 'best', fb: 'Bonne décision : aucun technicien ne vous fera installer un logiciel sous la pression d\'un appel.', suite: 'fin_moyen' }
          ]
        },
        fin_bon: { fin: 'bon', titre: 'Arnaque déjouée !', texte: 'Vous avez rappelé le vrai support : personne ne s\'appelle Kévin dans l\'équipe. Grâce à votre signalement, l\'IT prévient tous les collègues de cette tentative.' },
        fin_moyen: { fin: 'moyen', titre: 'Arnaque évitée de justesse', texte: 'Vous avez fini par raccrocher, mais l\'appelant a obtenu des informations ou a eu le temps de vous mettre la pression. Le bon réflexe dès le début : raccrocher et rappeler un numéro connu.' },
        fin_mauvais: { fin: 'mauvais', titre: 'Compte compromis', texte: 'L\'escroc a pris le contrôle de votre compte ou de votre poste. Il faut maintenant prévenir l\'IT en urgence, déconnecter le poste du réseau et changer vos mots de passe.' }
      }
    },
    {
      id: 'pdg',
      titre: 'L\'appel du « PDG »',
      appelant: 'Marc Lefèvre — PDG (numéro inconnu)',
      numero: '+44 20 7946 0321',
      initiales: 'ML',
      debut: 'b1',
      noeuds: {
        b1: {
          dit: 'Bonjour, c\'est Marc Lefèvre. Je suis à Londres pour une acquisition confidentielle. J\'ai besoin que vous fassiez un virement de 48 000 € aujourd\'hui. Mon avocat va vous envoyer les coordonnées.',
          choix: [
            { t: 'Bien sûr, monsieur, je m\'en occupe.', note: 'bad', fb: 'L\'autorité et l\'urgence ont fonctionné. Un numéro étranger inconnu et une demande inhabituelle doivent alerter.', suite: 'b2' },
            { t: 'Je dois appliquer la procédure : double validation et contre-appel sur votre numéro habituel.', note: 'best', fb: 'Parfait : la procédure s\'applique à tout le monde, y compris au PDG.', suite: 'b3' },
            { t: 'Pourquoi m\'appeler moi, et pas le directeur financier ?', note: 'ok', fb: 'Bonne intuition, mais une question ne suffit pas : l\'escroc a toujours une réponse prête.', suite: 'b4' }
          ]
        },
        b2: {
          dit: 'Parfait. Surtout, n\'en parlez à personne, pas même à votre responsable : l\'opération est soumise au secret boursier.',
          choix: [
            { t: 'Entendu, je garde ça pour moi.', note: 'bad', fb: 'Le secret isole la victime pour empêcher toute vérification. C\'est le cœur de l\'arnaque.', suite: 'fin_mauvais' },
            { t: 'Une demande de secret est justement un signal d\'alerte. Je vais en parler à ma responsable.', note: 'best', fb: 'Bien rattrapé : en parler à quelqu\'un casse le piège.', suite: 'fin_moyen' }
          ]
        },
        b3: {
          dit: 'Vous ne me faites pas confiance ? Si l\'opération échoue à cause de vous, vous en porterez la responsabilité.',
          choix: [
            { t: 'Je suis désolé, je fais le virement tout de suite.', note: 'bad', fb: 'La culpabilisation est une technique de manipulation. Un vrai dirigeant ne reprochera jamais à un salarié d\'appliquer la procédure.', suite: 'fin_mauvais' },
            { t: 'La procédure s\'applique à tout le monde. Je vous rappelle sur votre numéro habituel.', note: 'best', fb: 'Excellent : vous restez ferme malgré la pression.', suite: 'fin_bon' }
          ]
        },
        b4: {
          dit: 'Il est en congés, et le dossier est trop sensible. Je vous fais confiance à vous, vous êtes quelqu\'un de fiable.',
          choix: [
            { t: 'Merci de votre confiance. Que dois-je faire ?', note: 'bad', fb: 'La flatterie est une arme de l\'ingénierie sociale : elle vous rend moins méfiant.', suite: 'b2' },
            { t: 'Je préfère appliquer la procédure et faire un contre-appel.', note: 'best', fb: 'Très bien : vous ne vous laissez pas flatter.', suite: 'fin_bon' }
          ]
        },
        fin_bon: { fin: 'bon', titre: 'Fraude déjouée !', texte: 'Vous avez rappelé Marc Lefèvre sur son numéro habituel : il était dans son bureau et n\'a jamais demandé de virement. L\'entreprise vient d\'éviter de perdre 48 000 €.' },
        fin_moyen: { fin: 'moyen', titre: 'Fraude évitée de justesse', texte: 'En parlant à votre responsable, vous avez cassé le piège. Retenez les signaux dès le premier échange : autorité, urgence, confidentialité, numéro inconnu.' },
        fin_mauvais: { fin: 'mauvais', titre: 'Virement frauduleux', texte: 'Les 48 000 € sont partis vers un compte à l\'étranger. Il faut alerter immédiatement la banque (un rappel des fonds est parfois possible dans les premières heures), la direction, puis porter plainte.' }
      }
    }
  ]
};
