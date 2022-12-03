<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import logo from '$lib/assets/qatar_logo.jpg';
	import { state } from '$lib/context';
	import DisplayStickersContainer from './DisplayStickersContainer.svelte';

	$: packages = new Array($state.packages);

	function open() {
		if ($state.packages <= 0) {
			return;
		}
		if (!confirm(`¿Quiere abrir un paquete?`)) {
			return;
		}
		$state.packages--;
		$state.stickers += 5;
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

<Modal id="modalDisplayNewStickers" title="Nuevas figuritas">
	<DisplayStickersContainer players={[]} />
</Modal>
