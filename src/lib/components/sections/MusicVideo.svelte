<script>
  import DigitalElements from "../ui/DigitalElements.svelte";

  let isPlaying = $state(false);
  // Video play functionality
  function playVideo() {
    // This would be implemented with actual video functionality
    // For now, just a placeholder for the click handler
    console.log("Play video clicked");
    isPlaying = !isPlaying;
  }
</script>

<section
  id="music-video"
  class="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden"
>
  <!-- Full-bleed background image -->
  <div class="absolute inset-0 w-full h-full z-0">
    <img
      src="/images/desktop/video-thumbnail.png"
      alt="Video Thumbnail"
      class="w-full h-full object-cover pointer-events-none"
      draggable="false"
    />
  </div>
  <!-- Content layer -->
  <div class="relative z-10 flex items-center justify-center w-full h-full">
    <button
      onclick={playVideo}
      class="absolute inset-0 w-full h-full"
      aria-label="Play video"
      tabindex="0"
      style="background: transparent; border: none; padding: 0; margin: 0;"
    ></button>
    <!-- Centered CTA badge/card with corners -->
    <div
      class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      {#if !isPlaying}
        <div
          class="relative bg-black/10 p-1 rounded-lg shadow-lg flex items-center justify-center min-w-[220px] min-h-[80px] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_16px_4px_var(--color-secondary)] focus:scale-105 focus:shadow-[0_0_16px_4px_var(--color-secondary)]"
        >
          <span
            class="pixel-text text-white text-2xl sm:text-3xl md:text-4xl font-paplane select-none"
          >
            WATCH TO LEARN
          </span>
          <!-- Corners for the badge only -->
          <DigitalElements
            type="corner"
            pos="-top-3 -left-3 z-30"
            color="var(--color-secondary)"
            size={24}
            rotate={0}
          />
          <DigitalElements
            type="corner"
            pos="-top-3 -right-3 z-30"
            color="var(--color-secondary)"
            size={24}
            rotate={90}
          />
          <DigitalElements
            type="corner"
            pos="-bottom-3 -right-3 z-30"
            color="var(--color-secondary)"
            size={24}
            rotate={180}
          />
          <DigitalElements
            type="corner"
            pos="-bottom-3 -left-3 z-30"
            color="var(--color-secondary)"
            size={24}
            rotate={270}
          />
        </div>
      {/if}
    </div>
    <!-- Full-area clickable overlay -->
    <button
      onclick={playVideo}
      class="absolute inset-0 w-full h-full z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      aria-label="Play video"
      tabindex="0"
      style="background: transparent; border: none; padding: 0; margin: 0;"
    ></button>
  </div>
</section>
