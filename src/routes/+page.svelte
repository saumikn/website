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
				I'm currently a 5th-year PhD student at Washington University in St. Louis, working in
				thefield of Artificial Intelligence with Chien-Ju Ho. I also heavily collaborate with Sid
				Sen at Microsoft Research NYC.
			</p>
			<br />

			<p>
				My research focuses on the topic of AI-Assisted Decision Making. Some of my prior work has
				analyzed human usage of AI assistance while answering ethical questions involving kidney
				allocation. I have also researched the potential for AI models to learn from and leverage
				low-skill human data to improve the task performance in chess and Atari. Currently, I am
				working on designing intervention strategies for AI models to assist human decision making
				in chess.
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
