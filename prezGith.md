Dans cette vidéo, je vais vous présenter un support que nous utiliserons tout au long de cette formation. 
Il s'agit d'une application d'apprentissage interactive, où les enseignants pourront travailler sur la partie démonstrations et correction et où les étudiants travailleront sur la partie exercices.
Comme vous pouvez le voir, l'application est assez simple, le fonctionnel prime sur le design afin de se concentrer sur l'essentiel.

Le projet se trouve sur GitHub, nous vous fournirons le lien dans le support de cours mais vous pouvez également le voir maintenant dans l'URL.
...


- github
- présentation du projet
  - 3 trames
    - Svelte bases
    - Svelte avancé
    - SvelteKit
  - 3 démonstrations
  - 3 exercices
    - corrections
  

------------------------------------
Vidéo de présentation de la syntaxe de base

Dans cette vidéo, nous allons aborder la syntaxe de base des fichiers Svelte.
- fichier .svelte

- <script> const greetings = "hello!"</script>
- événements

- html
<h1>{{greetings}}</h1>
- {#if} {#each}

- style
<style>
  h1 {
    background-color: darkgray;
  }
</style>

----------------------------------------
Vidéo de présentation de la Réactivité svelte

Dans cette vidéo, nous allons parler des variables et de leur réactivité.

<script>
	let isConnected = false;
</script>

<button class="border p-2 rounded-xl cursor-pointer" on:click={() => isConnected = !isConnected}>
	Connection
</button>
<p>{isConnected ? 'Vous êtes connecté':'Vous n\'êtes pas connecté'}</p>.


------------------------------------------------
Vidéo de présentation de l'exercice de la trame 1

Dans cette vidéo, je vais vous présenter l'exercice que vous aurez à faire en reprenant les bases que nous avons vu auparavant.

- todolist


- réactivité
- evenements
- conditions
- bindings