<script lang="ts">
	export let imgAttr: {
		src: string;
		alt: string;
	} | null = null;
</script>

<div class="card">
	{#if imgAttr}
		<img class="card-img-top" src={imgAttr.src} alt={imgAttr.alt} />
	{/if}
	<div class="card-body">
		<slot />
	</div>
</div>
