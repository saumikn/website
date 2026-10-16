/** Redirect the existing www hostname before Cloudflare attempts its broken origin. */
export default {
	/** @param {Request} request */
	fetch(request) {
		const url = new URL(request.url);
		if (url.hostname !== 'www.saumikn.com') return new Response('Not found', { status: 404 });
		url.protocol = 'https:';
		url.hostname = 'saumikn.com';
		url.port = '';
		return Response.redirect(url.toString(), 301);
	}
};
