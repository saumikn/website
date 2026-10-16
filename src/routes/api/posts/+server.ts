import { getPosts } from '#lib/posts.server.ts';
export const prerender = true;
export function GET() {
	return Response.json(getPosts());
}
