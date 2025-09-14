<script>
  import { cartStore, deleteOneProductFromCart } from '../stores';
  import Divider from './common/Divider.svelte';

  let totalQuantity = () => {
    return $cartStore.reduce((acc, product) => acc + product.quantity, 0);
  };
  let totalPrice = () => {
    return $cartStore.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };
</script>


<section class="flex flex-col w-min-64 h-full p-4 border rounded shadow-md">
  <div class="flex flex-row justify-between mb-4">
  <h2 class="text-xl font-bold mb-4">Panier</h2>
  <p class="text-gray-600">Nombre d'articles: {totalQuantity()}</p>
  </div>
  <Divider />
  <ul class="items-center">
    {#if $cartStore.length === 0}
      <p class="text-gray-500">Votre panier est vide.</p>
    {:else}
      {#each $cartStore as product}
      <li class="flex justify-between w-full py-2">
        <p class="font-semibold">{product.name}</p>
        <p>(x{product.quantity})</p>
        <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteOneProductFromCart(product.id)}>
          X
        </button>
      </li>
      {/each}
      <Divider />
      <li class="mt-4 font-bold">Total: ${totalPrice().toFixed(2)}</li>
    {/if}
  </ul>
</section>
