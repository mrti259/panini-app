<script lang="ts">
	import DisplayActiveExchangeContainer from '$lib/components/exchanges/DisplayActiveExchangeContainer.svelte';
	import DisplayPackagesContainer from '$lib/components/packages/DisplayPackagesContainer.svelte';
	import DisplayStickersContainer from '$lib/components/stickers/DisplayStickersContainer.svelte';
</script>

<h1>Inicio</h1>
<section class="container bg-light">
	<h2>Últimas figuritas</h2>
	<DisplayStickersContainer max={4} />
</section>
<section class="container bg-light">
	<h2>Paquetes disponibles</h2>
	<DisplayPackagesContainer max={4} />
</section>
<section class="container bg-light">
	<h2>Intercambios activos</h2>
	<DisplayActiveExchangeContainer max={4} />
</section>
