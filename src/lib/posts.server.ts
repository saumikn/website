import { parse } from 'yaml';
import type { Post } from '#lib/types.ts';

const files = import.meta.glob('/src/routes/blog/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

/** Invalid metadata fails the build instead of silently removing an article. */
export function getPosts(): Post[] {
	return Object.entries(files)
		.flatMap(([path, source]) => {
			const match = String(source).match(/^---\r?\n([\s\S]*?)\r?\n---/);
			if (!match) throw new Error(`Missing frontmatter: ${path}`);
			const meta = parse(match[1]);
			if (!meta || typeof meta.published !== 'boolean')
				throw new Error(`Missing published flag: ${path}`);
			if (!meta.published) return [];
			for (const key of ['title', 'description', 'date']) {
				if (typeof meta[key] !== 'string' || !meta[key].trim())
					throw new Error(`Invalid ${key}: ${path}`);
			}
			if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || !Number.isFinite(Date.parse(meta.date)))
				throw new Error(`Invalid date: ${path}`);
			if (
				!Array.isArray(meta.categories) ||
				!meta.categories.every((value: unknown) => typeof value === 'string')
			)
				throw new Error(`Invalid categories: ${path}`);
			return [
				{
					title: meta.title,
					description: meta.description,
					excerpt:
						String(source)
							.slice(match[0].length)
							.trim()
							.replace(/!\[.*?\]\(.*?\)\n*/g, '')
							.replace(/#+\s.*\n/g, '')
							.slice(0, 200)
							.trim() + '...',
					date: meta.date,
					categories: meta.categories,
					published: true,
					slug: path.split('/').at(-1)!.replace(/\.md$/, '')
				}
			];
		})
		.sort((a, b) => b.date.localeCompare(a.date));
}
