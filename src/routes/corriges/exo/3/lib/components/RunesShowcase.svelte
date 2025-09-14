<script lang="ts">
  import type { Recipe } from '../types';

  interface Props {
    recipes: Recipe[];
  }

  let { recipes }: Props = $props();
  
  // ===== RUNES EXAMPLES =====
  
  // 1. $state - Variables réactives
  let searchTerm = $state<string>('');
  let favorites = $state<number[]>([]);
  let showFavorites = $state<boolean>(false);
  let initialized = $state<boolean>(false);
  
  // 2. $derived - Valeurs calculées réactives
  let filteredRecipes = $derived(
    searchTerm.trim() === '' 
      ? recipes 
      : recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
        )
  );
  
  let favoriteRecipes = $derived(
    recipes.filter(recipe => favorites.includes(recipe.id))
  );
  
  let searchStats = $derived({
    total: recipes.length,
    filtered: filteredRecipes.length,
    favorites: favorites.length,
    hasSearch: searchTerm.length > 0
  });
  
  let displayRecipes = $derived(
    showFavorites ? favoriteRecipes : filteredRecipes
  );
  
  // 3. $effect - Effets de bord
  $effect(() => {
    // Logger les changements de recherche
    if (searchTerm.length > 0) {
      console.log(`🔍 Recherche: "${searchTerm}" → ${filteredRecipes.length} résultats`);
    }
  });
  
  $effect(() => {
    // Sauvegarder les favoris dans localStorage (seulement après initialisation)
    if (typeof window !== 'undefined' && initialized) {
      localStorage.setItem('demo3-favorites', JSON.stringify(favorites));
    }
  });
  
  // Charger les favoris depuis localStorage au démarrage (une seule fois)
  $effect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      try {
        const stored = localStorage.getItem('demo3-favorites');
        if (stored) {
          favorites = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Erreur lors du chargement des favoris:', e);
      } finally {
        initialized = true;
      }
    }
  });
  
  // 4. $inspect - Debug réactif
  // $inspect(searchStats, 'Statistiques de recherche');
  
  // Actions
  const toggleFavorite = (recipeId: number) => {
    if (favorites.includes(recipeId)) {
      favorites = favorites.filter(id => id !== recipeId);
    } else {
      favorites = [...favorites, recipeId];
    }
  };
  
  const clearFavorites = () => {
    favorites = [];
  };
  
  const clearSearch = () => {
    searchTerm = '';
  };
</script>

<div class="runes-demo">
  <h3>🧪 Démonstration des Runes Svelte 5</h3>
  
  <!-- État de l'application -->
  <div class="stats-bar">
    <div class="stat">📊 Total: {searchStats.total}</div>
    <div class="stat">🔍 Filtrées: {searchStats.filtered}</div>
    <div class="stat">❤️ Favoris: {searchStats.favorites}</div>
  </div>
  
  <!-- Contrôles -->
  <div class="controls">
    <div class="search-group">
      <input 
        type="text" 
        placeholder="Rechercher une recette..."
        bind:value={searchTerm}
        class="search-input"
      />
      {#if searchTerm}
        <button onclick={clearSearch} class="clear-btn">✕</button>
      {/if}
    </div>
    
    <div class="toggle-group">
      <label class="toggle">
        <input 
          type="checkbox" 
          bind:checked={showFavorites}
        />
        Afficher seulement les favoris
      </label>
      
      {#if favorites.length > 0}
        <button onclick={clearFavorites} class="clear-favorites-btn">
          Effacer tous les favoris
        </button>
      {/if}
    </div>
  </div>
  
  <!-- Message informatif -->
  {#if showFavorites && favorites.length === 0}
    <p class="info-message">
      Aucun favori sélectionné. Cliquez sur ❤️ pour ajouter des recettes en favoris.
    </p>
  {:else if searchStats.hasSearch && displayRecipes.length === 0}
    <p class="info-message">
      Aucune recette trouvée pour "{searchTerm}".
    </p>
  {:else if displayRecipes.length === 0}
    <p class="info-message">
      Chargement des recettes...
    </p>
  {/if}
  
  <!-- Liste des recettes -->
  <div class="recipes-grid">
    {#each displayRecipes.slice(0, 8) as recipe (recipe.id)}
      <div class="recipe-card">
        <img src={recipe.image} alt={recipe.name} class="recipe-image" />
        <div class="recipe-info">
          <h4>{recipe.name}</h4>
          <p class="cuisine">{recipe.cuisine}</p>
          <div class="recipe-meta">
            <span class="difficulty">{recipe.difficulty}</span>
            <span class="rating">⭐ {recipe.rating}</span>
          </div>
          <button 
            onclick={() => toggleFavorite(recipe.id)}
            class="favorite-btn"
            class:active={favorites.includes(recipe.id)}
          >
            {favorites.includes(recipe.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    {/each}
  </div>
  
  {#if displayRecipes.length > 8}
    <p class="more-results">
      ... et {displayRecipes.length - 8} autres recettes
    </p>
  {/if}
</div>

<style>
  .runes-demo {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    color: white;
  }
  
  .runes-demo h3 {
    margin: 0 0 1.5rem 0;
    text-align: center;
    font-size: 1.5rem;
  }
  
  .stats-bar {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  
  .stat {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    backdrop-filter: blur(10px);
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .search-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
  }
  
  .clear-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toggle-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .clear-favorites-btn {
    background: rgba(220, 38, 38, 0.8);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .info-message {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .recipe-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    overflow: hidden;
    color: #374151;
    transition: transform 0.2s;
  }
  
  .recipe-card:hover {
    transform: translateY(-2px);
  }
  
  .recipe-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .recipe-info {
    padding: 1rem;
    position: relative;
  }
  
  .recipe-info h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .cuisine {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0 0 0.5rem 0;
  }
  
  .recipe-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
  }
  
  .difficulty {
    background: #e0f2fe;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    text-transform: capitalize;
  }
  
  .favorite-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .favorite-btn:hover {
    transform: scale(1.2);
  }
  
  .favorite-btn.active {
    animation: heartbeat 0.6s ease-in-out;
  }
  
  .more-results {
    text-align: center;
    margin-top: 1rem;
    font-style: italic;
    opacity: 0.8;
  }
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  
  @media (max-width: 768px) {
    .runes-demo {
      padding: 1rem;
    }
    
    .stats-bar {
      gap: 1rem;
    }
    
    .controls {
      gap: 0.75rem;
    }
    
    .toggle-group {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
