<script lang="ts">
	import images from '#lib/images.json';
	let { src, alt = '' }: { src: string; alt?: string } = $props();
	const dimensions = $derived((images as Record<string, { width: number; height: number }>)[src]);
</script>

<img
	{src}
	{alt}
	width={dimensions?.width}
	height={dimensions?.height}
	loading="lazy"
	decoding="async"
/>
