<script lang="ts">
	import '../app.css';

  export let children;

  let openSection: string[] = [];

  function toggle(section: string) {
    if (openSection) {
      openSection = openSection.includes(section) ? openSection.filter(s => s !== section) : [...openSection, section];
    } else {
      openSection = [section];
    }
  }
</script>

<main>
  <header class="text-2xl font-bold w-full self-center pb-2 border-b-2 border-gray-200">
    <a href="/">My Svelte Courses</a>
  </header>
  <div class="flex flex-row justify-between min-h-screen ">
    <sidebar class="flex h-full px-4 mt-2">
      <div>
        <button type="button" class="flex items-center text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('cours')} aria-expanded={openSection.includes('cours')} aria-controls="cours-section">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="transform: rotate({openSection.includes('cours') ? 90 : 0}deg);">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <h2 class="text-xl font-semibold">Cours</h2>
        </button>
        {#if openSection.includes('cours')}
          <button type="button" class="flex items-center text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('cdemos')} aria-expanded={openSection.includes('cdemos')} aria-controls="demos-section">
            <h3 class="text-lg font-semibold mb-1">Démonstrations</h3>
          </button>
          {#if  openSection.includes('cdemos')}
            <ul>
              <li><a href="/cours/demo/1">Login</a></li>
              <li><a href="/cours/demo/2">Posts Instagram</a></li>
              <li><a href="/cours/demo/3">Stories Instagram</a></li>
            </ul>
          {/if}
        {/if}
        {#if openSection.includes('cours')}
          <button type="button" class="flex items-center mt-2 text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('coursexos')} aria-expanded={openSection.includes('coursexos')} aria-controls="exos-section">
            <h3 class="text-xl font-semibold mb-1">Exercices</h3>
          </button>
          {#if openSection.includes('coursexos')}
            <ul>
              <li><a href="/cours/exo/1">TodoList</a></li>
              <li><a href="/cours/exo/2">Gestion de Panier</a></li>
              <li><a href="/cours/exo/3">Site de Recettes</a></li>
            </ul>
          {/if}
        {/if}
        <div class=" flex items-center text-lg font-bold my-4">
          <button type="button" class="flex items-center text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('corrigés')} aria-expanded={openSection.includes('corrigés')} aria-controls="corrigés-section">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="transform: rotate({openSection.includes('corrigés') ? 90 : 0}deg);">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <h2 class="text-xl font-semibold">Corrigés</h2>
          </button>
        </div>
        {#if openSection.includes('corrigés')}
          <button type="button" class="flex items-center mt-2 text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('corrigésdemos')} aria-expanded={openSection.includes('corrigésdemos')} aria-controls="demos-section">
            <h3 class="text-lg font-semibold mb-1">Demos</h3>
          </button>
          {#if openSection.includes('corrigésdemos')}
            <ul>
              <li><a href="/corriges/demo/1">Login</a></li>
              <li><a href="/corriges/demo/2">Posts Instagram</a></li>
              <li><a href="/corriges/demo/3">Stories Instagram</a></li>
            </ul>
          {/if}
        {/if}
        {#if openSection.includes('corrigés')}
          <button type="button" class="flex items-center mt-2 text-lg font-bold focus:outline-none hover:text-blue-600 cursor-pointer" on:click={() => toggle('corrigésexos')} aria-expanded={openSection.includes('corrigésexos')} aria-controls="exos-section">
            <h3 class="text-xl font-semibold mb-1">Exercices</h3>
          </button>
          {#if openSection.includes('corrigésexos')}
            <ul>
              <li><a href="/corriges/exo/1">TodoList</a></li>
              <li><a href="/corriges/exo/2">Gestion de Panier</a></li>
              <li><a href="/corriges/exo/3">Site de Recettes</a></li>

            </ul>
          {/if}
        {/if}
      </div>
      <div class="border-1 my-2 border-gray-200 h-screen ml-4"></div>
    </sidebar>
    <div class="flex-1 p-4">
      {@render children()}
    </div>
  </div>
  <footer class="text-center text-gray-500 text-sm py-4 border-gray-200 border-t-2 mt-4">
    <p>&copy; {new Date().getFullYear()} My Svelte Courses</p>
  </footer>
</main>