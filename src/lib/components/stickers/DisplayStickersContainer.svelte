<script lang="ts">
	import PlayerCard from '../shared/PlayerCard.svelte';
	import { state } from '$lib/context';

	export let max: number;

	const getMin = (a: number, b: number) => (a < b ? a : b);

	$: stickersCollection = Array(getMin(max, $state.stickers));
</script>

<div class="row">
	{#if !stickersCollection.length}
		<div class="col">
			<div class="alert alert-warning">No tienes figuritas</div>
		</div>
	{/if}
	{#each stickersCollection as _}
		<div class="col-md-3 my-3">
			<PlayerCard />
		</div>
	{/each}
</div>
