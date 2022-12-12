<script lang="ts">
	import PlayerCard from '../shared/PlayerCard.svelte';
	import { state } from '$lib/context';

	export let max: number;

	const getMin = (a: number, b: number) => (a < b ? a : b);

	$: stickersCollection = $state.stickers.reverse().slice(0, max);
</script>

<div class="row">
	{#if !stickersCollection.length}
		<div class="col">
			<div class="alert alert-warning">No tienes figuritas</div>
		</div>
	{/if}
	{#each stickersCollection as sticker}
		<div class="col-sm-6 col-lg my-3">
			<PlayerCard id={sticker}/>
		</div>
	{/each}
</div>
