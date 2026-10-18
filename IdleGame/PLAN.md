# PLAN — Idle Game iOS

> Document vivant qui suit l'avancement du projet. Mis à jour à chaque étape.

**Dernière mise à jour :** 2026-10-18
**Branche de dev :** `claude/idle-game-app-store-arlsfw`
**Dossier projet :** `IdleGame/`

---

## État global

| Phase | Statut | Détails |
|-------|--------|---------|
| 1. Découverte (concept) | 🟡 En cours | Groupes 1-3 répondus · groupe 4 en cours (reset du prestige, combat, forme de l'empire) |
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
- [ ] Boucle de jeu principale (ressources, upgrades, prestige) _(presque fini : reste le reset du prestige, le combat et la forme de l'empire)_
- [ ] Style visuel et sonore (contrainte : pas de graphiste)
- [ ] Monétisation (impact validation Apple)
- [ ] Fonctionnalités (iCloud, Game Center, notifications, langues)
- [ ] Temps disponible / niveau d'ambition
- [ ] Contraintes (budget, matériel, iPhone de test)

### Décisions prises
| Sujet | Choix | Date |
|-------|-------|------|
| Thème | Fantasy / RPG | 2026-10-18 |
| Ambiance | Épique, **pas trop humoristique** (révisé, remplace "fun/humoristique") | 2026-10-18 |
| Sessions | Hybride : cœur idle en 2 min + couche active optionnelle (20 min+ possible) | 2026-10-18 |
| Rôle du joueur | Un guerrier qui bâtit son empire et devient plus fort grâce à de nouvelles armures | 2026-10-18 |
| Pilier émotionnel | Attachement au personnage : cosmétiques + équipement toujours plus puissant | 2026-10-18 |
| Public cible | Joueurs d'idle expérimentés (profondeur, optimisation, prestige) | 2026-10-18 |
| Équilibre des axes | **Focus guerrier**, l'empire est secondaire (générateur de ressources) | 2026-10-18 |
| Obtention de l'équipement | Forge (base fiable) + butin des ennemis/boss (raretés commun → légendaire) | 2026-10-18 |
| Prestige | **Ascension en fin de monde** : battre le boss final d'un monde de N niveaux débloque le monde suivant + un bonus permanent | 2026-10-18 |
| Sources de puissance | Par ordre d'importance : 1) équipement, 2) niveau et talents du guerrier, 3) bonus de l'empire, 4) prestige (multiplicateur modéré, pas le moteur principal) | 2026-10-18 |

### Boucle de jeu (proposition validée, focus guerrier)
1. L'empire produit en continu (or, matériaux), même hors-ligne
2. Les ressources servent à forger et améliorer l'équipement
3. Le guerrier, mieux équipé, bat des ennemis plus forts (combat auto + boss en actif), et récupère du butin
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
