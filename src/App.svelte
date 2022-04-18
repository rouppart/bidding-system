<script lang="ts">
	import Router from 'svelte-spa-router';

	import routes from './routes';
</script>

<style lang="postcss">
	a {
		@apply border-2 border-blue-700 rounded p-2;
	}
</style>

<header class="flex justify-center items-center space-x-4 my-2">
	<a href="/#/">Home</a>
	<a href="/#/simple">Simple Bidding</a>
	<a href="/#/labor">Labor Bidding</a>
</header>

<main class="flex flex-col items-center mb-6">
	<Router {routes} />
</main>