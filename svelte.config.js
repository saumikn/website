import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			...mdsvexConfig,
			remarkPlugins: [[remarkToc, { tight: true }]],
			rehypePlugins: [rehypeSlug]
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s
				if (message.includes('404')) {
					return;
				}
				// Otherwise throw the error
				throw new Error(message);
			}
		}
	}
};

export default config;
