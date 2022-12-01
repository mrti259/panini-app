<script lang="ts">
	import Card from 'app/components/Card.svelte';
	import Modal from 'app/components/Modal.svelte';
	import DisplayStickersContainer from './DisplayStickersContainer.svelte';
	import logo from 'assets/qatar_logo.jpg';
	import { state } from 'app/state';

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
