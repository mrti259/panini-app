<script lang="ts">
	import { page } from '$app/stores';
	import { Web3Service } from '$lib/Web3Service';
	import Modal from '$lib/components/shared/Modal.svelte';
	import BuyCoinsContainer from '$lib/components/coins/BuyCoinsContainer.svelte';
	import BuyPackagesContainer from '$lib/components/packages/BuyPackagesContainer.svelte';
	import { state } from '$lib/context';
	import { onMount } from 'svelte';

	onMount(async () => {
		const web3Service = Web3Service.createInstance($page.data.contracts);
		$state.coins = await web3Service.getBalance();
		$state.packages = await web3Service.getPackages();
		$state.stickers = await web3Service.getStickers();
	});
</script>

<div class="container-fluid">
	<header class="navbar navbar-expand-md bg-light row px-3 sticky-top">
		<nav class="navbar-nav col">
			<a href="/" class="nav-link">Inicio</a>
			<a href="/album" class="nav-link">Album</a>
			<a href="/exchanges" class="nav-link">Intercambios</a>
		</nav>
		<article class="col-auto">
			<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalBuyPackages">
				{$state.packages} paquetes
			</button>
		</article>
		<article class="col-auto">
			<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalBuyCoins">
				{$state.coins} fiubacoins
			</button>
		</article>
	</header>
	<main class="container">
		<slot />
	</main>
</div>
<Modal id="modalBuyPackages" title="Comprar paquetes">
	<BuyPackagesContainer />
</Modal>
<Modal id="modalBuyCoins" title="Comprar FIU">
	<BuyCoinsContainer />
</Modal>
