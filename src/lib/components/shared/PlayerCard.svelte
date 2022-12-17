<script lang="ts">
	import Card from './Card.svelte';
	import { initPlayer } from '$lib/player';

	export let tokenId: number = 0;
	export let player = initPlayer();

	const imgAttr = {
		src: player.photo,
		alt: player.name
	};
</script>

<Card {imgAttr}>
	<div>
		<strong class="d-block text-truncate" title={player.name}>
			{player.name}
		</strong>
	</div>
	<div>
		{player.nationality} - {player.jersey_num}
	</div>
	{#if tokenId}
		<div class="text-end">
			<small>Token: {tokenId}</small>
		</div>
	{/if}
</Card>
