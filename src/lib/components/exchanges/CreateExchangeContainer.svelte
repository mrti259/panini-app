<script lang="ts">
	import { state } from '$lib/context';
	import { Web3Service } from '$lib/Web3Service';
	import PlayerCard from '../shared/PlayerCard.svelte';

	let tokenId = 0,
		playerId = 0;

	$: isValid = Boolean(tokenId && playerId);

	async function createExchange() {
		console.log(tokenId, playerId);
		if (!isValid) {
			return;
		}
		if (!confirm(`¿Quiere intercambiar x por y?`)) {
			return;
		}

		const web3Service = Web3Service.getInstance();
		await web3Service.createExchange(tokenId, playerId);
		$state.exchanges = await web3Service.getExchanges();
	}
</script>

<div class="row">
	<div class="col-12 my-1">
		<button
			type="button"
			class="btn btn-primary"
			on:click={() => createExchange()}
			disabled={!isValid}
		>
			Crear oferta
		</button>
	</div>
	<div class="col-sm-5 col-lg-12">
		<strong>Ofrecer</strong>
		<select bind:value={tokenId}>
			<option value={0}>-</option>
			<option value={1}>A</option>
		</select>
		<PlayerCard />
	</div>
	<div class="col-sm-5 col-lg-12">
		<strong>Por</strong>
		<select bind:value={playerId}>
			<option value={0}>-</option>
			<option value={1}>A</option>
		</select>
		<PlayerCard />
	</div>
</div>
