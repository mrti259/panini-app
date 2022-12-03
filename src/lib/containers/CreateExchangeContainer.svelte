<script>
	import { state } from '$lib/context';
	import PlayerCard from '../components/PlayerCard.svelte';

	function create() {
		if (!confirm(`¿Quiere intercambiar x por y?`)) {
			return;
		}

		$state.exchanges++;
	}
</script>

<div class=row>
<div class="col-sm-5 col-lg-12">
<PlayerCard />
</div>
<div class="col-sm-5 col-lg-12">
<PlayerCard />
</div>
</div>
<button type="button" class="btn btn-primary float-end" on:click={() => create()}>
	Crear oferta
</button>