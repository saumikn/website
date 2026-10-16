import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { defineConfig } from 'vite';
import mdsvexConfig from './mdsvex.config.js';

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			// mdsvex's published plugin types still target an older unified release.
			preprocess: [
				vitePreprocess(),
				mdsvex({
					...mdsvexConfig,
					remarkPlugins: [remarkToc, remarkMath],
					rehypePlugins: [rehypeSlug, rehypeKatex]
				} as unknown as Parameters<typeof mdsvex>[0]),
				{
					// Preserve the literal TeX annotation in generated MathML when Svelte compiles it.
					markup: ({ content, filename }: { content: string; filename?: string }) => ({
						code: filename?.endsWith('.md')
							? content.replace(
									/(<annotation[^>]*>)([\s\S]*?)(<\/annotation>)/g,
									(_match: string, open: string, tex: string, close: string) =>
										open + tex.replaceAll('{', '&#123;').replaceAll('}', '&#125;') + close
								)
							: content
					})
				}
			],
			// Keep the existing Cloudflare Pages publish directory; no Worker is needed.
			adapter: adapter({
				pages: '.svelte-kit/cloudflare',
				assets: '.svelte-kit/cloudflare',
				strict: true
			}),
			prerender: {
				entries: ['*', '/api/posts', '/robots.txt', '/sitemap.xml', '/rss.xml'],
				handleHttpError: 'fail'
			}
		})
	]
});
