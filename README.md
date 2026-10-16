# CyberTruck — site de sensibilisation à la cybersécurité

Site statique (HTML/CSS/JavaScript, sans dépendance ni compilation) réalisé dans le cadre d'une alternance en administration système.

## Contenu

| Parcours | Public | Contenu |
|---|---|---|
| **Salariés** (`salaries/`) | Non techniques | Cours phishing & ingénierie sociale (6 fiches), 3 simulateurs (chasse aux indices dans un faux mail, vrai ou piège, faux appel), QCM de 15 situations |
| **Étudiants IT** (`it/`) | Étudiants / techniciens | 5 niveaux (Stagiaire → Technicien → Admin sys → Analyste SOC → RSSI), chacun avec un cours et un scénario à embranchements : XP, jauge de menace, chronomètre à partir du niveau 3, 9 badges, déblocage à 70 % |
| **Ressources** (`ressources.html`) | Tous | Contacts utiles (17Cyber, 33700…), fiche « 10 réflexes » imprimable, glossaire filtrable |

La progression est enregistrée dans le navigateur (`localStorage`), sans compte ni serveur. Le thème clair/sombre est mémorisé.

## Lancer le site

Ouvrir directement `index.html` dans un navigateur fonctionne.

Pour un serveur local (recommandé pour les tests) :

```bash
perl outils/serveur.pl 8000
```

puis ouvrir <http://localhost:8000>. Alternative si Python est utilisable : `python3 -m http.server 8000`.

## Structure

```
assets/css/style.css          Styles (variables de couleurs, thème sombre, responsive)
assets/js/theme.js            Bascule clair/sombre
assets/js/storage.js          Sauvegarde de la progression (localStorage)
assets/js/ui.js               En-tête, pied de page, icônes, utilitaires
assets/js/quiz-engine.js      Moteur de QCM
assets/js/simulators.js       Simulateurs du parcours salarié
assets/js/scenario-engine.js  Moteur de scénario du parcours IT (XP, menace, chrono, badges)
data/                         Tout le contenu pédagogique
outils/serveur.pl             Mini serveur web de développement
```

## Ajouter ou modifier du contenu

Le contenu est séparé du code : il suffit d'éditer les fichiers de `data/`.

- **Question de QCM** (`data/salaries-quiz.js`) : `{ situation, choix: [{ t, ok }], explication }`.
- **Message « vrai ou piège »** (`data/salaries-sims.js`) : `{ type: 'sms'|'url'|'mail', contenu, piege, explication }`.
- **Décision d'un scénario IT** (`data/it-levels.js`) : un nœud `{ etape, texte, contexte?, choix: [{ t, note: 'best'|'ok'|'bad', fb, suite }] }`, où `suite` est l'identifiant du nœud suivant. Un nœud `{ fin: 'auto', succes, partiel }` termine le scénario.

Barème des scénarios : meilleure décision = 100 XP (+25 si rapide), acceptable = 40 XP, erreur = 0 XP. La jauge de menace baisse de 10, monte de 10 ou de 25 ; à 100 %, le scénario est perdu.

Tous les noms d'entreprise, domaines et adresses IP des exemples sont fictifs.
