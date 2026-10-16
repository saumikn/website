import { getPosts } from '#lib/posts.server.ts';
export function load() {
	return { posts: getPosts() };
}
