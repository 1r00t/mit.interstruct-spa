<script>
	import { session } from '$app/stores';
	import { user } from '$lib/stores';

	async function logout() {
		console.log('logout: ', $session.csrftoken);
		await fetch('http://localhost:8000/auth/logout/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				'X-CSRFToken': $session.csrftoken
			},
			credentials: 'include'
		})
			.then((r) => r.json())
			.then((response) => {
				user.set(null);
				$session.authenticated = false;
			});
	}
</script>

<ul>
	{#if $user}
		<li>hi {$user.email} <button on:click={logout}>logout</button></li>
	{:else}
		<li><a href="/auth/login">login</a></li>
	{/if}
</ul>
