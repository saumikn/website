<script lang="ts">
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section class="content-wrapper">
	<div class="intro">
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
			<br />

			<p style="color: var(--red-9); font-style: italic;">
				This website currently is under construction, I am transitioning from Wordpress to Sveltekit
				and am in the process of moving my prior blog posts over.
			</p>
		</div>
		<img src="/saumik.jpg" alt="Profile" />
	</div>
</section>

<style>
	.intro {
		display: grid;
		grid-template-columns: 2fr 1fr;
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
