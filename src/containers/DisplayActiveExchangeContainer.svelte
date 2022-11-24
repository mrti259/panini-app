<script lang="ts">
	import Card from '../components/Card.svelte';
	import PlayerCard from '../components/PlayerCard.svelte';

	export let exchanges: number[];

	function doExchange(exchangeId: number) {
		return confirm(`¿Quiere intercambiar x por y?`);
	}
</script>

<div class="row">
	{#if !exchanges.length}
		<div class="col">
			<div class="alert alert-warning">No hay intercambios activos</div>
		</div>
	{/if}
	{#each exchanges as exhangeId}
		<div class="col-md-3">
			<Card>
				<div class="d-flex">
					<PlayerCard />
					<PlayerCard />
				</div>
				<button
					type="button"
					class="btn btn-primary btn-sm float-end"
					on:click={() => doExchange(exhangeId)}>Intercambiar</button
				>
			</Card>
		</div>
	{/each}
</div>
