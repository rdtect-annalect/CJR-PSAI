/**
 * Batch categories for the FightingAI component
 */
export const BatchCategory = {
  All: 0,
  CJRAIPromptGallery: 1,
  FutureOfFootball: 2,
  Midterms: 3,
  PostMidterms: 4,
  EndOfYear: 5,
  FuturePredictions: 6,
  ArtisticRealistic: 7
} as const;

/**
 * Get a user-friendly description for a batch category
 * @param batchNumber - Batch category number
 * @returns Formatted batch description
 */
export function getBatchDescription(batchNumber: number): string {
  switch(batchNumber) {
    case BatchCategory.All: return "All Batches";
    case BatchCategory.CJRAIPromptGallery: return "Batch 1: CJR AI Prompt Gallery";
    case BatchCategory.FutureOfFootball: return "Batch 2: The Future of Football";
    case BatchCategory.Midterms: return "Batch 3: Midterms";
    case BatchCategory.PostMidterms: return "Batch 4: Post-Midterms";
    case BatchCategory.EndOfYear: return "Batch 5: End of Year";
    case BatchCategory.FuturePredictions: return "Batch 6: Future Predictions";
    default: return `Batch ${batchNumber}`;
  }
}

/**
 * Navigation links for the site
 */
export const navigationLinks = [
  { id: "home", href: "#home", label: "HOME" },
  { id: "about", href: "#about", label: "ABOUT" },
  { id: "whoCJR", href: "#whoCJR", label: "ABOUT CJR" },
  { id: "why_psai", href: "#why_psai", label: "WHY THE PSAI" },
  { id: "fighting-ai", href: "#fighting-ai", label: "FIGHTING ALGORITHM" },
  { id: "spot-ai", href: "#spot-ai", label: "SPOT AI" },
  { id: "further-reading", href: "#further-reading", label: "FURTHER READING" }
];

/**
 * Social media links
 */
export const socialLinks = [
  { platform: "Twitter", url: "https://twitter.com/CJR", icon: "twitter" },
  { platform: "Instagram", url: "https://instagram.com/columbiajournalismreview", icon: "instagram" },
  { platform: "Facebook", url: "https://facebook.com/columbiajournalismreview", icon: "facebook" }
];

/**
 * Color theme constants
 */
export const colors = {
  primary: "#FF4F2A",
  secondary: "#FFF9E6",
  black: "#000000",
  white: "#FFFFFF",
  gray: {
    100: "#F7FAFC",
    200: "#EDF2F7",
    300: "#E2E8F0",
    400: "#CBD5E0",
    500: "#A0AEC0",
    600: "#718096",
    700: "#4A5568",
    800: "#2D3748",
    900: "#1A202C"
  }
};
