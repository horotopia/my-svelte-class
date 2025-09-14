<script>
  import { addToCartStore } from '../stores';
  export let product;
</script>

<div class="border border-gray-200 w-64 p-4 m-4 rounded shadow-md">
  <slot />
  <button 
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-auto block cursor-pointer"
    on:click={() => addToCartStore(product)}
  >
    Mettre au panier
  </button>
</div>