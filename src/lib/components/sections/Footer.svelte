<script>
  import CornerSquares from '../ui/CornerSquares.svelte';
  import GridOverlay from '../ui/GridOverlay.svelte';
  import DigitalAccents from '../ui/DigitalAccents.svelte';
  import DigitalElements from '../ui/DigitalElements.svelte';
  
  // Current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Navigation links with consistent structure
  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#music-video', text: 'Music Video' },
    { href: '#furtherReading', text: 'Further Reading' },
    { href: '#why_psai', text: 'Why the PSAI' },
    { href: '#spotAI', text: 'Spot AI' },
    { href: '#whoCJR', text: 'Who is CJR' }
  ];
</script>

<footer class="bg-black text-white py-16 md:py-24 font-paplane relative overflow-hidden border-t-2 border-orange-500">
  <!-- Digital grid overlay for depth -->
  <GridOverlay color="rgba(255,255,255,0.04)" size="32px" class="absolute inset-0 pointer-events-none z-0" />
  
  <!-- Scattered digital accents for tech aesthetic -->
  <DigitalAccents variant="scattered" color="var(--color-accent, #FF4F2A)" class="absolute inset-0 pointer-events-none z-10 opacity-20" />
  
  <!-- Digital pixel corners - matches original design -->
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={12} offset={0} class="absolute -top-4 -left-4 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={12} offset={0} class="absolute -top-4 -right-4 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={12} offset={0} class="absolute -bottom-4 -left-4 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={12} offset={0} class="absolute -bottom-4 -right-4 z-10" />

  <!-- Add cross elements from original design -->
  <div class="absolute top-10 left-10 w-3 h-3 opacity-60 cross-element">
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.28737 0L2.85825 1.42833L1.42912 0L0 1.42833L1.42912 2.85666L0 4.29118L1.42912 5.71951L2.85825 4.29118L4.28737 5.71951L5.71649 4.29118L4.28737 2.85666L5.71649 1.42833L4.28737 0Z" fill="#FFF9EB" />
    </svg>
  </div>
  
  <div class="absolute bottom-10 right-10 w-3 h-3 opacity-60 cross-element">
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.28737 0L2.85825 1.42833L1.42912 0L0 1.42833L1.42912 2.85666L0 4.29118L1.42912 5.71951L2.85825 4.29118L4.28737 5.71951L5.71649 4.29118L4.28737 2.85666L5.71649 1.42833L4.28737 0Z" fill="#FFF9EB" />
    </svg>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="footer-wrapper flex flex-col items-center">
      <!-- Logo centered as in original design -->
      <div class="footer-logo mb-12">
        <img src="/images/CJR-Logo.svg" alt="Columbia Journalism Review" class="h-16 md:h-20 drop-shadow-lg" />
      </div>
      
      <!-- Navigation Links with pixel font styling -->
      <div class="mb-12 w-full max-w-2xl">
        <ul class="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-6 gap-x-4 md:gap-x-10 font-paplane text-base tracking-[0.18em]">
          {#each navLinks as link}
            <li class="text-center md:text-left">
              <a 
                href={link.href} 
                class="text-white hover:text-orange-400 px-2 py-1 underline-offset-4 hover:underline focus:underline focus:text-orange-400 focus:shadow-[0_0_8px_2px_var(--color-accent)] transition duration-300 border-b border-transparent hover:border-orange-400"
              >
                {link.text}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Copyright with digital accents -->
      <div class="border-t border-white/10 pt-6 mt-4 w-full max-w-md">
        <div class="text-center text-sm opacity-70 font-paplane tracking-widest flex flex-col items-center">
          <p class="mb-3">© {currentYear} Columbia Journalism Review</p>
          
          <!-- Digital Decorations: pixel elements like original -->  
          <div class="mt-6 flex gap-5 items-center justify-center">
            <div class="w-2 h-2 rotate-45 bg-orange-500 border border-orange-400 shadow-[0_0_8px_2px_var(--color-accent)]"></div>
            <DigitalElements type="dot" color="#FF4F2A" size={4} className="opacity-80" />
            <div class="w-2 h-2 rotate-45 bg-orange-500 border border-orange-400 shadow-[0_0_8px_2px_var(--color-accent)]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Animation for cross elements */
  .cross-element {
    animation: pulse 3s infinite alternate;
    transform: scale(2);
  }
  
  @keyframes pulse {
    0% { opacity: 0.3; transform: scale(1.5); }
    100% { opacity: 0.7; transform: scale(2.5); }
  }
</style>
