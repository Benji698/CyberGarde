/* Données des simulateurs du parcours salarié.
   Les noms de domaine piégés sont fictifs et uniquement affichés (aucun lien réel). */
window.DATA_SALARIES_SIMS = {
  liste: [
    { id: 'indices', titre: 'Chasse aux indices', resume: 'Repérez les indices dans un faux mail.' },
    { id: 'vraifaux', titre: 'Vrai ou piège ?', resume: 'Classez des messages et des liens.' },
    { id: 'appel', titre: 'Le coup de fil', resume: 'Déjouez un appel frauduleux.' },
    { id: 'boite', titre: 'Ma boîte mail', resume: 'Triez une boîte de réception réaliste.' }
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
      explication: 'Ce SMS vient d\'un numéro de portable ordinaire (+33 7…) : un vrai transporteur envoie ses SMS depuis un nom d\'expéditeur ou un numéro court, pas depuis le portable d\'un particulier. Et le lien ne mène pas vers son site officiel. Les frais minimes servent à voler votre carte bancaire.'
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
  ],

  /* ---------- Simulateur 4 : ma boîte mail ----------
     categorie : 'legit' (à traiter), 'phish' (à signaler), 'spam' (indésirable sans danger, à supprimer).
     Les liens ne mènent nulle part : leur adresse s'affiche seulement au survol (data-url). */
  boite: [
    {
      nom: 'Ressources humaines', adresse: 'rh@monentreprise.fr', heure: '08:12',
      objet: 'Campagne des entretiens annuels',
      apercu: 'Bonjour à toutes et à tous, la campagne des entretiens annuels débute le 3 novembre…',
      corps: '<p>Bonjour à toutes et à tous,</p><p>La campagne des entretiens annuels débute le 3 novembre. Votre responsable vous proposera un créneau dans les prochains jours.</p><p>Le support de préparation est disponible sur l\'intranet, rubrique « Ma carrière ».</p><p>Le service RH</p>',
      categorie: 'legit',
      explication: 'Adresse interne cohérente, aucune urgence, aucun lien ni pièce jointe : on vous renvoie simplement vers l\'intranet que vous connaissez. C\'est un message d\'information légitime.'
    },
    {
      nom: 'Administrateur messagerie', adresse: 'admin@monentreprise-mail.com', heure: '08:31',
      objet: 'Votre boîte aux lettres est pleine (98 %)',
      apercu: 'Vous ne pourrez bientôt plus recevoir de messages. Augmentez votre espace…',
      corps: '<p>Cher utilisateur,</p><p>Votre boîte aux lettres a atteint 98 % de sa capacité. Vous ne pourrez bientôt plus recevoir de messages.</p><p><a href="#" class="fake-btn" data-url="http://monentreprise-mail.com.quota-upgrade.top/owa/login">Augmenter mon espace gratuitement</a></p><p>Équipe Messagerie</p>',
      categorie: 'phish',
      explication: 'Le domaine « monentreprise-mail.com » n\'est pas celui de l\'entreprise, la formule « Cher utilisateur » est impersonnelle, et le lien mène vers « quota-upgrade.top ». C\'est une fausse page de connexion qui vole les mots de passe.'
    },
    {
      nom: 'Thomas Leroy', adresse: 'thomas.leroy@monentreprise.fr', heure: '09:05',
      objet: 'Compte rendu de la réunion de lundi',
      apercu: 'Salut, comme convenu, voici le compte rendu de lundi avec les actions de chacun…',
      corps: '<p>Salut,</p><p>Comme convenu en fin de réunion, voici le compte rendu de lundi avec les actions de chacun. Dis-moi si j\'ai oublié quelque chose de ton côté.</p><p>Bonne journée,<br>Thomas</p>',
      pj: 'CR_reunion_projet_Atlas.docx',
      categorie: 'legit',
      explication: 'Un collègue, son adresse interne, une pièce jointe attendue (il avait annoncé le compte rendu) et au format habituel : rien de suspect. Le contexte compte : vous attendiez ce document.'
    },
    {
      nom: 'DocuSign', adresse: 'dse@docusign-notification.net', heure: '09:47',
      objet: 'Document en attente de signature : Avenant_Contrat_2026.pdf',
      apercu: 'Vous avez reçu un document à examiner et à signer. Le lien expire dans 12 heures…',
      corps: '<p>Vous avez reçu un document à examiner et à signer.</p><p><strong>Avenant_Contrat_2026.pdf</strong><br>Le lien expire dans 12 heures.</p><p><a href="#" class="fake-btn" data-url="https://docusign-notification.net.secure-docs.click/review?doc=88421">EXAMINER LE DOCUMENT</a></p>',
      categorie: 'phish',
      explication: 'Vous n\'attendiez aucun avenant, le délai de 12 heures met la pression, et le lien mène vers « secure-docs.click ». Les faux services de signature électronique sont très utilisés pour voler des identifiants.'
    },
    {
      nom: 'Fournitures Pro', adresse: 'newsletter@fournitures-pro.fr', heure: '10:02',
      objet: '-30 % sur les fournitures de bureau cette semaine',
      apercu: 'Profitez de nos offres de rentrée sur les cahiers, stylos et classeurs…',
      corps: '<p>Profitez de nos offres de la semaine : -30 % sur les cahiers, stylos et classeurs.</p><p>Offre valable jusqu\'à dimanche sur notre site.</p><p><small>Vous recevez ce message car vous êtes inscrit à notre lettre d\'information. <a href="#" data-url="https://www.fournitures-pro.fr/desinscription">Se désinscrire</a></small></p>',
      categorie: 'spam',
      explication: 'Une simple publicité d\'un fournisseur auquel vous êtes abonné : ni demande de mot de passe, ni urgence, ni pièce jointe. Elle n\'est pas dangereuse, mais inutile pour votre travail : on la supprime (ou on se désinscrit).'
    },
    {
      nom: 'Colis Express', adresse: 'suivi@colis-express-livraison.info', heure: '10:26',
      objet: 'Échec de livraison de votre colis',
      apercu: 'Notre livreur n\'a pas pu remettre votre colis. Reprogrammez la livraison…',
      corps: '<p>Bonjour,</p><p>Notre livreur n\'a pas pu remettre votre colis n° CX-559201 en raison d\'une adresse incomplète.</p><p>Des frais de reprogrammation de 1,49 € sont nécessaires.</p><p><a href="#" class="fake-btn" data-url="http://colis-express-livraison.info/paiement-frais">Reprogrammer ma livraison</a></p>',
      categorie: 'phish',
      explication: 'Vous n\'attendez pas de colis au bureau, et les « petits frais » servent à voler votre carte bancaire. Le domaine en « .info » n\'est celui d\'aucun transporteur connu.'
    },
    {
      nom: 'Service informatique', adresse: 'support@monentreprise.fr', heure: '11:15',
      objet: 'Mises à jour Windows ce soir',
      apercu: 'Des mises à jour de sécurité seront installées ce soir à partir de 19 h…',
      corps: '<p>Bonjour,</p><p>Des mises à jour de sécurité seront installées ce soir à partir de 19 h. Merci d\'enregistrer vos documents et de laisser votre poste allumé et branché en partant.</p><p>Aucune autre action n\'est nécessaire. En cas de question : poste 4400.</p><p>Le service informatique</p>',
      categorie: 'legit',
      explication: 'Adresse interne, aucun lien, aucun identifiant demandé, un numéro de poste interne pour les questions : c\'est une consigne légitime du service informatique.'
    },
    {
      nom: 'Philippe Marchand', adresse: 'philippe.marchand.dg@gmail.com', heure: '11:48',
      objet: 'Es-tu disponible ?',
      apercu: 'J\'ai besoin d\'un petit service discret, réponds-moi vite stp…',
      corps: '<p>Bonjour,</p><p>Es-tu à ton bureau ? J\'ai besoin d\'un petit service discret pour un client, je suis en réunion et je ne peux pas téléphoner.</p><p>Réponds-moi vite stp.</p><p>Philippe Marchand<br>Directeur général<br><small>Envoyé depuis mon mobile</small></p>',
      categorie: 'phish',
      explication: 'Le directeur général qui écrit depuis une adresse Gmail, demande un service « discret » et ne peut pas téléphoner : c\'est le début classique d\'une arnaque au président (souvent pour des cartes cadeaux ou un virement). On ne répond pas et on signale.'
    },
    {
      nom: 'Comptabilité', adresse: 'compta@monentreprise.fr', heure: '14:20',
      objet: 'Votre note de frais de septembre est validée',
      apercu: 'Votre note de frais n° NF-2026-0917 a été validée. Le remboursement sera versé…',
      corps: '<p>Bonjour,</p><p>Votre note de frais n° NF-2026-0917 a été validée. Le remboursement sera versé avec votre prochain salaire.</p><p>Vous pouvez consulter le détail dans l\'application des notes de frais : <a href="#" data-url="https://intranet.monentreprise.fr/notes-de-frais">intranet.monentreprise.fr/notes-de-frais</a></p><p>Le service comptabilité</p>',
      categorie: 'legit',
      explication: 'Adresse interne, lien qui pointe bien vers l\'intranet de l\'entreprise (survolez-le pour vérifier), aucune information demandée. C\'est un message légitime.'
    },
    {
      nom: 'Salon Pro Expo', adresse: 'invitations@salon-pro-expo.com', heure: '16:03',
      objet: 'Invitation : Salon des professionnels du bureau, 12-14 mars',
      apercu: 'Découvrez plus de 200 exposants. Inscription gratuite sur notre site…',
      corps: '<p>Madame, Monsieur,</p><p>Nous avons le plaisir de vous inviter au Salon des professionnels du bureau, du 12 au 14 mars. Plus de 200 exposants vous y attendent.</p><p>Inscription gratuite sur notre site.</p><p><small>Pour ne plus recevoir nos invitations : <a href="#" data-url="https://www.salon-pro-expo.com/desabonnement">désabonnement</a></small></p>',
      categorie: 'spam',
      explication: 'Une invitation commerciale non sollicitée, sans demande d\'identifiant ni pièce jointe. Ce n\'est pas une attaque, simplement du courrier indésirable : on la supprime.'
    }
  ]
};
