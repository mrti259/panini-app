<script lang="ts">
	import Card from './Card.svelte';
	import photo from '$lib/assets/default_player.jpg';

	export let id: number;

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
		{name} {id}
	</strong>
</Card>
