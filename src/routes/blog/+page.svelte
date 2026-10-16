<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '#lib/utils.ts';
	import * as config from '#lib/config.ts';
	import Seo from '#lib/components/Seo.svelte';
	let { data } = $props();
</script>

<Seo
	title={`Blog | ${config.title}`}
	description="Articles by Saumik Narayanan on artificial intelligence, chess, research, and public transit."
/>
<section class="content-wrapper">
	<h1>Blog Posts</h1>
	<p style="color: var(--red-9); font-style: italic;">
		This section currently is under construction, I am transitioning from Wordpress to Sveltekit and
		am in the process of moving my prior blog posts over. The following posts are mostly up to date,
		but are missing some text, most images, and have formatting issues still.
	</p>
	<ul class="posts">
		{#each data.posts as post (post.slug)}
			<li>
				<a href={resolve('/blog/[slug]', { slug: post.slug })} class="title">{post.title}</a>
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<p class="description">{post.excerpt}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.posts li {
		display: grid;
		gap: var(--size-2);
		padding-block: var(--size-6);
		border-bottom: 1px solid var(--border);
		min-width: 0;
	}
	.title {
		font-size: var(--font-size-4);
		font-weight: 500;
		color: var(--text-1);
		text-decoration: none;
		line-height: 1.25;
		overflow-wrap: anywhere;
	}
	.title:hover {
		text-decoration: underline;
	}
	time {
		font-size: var(--font-size-1);
		color: var(--text-2);
	}
	.description {
		color: var(--text-2);
		line-height: 1.6;
		overflow-wrap: anywhere;
	}
</style>
