export class Counter {
	private state: DurableObjectState;
	private count = 0;

	constructor(state: DurableObjectState) {
		this.state = state;
	}

	async fetch(request: Request) {
		const url = new URL(request.url);

		if (url.pathname === '/increment') {
			this.count++;
			await this.state.storage.put('count', this.count);
		}

		return new Response(this.count.toString());
	}
}
