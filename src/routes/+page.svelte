<script lang="ts">
	import DisplayActiveExchangeContainer from '$lib/components/exchanges/DisplayActiveExchangeContainer.svelte';
	import DisplayPackagesContainer from '$lib/components/packages/DisplayPackagesContainer.svelte';
	import DisplayStickersContainer from '$lib/components/stickers/DisplayStickersContainer.svelte';
	import { state } from '$lib/context';
</script>

<h1>Inicio</h1>
<section class="container bg-light">
	<h2>Últimas figuritas ({$state.stickers.length})</h2>
	<DisplayStickersContainer max={6} />
</section>
<section class="container bg-light">
	<h2>Paquetes disponibles ({$state.packages})</h2>
	<DisplayPackagesContainer max={6 * 4} />
</section>
<section class="container bg-light">
	<h2>Intercambios activos</h2>
	<DisplayActiveExchangeContainer max={6} />
</section>
