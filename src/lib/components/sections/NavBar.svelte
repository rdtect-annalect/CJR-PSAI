<script lang="ts">
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement | null = $state(null);
  let closeButton: HTMLButtonElement | null = $state(null);

  function toggleMenu() {
    menuOpen = !menuOpen;
    setTimeout(() => {
      if (menuOpen && closeButton) closeButton.focus?.();
      else if (!menuOpen && menuButton) menuButton.focus?.();
    }, 10);
  }
</script>

<nav class="fixed w-full z-50 bg-black/20" aria-label="Main navigation">
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
        <a id="scrollButton3" href="#musicVideo" class="hover:text-orange"
          >MUSIC VIDEO</a
        >
      </li>
      <li>
        <a id="scrollButton4" href="#why" class="hover:text-orange"
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
      bind:this={menuButton}
      class="block md:hidden text-white focus:outline-none focus:ring-2 focus:ring-orange"
      onclick={toggleMenu}
      aria-label="Toggle navigation"
      aria-expanded={menuOpen ? "true" : "false"}
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
    {#if menuOpen}
      <div
        id="mobile-menu"
        class="md:hidden fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <!-- Close button -->
        <button
          bind:this={closeButton}
          class="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-orange"
          onclick={toggleMenu}
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
              onclick={toggleMenu}>HOME</a
            >
          </li>
          <li>
            <a
              id="scrollButton2"
              href="#about"
              class="hover:text-orange block py-2 font-paplane"
              onclick={toggleMenu}>ABOUT</a
            >
          </li>
          <li>
            <a
              id="scrollButton3"
              href="#musicVideo"
              class="hover:text-orange block py-2 font-paplane"
              onclick={toggleMenu}>MUSIC VIDEO</a
            >
          </li>
          <li>
            <a
              id="scrollButton4"
              href="#why"
              class="hover:text-orange block py-2 font-paplane"
              onclick={toggleMenu}>WHY THE PSAI</a
            >
          </li>
          <li>
            <a
              id="scrollButton5"
              href="#spotAI"
              class="hover:text-orange block py-2 font-paplane"
              onclick={toggleMenu}>SPOT AI</a
            >
          </li>
          <li>
            <a
              id="scrollButton6"
              href="#whoCJR"
              class="hover:text-orange block py-2 font-paplane"
              onclick={toggleMenu}>WHO IS CJR</a
            >
          </li>
        </ul>
      </div>
    {/if}
  </div>
</nav>
