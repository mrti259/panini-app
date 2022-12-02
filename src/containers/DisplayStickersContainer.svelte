<script lang="ts">
	import PlayerCard from 'app/components/PlayerCard.svelte';

	export let players: number[];
</script>

<div class="row">
	{#if !players.length}
		<div class="col">
			<div class="alert alert-warning">No tienes figuritas</div>
		</div>
	{/if}
	{#each players as _}
		<div class="col-md-3 my-3">
			<PlayerCard />
		</div>
	{/each}
</div>
