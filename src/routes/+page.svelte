<script lang="ts">
	import * as config from '#lib/config.ts';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
	schema={{
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `${config.url}/`,
		name: config.title,
		mainEntity: {
			'@type': 'Person',
			'@id': `${config.url}/#person`,
			name: config.title,
			url: `${config.url}/`,
			image: `${config.url}/saumik.jpg`,
			sameAs: config.profiles
		}
	}}
/>

<section class="content-wrapper">
	<div class="intro">
		<img
			src="/uploads/optimized/saumik.webp"
			alt="Saumik Narayanan"
			width="1536"
			height="2048"
			fetchpriority="high"
		/>
		<div class="content">
			<h1>Hi, I'm Saumik!</h1>
			<br />

			<p>
				I'm currently a Research Scientist at Meta NYC on the Instagram Trust & Safety team. I'm
				working on deploying AI systems to automatically flag content violations.
			</p>
			<br />

			<p>
				Previously, I was a PhD student at Washington University in St. Louis, where I worked on the
				AI-Assisted Decision Making. Some of my research topics included:
			</p>
			<ul>
				<li>Efficient algorithms for imitating low-skill human behavior (NeurIPS 2026)</li>
				<li>Personalized intervention strategies for improving human decision making (RLC 2026)</li>
				<li>Analyzing human usage of AI assistance in ethical domains (AIES 2022, AIES 2023)</li>
			</ul>
			<br />

			<p>
				Outside of work, I enjoy playing chess and other board games, climbing, pickleball, and
				cooking
			</p>
		</div>
	</div>
</section>

<style>
	.intro {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--size-7);
		align-items: start;

		img {
			width: 100%;
			height: auto;
			border-radius: var(--radius-3);
		}

		@media (max-width: 768px) {
			grid-template-columns: 1fr;

			img {
				max-width: 300px;
				margin-inline: auto;
			}
		}
	}
</style>
