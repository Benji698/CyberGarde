# PLAN — Idle Game iOS

> Document vivant qui suit l'avancement du projet. Mis à jour à chaque étape.

**Dernière mise à jour :** 2026-10-18
**Branche de dev :** `claude/idle-game-app-store-arlsfw`
**Dossier projet :** `IdleGame/`

---

## État global

| Phase | Statut | Détails |
|-------|--------|---------|
| 1. Découverte (concept) | 🟡 En cours | Groupes 1-7 répondus · reste : sources d'images + monétisation + budget (recherche en cours) |
| 2. Choix technique | ⚪ À faire | — |
| 3. Plan de projet (GDD + archi + roadmap) | ⚪ À faire | — |
| 4. Développement | ⚪ À faire | — |
| 5. Soumission App Store | ⚪ À faire | — |

Légende : ⚪ à faire · 🟡 en cours · 🟢 fait · 🔴 bloqué

---

## Phase 1 — Découverte

Objectif : construire le concept avant d'écrire une ligne de code.

### Thèmes à couvrir
- [x] Thème / univers / ambiance
- [x] Durée des sessions et public cible
- [x] Boucle de jeu principale (ressources, upgrades, prestige)
- [ ] Style visuel et sonore (contrainte : pas de graphiste) _(son choisi, style choisi ; sources d'images en recherche)_
- [ ] Monétisation (impact validation Apple)
- [x] Fonctionnalités (iCloud, Game Center, notifications, langues)
- [x] Temps disponible / niveau d'ambition
- [ ] Contraintes (budget, matériel, iPhone de test) _(matériel OK ; budget demandé avec la monétisation)_

### Décisions prises
| Sujet | Choix | Date |
|-------|-------|------|
| Thème | Fantasy / RPG | 2026-10-18 |
| Ambiance | **Pas trop humoristique** (révisé, remplace "fun/humoristique"). Le visuel peut être doux / mignon façon Sword x Staff, mais l'histoire et le ton restent sérieux : mignon oui, comique non (à confirmer au choix des images) | 2026-10-18 |
| Sessions | Hybride : cœur idle en 2 min + sessions longues optionnelles (20 min+) consacrées à optimiser le build : compétences, ordre, équipement, forge | 2026-10-18 |
| Rôle du joueur | Un guerrier qui bâtit son empire et devient plus fort grâce à de nouvelles armures | 2026-10-18 |
| Pilier émotionnel | Attachement au personnage : cosmétiques + équipement toujours plus puissant | 2026-10-18 |
| Public cible | Joueurs d'idle expérimentés (profondeur, optimisation, prestige) | 2026-10-18 |
| Équilibre des axes | **Focus guerrier**, l'empire est secondaire (générateur de ressources) | 2026-10-18 |
| Obtention de l'équipement | Forge (base fiable) + butin des ennemis/boss (raretés commun → légendaire) | 2026-10-18 |
| Prestige | **Ascension en fin de monde** : battre le boss final d'un monde de N niveaux débloque le monde suivant + un bonus permanent | 2026-10-18 |
| Sources de puissance | Par ordre d'importance : 1) équipement, 2) niveau et talents du guerrier, 3) bonus de l'empire, 4) prestige (multiplicateur modéré, pas le moteur principal) | 2026-10-18 |
| Ce que l'Ascension réinitialise | Seulement l'empire et l'or. Le guerrier **garde** équipement, cosmétiques et talents. Le monde suivant, plus dur, rend l'ancien équipement obsolète petit à petit | 2026-10-18 |
| Combat | **Révisé : 100 % automatique**, comme Sword x Staff. Le héros lance seul chaque compétence dès que sa recharge est finie, dans l'ordre réglé par le joueur. La profondeur vient du choix des compétences, de leurs synergies et de l'équipement. Vue de côté conservée | 2026-10-18 |
| Compétences | Gagnées sur les boss ou à la forge, **jamais tirées au sort contre de l'argent** (différence avec Sword x Staff) | 2026-10-18 |
| Forme de l'empire | Écran "liste de bâtiments" à améliorer (mine, scierie, forge…), une icône par bâtiment | 2026-10-18 |
| Jeu de référence | **Sword x Staff**. Ce que Benji aime : le combat piloté par le build, le style graphique, la progression et l'équipement. Analyse complète : [`docs/reference-sword-x-staff.md`](docs/reference-sword-x-staff.md) | 2026-10-18 |
| Univers | **Magie sans médiéval** : magie, esprits, brume, inspiration orientale. Pas de chevaliers, châteaux, royaumes ni dragons | 2026-10-18 |
| Style graphique | 2D cartoon soigné, dans l'esprit de Sword x Staff (sans copier ses visuels). Sources d'images à choisir | 2026-10-18 |
| Temps disponible | 5 à 10 h par semaine | 2026-10-18 |
| Ambition | **Jeu complet, sans se précipiter.** Objectif : apprendre à publier sur iOS | 2026-10-18 |
| Chemin de publication (proposé) | Sortie publique = jeu complet. Mais le MVP passe par **TestFlight** dès qu'il tourne, pour apprendre toute la chaîne (signature, archive, envoi, review) bien avant la vraie sortie | 2026-10-18 |
| Matériel | MacBook Air M4 (16 Go) + **iPhone 17 Pro** + simulateur Xcode | 2026-10-18 |
| Fonctionnalités (jeu complet) | Sauvegarde iCloud, Game Center (succès, classements), notifications locales, version iPad | 2026-10-18 |
| Étalement proposé | MVP : sauvegarde locale, notifications locales, FR + EN. Ensuite : iCloud et Game Center (compte payant requis), puis iPad (interface adaptée) | 2026-10-18 |
| Langues | Français + anglais, code préparé pour la traduction dès le début | 2026-10-18 |
| En ligne | **100 % hors ligne au départ**, sans serveur. Un mode en ligne pourra être étudié plus tard : l'architecture ne doit pas l'empêcher | 2026-10-18 |
| Équipement visible | Par palier : l'arme change à l'écran, l'armure change de couleur ou brille selon la rareté. Le détail passe par les icônes | 2026-10-18 |
| Audio (MVP) | Bruitages Kenney (CC0, sans crédit) + musique Kevin MacLeod (CC BY 4.0, crédit obligatoire). Licences à revérifier au téléchargement | 2026-10-18 |

