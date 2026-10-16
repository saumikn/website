import { transformerMetaHighlight } from '@shikijs/transformers';
import { codeToHtml } from 'shiki';

/** @param {string} code @param {string} [lang] @param {string} [meta] */
export default async function highlighter(code, lang = 'text', meta) {
	const html = await codeToHtml(code, {
		lang: lang || 'text',
		theme: 'github-dark',
		...(meta ? { meta: { __raw: meta }, transformers: [transformerMetaHighlight()] } : {})
	});
	// A focusable code block lets keyboard users scroll wide examples.
	return (
		'<!-- svelte-ignore a11y_no_noninteractive_tabindex -->\n' +
		html
			.replace('<pre ', '<pre role="region" aria-label="Code sample" ')
			.replace(
				/[{}\x60]/g,
				(character) =>
					({ '{': '&lbrace;', '}': '&rbrace;', '\x60': '&grave;' })[character] ?? character
			)
	);
}
