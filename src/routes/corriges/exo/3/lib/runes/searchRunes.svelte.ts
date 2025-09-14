import type { Recipe } from '../types';

/**
 * Exemple de rune personnalisée pour la recherche de recettes
 * Démontre l'utilisation des runes Svelte 5 dans un contexte modulaire
 */
export function createSearchRunes(recipes: Recipe[]) {
  let searchTerm = $state<string>('');
  let searchHistory = $state<string[]>([]);
  
  // Résultats filtrés basés sur le terme de recherche
  const filteredRecipes = $derived(
    searchTerm.trim() === '' 
      ? recipes 
      : recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
  );
  
  // Statistiques dérivées
  const searchStats = $derived({
    totalRecipes: recipes.length,
    filteredCount: filteredRecipes.length,
    hasResults: filteredRecipes.length > 0,
    isSearching: searchTerm.length > 0,
    searchHistoryCount: searchHistory.length
  });
  
  // Cuisines disponibles (dérivé unique)
  const availableCuisines = $derived(
    [...new Set(filteredRecipes.map(recipe => recipe.cuisine))].sort()
  );
  
  // Effet pour sauvegarder l'historique de recherche
  $effect(() => {
    if (searchTerm.length > 2 && !searchHistory.includes(searchTerm)) {
      searchHistory = [...searchHistory.slice(-9), searchTerm]; // Garde les 10 dernières recherches
    }
  });
  
  // Effet pour logger les changements (utile pour le debug)
  $effect(() => {
    if (searchTerm.length > 0) {
      console.log(`🔍 Recherche: "${searchTerm}" → ${filteredRecipes.length} résultats`);
    }
  });
  
  // Actions
  const clearSearch = () => {
    searchTerm = '';
  };
  
  const setSearchTerm = (term: string) => {
    searchTerm = term;
  };
  
  const clearHistory = () => {
    searchHistory = [];
  };
  
  const searchFromHistory = (historicTerm: string) => {
    searchTerm = historicTerm;
  };
  
  return {
    // États reactifs
    get searchTerm() { return searchTerm; },
    get filteredRecipes() { return filteredRecipes; },
    get searchStats() { return searchStats; },
    get availableCuisines() { return availableCuisines; },
    get searchHistory() { return searchHistory; },
    
    // Actions
    setSearchTerm,
    clearSearch,
    clearHistory,
    searchFromHistory
  };
}

/**
 * Rune pour gérer les favoris avec localStorage
 */
export function createFavoritesRunes() {
  const STORAGE_KEY = 'recipe-favorites';
  
  // Initialiser les favoris depuis localStorage
  const initFavorites = (): number[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };
  
  let favorites = $state<number[]>(initFavorites());
  
  // Dérivés
  const favoritesCount = $derived(favorites.length);
  const hasFavorites = $derived(favorites.length > 0);
  
  // Effet pour synchroniser avec localStorage
  $effect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  });
  
  // Actions
  const addToFavorites = (recipeId: number) => {
    if (!favorites.includes(recipeId)) {
      favorites = [...favorites, recipeId];
    }
  };
  
  const removeFromFavorites = (recipeId: number) => {
    favorites = favorites.filter(id => id !== recipeId);
  };
  
  const toggleFavorite = (recipeId: number) => {
    if (favorites.includes(recipeId)) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
  };
  
  const isFavorite = (recipeId: number) => favorites.includes(recipeId);
  
  const clearFavorites = () => {
    favorites = [];
  };
  
  return {
    get favorites() { return favorites; },
    get favoritesCount() { return favoritesCount; },
    get hasFavorites() { return hasFavorites; },
    
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
}