### Boucle de jeu (proposition validée, focus guerrier)
1. L'empire produit en continu (or, matériaux), même hors-ligne
2. Les ressources servent à forger et améliorer l'équipement
3. Le guerrier, mieux équipé, bat des ennemis plus forts (combat 100 % auto, piloté par le build), et récupère du butin
4. Les victoires débloquent des territoires qui boostent l'empire
5. Fin du monde (boss final) → Ascension vers le monde suivant

### Contenu par monde (estimation)
- Niveaux générés par formule (les ennemis gagnent en force à chaque niveau), pas dessinés à la main
- Par monde : 1 décor, 5 à 8 ennemis, 1 boss final
- MVP : 1 monde, puis 2 pour tester l'Ascension

### Points de vigilance
- **Équipement visible sur le personnage (paperdoll)** : sprites en couches superposées (corps, casque, plastron, arme…). Poste d'assets le plus lourd du projet. Pistes : packs modulaires libres, variantes de couleur/effets par palier. À trancher au groupe "style visuel".
- **Public expert = rejet du pay-to-win** : monétiser par les cosmétiques plutôt que par la puissance. À trancher au groupe "monétisation".
- **Grands nombres** : les joueurs experts dépassent vite les milliards. Prévoir l'affichage (K, M, B… ou notation scientifique) et, à terme, un type numérique au-delà de la limite de `Double` (~1,8e308). Pour le MVP, un seul niveau de prestige.
- **Butin aléatoire + achats** : si l'équipement aléatoire peut s'obtenir contre de l'argent réel, Apple impose d'afficher les probabilités (règles "loot boxes"). À garder en tête.
- **Ascension légère** : comme le guerrier garde son équipement, le reset coûte peu. C'est plutôt un changement de chapitre. À calibrer en Phase 3 : le début du monde suivant doit défiler vite avec l'équipement actuel, puis ralentir pour pousser à forger et à farmer du butin.
- **Licences anti-IA** : le code du jeu est écrit avec l'aide d'une IA. Certains artistes interdisent leurs assets dans tout jeu qui utilise de l'IA, code compris (ex. Mana Seed : clause confirmée par le fichier « NO AI, NO EXCEPTIONS.txt » du pack). Ces licences sont exclues d'office.
- **Registre des assets** : tenir un tableau source / licence / date / reçu, et sauvegarder chaque page de licence (PDF ou capture) le jour du téléchargement. Apple peut demander une preuve de droits (règle 5.2.1).
- **Ne pas copier Sword x Staff** : règles Apple 4.1 (copies), 4.3(b), 5.2.1 (propriété intellectuelle) et 2.3.7 (métadonnées), version du 16/10/2026 lue sur developer.apple.com. On reprend des mécaniques, jamais ses noms, visuels, interface ou chiffres exacts, ni le nom « Sword x Staff » dans la fiche App Store (même « comme Sword x Staff »).
- **Conflits avec Sword x Staff (résolus)** : univers → « magie sans médiéval » ; style → mignon accepté, comique refusé.
- **Jeu complet à 5-10 h/semaine = projet long** : probablement un an ou plus (à chiffrer en Phase 3). Risque principal en solo : la perte de motivation. Parades : jalons jouables réguliers, TestFlight dès le MVP, périmètre « complet » défini noir sur blanc en Phase 3.
- **Triche à l'horloge** : sans serveur, avancer l'heure de l'iPhone gonfle les gains hors ligne. Sans gravité en solo, mais gênant avec des classements Game Center. Parades : détecter un retour en arrière de l'horloge, plafonner les gains hors ligne, choisir des classements difficiles à truquer.
- **Combat tout auto = plus proche de Sword x Staff** : on se distingue par l'Ascension, la forge, l'empire, des compétences jamais vendues au hasard et une monétisation cosmétique. Avantage : bien plus simple à coder pour le MVP.
- **Monétisation** : Sword x Staff vend surtout de la puissance (tirages, carte mensuelle, passes). Notre modèle cosmétique est plus sain pour un public expert, mais rapporte souvent moins. À trancher au groupe monétisation.

