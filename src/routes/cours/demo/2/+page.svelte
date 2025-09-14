<script>
  import ProductList from './lib/components/ProductList.svelte';
  import Cart from './lib/components/Cart.svelte';
  import productsData from './lib/constants/products.json';

  let products = productsData.products;

</script>

<h2><strong>Demo 02:</strong>Posts Instagram</h2>
<br />
<ul>
  <li>Props (import, export)</li>
  <li>Composants (parent, enfant)</li>
  <li>Stores (subscribe, update, set)</li>
</ul>
