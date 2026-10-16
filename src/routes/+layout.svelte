<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import PageTransition from './transition.svelte';
	import { page } from '$app/state';

	import '../app.css';
	import 'katex/dist/katex.min.css';

	let { children } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<div class="layout">
	<Header />

	<main id="main" tabindex="-1">
		<PageTransition url={page.url.pathname}>
			{@render children?.()}
		</PageTransition>
	</main>

	<Footer />
</div>

<style>
	.layout {
		min-height: 100dvh;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: clamp(1rem, 4vw, 2rem);
		min-width: 0;

		@media (min-width: 1440px) {
			padding-inline: 0;
		}

		main {
			min-width: 0;
			padding-block: var(--size-9);
		}
	}
</style>
