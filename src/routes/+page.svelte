<script lang="ts">
	import DisplayActiveExchangeContainer from '$lib/components/exchanges/DisplayActiveExchangeContainer.svelte';
	import DisplayPackagesContainer from '$lib/components/packages/DisplayPackagesContainer.svelte';
	import DisplayStickersContainer from '$lib/components/stickers/DisplayStickersContainer.svelte';
	import { state } from '$lib/context';

	$: stickerCollection = $state.stickers.slice().reverse().slice(0, 6);
	$: packageCollection = new Array($state.packages);
</script>

<h1>Inicio</h1>
<section class="container bg-light">
	<h2>Últimas figuritas ({$state.stickers.length})</h2>
	<DisplayStickersContainer stickers={stickerCollection} />
</section>
<section class="container bg-light">
	<h2>Paquetes disponibles ({$state.packages})</h2>
	<DisplayPackagesContainer packages={packageCollection} />
</section>
<section class="container bg-light">
	<h2>Intercambios activos</h2>
	<DisplayActiveExchangeContainer exchanges={$state.exchanges} />
</section>
