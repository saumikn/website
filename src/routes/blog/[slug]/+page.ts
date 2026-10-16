import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const articles = import.meta.glob(['../posts/*.md', '!../posts/_*.md']);
export const load: PageLoad = async ({ params, data }) => {
	const article = articles[`../posts/${params.slug}.md`];
	if (!article) error(404, 'Article not found');
	const post = (await article()) as { default: import('svelte').Component };
	return { ...data, content: post.default };
};
