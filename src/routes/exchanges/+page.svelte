<script>
	import CreateExchangeContainer from '$lib/containers/CreateExchangeContainer.svelte';
	import DisplayActiveExchangesContainer from '$lib/containers/DisplayActiveExchangeContainer.svelte';
	import { state } from '$lib/context';
</script>

<h1>Intercambios</h1>
<div class="row">
	<div class="col-lg-10 overflow-auto" style="max-height: 80vh">
		<DisplayActiveExchangesContainer exchanges={new Array($state.exchanges)} />
	</div>
	<div class="col-lg-2">
		<CreateExchangeContainer />
	</div>
</div>
