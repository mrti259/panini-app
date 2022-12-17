<script lang="ts">
	import { state } from '$lib/context';
	import { Web3Service } from '$lib/Web3Service';
	import Card from '../shared/Card.svelte';
	import PlayerCard from '../shared/PlayerCard.svelte';

	export let max: number;

	const getMin = (a: number, b: number) => (a < b ? a : b);

	$: exchangeCollection = $state.exchanges.slice(0, getMin(max, $state.exchanges.length));

	async function acceptExchange(exchangeId: number) {
		if (!confirm(`¿Quiere intercambiar x por y?`)) {
			return;
		}

		const web3Service = Web3Service.getInstance();
		await web3Service.acceptExchange(exchangeId);
	}
</script>

<div class="row">
	{#if !exchangeCollection.length}
		<div class="col">
			<div class="alert alert-warning">No hay intercambios activos</div>
		</div>
	{/if}
	{#each exchangeCollection as exhangeId}
		<div class="col-md-4">
			<Card>
				<div class="d-flex">
					<PlayerCard />
					<PlayerCard />
				</div>
				<button
					type="button"
					class="btn btn-primary btn-sm float-end"
					on:click={() => acceptExchange(exhangeId)}>Intercambiar</button
				>
			</Card>
		</div>
	{/each}
</div>
