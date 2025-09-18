# My Svelte Class

Projet éducatif pour apprendre SvelteKit avec des démos pratiques et des exercices progressifs.

## Structure du cours

Ce projet contient des démonstrations et exercices organisés par niveau de difficulté :

### Démos (Corrections)
- **Demo 1** - [Système de Login](src/routes/corriges/demo/1/) : Authentification avec API REST
- **Demo 2** - [Posts Instagram](src/routes/corriges/demo/2/) : Interface sociale avec likes et commentaires
- **Demo 3** - [Stories Instagram](src/routes/corriges/demo/3/) : Stories avec runes Svelte 5

### Exercices
- **Exercice 1** - [Premiers pas](src/routes/cours/exo/1/) : Introduction aux composants
- **Exercice 2** - [Gestion de panier](src/routes/cours/exo/2/) : Props, stores et événements
- **Exercice 3** - [Recherche de recettes](src/routes/cours/exo/3/) : Runes et API

## Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm, pnpm ou yarn

### Installation

```sh
# Cloner le projet
git clone <repository-url>
cd my-svelte-class

# Installer les dépendances
npm install
# ou
pnpm install
```

### Développement

Démarrer le serveur de développement :

```sh
npm run dev

# Ou ouvrir automatiquement dans le navigateur
npm run dev -- --open
```

L'application sera accessible sur `http://localhost:5173`

## Objectifs pédagogiques

### Concepts Svelte/SvelteKit couverts :
- **Bases Svelte** : Syntaxe de base, Réactivité, événements, conditions, binding
- **Composants** : Création, Parents, Enfants
- **Props** : Import, Export, Children
- **Stores** : État global et réactivité
- **Routing** : Navigation et paramètres
- **API Routes** : Backend avec SvelteKit
- **Authentication** : Gestion des utilisateurs
- **Database** : MongoDB avec Mongoose
- **Styling** : Tailwind CSS

### Technologies utilisées :
- **Framework** : SvelteKit
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : MongoDB
- **Testing** : Vitest
- **Linting** : ESLint

## Documentation

Chaque démo contient sa propre documentation détaillée :

- [Login System](src/routes/corriges/demo/1/login.md)
- [Posts Instagram](src/routes/corriges/demo/2/postsInsta.md)
- [Stories Instagram](src/routes/corriges/demo/3/storiesInsta.md)

## Scripts disponibles

```sh
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Tests
npm run test
npm run test:ui

# Linting
npm run lint
```

## Structure du projet

```
src/
├── routes/
│   ├── corriges/          # Solutions des exercices
│   │   ├── demo/1/        # Login avec authentification
│   │   ├── demo/2/        # Posts Instagram
│   │   └── demo/3/        # Stories Instagram
│   ├── cours/             # Exercices à compléter
│   │   ├── demo/          # Démos de cours
│   │   └── exo/           # Exercices pratiques
│   └── demo/              # Démos supplémentaires
├── lib/                   # Composants réutilisables
└── app.html               # Template principal
```

## Configuration

### Base de données
Pour les démos avec MongoDB, configurez les variables d'environnement :

```env
MONGODB_URI=mongodb://localhost:27017/svelte-class
```

### Tailwind CSS
Le projet utilise Tailwind CSS pour le styling. Configuration dans `tailwind.config.js`.

## Progression recommandée

1. **Commencer par les cours** (`src/routes/cours/`)
2. **Consulter les démos** pour voir les implémentations des professeurs
3. **Étudier les corrections** (`src/routes/corriges/`)
4. **Expérimenter** et modifier le code

## Ressources

- [Documentation Svelte](https://svelte.dev/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Contribution

Ce projet est à des fins éducatives. N'hésitez pas à :
- Proposer des améliorations
- Signaler des bugs
- Ajouter de nouveaux exercices

## License

MIT License