import { fetchRecipes } from '../api/recipes';
import type { Recipe } from "../types";

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

export function recipesStore() {
  let recipes = $state<Recipe[]>([]);
  let isLoading = $state<boolean>(false);
  let error = $state<string | null>(null);
  
  const loadRecipes = async () => {
    const storedRecipes = isBrowser ? localStorage.getItem('recipes') : null;
    if (storedRecipes) {
      recipes = JSON.parse(storedRecipes);
    } else {
      try {
        isLoading = true;
        error = null;
        const fetchedRecipes = await fetchRecipes();
        recipes = fetchedRecipes;
        
        // Sauvegarder dans localStorage si on est dans le navigateur
        if (isBrowser) {
          localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
        }
      } catch (err: unknown) {
        error = err instanceof Error ? err.message : 'Une erreur est survenue';
      } finally {
        isLoading = false;
      }
    }
  };

  // Charger les recettes au premier accès
  $effect(() => {
    if (recipes.length === 0 && !isLoading && !error) {
      loadRecipes();
    }
  });
  
  return { 
    get recipes() { return recipes; },
    get isLoading() { return isLoading; },
    get error() { return error; },
    loadRecipes,
    clearError: () => { error = null; },
    refresh: () => {
      if (isBrowser) {
        localStorage.removeItem('recipes');
      }
      recipes = [];
      loadRecipes();
    }
  };
}