<script lang="ts">
	import { initPlayer, loadPlayerFromSticker } from '$lib/player';
	import PlayerCard from '../shared/PlayerCard.svelte';

	export let stickers: number[] = [];
</script>

<div class="row">
	{#if !stickers.length}
		<div class="col">
			<div class="alert alert-warning">No tienes figuritas</div>
		</div>
	{/if}
	{#each stickers as stickerId}
		<div class="col-md-2 my-3">
			{#await loadPlayerFromSticker(stickerId)}
				<PlayerCard player={initPlayer()} tokenId={stickerId} />
			{:then player}
				<PlayerCard {player} tokenId={stickerId} />
			{/await}
		</div>
	{/each}
</div>
