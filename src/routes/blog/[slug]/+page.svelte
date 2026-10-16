<script lang="ts">
	import { formatDate } from '#lib/utils.ts';
	import Seo from '#lib/components/Seo.svelte';
	import * as config from '#lib/config.ts';

	let { data } = $props();
</script>

<Seo
	title={`${data.meta.title} | ${config.title}`}
	description={data.meta.description}
	article
	published={data.meta.date}
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.meta.title,
		description: data.meta.description,
		datePublished: `${data.meta.date}T00:00:00Z`,
		mainEntityOfPage: `${config.url}/blog/${data.meta.slug}`,
		author: {
			'@type': 'Person',
			'@id': `${config.url}/#person`,
			name: config.title,
			url: `${config.url}/`
		}
	}}
/>

<article>
	<hgroup>
		<p style="color: red; font-weight: bold;">
			Note - I am currently in the process of migrating from Wordpress to Sveltekit. For now, some
			of the text and images are missing, and the formatting in other areas may be broken as well. I
			appreciate your patience at this time, I am currently working on the website, and these should
			be fixed in the near future.
		</p>
		<h1>{data.meta.title}</h1>
		<p>Published at <time datetime={data.meta.date}>{formatDate(data.meta.date)}</time></p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category (category)}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: 72ch;
		min-width: 0;
		margin-inline: auto;

		h1 {
			overflow-wrap: anywhere;
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: var(--size-3);
			margin-top: var(--size-7);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>
