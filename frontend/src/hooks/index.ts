import cookie from 'cookie';
import type { ServerResponse } from '@sveltejs/kit/types/hooks';

export async function handle({ request, resolve }): Promise<ServerResponse> {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.authenticated = cookies.sessionid ? true : false;
	request.locals.csrftoken = cookies.csrftoken || null;
	request.locals.sessionid = cookies.sessionid || null;

	const response = await resolve(request);

	return response;
}

export function getSession(request) {
	return {
		authenticated: request.locals.authenticated,
		csrftoken: request.locals.csrftoken,
		sessionid: request.locals.sessionid
	};
}
