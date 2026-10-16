<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Moon, Sun } from '@lucide/svelte';
	import { theme } from '#lib/theme.svelte.ts';
	import { onMount } from 'svelte';
	onMount(() => theme.initialize());
</script>

<button onclick={theme.toggle} aria-label="Toggle theme">
	{#if theme.current === 'dark'}
		<div in:fly={{ y: 10 }}>
			<Sun />
		</div>
	{:else}
		<div in:fly={{ y: -10 }}>
			<Moon />
		</div>
	{/if}
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
	}
</style>
