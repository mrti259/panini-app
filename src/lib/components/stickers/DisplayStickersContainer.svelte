<script lang="ts">
	import PlayerCard from '../shared/PlayerCard.svelte';
	import { state } from '$lib/context';
	

	const getMin = (a: number, b: number) => (a < b ? a : b);
	$: stickersCollection = $state.stickers;
</script>

<div class="row">
	{#if !stickersCollection.length}
		<div class="col">
			<div class="alert alert-warning">No tienes figuritas</div>
		</div>
	{/if}
	{#each stickersCollection as stickerId}
		<div class="col-md-3 my-3">
			<PlayerCard stickerId={stickerId} />
		</div>
	{/each}
</div>
