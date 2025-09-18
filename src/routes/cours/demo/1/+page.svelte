<script>
	let isConnected = false
</script>

<button 
	class="border p-2 rounded-xl cursor-pointer"
	on:click={() => isConnected = !isConnected}
>Connection</button>
<p>{isConnected ? 'Vous êtes connecté' : 'Vous n\'êtes pas connecté' }</p>