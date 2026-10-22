# Mise en ligne de CyberGarde sur Cloudflare Pages

Le site est hébergé sur **Cloudflare Pages** :

- hébergement **gratuit**, en **HTTPS** avec un certificat créé et renouvelé automatiquement ;
- **en-têtes de sécurité** stricts (fichier `_headers`) ;
- aucun serveur à maintenir, aucune base de données, aucun compte : la progression de chaque visiteur reste dans son propre navigateur ;
- **publication automatique** : à chaque mise à jour de la branche `main` sur GitHub, Cloudflare republie le site.

Le seul coût est le **nom de domaine** (par exemple `cybergarde.fr`), environ 10 € par an.

Ce qui est déjà prêt dans le dépôt :

| Fichier | Rôle |
|---|---|
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

## Étape 3 — Créer le projet Pages relié à GitHub

1. Dans le menu de gauche : **Workers et Pages** (« Workers & Pages »), puis **Créer** (« Create »).
2. Choisissez l'onglet **Pages**, puis **Importer un dépôt Git existant** (« Import an existing Git repository »).
3. Cliquez sur **Connecter GitHub**. Une fenêtre GitHub s'ouvre :
   - choisissez **Only select repositories** et sélectionnez uniquement **CyberGarde** ;
   - validez avec **Install & Authorize**.
4. De retour sur Cloudflare, sélectionnez le dépôt **CyberGarde**, puis **Commencer la configuration** (« Begin setup »).
5. Renseignez :

   | Champ | Valeur |
   |---|---|
   | Nom du projet | `cybergarde` (il donne l'adresse provisoire `cybergarde.pages.dev`) |
   | Branche de production | `main` |
   | Préréglage de framework (« Framework preset ») | **Aucun** (« None ») |
   | Commande de build | `bash outils/build.sh` |
   | Répertoire de sortie (« Build output directory ») | `public` |

6. Cliquez sur **Enregistrer et déployer** (« Save and Deploy »). Après environ une minute, le site est en ligne sur `https://cybergarde.pages.dev` (ou une variante si le nom est déjà pris).

> Si l'interface ne propose que la création d'un **Worker** et plus d'onglet Pages, ne continuez pas : la configuration est légèrement différente, il faudra l'adapter.

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

1. Ouvrez **Workers et Pages → cybergarde → Domaines personnalisés** (« Custom domains ») → **Configurer un domaine personnalisé**.
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

- **Mettre à jour le site** : fusionnez une pull request sur `main` ; Cloudflare republie le site tout seul en une à deux minutes. L'historique des publications est visible dans **Workers et Pages → cybergarde → Déploiements**, et l'on peut revenir à une version précédente en un clic (**Rollback**).
- **Prévisualiser avant de publier** : chaque pull request reçoit aussi une adresse d'aperçu privée (`xxxx.cybergarde.pages.dev`), indiquée par Cloudflare dans la pull request.
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
