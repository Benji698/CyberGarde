# Recherche : monétisation et règles Apple

> Document de référence lié au PLAN.md. Recherche du 2026-10-18. Règles Apple vérifiées sur developer.apple.com (App Review Guidelines du 16/10/2026, contrat DPLA du 13/10/2026). Pages Google AdMob non lues (résumés de recherche).


**Base :** App Review Guidelines, « Last Updated: October 16, 2026 » (mise à jour du 16 octobre 2026). Les changements d'octobre (2.3.14, 2.5.19) ne touchent ni les achats intégrés (IAP), ni les loot boxes, ni les pubs. Attention quand même à 2.5.19 : elle interdit d'activer après validation une fonction absente du build examiné. Ta boutique doit donc être dans la version envoyée à Apple.

## Règles Apple vérifiées
- **3.1.1 Achat intégré :** tout ce qui se débloque (monnaie, niveaux, version complète, donc aussi les cosmétiques) passe par l'IAP d'Apple (StoreKit). Pas de clé de licence, de QR code ni de code maison. Les cartes cadeaux passent aussi par l'IAP.
- **3.1.1 Monnaies et restauration :** une monnaie achetée n'expire jamais. Ajoute un bouton « Restaurer les achats ». Selon 3.2.1(iii), rien de ce qui est acheté n'expire (sauf une location). L'Ascension ne doit jamais effacer un achat.
- **3.1.1 Loot boxes (tirages au sort payants) :** les probabilités doivent s'afficher avant l'achat. Le butin gratuit (combats, forge) n'est pas concerné. Attention : si des gemmes payantes achètent ou accélèrent un tirage, ce tirage devient payant.
- **3.1.1 Pourboire et cadeaux :** autorisés.
- **3.1.2 Abonnements :** ils doivent apporter une valeur continue, durer au moins 7 jours et marcher sur tous les appareils. Le contrat Apple (Schedule 2 §3.8(b)) exige d'afficher le titre, la durée et le prix, avec des liens vers ta politique de confidentialité et tes conditions d'utilisation dans l'app. À éviter pour le MVP.
- **3.1.1(a) / 3.1.3 :** hors États-Unis, aucun lien ni bouton vers un autre moyen de paiement. En France, c'est l'IAP uniquement.
- **2.1(b) :** les IAP doivent être complets, visibles et fonctionnels pendant la review. **2.3.2 :** la fiche App Store dit ce qui est payant. **2.3.8 :** les icônes et captures des IAP doivent convenir à un public 4+.
- **2.3.7 / 2.3.14 :** 30 caractères maximum pour le nom. Jamais « Sword x Staff » ni un nom proche dans les métadonnées.
- **4.10 :** ne vends pas ce que le système offre déjà (notifications, sauvegarde iCloud).
- **Section 3 (intro) / 5.6 :** pas de prix « irrationnellement élevés », pas de piège pour pousser à l'achat.
- **3.2.2(x) / 5.6.1 :** jamais de récompense pour noter l'app. Pour demander un avis, utilise seulement l'outil d'Apple.
- **5.1.1 :** une politique de confidentialité est obligatoire, même sans pub. Mets son lien dans App Store Connect et dans l'app (une page GitHub Pages gratuite suffit). Selon 5.1.1(ii), un achat ne dépend jamais d'un consentement aux données.
- **5.1.2(i) :** aucun bonus pour accepter le suivi ou les notifications.
- **Remboursements :** Apple peut rembourser jusqu'à 90 jours après l'achat (Schedule 2 §6.3). Gère la révocation avec StoreKit 2 pour retirer l'objet remboursé.
- **Âge :** combat permanent + épées donnent un 13+ probable (« violence cartoon fréquente », « armes »). Un tirage payant ajouterait le descripteur « Loot boxes » (9+, et 16+ en Australie).
- **1.3 :** pas de catégorie Enfants si tu ajoutes des pubs.

