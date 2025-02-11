<script lang="ts">
	import Toggle from './toggle.svelte';
	import * as config from '$lib/config';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import { page } from '$app/stores';

	// Get current path for active link highlighting
	let currentPath = '';
	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}
</script>

<header>
	<nav class="desktop-nav">
		<ul class="links">
			<li>
				<a href="/" class="name">
					<span class="name-text">Saumik Narayanan</span>
				</a>
			</li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/research">Research</a></li>
			<li><a href="/other">Other</a></li>
		</ul>
		<Toggle />
	</nav>

	<nav class="mobile-nav">
		<a href="/" class="name"><span class="name-text">Saumik Narayanan</span></a>
		<MobileMenu>
			<Toggle />
		</MobileMenu>
	</nav>
</header>

<style>
	header {
		padding-block: var(--size-3);
		border-bottom: 1px solid var(--border);
		width: 100%;
	}

	.desktop-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: var(--size-7);
		max-width: 1080px;
		margin-inline: auto;

		@media (max-width: 1080px) {
			padding-inline: var(--size-4);
		}

		@media (max-width: 768px) {
			display: none;
		}
	}

	.links {
		display: flex;
		gap: var(--size-1);
		align-items: center;
	}

	a {
		font-size: var(--font-size-2);
		text-decoration: none;
		color: var(--text-1);
		padding: var(--size-1) var(--size-2);
		font-weight: 200;
	}

	.name-text {
		font-weight: 900;
	}

	.mobile-nav {
		display: none;
		padding-inline: var(--size-4);

		@media (max-width: 768px) {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
