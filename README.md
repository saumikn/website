# saumikn.com

Personal website built with SvelteKit, Svelte and Markdown. All pages, feeds and
crawler endpoints are rendered as static files; production does not require a
application server, database or Git LFS. A separate, small edge Worker can redirect the existing www hostname to the apex domain.

## Development

Use Node 24 (see `.node-version`).

```sh
npm ci
npm run dev
```

## Checks and build

```sh
npm run verify
npm audit
npm run preview
```

`verify` runs type checking, formatting, lint, the production build and regression
checks. It verifies that all 44 migrated articles are published, unpublished
examples remain excluded, crawler files and structured metadata are present, and
local page/asset links resolve. Invalid article metadata and broken links fail the
build.

The Cloudflare Pages output directory remains **`.svelte-kit/cloudflare`** and the
build command remains **`npm run build`**. The static adapter emits `404.html` so
unknown URLs return 404 instead of invoking the former broken Worker. There must
be no manually configured SPA fallback or old Worker intercepting these assets.
Cloudflare processes the `_headers` and `_redirects` files in this directory.

## Content and media

Articles are in `src/routes/blog/posts`. Published articles require `title`,
`description`, an ISO `date`, a `categories` array, and `published: true` in YAML
frontmatter. Put unpublished examples in filenames starting with `_` and use
`published: false`. Article entries, RSS, the sitemap and the public posts endpoint
are generated from this metadata. Short previews are computed at build time;
article bodies are not sent with the blog index.

The repair preserves existing page wording. Research, Contact and Other still
contain their original placeholder text; these pages are marked `noindex` and
excluded from the sitemap until the author replaces that text.

Original media and downloads are in `static/uploads`; optimized WebP versions are
in `static/uploads/optimized`. To regenerate the optimized images after adding or
replacing media:

```sh
node scripts/optimize-images.mjs
npm run format
npm run verify
```

The optimized files and dimension metadata are checked in. Ordinary builds do not
need to regenerate images or access archived websites. Legacy WordPress download
URLs redirect to restored files. `/cv` serves the January 2024 CV available in the
backup; this repair does not represent it as a current CV.

The airline-map project is restored under `static/projects/airlinemaps` from
[saumikn/airlinemaps](https://github.com/saumikn/airlinemaps) commit
`be80d908ee8d9646b1e100a83eb408901532a7c4`, retaining its MIT license and original
route dataset. The site embeds it at `/airlinemaps`. Its background uses the
standard [OpenStreetMap tile service](https://operations.osmfoundation.org/policies/tiles/)
with visible attribution, normal browser caching, and a dark CSS filter for route
contrast. It does not require an API key. Leaflet 1.9.4 and its assets are served
locally, with the upstream license in `static/projects/airlinemaps/vendor/leaflet`.
The airline selector updates both routes and legends; airport selections reset
when switching airlines. Recovered article illustrations and their original source
URLs are recorded in `static/uploads/recovered/sources.json`. Two externally hosted
originals (the Air Arabia map and Typepad pause image) remain unavailable; images
that fail to load show their existing alternative text with an availability message.
The States Chess Cup schedule/rules redirects use the
original Google Sheet and Google Doc published by
[Silver State Chess in August 2020](https://silverstatechess.org/category/news/page/5/).

## Domain and indexing follow-up

The apex domain `saumikn.com` must remain attached to the Pages project. The
existing `www` hostname already reaches Cloudflare's proxy but returns 522 from
its old origin. The scoped edge Worker in `cloudflare/www-redirect.js` returns a
301 to the apex before attempting that origin, preserving paths and queries.
It does not serve the site or implement a server-rendering fallback.

With the owner's Cloudflare account authenticated, deploy it using:

```sh
npx wrangler@4.151.1 deploy --config cloudflare/wrangler.www.jsonc
```

The config targets only `www.saumikn.com/*` in the `saumikn.com` zone and disables
its public `workers.dev` endpoint. If an existing Worker route already handles
that hostname, inspect it before replacing it. Alternatively, use Cloudflare's
[www-to-apex Bulk Redirect](https://developers.cloudflare.com/pages/how-to/www-redirect/).
Pages `_redirects` cannot match a source hostname. Also check for a dashboard
`NODE_VERSION` override that conflicts with Node 24.

After deploying, verify `/robots.txt`, `/sitemap.xml`, `/rss.xml`, all article URLs
and a deliberately missing URL. In the owner's Google Search Console property,
submit `https://saumikn.com/sitemap.xml`, inspect the homepage and request indexing.
Indexing and ranking changes depend on Google's recrawl; the repository cannot
submit that authenticated request or guarantee a ranking.
