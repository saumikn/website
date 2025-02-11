<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import { page } from '$app/stores';

	let isOpen = $state(false);
	const toggle = () => (isOpen = !isOpen);
	const close = () => (isOpen = false);

	let { children } = $props();
</script>

<div class="menu-container">
	<button class="hamburger" onclick={toggle} aria-label="Toggle menu">
		{#if isOpen}
			<X />
		{:else}
			<Menu />
		{/if}
	</button>

	{#if isOpen}
		<button
			class="overlay"
			onclick={toggle}
			onkeydown={(e) => e.key === 'Escape' && close()}
			aria-label="Close menu"
		></button>
	{/if}

	{#if isOpen}
		<nav class="mobile-menu" transition:slide={{ duration: 200, axis: 'y' }}>
			<ul>
				<li><a href="/blog" onclick={close}>Blog</a></li>
				<li><a href="/research" onclick={close}>Research</a></li>
				<li><a href="/other" onclick={close}>Other</a></li>
			</ul>
			<div class="toggle-container">
				{@render children()}
			</div>
		</nav>
	{/if}
</div>

<style>
	.menu-container {
		position: relative;
	}

	.hamburger {
		display: none;
		padding: 0;
		background: none;
		border: none;
		color: var(--text-1);
		cursor: pointer;

		@media (max-width: 768px) {
			display: block;
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
		border: none;
		cursor: pointer;
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		right: 0;
		min-width: 200px;
		background: var(--surface-1);
		padding: var(--size-4);
		border-radius: var(--radius-2);
		z-index: 11;

		ul {
			display: grid;
			gap: var(--size-4);
		}

		.toggle-container {
			display: flex;
			justify-content: center;
			padding-top: var(--size-4);
		}

		a {
			display: block;
			padding: var(--size-2);
			color: var(--text-1);
			text-decoration: none;
			font-size: var(--font-size-2);
			white-space: nowrap;
			font-weight: 200;
		}
	}
</style>
