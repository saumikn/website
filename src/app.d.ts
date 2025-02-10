/// <reference types="@cloudflare/workers-types" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {}
		interface Locals {}
		interface PageData {}
		interface PageState {}

		interface Platform {
			env: {
				// Add your bindings here, for example:
				// MY_KV: KVNamespace;
				// MY_DO: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
