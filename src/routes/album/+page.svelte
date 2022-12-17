<script lang="ts">
	import DisplayStickersContainer from '$lib/components/stickers/DisplayStickersContainer.svelte';
	import { Web3Service } from '$lib/Web3Service';
	import { onMount } from 'svelte';

	let stickers: number[] = [];

	onMount(async () => {
		const web3Services = Web3Service.getInstance();
		stickers = await web3Services.getStickers();
	});
</script>

<h1>Album</h1>
<DisplayStickersContainer {stickers} />
