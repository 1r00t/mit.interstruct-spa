<script context="module">
	import { user } from '$lib/stores';

	export async function load({ session }) {
		if (session.authenticated) {
			// get user and store
			await fetch('http://localhost:8000/auth/user/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				credentials: 'include'
			})
				.then((r) => r.json())
				.then((response) => {
					user.set(response);
				})
				.catch(console.log);
		}
		return {};
	}
</script>

<script>
	import Nav from '$lib/Nav.svelte';
</script>

<Nav />
<slot />
