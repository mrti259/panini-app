<script lang="ts">
	import { state } from '$lib/context';

	let customAmount: number;
	let customAmountInput: HTMLInputElement;

	function buy(amount: number) {
		if (!amount || amount < 0) {
			customAmountInput.focus();
			return;
		}
		if (!confirm(`¿Querés comprar ${amount} paquetes?`)) {
			return;
		}

		const moneyNeeded = amount * $state.packagePrice;
		if (moneyNeeded > $state.coins) {
			alert(`No tenes suficiente cash... Necesitas ${moneyNeeded} FIU`);
			return;
		}

		$state.packages += amount;
		$state.coins -= moneyNeeded;
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
