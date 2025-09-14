<script lang="ts">
  import { createSearchRunes, createFavoritesRunes } from '../runes';
  import type { Recipe } from '../types';

  interface Props {
    recipes: Recipe[];
  }

  let { recipes }: Props = $props();
  
  const search = createSearchRunes(recipes);
  const favorites = createFavoritesRunes();
  
  // Exemple d'effet pour surveiller les changements
  $effect(() => {
    console.log('🔍 Runes Example - Search stats updated:', search.searchStats);
  });
  
  $effect(() => {
    console.log('❤️ Runes Example - Favorites updated:', favorites.favoritesCount);
  });
</script>

<div class="runes-example">
  <h3>🧪 Exemple d'utilisation des Runes</h3>
  
  <div class="search-section">
    <h4>Recherche avec Runes</h4>
    <input 
      type="text" 
      placeholder="Rechercher une recette..."
      value={search.searchTerm}
      oninput={(e) => search.setSearchTerm((e.target as HTMLInputElement).value)}
      class="search-input"
    />
    
    <div class="stats">
      <p>📊 Statistiques: {search.searchStats.filteredCount}/{search.searchStats.totalRecipes} recettes</p>
      <p>🏷️ Cuisines disponibles: {search.availableCuisines.join(', ')}</p>
    </div>
    
    {#if search.searchHistory.length > 0}
      <div class="history">
        <h5>Historique de recherche:</h5>
        {#each search.searchHistory as term}
          <button 
            onclick={() => search.searchFromHistory(term)}
            class="history-item"
          >
            {term}
          </button>
        {/each}
        <button onclick={search.clearHistory} class="clear-btn">Effacer</button>
      </div>
    {/if}
  </div>
  
  <div class="favorites-section">
    <h4>Favoris avec Runes</h4>
    <p>❤️ {favorites.favoritesCount} recette(s) en favoris</p>
    
    {#if search.filteredRecipes.length > 0}
      <div class="recipes-grid">
        {#each search.filteredRecipes.slice(0, 6) as recipe}
          <div class="recipe-card">
            <h5>{recipe.name}</h5>
            <p>{recipe.cuisine}</p>
            <button 
              onclick={() => favorites.toggleFavorite(recipe.id)}
              class="favorite-btn"
              class:active={favorites.isFavorite(recipe.id)}
            >
              {favorites.isFavorite(recipe.id) ? '❤️' : '🤍'} 
              {favorites.isFavorite(recipe.id) ? 'Retirer' : 'Ajouter'}
            </button>
          </div>
        {/each}
      </div>
    {/if}
    
    {#if favorites.hasFavorites}
      <button onclick={favorites.clearFavorites} class="clear-btn">
        Effacer tous les favoris
      </button>
    {/if}
  </div>
</div>

<style>
  .runes-example {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  .search-section, .favorites-section {
    margin-bottom: 2rem;
  }
  
  .search-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .stats {
    background: #fff;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  
  .history {
    background: #fff;
    padding: 1rem;
    border-radius: 4px;
  }
  
  .history-item {
    background: #e0f2fe;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .history-item:hover {
    background: #b3e5fc;
  }
  
  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .recipe-card {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
  
  .recipe-card h5 {
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }
  
  .recipe-card p {
    margin: 0 0 1rem 0;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .favorite-btn {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .favorite-btn:hover {
    background: #e5e7eb;
  }
  
  .favorite-btn.active {
    background: #fecaca;
    border-color: #f87171;
    color: #dc2626;
  }
  
  .clear-btn {
    background: #f87171;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .clear-btn:hover {
    background: #ef4444;
  }
  
  h3 {
    margin-top: 0;
    color: #1f2937;
  }
  
  h4 {
    color: #374151;
    margin-bottom: 1rem;
  }
  
  h5 {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
</style>
