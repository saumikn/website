<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();

	function getPreview(content: string = ''): string {
		// Remove markdown image syntax
		const withoutImage = content.replace(/!\[.*?\]\(.*?\)\n*/g, '');
		// Remove markdown headers
		const withoutHeaders = withoutImage.replace(/#+\s.*\n/g, '');
		// Get first 200 characters
		return withoutHeaders.slice(0, 200).trim() + '...';
	}

	function hasImage(content: string = ''): boolean {
		return content.includes('![Post Image]');
	}
</script>

<svelte:head>
	<title>Blog | {config.title}</title>
</svelte:head>

<section class="content-wrapper">
	<h1>Blog Posts</h1>

	<p style="color: var(--red-9); font-style: italic;">
		This section currently is under construction, I am transitioning from Wordpress to Sveltekit and
		am in the process of moving my prior blog posts over. The following posts are fake data,
		expressly for the purpose of website development.
	</p>

	<div class="posts-container">
		<ul class="posts">
			{#each data.posts as post}
				<li>
					<div class="post-content">
						<a href={post.slug} class="title">{post.title}</a>
						<p class="date">{formatDate(post.date)}</p>
						<p class="description">{getPreview(post.content)}</p>
					</div>
					{#if hasImage(post.content)}
						<div class="thumbnail">
							<img src="/favicon.png" alt="Post thumbnail" />
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.posts-container {
		margin-inline: calc(var(--size-7) * -1);
		padding-inline: var(--size-7);
	}

	.posts {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	.posts li {
		display: grid;
		grid-template-columns: 1fr 120px;
		gap: var(--size-4);
		padding-block: var(--size-6);
		border-bottom: 1px solid var(--border);
	}

	.post-content {
		display: grid;
		gap: var(--size-2);
		min-width: 0;
	}

	.description {
		margin-top: var(--size-2);
		color: var(--text-2);
		line-height: 1.5;
		width: 100%;
	}

	.title {
		font-size: var(--font-size-4);
		font-weight: 500;
		color: var(--text-1);
		text-decoration: none;
		line-height: 1.2;

		&:hover {
			text-decoration: underline;
		}
	}

	.date {
		font-size: var(--font-size-1);
		color: var(--text-2);
	}

	.thumbnail {
		width: 120px;
		height: 120px;
		overflow: hidden;
		border-radius: var(--radius-2);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
