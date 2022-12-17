<script lang="ts">
	import Card from './Card.svelte';
	import { onMount } from 'svelte';
	import { initPlayer, loadPlayer } from '$lib/player';

	export let stickerId: number;

	let player = initPlayer();

	onMount(async () => {
		player = await loadPlayer(stickerId);
	});

	$: imgAttr = {
		src: player.photo,
		alt: player.name
	};
</script>

<Card {imgAttr}>
	<strong class="d-block text-truncate" title={player.name}>
		{player.name}<br>
		{player.nationality}<br>
		{player.jersey_num}
	</strong>
</Card>