## Coûts, compte et commission
- **Apple Developer Program :** 99 USD par an, converti en monnaie locale à l'inscription. Le chiffre de « 99 € » vient seulement de la presse (2020-2021). Pas d'exonération pour un étudiant seul : elle est réservée aux associations, aux établissements d'enseignement agréés et aux administrations. Ton budget n'est pas encore fixé.
- **Gratuit avant de payer :** le « Personal Team » de Xcode installe ton app sur 3 appareils maximum, à refaire tous les 7 jours. Il ne donne accès ni aux IAP, ni à Game Center, ni à iCloud (CloudKit), ni à TestFlight.
- **Compte individuel :** un identifiant Apple avec double authentification, être majeur, et ton nom légal s'affiche comme vendeur. Une micro-entreprise passe aussi par ce compte, sans numéro D-U-N-S. **Compte organisation :** il faut une entité légale, un numéro D-U-N-S, un email de domaine et un site web.
- **Commission :** le contrat (DPLA, Schedule 2) a été mis à jour le 13 octobre 2026. Taux standard 30 % (§3.4(a)), et 15 % sur les abonnements après 1 an. **Dans l'UE depuis le 1er octobre 2026 :** 26 % sur les IAP, ou 15 % avec le SBP. Le paiement alternatif (20 %, ou 10 % avec le SBP) ne vaut pas le coup pour toi : tu devrais gérer la TVA et envoyer des rapports à Apple.
- **Small Business Program (SBP) :** 15 % si tu as fait moins de 1 M USD l'année précédente, ou si tu débutes. Il faut être titulaire du compte, accepter le contrat « Paid Apps » et s'inscrire. Le taux s'applique 15 jours après la fin du mois fiscal où l'inscription est validée : inscris-toi avant ta première vente.
- **DSA (loi européenne) :** avec des IAP ou des pubs, tu seras probablement « trader » (vendeur pro). Ton adresse (boîte postale possible, avec justificatif), ton téléphone et ton email s'affichent sur la fiche UE. Il faut aussi envoyer un document justificatif. Apple ne décide pas à ta place.
- **Impôts :** depuis le 13 octobre 2026, Apple transmet tes ventes et tes coordonnées aux autorités fiscales (Schedule 2 §3.3(a)). Ton statut fiscal et social en France n'a pas été étudié.

## Si tu ajoutes des pubs (AdMob)
- **Kit de développement (SDK) :** AdMob 13.11.0, installé avec Swift Package Manager. Il demande iOS 13 minimum et inclut UMP, le formulaire de consentement de Google (vérifié sur le GitHub de Google). Le manifeste de confidentialité est inclus depuis la version 11.2.0.
- **RGPD :** Google exige un outil de consentement certifié (CMP) dans l'EEE et au Royaume-Uni depuis le 16 janvier 2024, et en Suisse depuis le 31 juillet 2024. Sans lui, seules des « pubs limitées » s'affichent. UMP est un outil certifié. Le formulaire doit passer avant toute pub, et un bouton « Choix de confidentialité » doit être dans les réglages. *(Pages Google non lues : résumés de recherche.)*
- **ATT (fenêtre « Autoriser le suivi ? ») :**
  - Elle est obligatoire pour utiliser l'IDFA (l'identifiant pub) ou pour tout suivi entre apps.
  - Tu peux t'en passer seulement si le SDK ne fait aucun suivi entre apps (pubs non personnalisées ou limitées). C'est toi qui réponds du SDK.
  - En France, à partir d'iOS 27.2, seule la version alternative UE de la fenêtre existe (annonce du 16 septembre 2026). On ne sait pas encore si UMP la gère.
  - Un écran d'explication avant la fenêtre est permis s'il reste neutre et factuel.
- **2.5.18 :** la pub doit être adaptée à l'âge et clairement marquée, avec un bouton fermer visible et un moyen de la signaler. Aucune pub dans les widgets ni dans les notifications. **3.2.2(iii) :** le jeu ne doit pas être fait surtout pour afficher des pubs.
- **Politique AdMob pour les pubs récompensées** (non lue) : donne toujours la récompense promise. L'écran d'intro doit montrer un « non » visible. Pas de texte qui pousse à regarder (« soutiens le dev » est cité comme interdit).
- **Label App Privacy :** déclare au moins l'identifiant de l'appareil, la localisation approximative (via l'adresse IP), les interactions, les données pub et les diagnostics. Ajoute « utilisé pour vous suivre » si tu utilises l'IDFA. Vérifie avec le rapport de confidentialité de Xcode.
- Une pub récompensée doit marcher même si le joueur refuse le suivi.

## Règles UE sur les monnaies virtuelles
- Principes du réseau CPC (21 mars 2025, non contraignants) : afficher le prix réel en euros à côté des gemmes, éviter plusieurs monnaies qui cachent le coût, informer avant l'achat, respecter le droit de rétractation de 14 jours.
- Une monnaie gagnée seulement en jouant (or, matériaux) n'est pas concernée.
- Un Digital Fairness Act est attendu, mais rien n'est publié au 2026-10-18. *(Résumés de cabinets d'avocats.)*

