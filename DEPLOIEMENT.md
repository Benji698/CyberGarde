# Déploiement de CyberGarde avec connexion Microsoft obligatoire

Le site est publié sur **Azure Static Web Apps**. Il est accessible depuis Internet, mais **chaque visiteur doit se connecter avec son compte professionnel Microsoft** (Microsoft Entra ID, le même compte que pour Outlook ou Teams). Les comptes personnels (outlook.com, hotmail…) et les comptes des autres entreprises sont refusés.

```
Visiteur ──► Azure Static Web Apps ──► pas connecté ? ──► page de connexion Microsoft de l'entreprise
                     │                                            │
                     └──────────── connecté avec un compte de l'entreprise ◄┘
                                   → accès au site
```

Ce qui est déjà prêt dans le dépôt :

| Fichier | Rôle |
|---|---|
| `staticwebapp.config.json` | Toutes les pages exigent une connexion ; connexion via le locataire Microsoft Entra de l'entreprise uniquement ; en-têtes de sécurité (CSP stricte, HSTS, anti-clickjacking…). |
| `.github/workflows/deploy-azure.yml` | À chaque mise à jour de `main`, publie automatiquement le site (uniquement les fichiers du site : ni le README, ni `outils/`). |
| `assets/js/ui.js` | Affiche le compte connecté et un lien « Se déconnecter » dans le pied de page. |

Il reste à créer les ressources côté Azure et Microsoft Entra, ce qui demande des droits d'administration : **à faire avec le service informatique**.

## Prérequis

- Un abonnement **Azure** de l'entreprise, avec le droit de créer une ressource.
- Le droit de créer une **inscription d'application** dans Microsoft Entra ID (rôle « Développeur d'applications » au minimum).
- Être administrateur du dépôt GitHub (pour ajouter un secret et une variable).

> **Coût** : la restriction aux seuls comptes de l'entreprise nécessite le plan **Standard** d'Azure Static Web Apps (environ 9 € par mois). Le plan gratuit accepte n'importe quel compte Microsoft, ce qui ne convient pas ici.

## Étape 1 — Créer la Static Web App

1. Sur [portal.azure.com](https://portal.azure.com), cliquez sur **Créer une ressource** et recherchez **Static Web App**.
2. Renseignez :
   - **Groupe de ressources** : par exemple `rg-cybergarde` ;
   - **Nom** : `cybergarde` ;
   - **Type de plan** : **Standard** ;
   - **Source de déploiement** : **Autre** (le workflow GitHub est déjà dans le dépôt ; choisir « GitHub » ici en créerait un second).
3. Cliquez sur **Vérifier + créer**, puis **Créer**.
4. Ouvrez la ressource et notez son **URL** (du type `https://nom-aleatoire.azurestaticapps.net`).

## Étape 2 — Relier GitHub à Azure

1. Dans la Static Web App, cliquez sur **Gérer le jeton de déploiement** et copiez le jeton.
2. Dans le dépôt GitHub : **Settings → Secrets and variables → Actions**.
3. Onglet **Secrets** → **New repository secret** :
   - Nom : `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Valeur : le jeton copié.

## Étape 3 — Inscrire l'application dans Microsoft Entra ID

1. Sur le portail, ouvrez **Microsoft Entra ID → Inscriptions d'applications → Nouvelle inscription**.
2. Renseignez :
   - **Nom** : `CyberGarde` ;
   - **Types de comptes pris en charge** : **Comptes dans cet annuaire d'organisation uniquement (locataire unique)**. C'est ce réglage qui limite l'accès aux salariés de l'entreprise.
   - **URI de redirection** : plateforme **Web**, adresse `https://VOTRE-URL/.auth/login/aad/callback` (avec l'URL notée à l'étape 1).
3. Cliquez sur **S'inscrire**, puis notez sur la page **Vue d'ensemble** :
   - l'**ID d'application (client)** ;
   - l'**ID de l'annuaire (locataire)**.
4. Menu **Authentification** : cochez **Jetons d'ID** (section « Octroi implicite et flux hybrides »), puis **Enregistrer**.
5. Menu **Certificats et secrets → Nouveau secret client** : donnez une description et une durée (24 mois maximum), puis **copiez immédiatement la valeur** (elle ne sera plus affichée).

> ⚠ Notez dans votre agenda la date d'expiration du secret : une fois expiré, plus personne ne pourra se connecter. Il faudra alors en créer un nouveau et mettre à jour `AZURE_CLIENT_SECRET` (étape 4).

## Étape 4 — Donner les identifiants à la Static Web App

Dans la Static Web App : **Paramètres → Variables d'environnement**, ajoutez :

| Nom | Valeur |
|---|---|
| `AZURE_CLIENT_ID` | l'ID d'application (client) |
| `AZURE_CLIENT_SECRET` | la valeur du secret client |

Cliquez sur **Appliquer**.

## Étape 5 — Indiquer le locataire à GitHub

Dans le dépôt GitHub : **Settings → Secrets and variables → Actions**, onglet **Variables** → **New repository variable** :

- Nom : `AZURE_TENANT_ID`
- Valeur : l'ID de l'annuaire (locataire) noté à l'étape 3.

Ce n'est pas un secret (l'ID de locataire n'est pas confidentiel), mais il est propre à l'entreprise : c'est pourquoi il n'est pas écrit en dur dans le dépôt.

## Étape 6 — Publier

Dans le dépôt GitHub : **Actions → Déploiement Azure → Run workflow**. Ensuite, chaque fusion sur `main` republiera automatiquement le site.

## Étape 7 — Vérifier

1. Ouvrez l'URL du site dans une **fenêtre de navigation privée** : vous devez être redirigé vers la page de connexion Microsoft.
2. Connectez-vous avec votre compte professionnel : le site s'affiche, et votre adresse apparaît en bas de page avec le lien « Se déconnecter ».
3. Essayez avec un compte personnel (outlook.com, hotmail…) : la connexion doit être refusée.
4. Contrôlez les en-têtes de sécurité, par exemple avec les outils de développement du navigateur (onglet Réseau → en-têtes de la réponse).

## Options

**Réserver le site à certains salariés.** Dans **Microsoft Entra ID → Applications d'entreprise → CyberGarde → Propriétés**, passez **Affectation requise ?** à **Oui**, puis ajoutez les utilisateurs ou groupes autorisés dans **Utilisateurs et groupes**. Par défaut, tous les comptes de l'entreprise ont accès.

**Utiliser une adresse de l'entreprise** (par exemple `cyber.monentreprise.fr`). Dans la Static Web App : **Domaines personnalisés → Ajouter**, puis créez l'enregistrement DNS (CNAME) indiqué. Ajoutez ensuite `https://cyber.monentreprise.fr/.auth/login/aad/callback` dans les URI de redirection de l'inscription d'application (étape 3).

## Ce que le site collecte

Rien. Il n'y a ni base de données ni suivi : la connexion sert uniquement à contrôler l'accès, et la progression de chaque salarié reste enregistrée dans son propre navigateur. L'entreprise ne peut donc pas savoir qui a suivi le parcours ; pour cela, il faudrait ajouter une partie serveur ou passer par la plateforme de formation (LMS) de l'entreprise.
