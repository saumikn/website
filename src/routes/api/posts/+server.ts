import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const prerender = true;

export async function GET() {
	// Example usage:
	// const value = await platform.env.MY_KV.get('key');
	// platform.context.waitUntil(someBackgroundTask());

	const posts = await getPosts();
	return json(posts);
}
