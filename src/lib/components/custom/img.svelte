<script lang="ts">
	import images from '#lib/images.json';
	let { src, alt = '' }: { src: string; alt?: string } = $props();
	let failedSource = $state<string>();
	const dimensions = $derived((images as Record<string, { width: number; height: number }>)[src]);
</script>

{#if failedSource === src}
	<span class="image-unavailable" role="status">
		{alt || 'Image'} — the original image is currently unavailable.
	</span>
{:else}
	<img
		{src}
		{alt}
		width={dimensions?.width}
		height={dimensions?.height}
		loading="lazy"
		decoding="async"
		onerror={() => (failedSource = src)}
	/>
{/if}

<style>
	.image-unavailable {
		display: block;
		padding: 1rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-2);
		color: var(--text-2);
	}
</style>
