<script>
  import ContentCard from '../ui/ContentCard.svelte';
  import DigitalAccents from '../ui/DigitalAccents.svelte';
  import SectionTitle from '../ui/SectionTitle.svelte';
  import DigitalElements from '../ui/DigitalElements.svelte';
</script>

<section id="about" class="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-primary)]">
  <!-- Use our DigitalAccents component instead of direct image references -->
  <DigitalAccents variant="default" />
  
  <!-- Additional accents for visual interest using DigitalElements -->
  <div class="absolute inset-0 w-full h-full pointer-events-none z-10">
    <DigitalElements type="dot" pos="top-[35%] right-[15%]" />
    <DigitalElements type="dot" pos="bottom-[25%] left-[10%]" />
    <DigitalElements type="arrow" pos="top-[20%] right-[25%]" />
    <DigitalElements type="arrow" pos="bottom-[40%] left-[15%]" />
  </div>

  <div class="container relative z-20 flex flex-col items-center px-6">
    <!-- Section header -->
    <SectionTitle title="ABOUT" color="var(--color-secondary)" withBorder={true} class="mb-12" />
    
    <!-- Using our ContentCard component -->
    <ContentCard 
      bgColor="var(--color-primary)" 
      borderColor="var(--color-secondary)" 
      textColor="black"
      padding="p-12 md:p-16 lg:p-24"
      width="w-full"
      maxWidth="max-w-6xl"
    >
      <!-- Card content -->
      <div class="flex flex-col items-center w-full text-center font-inter font-light leading-[2] text-sm md:text-base m-0">
        <p class="mb-6">
          For more than a century, photography has been one of journalists' greatest tools to establish truth and trust. 
          
          But AI-generated images are making it increasingly difficult to distinguish real from synthetic media. 
        </p>
        <p>
          The PSAi is a campaign that uses viral AI images to teach people how to spot AI images—and highlight the role we all play in spreading fakes.
        </p>
      </div>
    </ContentCard>
    
    <!-- Attribution element similar to WhyPsai -->
    <div class="mt-6 text-xs font-paplane text-secondary uppercase tracking-widest">
      © Columbia Journalism Review
    </div>
  </div>
</section>
