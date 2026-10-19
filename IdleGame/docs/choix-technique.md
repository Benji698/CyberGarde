# Phase 2 : choix technique

> Document de référence lié au PLAN.md. Recherche du 2026-10-18 (4 technologies, chaque recherche contre-vérifiée). Les notes /5 sont des jugements tirés de la recherche, pas des mesures.


**Mots utiles.** Un *moteur* est le logiciel qui fait tourner le jeu (affichage, animations, sons). Le *SDK* est la boîte à outils d'Apple pour une version d'iOS. Un *plugin* est un module ajouté qui donne une fonction en plus (achats, pubs). Un *shader* est un petit programme qui colore les pixels, par exemple la lueur d'une armure rare. *Exporter*, c'est quand le moteur fabrique le projet Xcode pour toi. *i/s* = images par seconde.

## Comparaison

Notes sur 5, déjà corrigées par la vérification. Tes 4 critères passent en premier.

| Critère | Natif Apple (SwiftUI + SpriteKit) | Unity 6.3 LTS | Godot 4.7 | React Native / Expo |
|---|---|---|---|---|
| Export vers Xcode | 5/5 : aucun export | 3/5 : 2 étapes, outils iOS qui changent | 4/5 : 1 export, projet Xcode prêt | 4/5 : une commande, CocoaPods en plus |
| Apprentissage (débutant) | 3/5 : Swift + Xcode, tutos SpriteKit anciens | 3/5 : éditeur lourd | 4/5 : GDScript simple, éditeur visuel | 2/5 : JS + TS + React + worklets |
| Performance / batterie | 3/5 : bug de fluidité SpriteKit ouvert depuis ~13 mois | 4/5 : bon, i/s à limiter | 4/5 : bon, i/s à limiter | 3/5 : 120 Hz par défaut |
| Maintenance en solo | 4/5 : peu de dépendances | 2/5 : migration forcée fin 2027 | 3/5 : 1 mise à jour par an + plugins | 2/5 : 4 versions d'Expo en ~7 mois |
| **Sous-total de tes critères** | **15/20** | **12/20** | **15/20** | **11/20** |
| Fonctions iOS | 5/5 : tout est officiel Apple | 4/5 : iCloud non officiel | 3/5 : plugins de la communauté | 3/5 : Game Center et iCloud fragiles |
| 2D chibi | 3/5 : pas de squelette 2D prêt | 4/5 : très complet | 4/5 : squelette 2D intégré | 2/5 : tout à coder |
| Travail avec l'IA (Linux) | 3/5 : seul le cœur Swift se teste | 2/5 : éditeur impossible chez l'IA | 5/5 : presque tout se teste | 5/5 : presque tout se teste |
| **Total sans Android** | **26/35** | **22/35** | **27/35** | **21/35** |
| Android plus tard (départage) | 2/5 : combat à réécrire | 5/5 : même projet | 4/5 : ré-export + autres plugins | 4/5 : même code |

## Recommandation : Godot 4.7 (GDScript)

On prend Godot 4.7.2 (version stable du 2026-08-18) et seulement le langage GDScript. Pas de C# : sur iOS, il est encore « expérimental ». Godot gagne **de peu** sur le natif Apple. Pourquoi lui :

- **Tes critères** : égalité avec le natif. Un seul export donne un projet Xcode complet (signature automatique, iOS 15 minimum, fichier de confidentialité Apple, dossiers FR/EN).
- **L'IA vérifie avant toi** : tout est en fichiers texte. Sous Linux, l'IA a déjà vérifié des scripts, lancé des tests, chargé des scènes, compilé un shader et généré le projet Xcode. Avec le natif, aucune ligne d'interface ne compile chez elle.
- **La 2D chibi est intégrée** : squelette 2D, « prise » d'arme pour changer d'arme, shader de lueur par rareté, particules, parallaxe. Le squelette, la prise d'arme et le shader ont été testés.
- **Plus simple pour toi** : GDScript ressemble à Python. Tu joues sur ton Mac avec le bouton Lecture. Xcode ne sert que pour l'iPhone et TestFlight.
- **Gratuit** (licence MIT, pas de logo imposé). Android reste possible : ça ne sert qu'à départager.

## Ce que tu perds, et comment on compense

- **Services Apple par des plugins de la communauté.** Achats et Game Center : GodotApplePlugins, tenu surtout par une seule personne, iOS 17 minimum. Notifications, ATT et AdMob : 3 autres petits projets. L'iCloud clé-valeur n'est pas encore publié. → Chaque service passe par une petite interface qu'on peut remplacer. On fige les versions dans git. En secours pour iCloud : la sauvegarde Game Center. Tout ça arrive après le MVP.
- **Xcode 27 peu testé avec Godot** (le SDK iOS 27 sera obligatoire en avril 2027). → **Jalon 0** : un projet presque vide sur TestFlight avec Xcode 27.1, dans tes 2 premières semaines. Xcode 26.6 en secours jusqu'en avril 2027.
- **Pas de simulateur iPhone sur ton Mac M4, app plus lourde (~93 Mo à vide, à confirmer), 120 Hz par défaut.** → Tests sur le Mac et l'iPhone. Maximum 60 i/s en combat, 30 dans les menus.
- **Mises à jour** : une version 4.x tous les 5-6 mois, et chaque export réécrit le projet Xcode. → On reste sur 4.7.x, avec une mise à jour par an. Aucun réglage à la main dans Xcode : tout va dans `export_presets.cfg`.

