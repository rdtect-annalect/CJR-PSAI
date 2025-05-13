<script>
	import '../app.css';
	import NavBar from '$lib/components/sections/NavBar.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import { onMount } from 'svelte';
	import { initSmoothScroll, initSectionSnapping } from '$lib/utils/scrolling-utils.svelte';
	
	let { children } = $props();
	// Initialize smooth scrolling on client-side only
	let sectionSnappingEnabled = true;
	
	// Initialize scrolling features when component mounts
	onMount(() => {
		if (typeof window === 'undefined') return;
		
		// Initialize with 80px offset for fixed header
		initSmoothScroll(80);
		
		// Initialize section snapping with custom options
		if (sectionSnappingEnabled) {
			initSectionSnapping({
				sectionSelector: 'section', // All main sections
				threshold: 0.15,         // 15% threshold to trigger snap
				delay: 150,             // 150ms delay before snapping
				headerOffset: 80        // 80px offset for header
			});
		}
	});
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
