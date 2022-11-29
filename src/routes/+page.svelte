<script lang="ts">
	import DisplayActiveExchangeContainer from 'app/containers/DisplayActiveExchangeContainer.svelte';
	import DisplayPackagesContainer from 'app/containers/DisplayPackagesContainer.svelte';
	import DisplayStickersContainer from 'app/containers/DisplayStickersContainer.svelte';
	import { state } from 'app/state';

	function min(a: number, b: number) {
		return a < b ? a : b;
	}
</script>

<h1>Inicio</h1>
<section class="container bg-light">
	<h2>Últimas figuritas</h2>
	<DisplayStickersContainer players={new Array(min($state.stickers, 4))} />
</section>
<section class="container bg-light">
	<h2>Paquetes disponibles</h2>
	<DisplayPackagesContainer />
</section>
<section class="container bg-light">
	<h2>Intercambios activos</h2>
	<DisplayActiveExchangeContainer exchanges={new Array(min($state.exchanges, 4))} />
</section>
