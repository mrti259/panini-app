<script lang="ts">
	import { Web3Service } from '$lib/Web3Service';
	import { state } from '$lib/context';

	let customAmount: number;
	let customAmountInput: HTMLInputElement;

	async function buy(quantity: number) {
		if (!quantity || quantity < 0) {
			customAmountInput.focus();
			return;
		}
		if (!confirm(`¿Querés comprar ${quantity} paquetes?`)) {
			return;
		}

		const web3Service = Web3Service.getInstance();
		$state.packagePrice = await web3Service.getPackagePrice();

		const moneyNeeded = quantity * $state.packagePrice;
		if (moneyNeeded > $state.coins) {
			alert(`No tenes suficiente cash... Necesitas ${moneyNeeded / 10 ** 18} FIU`);
			return;
		}

		await web3Service.buyPackages(quantity, moneyNeeded);
		$state.packages = await web3Service.getPackages();
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
