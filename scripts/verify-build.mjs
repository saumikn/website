import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { escapeXml } from '../src/lib/xml.ts';
import wwwRedirect from '../cloudflare/www-redirect.js';

const output = '.svelte-kit/cloudflare';
const origin = 'https://saumikn.com';
const read = (file) => readFile(path.join(output, file), 'utf8');
const exists = async (file) => {
	try {
		return (await stat(path.join(output, file))).isFile();
	} catch {
		return false;
	}
};
const posts = JSON.parse(await read('api/posts'));
assert.equal(posts.length, 44, 'All 44 originally published articles must be generated');
assert.equal(new Set(posts.map((post) => post.slug)).size, 44);
assert(!posts.some((post) => post.slug.startsWith('_')));
assert(!(await exists('blog/_example.html')), 'Draft articles must stay private');
assert(!(await exists('_worker.js')), 'A static site must not deploy the broken Worker fallback');
assert(await exists('404.html'));
assert.match(await read('robots.txt'), /User-agent: \*\nAllow: \/\n/);
assert.match(await read('robots.txt'), /Sitemap: https:\/\/saumikn\.com\/sitemap\.xml/);
assert.equal(escapeXml('<>&"\''), '&lt;&gt;&amp;&quot;&apos;');

const sitemap = await read('sitemap.xml');
const feed = await read('rss.xml');
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 46);
assert.equal([...feed.matchAll(/<item>/g)].length, 44);
assert(!/saumikn\.com\/\//.test(sitemap + feed));
assert(!feed.includes('undefined'));
const redirects = new Map(
	(await read('_redirects'))
		.split('\n')
		.filter((line) => line.startsWith('/'))
		.map((line) => line.trim().split(/\s+/))
);
const redirectRules = (await read('_redirects'))
	.split('\n')
	.filter((line) => line && !line.startsWith('#'))
	.map((line) => line.split(/\s+/));
let foundDynamic = false,
	dynamicRules = 0,
	staticRules = 0;
for (const [source, destination, status] of redirectRules) {
	assert(source.startsWith('/'), 'Cloudflare Pages cannot match a source hostname');
	assert.equal(status, '301');
	const dynamic = source.includes('*') || source.includes(':');
	if (dynamic) {
		foundDynamic = true;
		dynamicRules++;
	} else {
		assert(!foundDynamic, 'Static redirects must precede dynamic redirects');
		staticRules++;
	}
	if (destination.startsWith('/') && !destination.includes(':')) {
		const target = destination.slice(1);
		assert(
			target === '' || (await exists(target)) || (await exists(`${target}.html`)),
			`Missing redirect target: ${destination}`
		);
	}
}
assert(staticRules <= 2000 && dynamicRules <= 100, 'Cloudflare redirect limit exceeded');
for (const legacy of ['/cv', '/about', '/projects', '/experience', '/scc-schedule', '/scc-rules'])
	assert(redirects.has(legacy), `Missing legacy redirect: ${legacy}`);

let links = 0;
const embeddedPages = new Set();
const embeddedModules = new Set();
const pages = [
	'index.html',
	'blog.html',
	'airlinemaps.html',
	'404.html',
	...posts.map((post) => `blog/${post.slug}.html`)
];
for (const file of pages) {
	const html = await read(file);
	const route = file === 'index.html' ? '/' : file.replace(/\.html$/, '');
	const canonical = file === '404.html' ? '/404.html' : `/${route}`.replace(/^\/\//, '/');
	assert.match(html, /<meta name="description" content="[^"]+/);
	assert(
		html.includes(`rel="canonical" href="${origin}${canonical}"`),
		`Incorrect canonical: ${file}`
	);
	assert(!html.includes('fav.farm') && !html.includes('🔥'), `Unexpected flame icon: ${file}`);
	if (file === 'index.html')
		assert(!html.includes('"posts":'), 'Homepage should not load unused article data');
	for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
		assert.equal(JSON.parse(match[1])['@context'], 'https://schema.org');
	if (file.startsWith('blog/')) {
		assert.match(html, /"@type":"BlogPosting"/);
		assert(
			!/web\.archive\.org[^"\s]*saumikn\.com\/wp-content/.test(html),
			`Archived own-media reference: ${file}`
		);
		const prose = html
			.replace(/<(?:script|pre|code)\b[^>]*>[\s\S]*?<\/(?:script|pre|code)>/g, '')
			.replace(/<!--[\s\S]*?-->/g, '');
		assert(!/\]\(https?:\/\//.test(prose), `Unrendered Markdown link in ${file}`);
		assert(!/\[\^\d+\]|\^\[\d+\]|\\footnote\[/.test(prose), `Unrendered footnote in ${file}`);
	}
	for (const [, reference] of html.matchAll(
		/<(?:a|img|link|script|iframe)\b[^>]*?\b(?:href|src)=["']([^"']+)["']/g
	)) {
		const target = new URL(
			reference.replaceAll('&amp;', '&'),
			`${origin}/${route === '/' ? '' : route}`
		);
		if (reference.startsWith('#')) {
			const fragment = decodeURIComponent(target.hash.slice(1));
			if (fragment) {
				const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]));
				assert(ids.has(fragment), `Broken fragment in ${file}: ${reference}`);
			}
			continue;
		}
		if (target.origin !== origin) continue;
		const filename = decodeURIComponent(target.pathname).replace(/^\//, '');
		if (redirects.has(target.pathname) || target.pathname.startsWith('/blog/posts/')) continue;
		const resolved = filename
			? (await exists(filename)) ||
				(await exists(`${filename}.html`)) ||
				(await exists(`${filename}/index.html`))
			: await exists('index.html');
		assert(resolved, `Broken local reference in ${file}: ${reference}`);
		if (reference.endsWith('.html') && target.pathname.startsWith('/projects/'))
			embeddedPages.add(filename);
		links++;
	}
}
// Embedded projects are separate documents; their dependencies must be present too.
for (const file of embeddedPages) {
	const html = await read(file);
	const importMap = html.match(/<script type="importmap">([\s\S]*?)<\/script>/);
	if (importMap) {
		for (const reference of Object.values(JSON.parse(importMap[1]).imports)) {
			const filename = new URL(reference, `${origin}/${file}`).pathname.slice(1);
			assert(await exists(filename), `Missing import-map dependency: ${reference}`);
			embeddedModules.add(filename);
		}
	}
	for (const [, reference] of html.matchAll(/\bfrom\s+["'](\.[^"']+)["']/g))
		embeddedModules.add(new URL(reference, `${origin}/${file}`).pathname.slice(1));
	for (const [, reference] of html.matchAll(
		/<(?:img|link|script|iframe)\b[^>]*?\b(?:href|src)=["']([^"']+)["']/g
	)) {
		const target = new URL(reference, `${origin}/${file}`);
		if (target.origin !== origin) continue;
		const filename = decodeURIComponent(target.pathname).slice(1);
		assert(await exists(filename), `Broken embedded-project reference in ${file}: ${reference}`);
		if (filename.endsWith('.html')) embeddedPages.add(filename);
		links++;
	}
}
for (const file of embeddedModules) {
	assert(await exists(file), `Missing project module: ${file}`);
	const source = await read(file);
	for (const [, reference] of source.matchAll(
		/(?:\bfrom\s*|\bimport\s*\(|\bnew URL\s*\()\s*["'](\.[^"']+)["']/g
	)) {
		const filename = new URL(reference, `${origin}/${file}`).pathname.slice(1);
		assert(await exists(filename), `Missing dependency in ${file}: ${reference}`);
		if (/\.(?:m?js)$/.test(filename)) embeddedModules.add(filename);
	}
}
assert(
	(await stat(path.join(output, 'blog.html'))).size < 80_000,
	'Blog index must not include all article bodies'
);
assert.match(await read('blog/closed-form-cprs-python.html'), /class="katex/);
const cssFiles = (await readdir(path.join(output, '_app/immutable/assets'))).filter((file) =>
	file.endsWith('.css')
);
const css = (await Promise.all(cssFiles.map((file) => read(`_app/immutable/assets/${file}`)))).join(
	''
);
assert(!css.includes('🔥'));
console.log(
	`Verified ${pages.length} pages, ${posts.length} articles, ${links} internal references, crawler endpoints, structured data, feed, sitemap, draft exclusion and static 404 output.`
);

for (const input of [
	'https://www.saumikn.com/',
	'http://www.saumikn.com/blog/example?ref=test&value=a%20b'
]) {
	const response = wwwRedirect.fetch(new Request(input));
	const expected = new URL(input);
	expected.protocol = 'https:';
	expected.hostname = 'saumikn.com';
	assert.equal(response.status, 301);
	assert.equal(response.headers.get('Location'), expected.toString());
}
assert.equal(wwwRedirect.fetch(new Request('https://unrelated.example/')).status, 404);
console.log(
	'Verified www redirects preserve paths and query strings and cannot redirect to arbitrary hosts.'
);
