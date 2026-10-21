/* QCM « bon réflexe » — parcours salariés (phishing & ingénierie sociale) */
window.DATA_SALARIES_QUIZ = [
  {
    situation: 'Vous recevez un mail de « Service Informatique » vous demandant de confirmer votre mot de passe sous 24 h, sinon votre compte sera bloqué.',
    choix: [
      { t: 'Je clique sur le lien et je confirme mon mot de passe pour éviter le blocage.', ok: false },
      { t: 'Je réponds au mail en demandant s\'il est vraiment légitime.', ok: false },
      { t: 'Je ne clique pas, je signale le mail au service informatique par un canal habituel.', ok: true },
      { t: 'Je le supprime sans rien dire à personne.', ok: false }
    ],
    explication: 'Un service informatique ne demande jamais votre mot de passe. L\'urgence et la menace de blocage sont des techniques classiques de pression. Répondre au mail revient à parler à l\'attaquant ; le supprimer sans signaler empêche l\'IT de protéger vos collègues qui ont sans doute reçu le même.'
  },
  {
    situation: 'Votre directeur vous écrit depuis une adresse Gmail : il est en déplacement, a besoin d\'un virement urgent et confidentiel à un nouveau fournisseur, et vous demande de ne pas en parler.',
    choix: [
      { t: 'J\'effectue le virement, c\'est mon directeur et il est pressé.', ok: false },
      { t: 'Je le rappelle sur son numéro habituel (pas celui du mail) et j\'applique la procédure de validation des virements.', ok: true },
      { t: 'Je lui réponds par mail pour lui demander confirmation.', ok: false }
    ],
    explication: 'C\'est l\'« arnaque au président » (FOVI) : urgence + confidentialité + changement inhabituel = alerte rouge. Répondre au mail ne sert à rien puisque c\'est l\'escroc qui le lit. Seul un contre-appel sur un numéro connu et le respect de la procédure interne protègent l\'entreprise.'
  },
  {
    situation: 'Un SMS vous informe qu\'un colis est en attente et qu\'il faut payer 1,99 € de frais de réexpédition via un lien.',
    choix: [
      { t: 'Je paie, le montant est faible.', ok: false },
      { t: 'Je ne clique pas. Si j\'attends un colis, je vérifie son suivi sur le site officiel du transporteur, et je signale le SMS au 33700.', ok: true },
      { t: 'Je clique juste pour voir, sans rien remplir.', ok: false }
    ],
    explication: 'Le faible montant sert à récupérer vos coordonnées bancaires, qui seront ensuite utilisées pour des achats bien plus importants. Même un simple clic peut vous exposer (site piégé, confirmation que votre numéro est actif). Le 33700 est le service officiel de signalement des SMS et appels indésirables.'
  },
  {
    situation: 'Une personne appelle en se présentant comme technicien Microsoft : votre ordinateur serait infecté et il vous demande d\'installer un logiciel pour qu\'il prenne la main à distance.',
    choix: [
      { t: 'J\'installe le logiciel, il a l\'air de s\'y connaître.', ok: false },
      { t: 'Je raccroche et je préviens mon service informatique.', ok: true },
      { t: 'Je lui demande son nom et son matricule, puis je le laisse faire.', ok: false }
    ],
    explication: 'Microsoft (comme les autres éditeurs) n\'appelle jamais spontanément les utilisateurs. Un logiciel de prise en main à distance donne à l\'escroc un accès complet à votre poste. Un nom et un matricule s\'inventent facilement : ils ne prouvent rien.'
  },
  {
    situation: 'Vous trouvez une clé USB sur le parking de l\'entreprise, avec l\'étiquette « Salaires 2026 ».',
    choix: [
      { t: 'Je la branche pour retrouver son propriétaire.', ok: false },
      { t: 'Je la remets au service informatique sans la brancher.', ok: true },
      { t: 'Je la branche sur un ordinateur personnel, pas sur celui du travail.', ok: false }
    ],
    explication: 'Abandonner des clés USB piégées est une technique d\'attaque réelle (« USB drop »). L\'étiquette attrayante pousse à la curiosité. Brancher la clé, même sur un ordinateur personnel, peut l\'infecter instantanément. Le service informatique saura l\'analyser en sécurité.'
  },
  {
    situation: 'Vous venez de cliquer sur un lien dans un mail et de saisir votre identifiant et votre mot de passe sur une page… puis vous vous rendez compte que l\'adresse du site était bizarre.',
    choix: [
      { t: 'Je ne dis rien, j\'ai honte et ce n\'est probablement pas grave.', ok: false },
      { t: 'Je change immédiatement mon mot de passe (depuis le vrai site) et je préviens le service informatique.', ok: true },
      { t: 'Je supprime le mail pour effacer les traces.', ok: false }
    ],
    explication: 'Tout le monde peut se faire piéger : l\'important est de réagir vite. Changer le mot de passe coupe l\'accès à l\'attaquant, et prévenir l\'IT lui permet de vérifier si le compte a été utilisé. Supprimer le mail fait disparaître des indices utiles à l\'enquête.'
  },
  {
    situation: 'Un mail d\'un fournisseur habituel annonce un changement de coordonnées bancaires (nouveau RIB en pièce jointe) pour les prochaines factures.',
    choix: [
      { t: 'Je mets à jour le RIB dans notre logiciel comptable.', ok: false },
      { t: 'Je contacte le fournisseur par téléphone, au numéro que nous avons déjà dans nos dossiers, pour vérifier.', ok: true },
      { t: 'J\'appelle le numéro indiqué dans la signature du mail.', ok: false }
    ],
    explication: 'C\'est la fraude au changement de RIB, très répandue. La boîte mail du fournisseur peut avoir été piratée, ou l\'adresse imitée. Le numéro présent dans le mail peut être celui de l\'escroc : vérifiez toujours via un contact déjà connu.'
  },
  {
    situation: 'Sur LinkedIn, un recruteur inconnu très enthousiaste vous envoie une offre d\'emploi en pièce jointe au format .zip.',
    choix: [
      { t: 'J\'ouvre le fichier, c\'est peut-être une belle opportunité.', ok: false },
      { t: 'Je n\'ouvre pas l\'archive, je vérifie le profil et l\'entreprise par moi-même.', ok: true },
      { t: 'J\'ouvre le fichier sur mon ordinateur professionnel, il a un antivirus.', ok: false }
    ],
    explication: 'Les faux recruteurs sont une technique répandue pour diffuser des logiciels malveillants. Une archive .zip peut contenir un programme exécutable. Un antivirus ne détecte pas tout : la prudence reste la meilleure défense.'
  },
  {
    situation: 'Vous recevez un mail de votre collègue Julie avec une facture en pièce jointe « Facture_Urgente.pdf.exe ». Vous ne travaillez jamais avec elle sur la facturation.',
    choix: [
      { t: 'J\'ouvre la pièce jointe puisque je connais Julie.', ok: false },
      { t: 'Je contacte Julie par un autre moyen (téléphone, messagerie interne) pour vérifier, et je préviens l\'IT.', ok: true },
      { t: 'Je transfère le mail à toute l\'équipe pour demander si quelqu\'un est au courant.', ok: false }
    ],
    explication: 'La double extension « .pdf.exe » trahit un programme déguisé en document. La boîte de Julie a probablement été piratée. Transférer le mail à toute l\'équipe multiplie le risque que quelqu\'un l\'ouvre !'
  },
  {
    situation: 'Au restaurant, un QR code collé sur la table propose de payer l\'addition en ligne. L\'autocollant semble posé par-dessus un autre.',
    choix: [
      { t: 'Je scanne et je paie, c\'est pratique.', ok: false },
      { t: 'Je demande au personnel si ce QR code est bien le leur, ou je paie au comptoir.', ok: true }
    ],
    explication: 'C\'est du « quishing » : un faux QR code mène vers un site de paiement frauduleux. Un autocollant superposé est un signe typique. En cas de doute, demandez ou utilisez un autre moyen de paiement.'
  },
  {
    situation: 'Un inconnu en gilet de prestataire, les bras chargés de cartons, vous demande de lui tenir la porte d\'accès sécurisée des bureaux.',
    choix: [
      { t: 'Je lui tiens la porte, ce serait impoli de refuser.', ok: false },
      { t: 'Je lui propose de l\'accompagner à l\'accueil pour qu\'il soit enregistré.', ok: true },
      { t: 'Je lui prête mon badge pour qu\'il puisse revenir plus tard.', ok: false }
    ],
    explication: 'Le « tailgating » consiste à profiter de la politesse pour entrer dans des locaux protégés. Une fois à l\'intérieur, l\'intrus peut brancher du matériel ou voler des données. L\'accueil vérifiera son identité. Un badge est personnel et ne se prête jamais.'
  },
  {
    situation: 'Votre banque vous appelle : des opérations suspectes ont été détectées. Le conseiller vous demande le code reçu par SMS pour « annuler » les paiements.',
    choix: [
      { t: 'Je lui donne le code, il veut m\'aider.', ok: false },
      { t: 'Je raccroche et j\'appelle ma banque au numéro inscrit au dos de ma carte.', ok: true },
      { t: 'Je lui demande de me prouver qu\'il est de ma banque en me donnant mon solde.', ok: false }
    ],
    explication: 'C\'est la fraude au « faux conseiller » : le code SMS sert en réalité à valider un paiement ou un nouvel appareil. Votre banque ne vous demandera jamais ce code. L\'escroc peut connaître certaines informations sur vous (issues de fuites de données) : ce n\'est pas une preuve.'
  },
  {
    situation: 'Vous partagez sur les réseaux sociaux une photo de votre premier jour, avec votre badge d\'entreprise bien visible et votre écran en arrière-plan.',
    choix: [
      { t: 'Ce n\'est pas grave, tout le monde le fait.', ok: false },
      { t: 'Je retire la photo ou je la recadre : badge et écran ne doivent pas apparaître.', ok: true }
    ],
    explication: 'Un badge visible permet d\'en fabriquer une copie ; un écran peut révéler des noms d\'outils, de clients ou de collègues. Ces informations aident les attaquants à préparer un phishing très crédible (ingénierie sociale ciblée).'
  },
  {
    situation: 'Vous recevez pour la 5e fois en 2 minutes une notification sur votre téléphone vous demandant d\'approuver une connexion à votre compte, alors que vous n\'essayez pas de vous connecter.',
    choix: [
      { t: 'J\'approuve pour que les notifications s\'arrêtent.', ok: false },
      { t: 'Je refuse, je change mon mot de passe et je préviens l\'IT : quelqu\'un connaît mon mot de passe.', ok: true },
      { t: 'J\'ignore les notifications, elles finiront par s\'arrêter.', ok: false }
    ],
    explication: 'C\'est une attaque par « fatigue MFA » : l\'attaquant possède déjà votre mot de passe et espère que vous approuverez par lassitude. Refuser ne suffit pas : il faut changer le mot de passe et alerter, car l\'attaquant continuera.'
  },
  {
    situation: 'Un mail parfaitement rédigé, avec le logo et la signature de votre DRH, vous invite à consulter « votre nouvelle grille de primes » via un lien. En survolant le lien, l\'adresse affichée est « rh-entreprise-primes.com ».',
    choix: [
      { t: 'Le mail est sans faute et le logo est bon, je clique.', ok: false },
      { t: 'L\'adresse du lien ne correspond pas au domaine de l\'entreprise : je ne clique pas et je signale.', ok: true },
      { t: 'Je clique, mais je ne saisirai rien si la page me paraît bizarre.', ok: false }
    ],
    explication: 'Les phishings modernes, souvent rédigés avec l\'aide d\'outils d\'IA, sont sans fautes et reprennent logos et signatures. Le vrai indice est technique : le lien ne pointe pas vers le domaine officiel. Survoler un lien avant de cliquer est un réflexe essentiel.'
  },
  {
    situation: 'Vous devez créer un compte sur un nouvel outil de l\'entreprise. Quel mot de passe choisissez-vous ?',
    choix: [
      { t: 'Le même que pour ma messagerie : je suis sûr de m\'en souvenir.', ok: false },
      { t: 'Le prénom de mon fils suivi de son année de naissance et d\'un point d\'exclamation.', ok: false },
      { t: 'Un mot de passe unique et long, créé et retenu par le gestionnaire de mots de passe.', ok: true }
    ],
    explication: 'Réutiliser un mot de passe permet à un escroc d\'ouvrir tous vos comptes dès qu\'un seul site fuit. Les prénoms et dates se trouvent facilement sur les réseaux sociaux. Un gestionnaire crée un mot de passe différent et robuste pour chaque service, sans effort de mémoire.'
  },
  {
    situation: 'Vous partez en congés. Un collègue vous demande votre mot de passe pour pouvoir consulter vos dossiers pendant votre absence.',
    choix: [
      { t: 'Je le lui donne, c\'est un collègue de confiance.', ok: false },
      { t: 'Je refuse et je demande au service informatique de lui ouvrir l\'accès aux dossiers nécessaires.', ok: true },
      { t: 'Je l\'écris sur un post-it que je laisse dans mon tiroir.', ok: false }
    ],
    explication: 'Un mot de passe est strictement personnel : tout ce qui est fait avec votre compte vous est attribué. Le service informatique peut donner un accès propre aux dossiers partagés, sans qu\'il ait besoin de votre identité.'
  },
  {
    situation: 'Pour gagner du temps, vous voulez demander à une IA en ligne gratuite de résumer un contrat client confidentiel de 30 pages.',
    choix: [
      { t: 'Je copie-colle le contrat entier, c\'est plus rapide.', ok: false },
      { t: 'J\'utilise l\'outil d\'IA validé par l\'entreprise ou, à défaut, je le résume moi-même.', ok: true },
      { t: 'Je colle le contrat en retirant seulement le nom du client.', ok: false }
    ],
    explication: 'Ce que vous saisissez dans une IA publique quitte l\'entreprise et peut être conservé ou réutilisé. Retirer le nom ne suffit pas : montants, clauses et détails restent confidentiels. Seuls les outils validés par l\'entreprise offrent les garanties nécessaires.'
  },
  {
    situation: 'En visioconférence, votre directeur financier vous demande un virement urgent à un nouveau fournisseur. L\'image est un peu saccadée et il refuse que vous le rappeliez : « Pas le temps, je suis en réunion ».',
    choix: [
      { t: 'Je fais le virement : je le vois et je l\'entends, c\'est bien lui.', ok: false },
      { t: 'Je raccroche et je le rappelle sur son numéro habituel, puis j\'applique la procédure de validation.', ok: true },
      { t: 'Je lui demande d\'allumer mieux sa caméra, puis je fais le virement.', ok: false }
    ],
    explication: 'Les voix et les visages peuvent désormais être imités par l\'IA (deepfake). Urgence, demande inhabituelle et refus d\'être rappelé sont les signaux d\'une arnaque au président version moderne. Le contre-appel sur un numéro connu reste la meilleure parade.'
  },
  {
    situation: 'À la gare, vous devez envoyer un document de travail. Un réseau Wi-Fi « Gare_WiFi_Gratuit » est disponible, sans mot de passe.',
    choix: [
      { t: 'Je me connecte, c\'est pratique et gratuit.', ok: false },
      { t: 'J\'utilise le partage de connexion de mon téléphone, ou le VPN de l\'entreprise si je dois utiliser ce Wi-Fi.', ok: true }
    ],
    explication: 'Sur un Wi-Fi public, le trafic peut être espionné, et n\'importe qui peut créer un faux point d\'accès au nom rassurant. Le VPN chiffre vos échanges ; le partage de connexion évite le réseau partagé.'
  },
  {
    situation: 'En télétravail, votre fils vous demande d\'utiliser votre ordinateur professionnel pour faire ses devoirs et jouer un peu ensuite.',
    choix: [
      { t: 'J\'accepte pour les devoirs, mais pas pour les jeux.', ok: false },
      { t: 'Je refuse : l\'ordinateur professionnel est réservé au travail.', ok: true },
      { t: 'J\'accepte en restant à côté de lui.', ok: false }
    ],
    explication: 'Un téléchargement, un site piégé ou une fausse manipulation peuvent infecter l\'ordinateur, qui se reconnectera ensuite au réseau de l\'entreprise. Il donne aussi accès à des données confidentielles. Mieux vaut utiliser un appareil familial.'
  },
  {
    situation: 'Vendredi soir, vous voulez avancer sur un dossier ce week-end. Vous pensez envoyer le fichier clients sur votre adresse mail personnelle.',
    choix: [
      { t: 'Je l\'envoie, je le supprimerai lundi.', ok: false },
      { t: 'Je passe par les accès prévus par l\'entreprise (VPN, ordinateur professionnel) ou j\'attends lundi.', ok: true },
      { t: 'Je le copie sur une clé USB personnelle.', ok: false }
    ],
    explication: 'Une fois sur votre messagerie ou votre clé personnelle, les données sortent de l\'entreprise : elles ne sont plus protégées, ni sauvegardées, ni contrôlées. Avec des données clients, c\'est aussi une violation du RGPD.'
  },
  {
    situation: 'Vous venez d\'envoyer par erreur un tableau contenant les salaires de l\'équipe à un contact extérieur qui porte le même prénom qu\'un collègue.',
    choix: [
      { t: 'J\'envoie un mail au destinataire pour lui demander de le supprimer, et je n\'en parle à personne.', ok: false },
      { t: 'Je préviens immédiatement mon responsable et le service informatique ou le délégué à la protection des données.', ok: true },
      { t: 'Je ne fais rien, il ne l\'ouvrira sans doute pas.', ok: false }
    ],
    explication: 'C\'est une violation de données personnelles : l\'entreprise doit l\'évaluer et, si besoin, la notifier à la CNIL dans les 72 heures. Le signaler tout de suite permet parfois de rappeler le message et de limiter les conséquences. Le cacher aggrave la situation.'
  },
  {
    situation: 'À l\'aéroport, la batterie de votre téléphone professionnel est presque vide. Une borne propose des ports USB de recharge gratuits.',
    choix: [
      { t: 'J\'y branche mon téléphone avec mon câble.', ok: false },
      { t: 'J\'utilise mon propre chargeur sur une prise électrique, ou une batterie externe.', ok: true }
    ],
    explication: 'Un port USB transmet du courant mais aussi des données : une borne trafiquée peut tenter d\'accéder au téléphone. Une prise électrique avec votre propre chargeur ne présente pas ce risque.'
  },
  {
    situation: 'En lisant un article en ligne, une fenêtre s\'affiche : « Votre navigateur est obsolète ! Téléchargez la mise à jour de sécurité ».',
    choix: [
      { t: 'Je clique sur « Télécharger », les mises à jour sont importantes.', ok: false },
      { t: 'Je ferme la page et je vérifie les mises à jour dans les paramètres du navigateur ou auprès du service informatique.', ok: true }
    ],
    explication: 'Les fausses mises à jour sont un moyen classique d\'installer un logiciel malveillant. Les vraies mises à jour passent par les paramètres de l\'appareil ou par le service informatique, jamais par une fenêtre sur un site.'
  },
  {
    situation: 'Vous vous levez deux minutes pour aller chercher une impression. Votre messagerie est ouverte.',
    choix: [
      { t: 'Je verrouille ma session (Windows + L).', ok: true },
      { t: 'J\'éteins l\'écran.', ok: false },
      { t: 'Rien, je reviens tout de suite.', ok: false }
    ],
    explication: 'Quelques secondes suffisent pour envoyer un mail en votre nom ou brancher une clé. Éteindre l\'écran ne verrouille rien : il suffit de le rallumer. Le verrouillage doit devenir un automatisme.'
  }
];
