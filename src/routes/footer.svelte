<script lang="ts">
	import * as config from '$lib/config';
	import { Mail, GraduationCap } from 'lucide-svelte';
</script>

<footer>
	<div class="content">
		<p>{config.title} &copy {new Date().getFullYear()}</p>
		<div class="social">
			<a href="/contact" aria-label="Contact">
				<Mail />
			</a>
			<a href="/contact" aria-label="Scholar">
				<GraduationCap />
			</a>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
		width: 100%;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1080px;
		margin-inline: auto;
		padding-inline: var(--size-7);

		@media (max-width: 1080px) {
			padding-inline: var(--size-4);
		}

		p {
			color: var(--text-2);
		}

		.social {
			display: flex;
			gap: var(--size-4);

			a {
				color: var(--text-2);
				transition: color 0.2s ease;

				&:hover {
					color: var(--text-1);
				}
			}
		}
	}
</style>
