<script lang="ts">
  
  let count = 0;
  $: doubled = count * 2;

  // Ajouter une fonction pour incrémenter le compteur
  function increment() {
    count += 1;
  }
  
  // Ajouter une fonction pour décrémenter le compteur
  function decrement() {
    count -= 1;
  }
  
  // Ajouter une fonction pour réinitialiser le compteur
  function reset() {
    count = 0;
  }

</script>

<h2><strong>Exercice 01 :</strong> créer un compteur basique.</h2>

<p class="flex items-center justify-center mt-64 mb-8 text-xl font-semibold">Compteur : {count}</p>
<p class="flex items-center justify-center mb-8 text-xl font-semibold">Doubler : {doubled}</p>

<div class="flex items-center justify-center space-x-8">
  <button 
    on:click={increment}
    class="bg-green-500 active:bg-green-700 w-8 h-8 rounded cursor-pointer font-bold"
  >+</button>
  <button 
    on:click={reset}
    class="bg-gray-300 active:bg-gray-400 w-8 h-8 rounded cursor-pointer font-bold"
  >0</button>
  <button 
    on:click={decrement}
    class="bg-red-500 active:bg-red-700 w-8 h-8 rounded cursor-pointer font-bold"
  >-</button>
</div>