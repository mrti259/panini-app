<script lang="ts">
	import { state } from 'app/state';

	let customAmount: number;
	let customAmountInput: HTMLInputElement;

	function buy(amount?: number) {
		if (!amount) {
			customAmountInput.focus();
			return;
		}
		if (!confirm(`¿Querés comprar ${amount} FIU?`)) {
			return;
		}
		$state.coins += amount;
	}
</script>

<div class="container">
	<div class="d-flex justify-content-around">
		{#each [1, 5, 15] as num}
			<div class="">
				<button type="button" class="btn btn-outline-primary" on:click={() => buy(num)}
					>Comprar {num}
				</button>
			</div>
		{/each}
	</div>
	<div class="d-flex">
		<input
			type="number"
			placeholder="Ingresar una cantidad personalizada"
			class="form-control"
			bind:value={customAmount}
			bind:this={customAmountInput}
		/>
		<button type="button" class="btn btn-primary" on:click={() => buy(customAmount)}>
			Comprar
		</button>
	</div>
</div>
