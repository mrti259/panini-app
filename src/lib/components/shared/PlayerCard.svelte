<script lang="ts">
	import Card from './Card.svelte';
	import photo from '$lib/assets/default_player.jpg';
	import { Web3Service } from '$lib/Web3Service';

	export let stickerId: number;

	//export let id: number;

	const player = {
		name: 'Nombre',
		nationality: 'Nacionalidad',
		jersey_num: 0,
		photo: photo,
	};

	async function getPlayerIdFromStickerId(stickerId: number) {
		const web3Service = Web3Service.getInstance();
		return await web3Service.getPlayerId(stickerId);
	}

	let playerId = getPlayerIdFromStickerId(stickerId).then(playerId => { 
	

		fetch(`https://script.google.com/macros/s/AKfycbzIbiqSX17K0dW2otrqbbPD95M8yAaS90DBcijoLgbEyiQsDqZRrLLVi3GRkt0bO-N-/exec?stickerId=${playerId}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			player.name = myJson['short_name'];
			player.nationality = myJson['nationality_name'];
			player.jersey_num = myJson['nation_jersey_number'];
			player.photo = myJson['player_face_url'];
		});	
	}
	);
	
	$: imgAttr = {
		src: player.photo,
	};
</script>

<Card {imgAttr}>
	<strong class="d-block text-truncate" title={player.name}>
		{player.name}<br>
		{player.nationality}<br>
		{player.jersey_num}
	</strong>
</Card>
