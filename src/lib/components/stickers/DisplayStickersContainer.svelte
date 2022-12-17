<script lang="ts">
	import { loadPlayerFromSticker } from '$lib/player';
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
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading.../span> </span>
				</div>
				Cargando figurita
			{:then player}
				<PlayerCard {player} tokenId={stickerId} />
			{/await}
		</div>
	{/each}
</div>
