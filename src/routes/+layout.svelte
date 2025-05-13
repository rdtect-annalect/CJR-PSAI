<script>
	import '../app.css';
	import NavBar from '$lib/components/sections/NavBar.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
  <title>CJR PSAI</title>
  <link rel="icon" href="/favicon.png" />
  <meta name="description" content="The PSAi - A campaign that uses viral AI images to teach people how to spot AI images" />
</svelte:head>

	<NavBar />
	
	<main class="flex-grow">
		{@render children()}
	</main>
	
	<Footer />
