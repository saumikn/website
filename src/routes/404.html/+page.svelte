<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title="Page not found | Saumik Narayanan" noindex />
<section class="content-wrapper">
	<h1>Page not found</h1>
	<p>The page you requested could not be found.</p>
	<p><a href={resolve('/')}>Home</a> · <a href={resolve('/blog')}>Blog</a></p>
</section>
