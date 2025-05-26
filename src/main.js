// Import services and components with simplified imports
import {
  // Services
  appService,
  eventBus,
  ModalService,
  
  // UI Components
  NavbarComponentComponent,
  HeroComponent,
  VideoComponent,
  
  // Feature Components
  SpotAICarousel,
  FightingAIGallery,
  ReadMoreSection
} from "./lib/index.js";

/**
 * Initialize the application with all required components
 * Uses a clean registration approach for better testability
 */
function initializeApplication() {
  console.log("🚀 Initializing PSAi Application...");

  // Configure the app
  const debug =
    window.location.hostname === "localhost" ||
    window.location.search.includes("debug=true");

  appService.config.debug = debug;

  // Register all components with the app service
  appService.registerComponent("modal", new ModalService());
  appService.registerComponent("navbar", new NavbarComponent());
  appService.registerComponent("hero", new HeroComponent({
    logoSelector: ".the-PSAI img", // Changed from video to img
    topGifSelector: ".coders-gifs .top-img",
    bottomGifSelector: ".coders-gifs .bottom-img"
  }));
  appService.registerComponent("spotAI", new SpotAICarousel());
  appService.registerComponent("fightingAI", new FightingAIGallery());
  appService.registerComponent("readMore", new ReadMoreSection());
  appService.registerComponent("video", new VideoComponent('#videoContainer'));

  // Initialize the app (this will initialize all registered components)
  appService
    .init()
    .then(() => {
      console.log("✅ PSAi Application ready!");

      // Notify the application is ready via event bus
      eventBus.emit("app:ready", { timestamp: Date.now() });
    })
    .catch((error) => {
      console.error("❌ Failed to initialize PSAi Application:", error);
      eventBus.emit("app:error", { error });
    });

  // Expose for debugging and console access
  window.psaiApp = appService;

  // Global cleanup on page unload
  window.addEventListener("beforeunload", () => {
    appService.destroy();
  });

  return appService;
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApplication);
} else {
  // DOM already loaded
  initializeApplication();
}

// Export for potential module usage
export { initializeApplication, appService, eventBus };
