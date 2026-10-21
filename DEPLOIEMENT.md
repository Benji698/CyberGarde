# Mise en ligne de CyberGarde

Le site est publié sur **Azure Static Web Apps** (Microsoft), en plan **gratuit** :

- accessible à tous, en **HTTPS** avec un certificat géré et renouvelé automatiquement ;
- **en-têtes de sécurité** stricts (voir plus bas) ;
- aucun serveur à maintenir, aucune base de données, aucun compte : la progression de chaque visiteur reste dans son propre navigateur ;
- **publication automatique** : à chaque mise à jour de la branche `main` sur GitHub, le site en ligne est mis à jour.

Ce qui est déjà prêt dans le dépôt :

| Fichier | Rôle |
|---|---|
| `staticwebapp.config.json` | En-têtes de sécurité et page d'erreur 404. |
| `.github/workflows/deploy-azure.yml` | Publication automatique ; seuls les fichiers du site sont mis en ligne (ni le README, ni `outils/`). |
| `mentions-legales.html` | Mentions légales et politique de confidentialité, **à compléter** (voir étape 4). |
| `404.html` | Page affichée pour une adresse inexistante. |

## Étape 1 — Créer un compte Azure

Si l'entreprise a déjà un abonnement Azure, demandez au service informatique le droit d'y créer une ressource. Sinon, créez un compte sur [azure.microsoft.com](https://azure.microsoft.com) : le plan gratuit de Static Web Apps ne coûte rien, mais Azure demande une carte bancaire à l'inscription pour vérifier l'identité.

## Étape 2 — Créer la Static Web App

1. Sur [portal.azure.com](https://portal.azure.com), cliquez sur **Créer une ressource** et recherchez **Static Web App**.
2. Renseignez :
   - **Groupe de ressources** : créez-en un, par exemple `rg-cybergarde` ;
   - **Nom** : `cybergarde` ;
   - **Type de plan** : **Gratuit** ;
   - **Région** : Europe de l'Ouest (West Europe) ;
   - **Source de déploiement** : **Autre**. Le workflow GitHub est déjà dans le dépôt ; choisir « GitHub » ici en créerait un second.
3. Cliquez sur **Vérifier + créer**, puis **Créer**.
4. Ouvrez la ressource et notez son **URL** (du type `https://nom-aleatoire.azurestaticapps.net`).

## Étape 3 — Relier GitHub à Azure

1. Dans la Static Web App, cliquez sur **Gérer le jeton de déploiement** et copiez le jeton.
2. Dans le dépôt GitHub : **Settings → Secrets and variables → Actions → New repository secret** :
   - Nom : `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Valeur : le jeton copié.

Ce jeton permet de publier sur le site : ne le partagez pas. En cas de fuite, régénérez-le depuis le même menu d'Azure, puis remplacez le secret dans GitHub.

## Étape 4 — Compléter les mentions légales

La loi (LCEN) impose d'indiquer qui édite le site. Dans `mentions-legales.html`, remplacez chaque champ surligné **[À compléter : …]** : nom et forme juridique de l'entreprise, adresse, SIREN, contact, directeur ou directrice de la publication. Faites valider le texte par votre responsable. Tant qu'un champ reste à compléter, la publication affiche un avertissement dans GitHub Actions.

## Étape 5 — Publier

Dans le dépôt GitHub : **Actions → Déploiement Azure → Run workflow**. Ensuite, chaque fusion sur `main` republie automatiquement le site.

## Étape 6 — Vérifier

1. Ouvrez l'URL du site : le cadenas HTTPS doit s'afficher.
2. Essayez une adresse inexistante (`/test`) : la page « Page introuvable » doit s'afficher.
3. Contrôlez les en-têtes de sécurité, par exemple sur [securityheaders.com](https://securityheaders.com), ou dans les outils de développement du navigateur (onglet Réseau → en-têtes de la réponse).
4. Faites un tour de toutes les pages, de préférence aussi sur téléphone.

## Option — Une adresse au nom de l'entreprise

Pour utiliser par exemple `cyber.monentreprise.fr` : dans la Static Web App, ouvrez **Domaines personnalisés → Ajouter**, puis créez chez le gestionnaire DNS de l'entreprise l'enregistrement **CNAME** indiqué par Azure. Le certificat HTTPS de ce domaine est créé et renouvelé automatiquement, gratuitement.

## Les protections en place

| En-tête | Protection |
|---|---|
| `Content-Security-Policy` | Le navigateur n'exécute que les scripts venant du site lui-même : une injection de code est bloquée. Aucun JavaScript n'est écrit dans les pages HTML (tout est dans `assets/js/`), ce qui permet cette règle stricte. |
| `Strict-Transport-Security` | Le navigateur n'utilise plus jamais HTTP pour ce site, même si l'on tape l'adresse sans « https ». |
| `X-Frame-Options` et `frame-ancestors 'none'` | Le site ne peut pas être affiché dans une page piégée (clickjacking). |
| `X-Content-Type-Options` | Empêche le navigateur de « deviner » le type d'un fichier. |
| `Referrer-Policy` | Limite les informations transmises aux sites externes quand on clique sur un lien. |
| `Permissions-Policy` | Coupe l'accès à la caméra, au micro, à la position, etc., dont le site n'a pas besoin. |

## Ce que le site collecte

Rien. Il n'y a ni compte, ni formulaire, ni base de données, ni mesure d'audience. La progression et le thème sont enregistrés dans le stockage local du navigateur de chaque visiteur et ne sont jamais transmis. Seul l'hébergeur peut conserver des journaux techniques de connexion (adresse IP, date), comme tout serveur web.
