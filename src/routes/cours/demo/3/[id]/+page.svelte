<script lang="ts">
  import { page } from '$app/stores';
  import { recipesStore } from '../lib/stores/recipesStore.svelte';
  import Card from '../lib/components/common/Card.svelte';

  const store = recipesStore();
  
  // Récupérer l'ID depuis les paramètres d'URL (méthode correcte pour Svelte 5)
  let recipeId = $derived(Number($page.params.id));
  
  // Trouver la recette correspondante
  let recipe = $derived(
    store.recipes.find(r => r.id === recipeId)
  );
  
  // Debug
  // $inspect(recipeId, 'Recipe ID');
  // $inspect(recipe, 'Found recipe');
</script>

<div class="recipe-detail">
  <a href="/demo/3" class="back-link">← Retour aux recettes</a>
  
  {#if store.isLoading}
    <p>Chargement de la recette...</p>
  {:else if store.error}
    <p class="error">Erreur : {store.error}</p>
  {:else if recipe}
    <Card>
      <div class="recipe-content">
        <img src={recipe.image} alt={recipe.name} class="recipe-image" />
        <div class="recipe-info">
          <h1>{recipe.name}</h1>
          <div class="recipe-meta">
            <span class="cuisine">{recipe.cuisine}</span>
            <span class="difficulty">Difficulté: {recipe.difficulty}</span>
            <span class="servings">{recipe.servings} portions</span>
            <span class="rating">⭐ {recipe.rating}/5 ({recipe.reviewCount} avis)</span>
          </div>
          
          <div class="times">
            <span>Préparation: {recipe.prepTimeMinutes} min</span>
            <span>Cuisson: {recipe.cookTimeMinutes} min</span>
            <span>Calories: {recipe.caloriesPerServing}/portion</span>
          </div>
          
          <div class="tags">
            {#each recipe.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          
          <div class="meal-types">
            <strong>Type de repas:</strong>
            {#each recipe.mealType as meal}
              <span class="meal-type">{meal}</span>
            {/each}
          </div>
        </div>
      </div>
      
      <div class="recipe-details">
        <div class="ingredients">
          <h2>Ingrédients</h2>
          <ul>
            {#each recipe.ingredients as ingredient}
              <li>{ingredient}</li>
            {/each}
          </ul>
        </div>
        
        <div class="instructions">
          <h2>Instructions</h2>
          <ol>
            {#each recipe.instructions as instruction, index}
              <li>
                <strong>Étape {index + 1}:</strong> {instruction}
              </li>
            {/each}
          </ol>
        </div>
      </div>
    </Card>
  {:else}
    <p>Recette non trouvée (ID: {recipeId})</p>
  {/if}
</div>

<style>
  .recipe-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #3b82f6;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .recipe-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .recipe-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .recipe-info h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .recipe-meta span {
    background-color: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .times {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .times span {
    background-color: #e0f2fe;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .tags {
    margin-bottom: 1rem;
  }
  
  .tag {
    background-color: #ddd6fe;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    display: inline-block;
  }
  
  .meal-types {
    margin-bottom: 1rem;
  }
  
  .meal-type {
    background-color: #fef3c7;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
  
  .recipe-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .ingredients ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  
  .instructions ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }
  
  .instructions li {
    margin-bottom: 1rem;
  }
  
  .error {
    color: #dc2626;
  }
  
  @media (max-width: 768px) {
    .recipe-details {
      grid-template-columns: 1fr;
    }
    
    .recipe-meta {
      flex-direction: column;
    }
  }
</style>