# Démo 02 - Gestion de Panier

## Enoncé de l'exercice
  Faites une application Svelte qui affiche une liste de produits et permet aux utilisateurs d'ajouter des produits à un panier. Utilisez des composants, des props et un store pour gérer l'état du panier.

## Objectif
  - Utiliser des composants pour afficher les produits et le panier.
  - Utiliser des props pour passer des données entre les composants.
  - Utiliser un store pour gérer l'état du panier.

## Structure du projet
  Voici la structure du projet pour cette démo :

```
src/
├── components/
│   ├── common/
│   |   └── Divider.svelte
│   ├── Cart.svelte
│   ├── ProductCard.svelte
│   └── ProductList.svelte
├── constants/
│   └── products.js
├── lib/
│   ├── stores/
│   │   ├── cartStore.js
│   │   └── index.js
│   └── index.ts
├── types/
│   ├── index.ts
│   └── product.d.ts
└── routes/
    └── demo/
        └── 2/
            └── demo2.svelte
```

## 1 - Les Composants
  - **Divider.svelte** : Un composant simple pour séparer visuellement les sections.
  - **ProductCard.svelte** : Affiche les détails d'un produit et un bouton pour l'ajouter au panier.
  - **ProductList.svelte** : Liste tous les produits disponibles.
  - **Cart.svelte** : Affiche les produits ajoutés au panier.

### 1.1 - Composant parent
  Le composant parent `demo2.svelte` importe les composants nécessaires et gère l'état du panier.

```svelte
<script>
  import ProductList from '../components/ProductList.svelte';
  import Cart from '../components/Cart.svelte';
</script>

<ProductList />
<Cart />
```
### 1.2 - Composant enfant
  Le composant `ProductCard.svelte` reçoit un produit en prop et permet de l'ajouter au panier.

```svelte
<script>
  export let product;
</script>
<div>
  <h3>{product.name}</h3>
  <p>Prix: {product.price} €</p>
</div>
```

## 2 - Les Props
  Les composants utilisent des props pour recevoir des données. Par exemple, `ProductList` reçoit une liste de produits et `Cart` reçoit les produits du panier.

### 2.1 - Importation de données
  Les données des produits sont importées depuis un fichier `products.js` dans le dossier `constants`.

```svelte
<script>
  import { products } from '../constants/products.js';
</script>

<ProductList {products} />
``` 

### 2.2 - Exportation de données
  Il les exporte pour les utiliser dans d'autres composants.

```svelte
<script>
  export let products = [];
</script>

{#each products as product}
  <ProductCard {product} />
{/each}
```

### 2.3 - Children
  Les composants enfants peuvent recevoir des props et les utiliser pour afficher des informations dynamiques.

#### 2.3.1 - Dans le composant enfant
```svelte
<div>
  <slot />
</div>
```

#### 2.3.2 - Dans le composant parent
```svelte
<script>
  import Card from './Card.svelte';
</script>

<Card>
  <h2>Produit</h2>
  <p>Description du produit</p>
</Card>
```

## 3 - Stores
  Le store `cartStore.js` gère l'état du panier. Il permet d'ajouter des produits, de les récupérer et de supprimer le panier.

### 3.1 - writable
  `writable` créer le store et définir l'état initial du panier.
```typescript
import { writable } from 'svelte/store';

export const cartStore = writable([]);
```

### 3.2 - subscribe
  `subscribe` permet de réagir aux changements du store.

```typescript
import { cartStore } from './cartStore';

cartStore.subscribe((items) => {
  console.log('Panier mis à jour:', items);
});
```

### 3.3 - update
  `update` permet de modifier l'état du store.
```typescript
cartStore.update((items) => {
  return [...items, newItem];
});
```

### 3.4 - set
  `set` permet de remplacer complètement l'état du store.
```typescript
cartStore.set([newItem]);
```
