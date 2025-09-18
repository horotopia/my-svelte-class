<script lang="ts">
	import { fetchAuth } from './lib/api/auth';
	let username: string = '';
	let password: string = '';
	let errorMessage: string = '';
	let isValid: boolean | null = null;
	let profil: { 
		accessToken: string, 
		Email: string, 
		firstName: string, 
		gender: string, 
		id: string, 
		image: string, 
		lastName: string, 
		refreshToken: string, 
		username: string 
	} = { 
		accessToken: '', 
		Email: '', 
		image: '', 
		firstName: '', 
		lastName: '', 
		gender: '', 
		id: '', 
		refreshToken: '', 
		username: '' 
	};


	let handleLogin:  () => void = async () => {
		errorMessage = '';

		await fetchAuth(username, password)
			.then((result) => {
				if (result.length !== 0) {
					isValid = true;
					profil = result;
				} else {
					isValid = false;
					errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
				}
			})
			.catch((err) => {
				isValid = false;
				errorMessage = 'Erreur lors de la connexion.';
			});
	};
</script>

<section class="flex flex-col items-center justify-around w-96 m-auto max-w-sm rounded p-8 shadow-md">
		<h2 class="mb-4 text-2xl font-bold">Connexion</h2>
    <p class="mb-4">Bon retour parmi nous !</p>

    <div class="relative mb-2 mt-8">
      <input type="text" id="username" bind:value={username} class="block px-2.5 pb-2.5 pt-4 w-80 text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Nom d'utilisateur</label>
    </div>
    <div class="relative mb-0">
      <input type="password" id="password" bind:value={password} class="block px-2.5 pb-2.5 pt-4 w-80 text-base text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Mot de passe</label>
    </div>
    <p class="text-xs text-gray-500 self-start pb-6">Mot de passe oublié ? <a href="/forgot-password" class="text-blue-600 underline">Réinitialiser</a></p>
		
    <button type="button" on:click={handleLogin} class="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600">Se connecter</button>
		<p class="mt-0 text-xs text-gray-500 self-start">
			Vous n'avez pas de compte ? <a href="/register" class="text-blue-600 underline">S'inscrire</a>
		</p>
		{#if isValid === true}
			<div>
				<div class="flex justify-center mt-8">
					<img src={profil.image} alt="Utilisateur" class="w-20 rounded-full" />
				</div>
				<div class="flex items-center mt-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<p class="text-green-500 ml-1">{profil.lastName} {profil.firstName}, vous êtes connecté !</p>
				</div>
			</div>
				{/if}
		{#if isValid === false}<p class="text-red-500 font-semibold text-center mt-8">{errorMessage}</p>{/if}
</section>