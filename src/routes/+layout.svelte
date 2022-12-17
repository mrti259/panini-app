<script lang="ts">
	import { page } from '$app/stores';
	import { Web3Service } from '$lib/Web3Service';
	import Modal from '$lib/components/shared/Modal.svelte';
	import BuyCoinsContainer from '$lib/components/coins/BuyCoinsContainer.svelte';
	import BuyPackagesContainer from '$lib/components/packages/BuyPackagesContainer.svelte';
	import { state } from '$lib/context';
	import { onMount } from 'svelte';

	onMount(async () => {
		const web3Service = await Web3Service.createInstance($page.data.contracts);
		loadAccountData(web3Service);
	});


	function changeAccountTo(account: string) {
		const web3Service = Web3Service.getInstance();
		web3Service.activeAccount = account;
		loadAccountData(web3Service);
	}

	async function loadAccountData(web3Service: Web3Service) {
		$state.activeAccount = web3Service.activeAccount;
		$state.accounts = web3Service.accounts;
		$state.coins = await web3Service.getBalance();
		$state.packages = await web3Service.getPackages();
		$state.stickers = await web3Service.getStickers();
		$state.exchanges = await web3Service.getExchanges();
	}


	async function updateAccounts() {
		const web3Service = Web3Service.getInstance();
		await web3Service.load()
	}
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
				{$state.coins / (10 ** 18)} fiubacoins
			</button>
		</article>
		<article class="col-auto dropdown">
			<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				{$state.activeAccount}
			</button>
			<ul class="dropdown-menu">
				{#each $state.accounts as account}
					<li>
						<button type="button" class="dropdown-item" on:click={() => changeAccountTo(account)}>
							{account}
						</button>
					</li>
				{/each}
				<li>
					<button type="button" class="dropdown-item" on:click={() => updateAccounts()}>
						Actualizar cuentas
					</button>
				</li>
			</ul>
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
