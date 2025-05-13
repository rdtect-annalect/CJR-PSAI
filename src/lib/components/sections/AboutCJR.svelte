<script lang="ts">
  import { onMount } from "svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import ContentCard from "../ui/ContentCard.svelte";
  import GridOverlay from "../ui/GridOverlay.svelte";
  import DigitalAccents from "../ui/DigitalAccents.svelte";
  import CornerSquares from "../ui/CornerSquares.svelte";
  import DigitalElements from "../ui/DigitalElements.svelte";

  // UI state for component animations, interactions, etc.
  let ui = {
    isVisible: false,
    hasAnimated: false,
    /** @type {HTMLElement | null} */
    sectionRef: null as HTMLElement | null,
  };

  // Content state for dynamic text, data-driven elements
  let content = {
    title: "ABOUT COLUMBIA JOURNALISM REVIEW",
    mission: [
      "The Columbia Journalism Review's mission is to be the intellectual leader in the rapidly changing world of journalism.",
      "As the most respected voice on press criticism and the future of news, CJR supports strong standards for verification, transparency, and media literacy.",
      "But if the press once had a singular power to document and publish news, versions of that work are now also visible across the internet—populated by disinformation agents, synthetic-media hobbyists, and all of us who share what we see when we scroll. At stake is trust in substantiated information and the health of democracy. CJR aims to promote a future based on truth—whether or not you consider yourself a journalist.",
    ],
  };

  // Derived values

  // Initialize component
  onMount(() => {
    // Set up intersection observer for animation triggers
    if (typeof window !== "undefined" && ui.sectionRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              ui.isVisible = true;
              // Only animate once
              if (!ui.hasAnimated) {
                ui.hasAnimated = true;
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ui.sectionRef);

      return () => {
        observer.disconnect();
      };
    }
  });
</script>

<section
  id="whoCJR"
  class="relative w-full min-h-screen flex flex-col items-center justify-center bg-black py-40 md:py-48 overflow-hidden"
  bind:this={ui.sectionRef}
  class:opacity-0={!ui.isVisible}
  class:animate-fadeIn={ui.isVisible}
>
  <GridOverlay color="rgba(255,255,255,0.04)" size="32px" />
  <DigitalAccents
    variant="scattered"
    color="var(--color-primary)"
    class="absolute inset-0 pointer-events-none z-10 opacity-40"
  />
  <div class="container mx-auto px-4 relative z-20">
    <div class="mb-16">
      <SectionTitle
        title={content.title}
        color="var(--color-primary)"
        fontSize="text-6xl md:text-7xl tracking-[0.22em]"
        class="text-center font-paplane font-extrabold drop-shadow-lg"
      />
      <!-- Digital underline/accent for SectionTitle -->
      <div class="flex justify-center mt-3">
        <DigitalElements
          type="corner"
          color="var(--color-primary)"
          size={120}
          className="h-2"
        />
      </div>
    </div>
    <div class="flex justify-center items-center w-full">
      <ContentCard
        bgColor="black"
        borderColor="var(--color-primary)"
        textColor="white"
        class="w-full max-w-3xl p-10 md:p-16 rounded-[18px] shadow-[0_8px_32px_0_rgba(255,79,42,0.18)] border-4 border-[var(--color-primary)] flex flex-col items-center relative pixel-shadow"
      >
        <!-- Bold digital pixel corners -->
        <CornerSquares
          color="var(--color-primary)"
          size={14}
          offset={-2}
          class="absolute -top-5 -left-5"
        />
        <CornerSquares
          color="var(--color-primary)"
          size={14}
          offset={-2}
          class="absolute -top-5 -right-5"
        />
        <CornerSquares
          color="var(--color-primary)"
          size={14}
          offset={-2}
          class="absolute -bottom-5 -left-5"
        />
        <CornerSquares
          color="var(--color-primary)"
          size={14}
          offset={-2}
          class="absolute -bottom-5 -right-5"
        />
        <!-- Digital grid overlay inside card -->
        <div class="absolute inset-0 pointer-events-none opacity-10 z-0">
          <GridOverlay color="rgba(255,255,255,0.08)" size="20px" />
        </div>
        <div class="flex flex-col gap-8 relative z-10">
          <p
            class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white"
          >
            The Columbia Journalism Review’s mission is to be the intellectual
            leader in the rapidly changing world of journalism.
          </p>
          <p
            class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white"
          >
            As the most respected voice on press criticism and the future of
            news, CJR supports strong standards for verification, transparency,
            and media literacy.
          </p>
          <p
            class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white"
          >
            But if the press once had a singular power to document and publish
            news, versions of that work are now also visible across the
            internet—populated by disinformation agents, synthetic-media
            hobbyists, and all of us who share what we see when we scroll. At
            stake is trust in substantiated information and the health of
            democracy. CJR aims to promote a future based on truth—whether or
            not you consider yourself a journalist.
          </p>
        </div>
      </ContentCard>
    </div>
  </div>
</section>
