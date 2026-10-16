import * as config from '#lib/config.ts';
import { getPosts } from '#lib/posts.server.ts';
import { escapeXml as escape } from '#lib/xml.ts';

export const prerender = true;
export function GET() {
	const items = getPosts()
		.map(
			(post) => `<item>
  <title>${escape(post.title)}</title><description>${escape(post.description)}</description>
  <link>${config.url}/blog/${post.slug}</link><guid isPermaLink="true">${config.url}/blog/${post.slug}</guid>
  <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate></item>`
		)
		.join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel>
  <title>${escape(config.title)}</title><description>${escape(config.description)}</description>
  <link>${config.url}/</link><language>en</language>
  <atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
  ${items}</channel></rss>`,
		{ headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }
	);
}
