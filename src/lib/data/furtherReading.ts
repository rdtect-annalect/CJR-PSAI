/**
 * Article data for Further Reading section
 * This data structure follows the design pattern from the original site
 * with line breaks in titles encoded for proper display
 */
export interface Article {
  title: string;
  titleWithBreaks: string; // Title with <br/> tags for display
  author: string;
  date: string;
  href: string;
  aria: string;
  category?: string; // Optional category tag
}

export const articles: Article[] = [
  {
    title: "How We're Using AI",
    titleWithBreaks: "HOW <br/>We're <br/>Using <br/>AI <br/>-",
    author: "Mike Ananny & Matt Pearce",
    date: "May 12, 2025",
    href: "#",
    aria: "Read How We're Using AI",
    category: "Opinion"
  },
  {
    title: "Getting My News from ChatGPT",
    titleWithBreaks: "GETTING <br/>MY NEWS <br/>FROM <br/>CHATGPT <br/>-",
    author: "Laura Preston",
    date: "May 13, 2025",
    href: "#",
    aria: "Read Getting My News from ChatGPT",
    category: "Feature"
  },
  {
    title: "Do AI Detection Tools Work?",
    titleWithBreaks: "DO AI <br/>DETECTION <br/>TOOLS <br/>WORK? <br/>-",
    author: "Yona Tr Golding",
    date: "May 14, 2025",
    href: "#",
    aria: "Read Do AI Detection Tools Work?",
    category: "Research"
  },
  {
    title: "Machine Learning and Journalism",
    titleWithBreaks: "MACHINE <br/>LEARNING <br/>AND <br/>JOURNALISM <br/>-",
    author: "Carlos Rivera",
    date: "May 15, 2025",
    href: "#",
    aria: "Read Machine Learning and Journalism",
    category: "Technology"
  },
  {
    title: "Ethics of AI Generated Content",
    titleWithBreaks: "ETHICS <br/>OF AI <br/>GENERATED <br/>CONTENT <br/>-",
    author: "Sophia Chen",
    date: "May 16, 2025",
    href: "#",
    aria: "Read Ethics of AI Generated Content",
    category: "Ethics"
  },
  {
    title: "Future of News Automation",
    titleWithBreaks: "FUTURE <br/>OF NEWS <br/>AUTOMATION <br/><br/>-",
    author: "James Mitchell",
    date: "May 17, 2025",
    href: "#",
    aria: "Read Future of News Automation",
    category: "Forecast"
  }
];