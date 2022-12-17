<script lang="ts">
	import Card from '../shared/Card.svelte';
	import logo from '$lib/assets/qatar_logo.jpg';
	import { Web3Service } from '$lib/Web3Service';
	import { state } from '$lib/context';

	export let packages: number[] = [];

	async function open() {
		if ($state.packages <= 0) {
			return;
		}
		if (!confirm(`¿Quiere abrir un paquete?`)) {
			return;
		}

		let web3Service = Web3Service.getInstance();
		await web3Service.openPackages();
		$state.stickers = await web3Service.getStickers();
		$state.packages = await web3Service.getPackages();
	}
</script>

<div class="row">
	{#if !packages.length}
		<div class="col">
			<div class="alert alert-warning">No hay paquetes</div>
		</div>
	{/if}
	{#each packages as _}
		<div class="col-md-2 my-3">
			<Card imgAttr={{ src: logo, alt: 'Qatar Package' }}>
				<button type="button" class="btn btn-primary float-end" on:click={open}>Abrir</button>
			</Card>
		</div>
	{/each}
</div>
