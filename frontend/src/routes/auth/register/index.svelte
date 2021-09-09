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
	let email: string;
	let password1: string;
	let password2: string;

	let errors: AuthError;

	let success = false;

	type AuthError = {
		email?: Array<string>;
		password1?: Array<string>;
		non_field_errors?: Array<string>;
	};

	function register() {
		fetch('http://localhost:8000/auth/registration/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify({
				email,
				password1,
				password2
			})
		})
			.then((r) => r.json())
			.then((response) => {
				if (response.email || response.password1 || response.non_field_errors) {
					// register error
					errors = response;
				} else {
					// register successfull (verification email sent)
					success = true;
				}
			})
			.catch((error) => {
				// TODO: add error handling (connection error I guess)
				console.log(error);
			});
	}
</script>

{#if errors}
	{#if errors.email}
		{#each errors.email as error}
			{error}
		{/each}
	{/if}
	{#if errors.password1}
		{#each errors.password1 as error}
			{error}
		{/each}
	{/if}
	{#if errors.non_field_errors}
		{#each errors.non_field_errors as error}
			{error}
		{/each}
	{/if}
{/if}

{#if success}
	<h3>Verification email was sent!</h3>
{:else}
	<form>
		<input type="email" bind:value={email} placeholder="email" />
		<input type="password1" bind:value={password1} placeholder="password1" />
		<input type="password2" bind:value={password2} placeholder="password2" />
		<button on:click|preventDefault={register}>register</button>
	</form>
{/if}
