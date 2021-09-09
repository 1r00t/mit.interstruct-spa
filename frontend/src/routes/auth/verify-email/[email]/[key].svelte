<script context="module">
	export async function load({ page }) {
		return {
			props: {
				key: page.params.key,
				email: decodeURI(page.params.email)
			}
		};
	}
</script>

<script lang="ts">
	export let key: string;
	export let email: string;

	function activate() {
		fetch('http://localhost:8000/auth/registration/verify-email/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify({ key })
		})
			.then((r) => r.json())
			.then((response) => {
				console.log(response);
			});
	}
</script>

<h1>verify email address: <strong>{email}</strong></h1>
<button on:click={activate}>verify</button>
