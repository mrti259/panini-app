<script>
	import Modal from 'app/components/Modal.svelte';
	import BuyPackagesContainer from 'app/containers/BuyPackagesContainer.svelte';
	import BuyCoinsContainer from 'app/containers/BuyCoinsContainer.svelte';
	import { state } from 'app/state';
</script>

<div class="container-fluid">
	<header class="navbar navbar-expand-lg bg-light row px-3 sticky-top">
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
