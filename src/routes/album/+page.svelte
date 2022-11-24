<script>
	import DisplayStickersContainer from 'app/containers/DisplayStickersContainer.svelte';
	import { state } from 'app/state';
</script>

<h1>Album</h1>
<DisplayStickersContainer players={new Array($state.stickers)} />
