import highlighter from './src/lib/utilities/codeHighlighter.mjs';
import { join, resolve } from 'node:path';

const __dirname = resolve();

const config = {
	extensions: ['.md'],
	highlight: {
		highlighter
	},
	layout: join(__dirname, './src/mdsvex.svelte')
};

export default config;
