<script lang="ts">
	import DisplayStickersContainer from '$lib/components/stickers/DisplayStickersContainer.svelte';
	import { state } from '$lib/context';
</script>

<h1>Album</h1>
<DisplayStickersContainer stickers={$state.stickers} />
