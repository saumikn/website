import type { Post } from '$lib/types';

export async function load({ fetch }) {
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();

	// Get all markdown files
	const markdownFiles = import.meta.glob('../../posts/*.md', {
		query: '?raw',
		import: 'default'
	});

	// Add content to each post
	for (const post of posts) {
		const filePath = `../../posts/${post.slug}.md`;
		if (filePath in markdownFiles) {
			const content = (await markdownFiles[filePath]()) as string;
			// Remove frontmatter (content between --- markers)
			post.content = content.replace(/---[\s\S]*?---/, '').trim();
		} else {
			console.error(`File not found: ${post.slug}.md`);
			post.content = '';
		}
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
}
