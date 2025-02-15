<script lang="ts">
	import { formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<p style="color: red; font-weight: bold;">
			Note - I am currently in the process of migrating from Wordpress to Sveltekit. For now, some
			of the text and images are missing, and the formatting in other areas may be broken as well. I
			appreciate your patience at this time, I am currently working on the website, and these should
			be fixed in the near future.
		</p>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		h1 {
			text-transform: capitalize;
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		}

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-7);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>
