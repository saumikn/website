import { transformerMetaHighlight } from '@shikijs/transformers';
import { parse } from 'node-html-parser';
import { codeToHtml, createHighlighter } from 'shiki';

const THEME = 'github-dark';

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} html - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
	return code.replace(
		/[{}`]/g,
		(character) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
	);
}

/**
 * @param {string} html - code to highlight
 * @returns {string} - highlighted html
 */
function makeFocussable(html) {
	const root = parse(html);
	return root.toString();
}

/**
 * @param {string} code - code to highlight
 * @param {string} lang - code language
 * @param {string} [meta] - code meta
 * @returns {Promise<string>} - highlighted html
 */
async function highlighter(code, lang, meta) {
	await createHighlighter({
		langs: [lang],
		themes: [THEME]
	});

	let html;
	if (!meta) {
		html = await codeToHtml(code, {
			lang,
			theme: THEME
		});
	} else {
		html = await codeToHtml(code, {
			lang,
			theme: THEME,
			meta: { __raw: meta },
			transformers: [transformerMetaHighlight()]
		});
	}

	html = makeFocussable(html);
	return escapeHtml(html);
}

export default highlighter;
