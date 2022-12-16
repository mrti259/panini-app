<script>
	import CreateExchangeContainer from '$lib/components/exchanges/CreateExchangeContainer.svelte';
	import DisplayActiveExchangesContainer from '$lib/components/exchanges/DisplayActiveExchangeContainer.svelte';
</script>

<h1>Intercambios</h1>
<div class="row">
	<div class="col-lg-10 overflow-auto" style="max-height: 80vh">
		<DisplayActiveExchangesContainer max={100} />
	</div>
	<div class="col-lg-2">
		<CreateExchangeContainer />
	</div>
</div>
