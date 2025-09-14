# Démo 01 - Liste de tâches

## Objectif
  - Montrer la syntaxe de base de Svelte.
  - Utiliser la réactivité de Svelte pour modifier l'état d'une liste de tâches.
  - Ajouter des événements pour interagir avec les tâches.
  - Utiliser des conditions et des boucles pour afficher les tâches.
  - Utiliser des bindings pour lier les données entre le composant et le DOM.

## Syntaxe de base
  Les composants Svelte sont des fichiers `.svelte` qui contiennent du HTML, CSS et JavaScript.

Il est possible d'utiliser des blocs `<script>`, `<style>` et le HTML directement dans le fichier.

```svelte
<script>
  const course = "Svelte";
</script>

<style>
  h1 {
    color: blue;
    font-size: 2em;
    padding-left: 20px;
  }
</style>

<h1>Bienvenue dans le cours de {course}!</h1>
```

## Réactivité
  Svelte est réactif par défaut. Toute variable déclarée dans le bloc `<script>` est réactive.

```svelte
<script>
  let count = 0;
</script>

<button on:click={() => count += 1}>
  Compteur: {count}
</button>
```

## Événements
  Svelte permet d'ajouter des événements facilement avec la syntaxe `on:event`.

```svelte
<button on:click={() => alert('Clic!')}>
  Cliquez-moi
</button>
```

## Conditions et boucles
  Svelte utilise des directives pour les conditions et les boucles.

```svelte
{#if tasks.length === 0}
  <p>Aucune tâche à afficher</p>
{:else}
  <ul>
    {#each tasks as task}
      <li>{task}</li>
    {/each}
  </ul>
{/if}
```

## Bindings
  Svelte permet de lier les données entre le composant et le DOM avec la syntaxe `bind:`.

```svelte
<input type="text" bind:value={newTask} placeholder="Nouvelle tâche" />
<button on:click={addTask}>Ajouter</button>
```