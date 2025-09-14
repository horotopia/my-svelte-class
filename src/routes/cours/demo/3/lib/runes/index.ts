/**
 * Index des runes personnalisées pour le Demo 3
 * Demonstre l'utilisation des runes Svelte 5 dans un contexte modulaire
 */

export { createSearchRunes, createFavoritesRunes } from './searchRunes.svelte';

// Exemple d'utilisation dans un composant :
/*
<script lang="ts">
  import { createSearchRunes, createFavoritesRunes } from './lib/runes';
  import { recipesStore } from './lib/stores/recipesStore';
  
  const store = recipesStore();
  const search = createSearchRunes(store.recipes);
  const favorites = createFavoritesRunes();
  
  // Utilisation des runes
  $inspect(search.searchStats, 'Search statistics');
  $inspect(favorites.favoritesCount, 'Favorites count');
</script>
*/
