<script lang="ts">
	import { state } from '$lib/context';
	import { initPlayer, loadPlayer, loadPlayerFromSticker } from '$lib/player';
	import { Web3Service } from '$lib/Web3Service';
	import PlayerCard from '../shared/PlayerCard.svelte';

	export let stickers: number[];
	export let players: { id: number; name: string }[];

	let tokenId = 0;
	let playerId = 0;
	let playerFromToken = initPlayer();
	let playerFromPlayerId = initPlayer();

	$: isValid = Boolean(playerFromToken.jersey_num && playerFromPlayerId.jersey_num);
	$: updatePlayerFromToken(tokenId);
	$: updatePlayerFromPlayerId(playerId);

	async function updatePlayerFromToken(tokenId: number) {
		playerFromToken = tokenId ? await loadPlayerFromSticker(tokenId) : initPlayer();
	}

	async function updatePlayerFromPlayerId(playerId: number) {
		playerFromPlayerId = playerId ? await loadPlayer(playerId) : initPlayer();
	}

	async function createExchange() {
		if (!isValid) {
			return;
		}
		if (!confirm(`¿Quiere intercambiar ${playerFromToken.name} por ${playerFromPlayerId.name}?`)) {
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
			{#each stickers as stickerId}
				<option value={stickerId}>
					{#await loadPlayerFromSticker(stickerId)}
						{stickerId}
					{:then player}
						{player.name}
					{/await}
				</option>
			{/each}
		</select>
		<PlayerCard player={playerFromToken} {tokenId} />
	</div>
	<div class="col-sm-5 col-lg-12">
		<strong>Por</strong>
		<select bind:value={playerId}>
			{#each players as player}
				<option value={player.id}>
					{player.name}
				</option>
			{/each}
		</select>
		<PlayerCard player={playerFromPlayerId} />
	</div>
</div>
