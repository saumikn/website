import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const directory = 'src/routes/blog/posts';
const posts = (await readdir(directory)).filter((file) => file.endsWith('.md'));
const originals = (await readdir('static/uploads')).filter((file) =>
	/\.(png|jpe?g|webp|gif)$/i.test(file)
);
const sources = new Map(
	originals.map((file) => [`/uploads/${file}`, `/uploads/optimized/${path.parse(file).name}.webp`])
);
const contents = new Map();
for (const file of posts) {
	const text = await readFile(path.join(directory, file), 'utf8');
	contents.set(file, text);
	for (const match of text.matchAll(
		/(?:!\[[^\]]*\]\(|\bsrc=")(\/uploads\/(?!optimized\/)[^\s)"<>]+\.(?:png|jpe?g|webp|gif))/gi
	)) {
		sources.set(match[1], `/uploads/optimized/${path.parse(match[1]).name}.webp`);
	}
}
sources.set('/saumik.jpg', '/uploads/optimized/saumik.webp');
await mkdir('static/uploads/optimized', { recursive: true });
const metadata = {};
let before = 0,
	after = 0;
for (const [source, target] of sources) {
	const input = await readFile(`static${source}`);
	const { data, info } = await sharp(input)
		.rotate()
		.resize({ width: 1600, withoutEnlargement: true })
		.webp({ quality: 85 })
		.toBuffer({ resolveWithObject: true });
	await writeFile(`static${target}`, data);
	metadata[target] = { width: info.width, height: info.height };
	before += input.length;
	after += data.length;
}
for (const [file, contentsBefore] of contents) {
	let text = contentsBefore;
	// Rewrite image sources only; retain original file downloads and their formats.
	text = text.replace(/!\[([^\]]*)\]\((\/uploads\/[^)]+)\)/g, (match, alt, source) =>
		sources.has(source) ? `![${alt}](${sources.get(source)})` : match
	);
	text = text.replace(/(<img\b[^>]*\bsrc=")([^"]+)(")/g, (match, prefix, source, suffix) =>
		sources.has(source) ? prefix + sources.get(source) + suffix : match
	);
	await writeFile(path.join(directory, file), text);
}
await writeFile('src/lib/images.json', JSON.stringify(metadata, null, 2) + '\n');
console.log(
	`Optimized ${sources.size} images: ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB`
);
