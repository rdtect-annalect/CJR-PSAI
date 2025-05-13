<script>
  import GridOverlay from "../ui/GridOverlay.svelte";
  import DigitalElements from "../ui/DigitalElements.svelte";
  import CornerSquares from "../ui/CornerSquares.svelte";
</script>

<section
  id="why_psai"
  class="h-screen flex flex-col items-center justify-center py-20 bg-black relative overflow-hidden"
  style="background-image: url(/images/desktop/whythismatters.png);"
>
  <!-- Grid overlay background pattern -->
  <GridOverlay color="rgba(255,255,255,0.04)" size="40px" />

  <!-- Digital accent elements -->
  <div class="absolute inset-0 pointer-events-none z-10">
    <DigitalElements
      type="dot"
      pos="top-[15%] left-[10%]"
      color="var(--color-primary)"
    />
    <DigitalElements
      type="dot"
      pos="bottom-[20%] right-[15%]"
      color="var(--color-primary)"
    />
    <DigitalElements
      type="arrow"
      pos="top-[25%] right-[10%]"
      color="var(--color-primary)"
    />
    <DigitalElements
      type="arrow"
      pos="bottom-[15%] left-[10%]"
      color="var(--color-primary)"
    />
  </div>

  <!-- Main content container -->
  <div class="container mx-auto px-6 relative z-20">
    <!-- Title -->
    <div class="text-center mb-12">
      <h2
        class="font-paplane text-4xl md:text-5xl text-primary uppercase inline-block px-2 relative"
      >
        <span class="relative">WHY THIS MATTERS</span>
        <!-- Title corner decorations -->
        <DigitalElements
          type="cornerSquare"
          pos="-top-2 -left-2"
          color="var(--color-primary)"
          size={6}
        />
        <DigitalElements
          type="cornerSquare"
          pos="-top-2 -right-2"
          color="var(--color-primary)"
          size={6}
        />
      </h2>
    </div>

    <!-- Content box -->
    <div
      class="text-box mx-auto max-w-3xl relative bg-black bg-opacity-70 p-8 md:p-10 border border-primary rounded-sm shadow-lg backdrop-blur-sm"
    >
      <!-- Content box corners -->
      <CornerSquares color="var(--color-primary)" size={8} offset={1} />

      <!-- Main text content -->
      <p
        class="text-center text-white font-inter font-light leading-7 text-md md:text-lg"
      >
        At a time when trust in journalism is at a historic low, the Columbia
        Journalism Review has a responsibility to call out the threat AI poses
        to the media ecosystem. The PSAi is intended to help people stop the
        spread of misinformation by checking visuals before they share.
      </p>
    </div>

    <!-- CJR Logo -->
    <div class="mt-12 flex justify-center">
      <div class="CJR_ELMNT_SQUARE">
        <img src="/images/CJR_ELMNT_SQUARE 1.svg" alt="CJR Logo" />
      </div>
    </div>

    <!-- Footer attribution -->
    <div class="mt-8 text-center">
      <p class="text-xs font-paplane text-primary uppercase tracking-wider">
        © Columbia Journalism Review
      </p>
    </div>
  </div>
</section>

<style>
  /* Custom styling specific to this section */
  .CJR_ELMNT_SQUARE {
    max-width: 120px;
    margin-top: 2rem;
  }

  /* Ensure proper pixel font rendering */
  .font-paplane {
    letter-spacing: 0.05em;
    text-rendering: optimizeLegibility;
  }
</style>
