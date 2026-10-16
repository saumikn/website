<script lang="ts" module>
	import Img from '#lib/components/custom/img.svelte';
	export const img = Img;
</script>

<script lang="ts">
	let props = $props();
</script>

{@render props.children?.()}
