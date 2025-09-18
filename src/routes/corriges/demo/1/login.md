# Login

## Introduction

Nous utiliserons la création d'un login afin de vous montrer les premiers pas avec Svelte et Typescript.
Pour ce faire, nous utiliserons une API publique de test (https://dummyjson.com/auth/login) pour rendre cet exercice plus réaliste. Pour ce faire, nous utiliserons 2 usernames et leur mot de passe: emilys et michaelw.

## Arborescence du projet

```
├── +page.svelte          # Interface utilisateur de connexion
├── lib/
│   └── api/
│       └── auth.ts       # Service d'authentification
└── login.md             # Documentation (ce fichier)
```

## Fichiers principaux

### 1. page utilisateur (`+page.svelte`)

**Fonctionnalités :**
- Formulaire de connexion avec champs nom d'utilisateur et mot de passe
- Validation et gestion des erreurs
- Affichage du profil utilisateur après connexion réussie
- Design responsive avec Tailwind CSS

**Variables d'état :**
- `username: string` - Nom d'utilisateur saisi
- `password: string` - Mot de passe saisi
- `errorMessage: string` - Messages d'erreur à afficher
- `isValid: boolean | null` - État de validation de la connexion
- `profil: object` - Données du profil utilisateur

### 2. Service d'authentification (`lib/api/auth.ts`)

**API utilisée :** `https://dummyjson.com/auth/login`

**Fonction principale :**
```typescript
fetchAuth(username: string, password: string)
```

**Comportement :**
- Effectue une requête POST vers l'API d'authentification
- Retourne les données utilisateur en cas de succès
- Retourne un tableau vide en cas d'échec
- Gère les erreurs réseau et HTTP

## Interface utilisateur

### Design
- **Framework CSS :** Tailwind CSS
- **Thème :** Support du mode sombre/clair
- **Responsive :** Optimisé pour mobile et desktop
- **Animations :** Labels flottants avec transitions CSS

### Éléments visuels
1. **Titre principal :** "Connexion"
2. **Message d'accueil :** "Bon retour parmi nous !"
3. **Champs de saisie :**
   - Nom d'utilisateur (obligatoire)
   - Mot de passe (obligatoire)
4. **Liens utilitaires :**
   - Mot de passe oublié → `/forgot-password`
   - Créer un compte → `/register`
5. **Bouton de connexion :** Style bleu avec effet hover

## Flux d'authentification

### 1. Saisie des données
```typescript
// Variables réactives liées aux champs du formulaire
let username: string = '';
let password: string = '';
```

### 2. Validation et envoi
```typescript
let handleLogin = async () => {
    errorMessage = '';
    
    await fetchAuth(username, password)
        .then((result) => {
            if (result.length !== 0) {
                isValid = true;
                profil = result;
            } else {
                isValid = false;
                errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
            }
        })
        .catch((err) => {
            isValid = false;
            errorMessage = 'Erreur lors de la connexion.';
        });
};
```

### 3. Gestion des réponses

**Succès (`isValid = true`) :**
- Affichage de l'avatar utilisateur
- Icône de validation verte
- Message de bienvenue personnalisé : "{lastName} {firstName}, vous êtes connecté !"

**Échec (`isValid = false`) :**
- Message d'erreur en rouge
- Différents types d'erreurs gérés :
  - Identifiants incorrects
  - Erreur réseau/serveur

## 📊 Structure des données utilisateur

```typescript
interface UserProfile {
    accessToken: string;     // Token d'accès JWT
    Email: string;           // Adresse email
    firstName: string;       // Prénom
    gender: string;          // Genre
    id: string;             // Identifiant unique
    image: string;          // URL de l'avatar
    lastName: string;       // Nom de famille
    refreshToken: string;   // Token de rafraîchissement
    username: string;       // Nom d'utilisateur
}
```

## 🔄 États de l'application

| État | Valeur `isValid` | Affichage |
|------|------------------|-----------|
| Initial | `null` | Formulaire de connexion uniquement |
| Succès | `true` | Formulaire + Profil utilisateur |
| Échec | `false` | Formulaire + Message d'erreur |

## 🎯 Fonctionnalités avancées

### Gestion des erreurs
- **Validation côté client :** Champs obligatoires
- **Gestion réseau :** Capture des erreurs HTTP et réseau
- **Messages utilisateur :** Affichage contextuel des erreurs

### Expérience utilisateur
- **Labels flottants :** Animation smooth des labels de champs
- **Feedback visuel :** Couleurs et icônes pour indiquer l'état
- **Accessibilité :** Labels associés aux champs, contrastes respectés

### Sécurité
- **Champ mot de passe :** Type `password` pour masquer la saisie
- **Tokens JWT :** Gestion des tokens d'accès et de rafraîchissement
- **Validation serveur :** Délégation de l'authentification à l'API

## 🚀 Utilisation

### Prérequis
- Node.js et npm/pnpm installés
- Accès à l'API DummyJSON
- Framework Svelte configuré

### Installation
```bash
# Dans le répertoire du projet
npm install
# ou
pnpm install
```

### Lancement
```bash
npm run dev
# ou
pnpm dev
```

### Test de connexion
Utilisez les identifiants de test fournis par DummyJSON :
- **Username :** `emilys`
- **Password :** `emilyspass`

## 🔧 Configuration

### API Endpoint
```typescript
const API_BASE_URL = 'https://dummyjson.com/auth';
```

Pour utiliser une autre API, modifiez cette constante dans `lib/api/auth.ts`.

### Styling
Le composant utilise Tailwind CSS. Pour personnaliser l'apparence, modifiez les classes dans `+page.svelte`.

## 📝 Notes techniques

- **Réactivité Svelte :** Utilisation de `bind:value` pour la liaison bidirectionnelle
- **TypeScript :** Typage strict pour la sécurité du code
- **Async/Await :** Gestion asynchrone des appels API
- **Error Handling :** Try-catch pour les erreurs réseau
- **Conditional Rendering :** Blocs `{#if}` pour l'affichage conditionnel

## 🐛 Débogage

### Problèmes courants
1. **Erreur CORS :** Vérifier la configuration du serveur
2. **API indisponible :** Vérifier la connexion réseau
3. **Identifiants refusés :** Utiliser les credentials de test valides

### Logs
Les erreurs sont loggées dans la console du navigateur via `console.error()`.

## 🔄 Améliorations possibles

1. **Persistance :** Sauvegarde du token dans localStorage
2. **Auto-logout :** Déconnexion automatique après expiration
3. **Validation :** Validation des formats email/mot de passe
4. **Loading :** Indicateur de chargement pendant l'authentification
5. **Remember me :** Option "Se souvenir de moi"
6. **2FA :** Authentification à deux facteurs