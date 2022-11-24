<script>
	import { state } from 'app/state';
	import PlayerCard from '../components/PlayerCard.svelte';

	function create() {
		if (!confirm(`¿Quiere intercambiar x por y?`)) {
			return;
		}

		$state.exchanges++;
	}
</script>

<PlayerCard />
<PlayerCard />
<button type="button" class="btn btn-primary float-end" on:click={() => create()}>
	Crear oferta
</button>
