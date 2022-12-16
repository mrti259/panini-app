<script>
	import { Web3Service } from "$lib/Web3Service";


    function setUpContracts() {
       Web3Service.getInstance().setUpContracts();
    }
</script>

<button type="button" on:click={setUpContracts}>
    Set up contracts
</button>