<script>
  import ProductList from './lib/components/ProductList.svelte';
  import Cart from './lib/components/Cart.svelte';
  import productsData from './lib/constants/products.json';

  let products = productsData.products;

</script>

<h2><strong>Demo 02:</strong> Gestion de panier</h2>

<!-- <ul>
  <li>Props (import, export)</li>
  <li>Composants (parent, enfant)</li>
  <li>Stores (subscribe, update, set)</li>
</ul> -->

<div class="flex flex-row mt-8">
  <div class="w-2/3 ">
    <ProductList {products} />
  </div>
  <div class="w-1/3 mt-3">
    <Cart />
  </div>
</div>
