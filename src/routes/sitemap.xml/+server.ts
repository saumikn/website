import { url } from '#lib/config.ts';
import { getPosts } from '#lib/posts.server.ts';

export const prerender = true;
export function GET() {
	const paths = ['/', '/blog', ...getPosts().map((post) => `/blog/${post.slug}`)];
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${url}${path}</loc></url>`).join('')}</urlset>`,
		{
			headers: { 'Content-Type': 'application/xml; charset=utf-8' }
		}
	);
}
