<script lang="ts">
  import type { Recipe } from '../types';

  interface Props {
    store: {
      recipes: Recipe[];
      isLoading: boolean;
      error: string | null;
      loadRecipes: () => Promise<void>;
      clearError: () => void;
      refresh: () => void;
    };
  }

  let { store }: Props = $props();
  let searchTerm = $state<string>('');
  
  // Dérivé pour filtrer les recettes en fonction du terme de recherche
  let filteredRecipes = $derived(
    searchTerm.trim() === '' 
      ? store.recipes 
      : store.recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
  );

  // Réagir aux changements du terme de recherche
  $effect(() => {
    if (searchTerm.length > 0) {
      console.log(`Recherche pour: "${searchTerm}", ${filteredRecipes.length} résultats trouvés`);
    }
  });

</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Rechercher une recette..."
    bind:value={searchTerm}
    class="search-input"
  />
  <button onclick={() => store.refresh()} class="search-button">Actualiser</button>
  
  {#if store.isLoading}
    <p>Chargement...</p>
  {:else if store.error}
    <p class="error">{store.error}</p>
    <button onclick={() => store.clearError()}>Effacer l'erreur</button>
  {:else if searchTerm && filteredRecipes.length === 0}
    <p>Aucune recette trouvée pour "{searchTerm}".</p>
  {:else if searchTerm}
    <p>{filteredRecipes.length} recette(s) trouvée(s) pour "{searchTerm}"</p>
    <ul class="recipe-list">
      {#each filteredRecipes as recipe (recipe.id)}
        <li>
          <strong>{recipe.name}</strong> - {recipe.cuisine}
          <span class="tags">
            {#each recipe.tags.slice(0, 3) as tag}
              <span class="tag">{tag}</span>
            {/each}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .search-container {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }
  
  .search-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .search-button {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #2563eb;
  }
  
  .error {
    color: #dc2626;
    margin: 0.5rem 0;
  }
  
  .recipe-list {
    list-style: none;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .recipe-list li {
    padding: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .tags {
    margin-left: 1rem;
  }
  
  .tag {
    background-color: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }
</style>