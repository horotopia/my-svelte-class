<script lang="ts">
  import type { Recipe } from './lib/types';
	import Card from './lib/components/common/Card.svelte';
	import List from './lib/components/common/List.svelte';
	import SearchBar from './lib/components/searchBar.svelte';
  import RunesShowcase from './lib/components/RunesShowcase.svelte';
  import { recipesStore } from './lib/stores/recipesStore.svelte';

  const store = recipesStore();

  // Les données du store sont automatiquement réactives grâce aux runes
  // $inspect(store.recipes, 'recipes from store');

  // TODO: à refaire
</script>


<h2><strong>Demo 03 :</strong> Runes</h2>

<!-- <ul>
  <li>$state (readable, writable)</li>
  <li>$derived ()</li>
  <li>$effect ()</li>
  <li>$props ()</li>
  <li>$bindable ()</li>
  <li>$inspect ()</li>
  <li>$host ()</li>
  <li>onclick et plus on:click </li>
</ul>  -->
<SearchBar {store} />

<RunesShowcase recipes={store.recipes} />

<List>
    {#if store.isLoading}
      <p>Chargement des recettes...</p>
    {:else if store.error}
      <p>Erreur : {store.error}</p>
    {:else}
      {#each store.recipes as recipe}
        <Card>
          <a href="/demo/3/{recipe.id}" class="recipe-link">
            <img src={recipe.image} alt={recipe.name} class="w-full object-cover rounded-t" />
            <div class="p-4">
              <h3 class="font-semibold mb-2">{recipe.name}</h3>
              <p class="text-sm text-gray-600">{recipe.cuisine}</p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs bg-blue-100 px-2 py-1 rounded">{recipe.difficulty}</span>
                <span class="text-xs">⭐ {recipe.rating}/5</span>
              </div>
            </div>
          </a>
        </Card>
      {/each}
    {/if}
</List>

<style>
  .recipe-link {
    text-decoration: none;
    color: inherit;
    display: block;
    transition: transform 0.2s;
  }
  
  .recipe-link:hover {
    transform: scale(1.02);
  }
</style>
