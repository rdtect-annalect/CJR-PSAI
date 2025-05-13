<!-- Hero Section: Exact match to original HTML/CSS structure with Tailwind -->  
<section id="hero" class="relative h-screen w-full bg-black overflow-hidden">
  <!-- Video Wrapper (video + overlays) -->  
  <div class="absolute inset-0 w-full h-full z-0">  
    <!-- For better visual continuity, we should refactor video to play forward + backward and loop -->
    <video class="w-full h-full object-cover" loop muted autoplay playsinline preload="auto" >  
      <source src="/video/CJR_MACRON_MOVING.webm" type="video/webm" />  
    </video>  
      
    <!-- Digital Overlay GIFs (exactly as in original) -->  
    <div class="absolute inset-0 w-full h-full pointer-events-none">  
      <img  
        src="/images/desktop/gif/orange/CJR_CODE_01.gif"  
        alt="Digital Overlay Top"  
        class="absolute top-[20%] right-[10%] max-w-[350px] w-[200px]"  
        draggable="false"  
      />  
      <img  
        src="/images/desktop/gif/orange/CJR_CODE_04.gif"  
        alt="Digital Overlay Bottom"  
        class="absolute bottom-[25%] left-[5%] max-w-[250px] w-[200px]"  
        draggable="false"  
      />  
    </div>  
  </div>  
    
  <!-- PSAI Logo (original positioning: desktop=top-left position, mobile=centered) -->  
  <!-- <div class="relative top-[10%] h-screen w-full">   -->
    <!-- Desktop positioning (matches original's absolute position: top 3.5%, left -13.6%, width 60%) -->  
    <div class="hidden md:block absolute top-[10%] left-[-13.6%] w-[60%] z-10 ">  
      <img src="/images/desktop/gif/CJR_ThePsAI.gif" alt="The PSAI" class="w-full h-auto" />  
    </div>  
      
    <!-- Mobile positioning (centered) -->  
    <div class="md:hidden flex h-full items-center justify-center z-10">  
      <img src="/images/desktop/gif/CJR_ThePsAI.gif" alt="The PSAI" class="w-4/5 max-w-full h-auto" />  
    </div>
  <!-- </div> -->
</section>