### Pistes d'assets (recherche du 2026-10-18, vérification partielle)

> 🔎 **Recherche en cours** pour la direction retenue (2D cartoon, magie sans médiéval).
>
> ⚠️ **À réévaluer** : Benji ne veut pas d'univers médiéval. Les sources visuelles fantasy médiévales ci-dessous (CraftPix Knight/Orcs/Trolls, LPC) ne conviennent sans doute plus. Les sources neutres (icônes, interface, audio) restent valables.

**Limites de la vérification** : l'environnement cloud n'a pas pu ouvrir beaucoup de sites (itch.io, opengameart.org, kenney.nl, craftpix.net, incompetech.com, creativecommons.org…), et le quota de recherches a été épuisé en cours de route. Vérifié sur source primaire : règles Apple (version du 16/10/2026), licences LPC (dépôt GitHub), clause anti-IA de Mana Seed. Le reste repose sur des extraits de recherche ou n'a pas été revérifié (audio en particulier). À revérifier au moment du téléchargement.

Mots utiles :
- **CC0** : domaine public. Tu fais ce que tu veux, sans crédit.
- **Attribution (crédit)** : citer l'auteur et la licence dans un écran Crédits du jeu.
- **OGA-BY** : crédit obligatoire, mais autorisé sur l'App Store (pas de clause anti-DRM).
- **CC BY** : crédit obligatoire. Petite zone grise avec le DRM de l'App Store (risque faible : FairPlay ne chiffre que l'exécutable, pas les images ni les sons).
- **Paperdoll** : perso en couches superposées (corps + casque + torse + jambes + arme + bouclier).

