<script>
	import DisplayStickersContainer from '$lib/containers/DisplayStickersContainer.svelte';
	import { state } from '$lib/context';
</script>

<h1>Album</h1>
<DisplayStickersContainer players={new Array($state.stickers)} />