## Deuxième choix : natif Apple (SwiftUI + SpriteKit)

C'est un vrai concurrent. Pas d'export. Tous les services iOS sont officiels Apple, et le seul module externe est AdMob (officiel Google). SwiftUI est le meilleur outil pour tes menus. L'app est petite et économe, avec très peu de dépendances. Les tutos Apple vont jusqu'à TestFlight.
Ses défauts : SpriteKit n'a eu aucune nouveauté dans Xcode 26 ni 27. Un bug de fluidité est ouvert depuis ~13 mois. L'IA ne compile pas l'interface. Android voudrait dire réécrire le combat.
**Il serait meilleur si** : un prototype sur ton iPhone 17 Pro (iOS 27) tient 60 i/s avec des menus par-dessus ; tu veux zéro plugin tiers ; Android ne se fera jamais ; tu autorises download.swift.org. C'est aussi le **plan B** si le jalon 0 échoue sans solution.

## Options écartées

- **Unity 6.3 LTS** : l'éditeur ne tourne pas chez l'IA, donc elle code à l'aveugle. L'export se fait en 2 étapes. Le support de la 6.3 s'arrête en décembre 2027, juste après ta sortie.
- **React Native / Expo** : ce n'est pas un moteur de jeu, tout le combat est à coder à la main. C'est la pile la plus dure à apprendre, et elle change très vite.

## En pratique

1. **Sur ton Mac** : macOS Tahoe 26.6+, Xcode 27.1 (du 2026-10-15), Godot 4.7.2 « standard » (pas « .NET »), puis Éditeur > Gérer les modèles d'export (1,28 Go). Vérifie ton espace disque.
2. **Ouvrir** : `git pull`. La première fois : Godot > Importer > `project.godot`. Ensuite, double-clic sur le projet dans la liste.
3. **Sur l'iPhone** : Projet > Exporter > iOS, puis double-clic sur `build/ios/IdleRPG.xcodeproj`, choisis ton iPhone, bouton Lecture. Pour TestFlight : Product > Archive.
4. **L'IA vérifie sous Linux** : scripts (fichier + ligne), tests GUT (gros nombres, gains hors ligne, combat, sauvegarde), scènes, shaders. Elle ne peut pas signer ni lancer sur l'iPhone.
5. **Erreurs** : colle le texte de Godot ou de Xcode dans la conversation. Ou lance `tools/build_ios.sh` : il écrit `logs/build.log`, puis tu fais commit + push.
6. **Réseau** : rien à autoriser (Godot vient de GitHub). En option : godotengine.org, pour la doc officielle.

Statut : en attente de validation par Benji

## Points non vérifiés

- Godot et Xcode 27 : pendant la recherche, aucun projet Godot 4.7.2 n'a été compilé dans Xcode 27 (l'IA n'a pas de Mac). La seule preuve sur iOS 27 est un test très étroit sur une bêta. Le jalon 0 doit le prouver.
- L'export iOS depuis Linux marche, mais la doc officielle de Godot dit « macOS requis ». C'est donc juste un pré-contrôle : il peut casser dans une future version.
- Taille de l'app : les ~93 Mo à vide viennent d'un README non daté. On ne sait pas si c'est la taille de téléchargement sur l'App Store.
- GodotApplePlugins : l'iCloud clé-valeur n'existe que sur la branche principale (2026-10-12), dans aucune version publiée. Le plugin demande iOS 17 minimum (Apple l'accepte). Ses versions sont des « build-xxxx » sans numéro.
- ATT : le plugin AdMob (Poing) ne dit rien sur l'ATT. Le formulaire Google UMP peut afficher lui-même la demande ATT (doc Invertase), mais ce n'est pas vérifié avec Poing.
- Rendu : l'IA a testé les shaders avec le rendu « Compatibility » (OpenGL). Sur iPhone, le rendu peut être différent : à vérifier sur l'appareil. On choisira le mode de rendu au prototype.
- Importeur Spriter (SCML) : un seul mainteneur, interpolation linéaire seulement, changement d'équipement par « character maps » peu testé. Certains personnages des packs devront peut-être être ré-animés dans Godot ou passer en séquences PNG.
- Sous Linux, les tests utilisent des coquilles vides à la place des plugins Apple. Le vrai comportement (achats, Game Center) ne se voit que sur l'iPhone.
- Les notes /5 et les totaux sont un jugement tiré de la recherche, pas une mesure. Godot et le natif sont très proches (27 contre 26).
- Certaines dates GitHub de plugins n'ont pas d'année : on a déduit 2026 de l'ordre de la liste. Le niveau de la traduction française de la doc Godot n'a pas été vérifié.
- Valable pour toutes les options, à creuser en phase publication. iPhone Duo : selon Apple, captures d'écran exigées dès avril 2027. Si tu vends des achats : statut de « commerçant » dans l'UE (tes coordonnées affichées sur l'App Store) et nouvelles conditions UE d'Apple depuis le 2026-10-01. Ces deux derniers points ne sont pas vérifiés en détail.