| Source | Type | Licence | Usage commercial / App Store | Attribution | Coût | Vérifié le |
|---|---|---|---|---|---|---|
| Universal LPC Spritesheet Generator (couches OGA-BY/CC0 seulement) | Perso pixel en couches + ennemis humanoïdes (orc, gobelin, lézard, squelette, vampire...) | CC0 ou OGA-BY 3.0/4.0, choisie par fichier | Oui / faible (le README conseille CC0/OGA-BY pour l'App Store) | Oui sauf CC0 : chaque auteur + lien de licence | Gratuit | 2026-10-18 |
| CraftPix « 2D Fantasy » (Knight, Orcs, Trolls, fonds de combat, Fantasy RPG GUI) | Perso vectoriel en pièces, vue de côté + ennemis, fonds, interface | Licence CraftPix (maison) | Oui / faible. Pas de revente, pas de fichiers extractibles | « Facultatif » non confirmé : mettre « Art : CraftPix.net » | 0 à ~25 USD | 2026-10-18 (page licence non lue) |
| CraftPix « Game Icons of Fantasy » (armures 512 px) | Icônes d'équipement peintes, version de base + améliorée | Licence CraftPix | Oui / faible | Par prudence : « CraftPix.net » | Pack Knight gratuit, autres ~4,50 USD (non vérifié) | 2026-10-18 (page licence non lue) |
| game-icons.net | Icônes plates SVG (armes, bâtiments, compétences, monnaies) | CC BY 3.0 (vérifier le pied de page) | Oui / faible | Oui : chaque auteur + lien, accessible depuis un menu | Gratuit | 2026-10-18 |
| Painterly Spell Icons 1-2 (J. W. Bjerk) | Icônes de sorts peintes | Choisir CC BY 3.0 | Oui / faible | Oui : « J. W. Bjerk (eleazzaar) -- www.jwbjerk.com/art » + licence | Gratuit | 2026-10-18 |
| Kenney Fantasy UI Borders | Cadres et panneaux d'interface étirables | CC0 | Oui / aucun | Non | Gratuit | 2026-10-18 |
| Kenney Roguelike Characters | Perso pixel 16x16 en pièces, sans animation, ton peu épique | CC0 | Oui / aucun | Non | Gratuit | 2026-10-18 (licence lue via une copie tierce) |
| Kenney audio (UI Audio, Interface Sounds, Impact Sounds, RPG Audio, Casino Audio) | Bruitages UI, coups, pièces (OGG) | CC0 | Oui / aucun | Non | Gratuit | 2026-10-18 (non vérifié en ligne) |
| Kevin MacLeod (incompetech.com) | Musique | CC BY 4.0, ou licence Standard payante | Oui / faible | Oui en CC BY : titre, auteur, licence, écran Crédits | Gratuit, ou 30 USD le morceau (20 USD chacun dès 3) | 2026-10-18 (non vérifié en ligne) |

**Écartées ou à éviter**
- **LPC, pièces hors OGA-BY/CC0** (minotaure, loup, homme-sanglier, troll, tête de zombie, corps « muscular », armes d'hast, bouclier kite, fléau, hache de guerre, sabre) : CC-BY-SA/GPL, ou CC-BY seul. Partage à l'identique et clause anti-DRM.
- **Hippo (Pixel Hero Maker, Character Editor)** : pensé pour Unity. Une vérification juge l'usage hors Unity à risque moyen. Vue de côté et prix non vérifiés. 25 à 55 EUR.
- **LayerLab 2D Art Maker** : Unity et Spine obligatoires, ~159 USD au total.
- **Mana Seed** : la licence interdit toute IA dans le jeu, même pour le code. Vue de dessus. Risque élevé.
- **Iphigenia Pixels, edermunizz, stylerfunk, pzUH (itch.io)** : licences non lues (site inaccessible). Celle d'edermunizz se contredit.
- **Outils IA (PixelLab, Scenario, Retro Diffusion, Firefly, Midjourney, Leonardo)** : conditions non vérifiées. Pas de couches alignées. Risque de ressemblance avec des œuvres connues. Images brutes sans doute non protégées.
- **Sonniss GDC Bundle, Lufus, Pixabay** : licences non vérifiées (Sonniss v2.0 d'août 2026, texte Lufus non lu, licence maison Pixabay et pistes Content ID). À revérifier, Sonniss en priorité.
- **Freesound, OpenGameArt (audio)** : risque moyen. Licences NC et partage à l'identique mélangées, provenance des envois incertaine.
- **ChipTone / jfxr / Bfxr** : droits non revérifiés, et un son 8-bit qui jure avec le ton épique.
- **Whisper Ltd « 4500 RPG Skill Icons »** : soupçon de copie d'icônes Dota 2 / WoW.

**Notes techniques**
- Les sons Kenney sont en OGG, un format que SpriteKit et SwiftUI ne lisent pas : conversion à prévoir (ffmpeg ou Audacity).
- Ne pas chiffrer soi-même les fichiers d'assets (option de chiffrement Godot PCK ou Unity) quand ils sont sous CC BY.
- Prix en USD hors TVA (environ 20 % de plus en France sur itch.io, non vérifié).
- Règles Apple (version du 16/10/2026) : aucune obligation de signaler des images faites par IA. Les règles de propriété intellectuelle (5.2, 5.2.1) s'appliquent.

*Ceci n'est pas un avis juridique. Relis et sauvegarde (PDF ou capture) chaque licence le jour du téléchargement, avec ton reçu.*

---

## Phase 2 — Choix technique

À venir après la Phase 1. Options à comparer :
- SwiftUI natif
- SpriteKit (natif Apple, 2D)
- Unity
- Godot
- React Native / Expo

---

## Phase 3 — Plan de projet

À produire après validation du choix technique :
1. Game Design Document synthétique
2. Architecture technique (dossiers, modèles, offline, save)
3. Roadmap par étapes (MVP → polish → soumission)
4. Liste des assets (icônes, sons, sprites) + sources légales

---

## Phase 4 — Développement

Suivi par jalons (à remplir une fois la roadmap posée).

---

## Phase 5 — App Store

Checklist à remplir au moment de la soumission.

---

## Journal des sessions

### 2026-10-18 — Kickoff
- Création du dépôt et de la branche `claude/idle-game-app-store-arlsfw`
- Création du dossier `IdleGame/` et du présent `PLAN.md`
- Démarrage Phase 1 : premières questions envoyées (thème, ambiance, longueur des sessions)
- Réponses groupe 1 : Fantasy/RPG, fun/cartoon, sessions longues. Alerte sur le risque des sessions longues, proposition d'un modèle hybride
- Groupe 2 envoyé : confirmation du format de session, rôle du joueur, public cible
- Réponses groupe 2 : hybride, guerrier bâtisseur d'empire centré sur l'équipement et les cosmétiques, ton moins comique, public expert
- Groupe 3 envoyé : boucle de jeu, source de l'équipement, thème du prestige
- Réponses groupe 3 : focus guerrier, forge + butin, prestige lié à la fin d'un monde et pas moteur principal de puissance
- Groupe 4 envoyé : ce que l'Ascension réinitialise, style de combat, forme de l'empire
- Réponses groupe 4 : l'équipement est conservé à l'Ascension, combat temps réel auto + compétences, empire en liste de bâtiments. Gameplay bouclé
- Recherche web lancée sur les sources d'assets légales (visuels en couches, icônes, IA, audio) pour préparer le groupe 5
- Recherche terminée : vérification partielle (beaucoup de sites inaccessibles depuis l'environnement cloud). Résultats dans « Pistes d'assets ». Licences anti-IA exclues d'office
- Groupe 5 envoyé : style graphique, affichage de l'équipement sur le guerrier, audio
- Réponses groupe 5 : équipement par palier, audio Kenney + Kevin MacLeod. Style : combat et univers proches de Sword x Staff, pas de médiéval. Les sources visuelles médiévales sont à réévaluer
- Recherche lancée sur Sword x Staff (combat, univers, style graphique) et sur des assets légaux qui s'en rapprochent
- Recherche terminée : jeu identifié (Boltray Games, sorti le 19/05/2026), analyse dans `docs/reference-sword-x-staff.md`. Deux conflits relevés (univers fantasy magique, style mignon). Règles Apple anti-copie vérifiées
- Groupe 5 bis envoyé : ce qui plaît dans Sword x Staff, direction d'univers, format du combat. Le choix des sources d'images attend la réponse sur l'univers
- Réponses groupe 5 bis : Benji aime le combat piloté par le build, le style et la progression. Univers « magie sans médiéval ». Combat 100 % auto
- Recherche lancée : images 2D cartoon pour l'univers magique non médiéval + règles Apple de monétisation (vérifiées en ligne)
- Groupe 6 envoyé : temps disponible, ambition, contraintes (budget, iPhone de test)
- Réponses groupe 6 : 5-10 h/semaine, jeu complet sans se précipiter avec l'objectif d'apprendre à publier, iPhone 17 Pro + simulateur. Proposition : TestFlight dès le MVP
- Groupe 7 envoyé : fonctionnalités Apple (iCloud, Game Center, notifications, iPad), langues, hors ligne ou serveur
- Réponses groupe 7 : les 4 fonctionnalités, FR + EN, hors ligne au départ (en ligne peut-être plus tard). Étalement proposé (MVP sans compte payant), alerte sur la triche à l'horloge
