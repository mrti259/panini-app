<script lang="ts">
	import { state } from '$lib/context';
	import { loadExchange, type Exchange } from '$lib/Exchange';
	import { Web3Service } from '$lib/Web3Service';
	import Card from '../shared/Card.svelte';
	import PlayerCard from '../shared/PlayerCard.svelte';

	export let exchanges: number[] = [];

	async function acceptExchange(exchange: Exchange) {
		if (!confirm(`¿Quiere intercambiar ${exchange.player.name} por ${exchange.token.name}?`)) {
			return;
		}

		const web3Service = Web3Service.getInstance();
		await web3Service.acceptExchange(exchange.id);
	}
</script>

<div class="row">
	{#if !exchanges.length}
		<div class="col">
			<div class="alert alert-warning">No hay intercambios activos</div>
		</div>
	{/if}
	{#each exchanges as exchangeId}
		{#await loadExchange(exchangeId)}
			<div class="col-md-4">Cargando intercambio</div>
		{:then exchange}
			<div class="col-md-4">
				<Card>
					<div class="d-flex justify-content-around">
						<div>
							<strong>Ofrece</strong>
						</div>
						<div>
							<strong>Por</strong>
						</div>
					</div>
					<div class="d-flex justify-content-around">
						<PlayerCard player={exchange.token} tokenId={exchange.tokenId} />
						<PlayerCard player={exchange.player} />
					</div>
					<button
						type="button"
						class="btn btn-primary btn-sm float-end m-2"
						on:click={() => acceptExchange(exchange)}>Intercambiar</button
					>
				</Card>
			</div>
		{/await}
	{/each}
</div>
