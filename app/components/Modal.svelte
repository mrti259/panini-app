<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<div class="modal fade" {id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<slot name="modal-header">
					<h2 class="modal-title fs-5" id="{id}Label">{title}</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
				</slot>
			</div>
			<div class="modal-body">
				<slot />
			</div>
			<div class="modal-footer">
				<slot name="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
				</slot>
			</div>
		</div>
	</div>
</div>
