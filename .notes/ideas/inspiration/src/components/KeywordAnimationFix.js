/**
 * This script fixes the keyword animation issue in the hero section
 * by making the talent words less visible initially and improving their animation.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Wait for the hero animation to initialize
  setTimeout(() => {
    // Find all talent word elements
    const talentWords = document.querySelectorAll(".talent-words");

    if (talentWords.length > 0) {
      console.log("Fixing talent words animation...");

      // Make them initially less visible
      talentWords.forEach((word) => {
        // Start invisible
        word.style.opacity = "0";

        // Random delay for staggered appearance
        setTimeout(() => {
          // Fade in to subtle visibility
          word.style.opacity = "0.15";
          // Slightly smaller than default
          word.style.transform = "scale(0.8)";
        }, 1000 + Math.random() * 2000);
      });
    }
  }, 1000);
});
