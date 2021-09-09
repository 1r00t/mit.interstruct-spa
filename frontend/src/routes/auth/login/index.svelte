<script context="module">
	export async function load({ session }) {
		console.log(session);
		if (session.authenticated) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import { session } from '$app/stores';

	import { user } from '$lib/stores';

	let email: string;
	let password: string;
	function login() {
		fetch('http://localhost:8000/auth/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({ email, password })
		})
			.then((r) => r.json())
			.then((response) => {
				console.log('login', response);
				$session.authenticated = true;
				fetchMe();
			});
	}

	function fetchMe() {
		fetch('http://localhost:8000/auth/user/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			mode: 'cors',
			credentials: 'include'
		})
			.then((r) => r.json())
			.then((response) => {
				user.set(response);
			});
	}
</script>

<form>
	<input type="email" bind:value={email} placeholder="email" />
	<input type="password" bind:value={password} placeholder="password" />
	<button on:click|preventDefault={login}>login</button>
</form>
