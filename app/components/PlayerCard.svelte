<script>
	import Card from './Card.svelte';
	import photo from 'assets/default_player.jpg';

	const player = {
		first_name: 'Nombre',
		last_name: 'Apellido',
		photo: photo
	};

	$: imgAttr = {
		src: player.photo,
		alt: `${player.last_name}, ${player.first_name}`
	};

	$: name = `${player.last_name}, ${player.first_name}`;
</script>

<Card {imgAttr}>
	<strong class="d-block text-truncate" title={name}>
		{name}
	</strong>
</Card>
