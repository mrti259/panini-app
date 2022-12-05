<script lang="ts">
	import { state } from '$lib/context';
	import { Web3Service } from '$lib/Web3Service';

	let customAmount: number;
	let customAmountInput: HTMLInputElement;

	async function buy(amount?: number) {
		if (!amount) {
			customAmountInput.focus();
			return;
		}
		if (!confirm(`¿Querés comprar ${amount} FIU?`)) {
			return;
		}

		const web3Service = Web3Service.getInstance();
		await web3Service.buyCoins(amount);
		$state.coins = await web3Service.getBalance();
	}
</script>

<div class="container">
	<div class="d-flex justify-content-around">
		{#each [1, 5, 15] as num}
			<div class="">
				<button type="button" class="btn btn-primary" on:click={() => buy(num)}
					>Comprar {num}
				</button>
			</div>
		{/each}
	</div>
	<br />
	<div class="d-flex gap-2">
		<input
			type="number"
			placeholder="Ingresar una cantidad personalizada"
			class="form-control"
			bind:value={customAmount}
			bind:this={customAmountInput}
		/>
		<button
			type="button"
			class="btn btn-outline-primary"
			on:click={() => buy(Number(customAmount))}
		>
			Comprar
		</button>
	</div>
</div>
