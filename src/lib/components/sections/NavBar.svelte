<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // Menu state grouped logically using standard reactive variables
  let menu = {
    isOpen: false,
    /** @type {HTMLButtonElement | null} */
    menuButton: null as HTMLButtonElement | null,
    /** @type {HTMLButtonElement | null} */
    closeButton: null as HTMLButtonElement | null,
  };

  // Navbar visibility state grouped
  let scroll = {
    isNavbarVisible: true,
    lastPosition: 0,
    isScrollingUp: false,
    threshold: 50, // Minimum scroll distance to trigger hide/show
  };

  // We'll use standard reactivity until Svelte 5 runes are fully configured
  $: shouldShowNavbar =
    scroll.isScrollingUp || scroll.lastPosition < 50 || menu.isOpen;

  function toggleMenu() {
    menu.isOpen = !menu.isOpen;

    if (menu.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Handle scroll events
  function handleScroll() {
    // Ignore scroll events when menu is open
    if (menu.isOpen) return;

    const currentScrollPosition = window.scrollY;
    scroll.isScrollingUp = currentScrollPosition < scroll.lastPosition;

    // Only change navbar visibility if we've scrolled a significant amount
    if (
      Math.abs(currentScrollPosition - scroll.lastPosition) >
      scroll.threshold / 3
    ) {
      // Always show navbar when at the top or scrolling up
      scroll.isNavbarVisible =
        scroll.isScrollingUp || currentScrollPosition < 50;
    }

    // Update the scroll position
    scroll.lastPosition = currentScrollPosition;
  }

  function closeMenu() {
    if (menu.isOpen) {
      menu.isOpen = false;
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Function to close menu when clicking a navigation link
  function handleLinkClick() {
    closeMenu();
  }

  // Focus management for the menu
  function handleMenuButtonFocus() {
    if (menu.closeButton) menu.closeButton.focus();
  }

  function handleCloseButtonFocus() {
    if (menu.menuButton) menu.menuButton.focus();
  }

  // Add scroll event listener when component mounts
  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<nav
  class="fixed w-full z-50 bg-black/20 transition-transform duration-300 ease-in-out"
  class:translate-y-0={scroll.isNavbarVisible}
  class:-translate-y-full={!scroll.isNavbarVisible}
  aria-label="Main navigation"
>
  <div class="container mx-auto px-4 py-3 flex justify-between items-center">
    <!-- Logo Left -->
    <a href="#hero" class="flex-shrink-0">
      <img src="/images/CJR-Logo.svg" alt="Logo" class="h-10 w-auto" />
    </a>
    <!-- Desktop menu Right -->
    <ul
      class="hidden md:flex items-center space-x-8 font-paplane text-secondary text-sm"
    >
      <li>
        <a id="scrollButton2" href="#about" class="hover:text-orange">ABOUT</a>
      </li>
      <li>
        <a id="scrollButton3" href="#music-video" class="hover:text-orange"
          >MUSIC VIDEO</a
        >
      </li>
      <li>
        <a id="scrollButton4" href="#why_psai" class="hover:text-orange"
          >WHY THE PSAI</a
        >
      </li>
      <li>
        <a id="scrollButton5" href="#spotAI" class="hover:text-orange"
          >SPOT AI</a
        >
      </li>
      <li>
        <a id="scrollButton6" href="#whoCJR" class="hover:text-orange"
          >WHO IS CJR</a
        >
      </li>
    </ul>

    <!-- Mobile menu button (right) -->
    <button
      bind:this={menu.menuButton}
      class="block md:hidden text-white focus:outline-none focus:ring-2 focus:ring-orange"
      on:click={toggleMenu}
      aria-label="Toggle navigation"
      aria-expanded={menu.isOpen ? "true" : "false"}
      aria-controls="mobile-menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Mobile menu (conditional rendering) -->
    {#if menu.isOpen}
      <div
        id="mobile-menu"
        class="md:hidden fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <!-- Close button -->
        <button
          bind:this={menu.closeButton}
          class="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          on:click={toggleMenu}
          aria-label="Close navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul
          class="flex flex-col space-y-6 font-paplane text-white text-xl text-center"
        >
          <li>
            <a
              id="scrollButton1"
              href="#hero"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>HOME</a
            >
          </li>
          <li>
            <a
              id="scrollButton2"
              href="#about"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>ABOUT</a
            >
          </li>
          <li>
            <a
              id="scrollButton3"
              href="#music-video"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>MUSIC VIDEO</a
            >
          </li>
          <li>
            <a
              id="scrollButton4"
              href="#why_psai"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>WHY THE PSAI</a
            >
          </li>
          <li>
            <a
              id="scrollButton5"
              href="#spotAI"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>SPOT AI</a
            >
          </li>
          <li>
            <a
              id="scrollButton6"
              href="#whoCJR"
              class="hover:text-orange block py-2 font-paplane"
              on:click={toggleMenu}>WHO IS CJR</a
            >
          </li>
        </ul>
      </div>
    {/if}
  </div>
</nav>
