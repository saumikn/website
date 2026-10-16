<script lang="ts">
	import { page } from '$app/state';
	import * as config from '#lib/config.ts';
	let {
		title = config.title,
		description = config.description,
		article = false,
		published,
		noindex = false,
		schema
	}: {
		title?: string;
		description?: string;
		article?: boolean;
		published?: string;
		noindex?: boolean;
		schema?: Record<string, unknown>;
	} = $props();
	const canonical = $derived(`${config.url}${page.url.pathname.replace(/\/$/, '') || '/'}`);
	const jsonLd = $derived(schema ? JSON.stringify(schema).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={config.title} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={`${config.url}/saumik.jpg`} />
	<meta property="og:image:alt" content={config.title} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${config.url}/saumik.jpg`} />
	{#if published}<meta property="article:published_time" content={`${published}T00:00:00Z`} />{/if}
	{#if noindex}<meta name="robots" content="noindex, follow" />{/if}
	{#if jsonLd}
		<!-- JSON-LD is serialized and escapes less-than signs before insertion. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${jsonLd}${'</scr' + 'ipt>'}`}
	{/if}
</svelte:head>
