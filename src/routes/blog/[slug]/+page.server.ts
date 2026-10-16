import { error } from '@sveltejs/kit';
import { getPosts } from '#lib/posts.server.ts';

export function entries() {
	return getPosts().map(({ slug }) => ({ slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const meta = getPosts().find((post) => post.slug === params.slug);
	if (!meta) error(404, 'Article not found');
	return { meta };
}
