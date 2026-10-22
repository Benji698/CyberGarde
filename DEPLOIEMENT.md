# Mise en ligne de CyberGarde sur Cloudflare

Le site est hébergé sur **Cloudflare** (Workers, fichiers statiques) :

- hébergement **gratuit**, en **HTTPS** avec un certificat créé et renouvelé automatiquement ;
- **en-têtes de sécurité** stricts (fichier `_headers`) ;
- aucun serveur à maintenir, aucune base de données, aucun compte : la progression de chaque visiteur reste dans son propre navigateur ;
- **publication automatique** : à chaque mise à jour de la branche `main` sur GitHub, Cloudflare republie le site.

Le seul coût est le **nom de domaine** (par exemple `cybergarde.fr`), environ 10 € par an.

Ce qui est déjà prêt dans le dépôt :

| Fichier | Rôle |
|---|---|
| `wrangler.jsonc` | Configuration Cloudflare : nom du site, dossier publié (`public/`), page 404. |
| `outils/build.sh` | Prépare le dossier `public/` avec uniquement les fichiers du site (ni le README, ni `outils/`). |
| `_headers` | En-têtes de sécurité appliqués par Cloudflare à toutes les pages. |
| `404.html` | Page affichée pour une adresse inexistante (Cloudflare l'utilise automatiquement). |
| `mentions-legales.html` | Mentions légales et confidentialité, **à compléter** (étape 1). |

## Étape 1 — Compléter les mentions légales

La loi (LCEN) impose d'indiquer qui édite le site et qui l'héberge. Dans `mentions-legales.html`, remplacez chaque champ surligné **[À compléter : …]** : nom et forme juridique de l'entreprise, adresse, SIREN, contact, directeur ou directrice de la publication, téléphone de l'hébergeur. Faites valider le texte par votre responsable.

## Étape 2 — Créer un compte Cloudflare

1. Allez sur [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Créez le compte, idéalement avec une adresse de l'entreprise (ou une adresse partagée de l'équipe informatique), pour que le site ne dépende pas d'une seule personne.
3. Confirmez l'adresse mail, puis **activez la double authentification** : icône de profil → **Profil → Authentification**. Ce compte contrôlera le site : il doit être bien protégé.

## Étape 3 — Créer le site (Worker) relié à GitHub

Cloudflare regroupe désormais Pages et Workers : le site est créé comme un **Worker** qui sert les fichiers statiques. Sa configuration est dans `wrangler.jsonc`.

1. Dans le menu de gauche : **Workers et Pages** (« Workers & Pages »), puis **Créer** (« Create »).
2. Choisissez **Importer un dépôt** (« Import a repository »), puis **Connecter GitHub**. Une fenêtre GitHub s'ouvre :
   - choisissez **Only select repositories** et sélectionnez uniquement **CyberGarde** ;
   - validez avec **Install & Authorize**.
3. Sélectionnez le dépôt **CyberGarde**, puis renseignez :

   | Champ | Valeur |
   |---|---|
   | Nom du projet | `cybergarde` (**obligatoirement** le même nom que dans `wrangler.jsonc`) |
   | Commande de build | `bash outils/build.sh` |
   | Commande de déploiement | `npx wrangler deploy` (valeur proposée par défaut) |
   | Commande de déploiement des versions non production | `npx wrangler versions upload` (valeur par défaut) |
   | Activer les builds d'aperçu | activé (une adresse d'aperçu pour chaque pull request) |
   | Protéger avec Cloudflare Access | désactivé (le site est public) |
   | Paramètres avancés → Chemin d'accès | `/` |
   | Jeton d'API | **Créer un nouveau jeton**, nom : `cybergarde-build` |

4. Cliquez sur **Déployer**. Après une à deux minutes, le site est en ligne sur une adresse du type `https://cybergarde.votre-compte.workers.dev`.

> Si une erreur indique que le nom ne correspond pas (« name mismatch »), le nom du projet n'est pas `cybergarde` : modifiez-le, ou changez la ligne `"name"` de `wrangler.jsonc`.

Le site utilise des adresses sans « .html » : `/salaries/cours.html` est redirigé vers `/salaries/cours`. C'est normal, tous les liens fonctionnent.

## Étape 4 — Acheter le nom de domaine

**Option A — Chez Cloudflare** (le plus simple, prix coûtant) :

1. Menu de gauche : **Domain Registration → Register Domains**.
2. Cherchez le nom voulu (par exemple `cybergarde.fr` ou `cybergarde-monentreprise.fr`), ajoutez-le au panier et payez.
3. Le domaine apparaît automatiquement dans votre compte Cloudflare.

**Option B — Chez un autre registraire** (OVHcloud, Gandi…), par exemple si l'extension voulue n'est pas proposée par Cloudflare :

1. Achetez le domaine chez le registraire.
2. Sur Cloudflare : **Ajouter un domaine** (« Add a domain »), saisissez le nom, choisissez le plan **Free**.
3. Cloudflare affiche **deux serveurs de noms** (du type `xxx.ns.cloudflare.com`). Chez le registraire, remplacez les serveurs DNS du domaine par ces deux-là (chez OVHcloud : **Noms de domaine → votre domaine → Serveurs DNS → Modifier les serveurs DNS**).
4. Attendez le mail de Cloudflare confirmant que le domaine est actif (de quelques minutes à 24 h).

## Étape 5 — Relier le domaine au site

1. Ouvrez **Workers et Pages → cybergarde → Paramètres → Domaines et itinéraires** (« Domains & Routes ») → **Ajouter** → **Domaine personnalisé**.
2. Saisissez le domaine (par exemple `cybergarde.fr`), puis validez : Cloudflare crée lui-même l'enregistrement DNS et le certificat HTTPS.
3. Recommencez avec `www.cybergarde.fr` si vous voulez que cette adresse fonctionne aussi.
4. Dans le domaine (menu **SSL/TLS**) :
   - **Edge Certificates → Always Use HTTPS** : **activé** ;
   - **Minimum TLS Version** : **TLS 1.2**.

## Étape 6 — Vérifier

1. Ouvrez `https://votre-domaine` : le cadenas HTTPS doit s'afficher.
2. Ouvrez `http://votre-domaine` (sans « s ») : vous devez être redirigé vers la version HTTPS.
3. Essayez une adresse inexistante (`/test`) : la page « Page introuvable » doit s'afficher.
4. Testez les en-têtes de sécurité sur [securityheaders.com](https://securityheaders.com) : la note attendue est **A** ou mieux.
5. Faites un tour de toutes les pages, sur ordinateur et sur téléphone.

## Au quotidien

- **Mettre à jour le site** : fusionnez une pull request sur `main` ; Cloudflare republie le site tout seul en une à deux minutes. L'historique des publications est visible dans **Workers et Pages → cybergarde → Déploiements** (« Deployments »), et l'on peut revenir à une version précédente en un clic (**Rollback**).
- **Prévisualiser avant de publier** : chaque pull request reçoit aussi une adresse d'aperçu, indiquée par Cloudflare dans la pull request.
- **À ne pas activer** : **Web Analytics** et **Rocket Loader**. Ils injectent des scripts externes, que la politique de sécurité du site bloquerait, et la page de confidentialité indique qu'il n'y a pas de mesure d'audience.
- **Renouvellement du domaine** : activez le renouvellement automatique et vérifiez que le moyen de paiement reste valide. Un domaine expiré rend le site inaccessible et peut être racheté par quelqu'un d'autre.

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
