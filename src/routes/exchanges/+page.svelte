<script lang="ts">
	import { page } from '$app/stores';
	import CreateExchangeContainer from '$lib/components/exchanges/CreateExchangeContainer.svelte';
	import DisplayActiveExchangesContainer from '$lib/components/exchanges/DisplayActiveExchangeContainer.svelte';
	import { state } from '$lib/context';
</script>

<h1>Intercambios</h1>
<div class="row">
	<div class="col-lg-10 overflow-auto" style="max-height: 80vh">
		<DisplayActiveExchangesContainer exchanges={$state.exchanges} />
	</div>
	<div class="col-lg-2">
		<CreateExchangeContainer stickers={$state.stickers} players={$page.data.players} />
	</div>
</div>
