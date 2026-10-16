<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title={`${page.status} | Saumik Narayanan`} noindex />
<section class="content-wrapper">
	<h1>{page.status}: {page.error?.message}</h1>
	<p><a href={resolve('/')}>Home</a> · <a href={resolve('/blog')}>Blog</a></p>
</section>
