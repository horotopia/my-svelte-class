<script>
  import ProductCard from './ProductCard.svelte';

  export let products = [];
</script>

<div class="flex flex-row items-center">
    <ul class="flex flex-wrap justify-center">
      {#if products.length === 0}
        <p class="text-gray-500">Aucun produit disponible.</p>
      {/if}
      {#each products as product}
        <ProductCard {product}>
          <h2 class="text-2xl font-bold mb-4">{product.name}</h2>
          <p class="text-gray-600">${product.price}</p>
        </ProductCard>
      {/each}
    </ul>
</div>