## Ce que les joueurs idle expérimentés acceptent ou rejettent
- **Ils rejettent :** le pay-to-win, les pubs forcées ou agressives, le gacha. Un fil Steam s'intitule : « FINALLY, an idle game with NO ads, NO in-app-purchases! ».
- **Ils acceptent :**
  - l'achat unique : Melvor Idle propose un essai gratuit, puis la version complète à ~13,71 € sur iOS ;
  - le pack soutien cosmétique : 2 à 3 % d'acheteurs, selon des chiffres PC de seconde main ;
  - les pubs optionnelles, si la récompense vaut le coup.
  - Ils paient plutôt après une semaine de jeu.
- **Pubs récompensées :** souvent peu utilisées dans une petite communauté (témoignage d'un dev sur itch.io). Revenus pub réels chez les petits devs : 5 à 10 $ par jour pour un jeu gratuit fait à deux, surtout grâce aux interstitiels (pubs plein écran entre deux écrans). Un clicker fait en solo a rapporté 29,62 $ au total. Dates non confirmées.
- **Le jeu de référence** vend surtout de la puissance : gacha, carte mensuelle, passes, packs jusqu'à 99,99 $, loot boxes. Ne reprends ni ses noms de monnaies, ni ses taux, ni ses paliers (règles 4.1 et 5.2.1). Écris clairement « pas de pay-to-win, pas de gacha » sur ta fiche.
- **Sources :** itch.io, Steam et des guides. r/incremental_games n'a pas pu être lu. Aucun chiffre de revenus n'est vérifié pour ton cas exact.

Ceci n'est pas un avis juridique.

## Points non vérifiés (images et monétisation)

- Aucune page de source d'images n'a pu être ouverte (opengameart.org, craftpix.net, itch.io, kenney.nl, gamedevmarket.net, unity.com, envato). Les licences marquées « à vérifier » viennent de résumés de recherche.
- Clause IA de CraftPix (section 3.1) : rapportée par 3 sources secondaires, mais le texte complet n'a pas été lu. On ne sait pas si elle vise seulement l'entraînement d'IA ou davantage.
- Le vérificateur n'a pas retrouvé le pack CraftPix « Warrior Chibi ». Prix CraftPix (5,50 USD vu une fois) et GameDev Market (20 USD) non vérifiés.
- Licence d'exécution de Spriter (fichiers SCML) non vérifiée. Utilise les images PNG pour éviter cette dépendance.
- Chibi Swordman : prix et licence de la version complète inconnus. On ne sait pas si les fichiers gratuits sont vectoriels ou seulement en PNG.
- pzUH Ninja Adventure : la liste exacte des 9 animations n'est pas confirmée (« coup reçu » probablement absent).
- Bevouliin : animations « coup reçu » et « mort » non confirmées. 4 des 6 packs cités sont introuvables sous ces noms.
- CraftPix sur OpenGameArt : listes d'animations non vérifiées. Licences de Troll, Chibi Boy et des sets d'icônes non vérifiées. Les copies OGA sont en PNG seulement.
- « Japanese style simple backgrounds » : licence de l'objet non confirmée.
- CC BY 3.0 / 4.0 et chiffrement de l'App Store (FairPlay) : zone grise non tranchée. C'est la même position que pour la musique de Kevin MacLeod.
- Unity Asset Store : on ne sait pas s'il existe une version de l'EULA plus récente que celle du 2024-12-04.
- Prix du compte Apple en euros : Apple ne l'affiche pas. Les 99 € viennent de la presse de 2020-2021.
- Toutes les règles Google AdMob (RGPD/CMP, IDFA, données collectées, pubs récompensées) viennent de résumés de recherche : les pages Google étaient bloquées.
- Non vérifié : la prise en charge par UMP de la fenêtre ATT alternative UE (iOS 27.2).
- Non vérifié : si l'affichage AdMob respecte la règle 2.5.18 (infos de ciblage visibles, signalement d'une pub).
- Non vérifié : si AdMob sans ATT respecte la définition Apple du « suivi ».
- Affaire Epic et liens externes aux États-Unis : sources de presse seulement, taux de commission pas encore fixé.
- Principes CPC de l'UE, Digital Fairness Act et enquête UE du 2026-10-01 : résumés secondaires seulement.
- Avis des joueurs : r/incremental_games inaccessible, plaintes des joueurs de Sword x Staff non vérifiées. Les chiffres de revenus indie sont anciens ou non datés. Le taux de 2,59 % pour un pack soutien est de seconde main. Le « zéro microtransaction » de Melvor Idle n'est pas confirmé.
- Non vérifiés : la compatibilité de Godot et Unity avec Xcode 27, leurs plugins de pub et le manifeste de confidentialité de Unity.
- Statut fiscal et social en France (micro-entreprise) et statut « trader » DSA : non étudiés. Un conseil juridique est recommandé.
- Prix d'une commande de héros à un artiste : non recherché.
