import "clsx";
import { i as attr_class, j as attr_style, k as stringify, f as escape_html, e as ensure_array_like, d as attr, c as pop, p as push, l as bind_props } from "../../chunks/index.js";
import { C as CornerSquares, a as DigitalElements, D as DigitalAccents, G as GridOverlay } from "../../chunks/DigitalAccents.js";
import { h as fallback } from "../../chunks/utils.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Hero($$payload) {
  $$payload.out += `<section id="hero" class="relative h-screen w-full bg-black overflow-hidden"><div class="absolute inset-0 w-full h-full z-0"><video class="w-full h-full object-cover" loop muted autoplay playsinline preload="auto"><source src="/video/CJR_MACRON_MOVING.webm" type="video/webm"></video> <div class="absolute inset-0 w-full h-full pointer-events-none"><img src="/images/desktop/gif/orange/CJR_CODE_01.gif" alt="Digital Overlay Top" class="absolute top-[20%] right-[10%] max-w-[350px] w-[200px]" draggable="false"> <img src="/images/desktop/gif/orange/CJR_CODE_04.gif" alt="Digital Overlay Bottom" class="absolute bottom-[25%] left-[5%] max-w-[250px] w-[200px]" draggable="false"></div></div>  <div class="hidden md:block absolute top-[10%] left-[-13.6%] w-[60%] z-10"><img src="/images/desktop/gif/CJR_ThePsAI.gif" alt="The PSAI" class="w-full h-auto"></div> <div class="md:hidden flex h-full items-center justify-center z-10"><img src="/images/desktop/gif/CJR_ThePsAI.gif" alt="The PSAI" class="w-4/5 max-w-full h-auto"></div></section>`;
}
function ContentCard($$payload, $$props) {
  let {
    bgColor = "var(--color-primary)",
    borderColor = "var(--color-secondary)",
    textColor = "var(--color-secondary)",
    showArrows = true,
    showGrid = true,
    padding = "p-8 md:p-12 lg:p-24",
    width = "w-full",
    maxWidth = "max-w-6xl",
    class: className = "",
    children
  } = $$props;
  $$payload.out += `<div${attr_class(`relative ${width} ${maxWidth} ${className}`)}><div class="relative">`;
  CornerSquares($$payload, { color: borderColor, size: 8, offset: 1 });
  $$payload.out += `<!----> <div${attr_class(`relative border border-[${stringify(borderColor)}] shadow-xl`)}${attr_style(`background-color: ${stringify(bgColor)};`)}>`;
  if (showGrid) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute inset-0 w-full h-full pointer-events-none z-0" style="background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;" aria-hidden="true"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (showArrows) {
    $$payload.out += "<!--[-->";
    DigitalElements($$payload, { type: "arrow", pos: "top-6 left-8" });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, { type: "arrow", pos: "top-6 left-9" });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, { type: "arrow", pos: "top-6 left-10" });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, { type: "arrow", pos: "bottom-6 right-8" });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, { type: "arrow", pos: "bottom-6 right-9" });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, { type: "arrow", pos: "bottom-6 right-10" });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div${attr_class(`relative z-10 ${padding}`)}${attr_style(`color: ${stringify(textColor)}`)}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div></div></div>`;
}
function SectionTitle($$payload, $$props) {
  let {
    title = "",
    color = "var(--color-primary)",
    withBorder = true,
    fontSize = "text-4xl md:text-5xl",
    class: className = ""
  } = $$props;
  $$payload.out += `<div${attr_class(`section-title-wrapper text-center mb-10 relative ${className}`)}>`;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: "-top-4 -left-4",
    color,
    size: 8
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: "-top-4 -right-4",
    color,
    size: 8
  });
  $$payload.out += `<!----> <h2${attr_class(`font-paplane ${stringify(fontSize)} uppercase relative inline-block px-8 py-2 ${stringify(withBorder ? `border-b-2` : ``)}`)}${attr_style(`color: ${stringify(color)}; ${stringify(withBorder ? `border-color: ${color}` : "")}`)}>${escape_html(title)}</h2></div>`;
}
function About($$payload) {
  $$payload.out += `<section id="about" class="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-primary)]">`;
  DigitalAccents($$payload, { variant: "default" });
  $$payload.out += `<!----> <div class="absolute inset-0 w-full h-full pointer-events-none z-10">`;
  DigitalElements($$payload, { type: "dot", pos: "top-[35%] right-[15%]" });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, { type: "dot", pos: "bottom-[25%] left-[10%]" });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, { type: "arrow", pos: "top-[20%] right-[25%]" });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, { type: "arrow", pos: "bottom-[40%] left-[15%]" });
  $$payload.out += `<!----></div> <div class="container relative z-20 flex flex-col items-center px-6">`;
  SectionTitle($$payload, {
    title: "ABOUT",
    color: "var(--color-secondary)",
    withBorder: true,
    class: "mb-12"
  });
  $$payload.out += `<!----> `;
  ContentCard($$payload, {
    bgColor: "var(--color-primary)",
    borderColor: "var(--color-secondary)",
    textColor: "black",
    padding: "p-12 md:p-16 lg:p-24",
    width: "w-full",
    maxWidth: "max-w-6xl",
    children: ($$payload2) => {
      $$payload2.out += `<div class="flex flex-col items-center w-full text-center font-inter font-light leading-[2] text-sm md:text-base m-0"><p class="mb-6">For more than a century, photography has been one of journalists' greatest tools to establish truth and trust. 
          
          But AI-generated images are making it increasingly difficult to distinguish real from synthetic media.</p> <p>The PSAi is a campaign that uses viral AI images to teach people how to spot AI images—and highlight the role we all play in spreading fakes.</p></div>`;
    }
  });
  $$payload.out += `<!----> <div class="mt-6 text-xs font-paplane text-secondary uppercase tracking-widest">© Columbia Journalism Review</div></div></section>`;
}
function MusicVideo($$payload) {
  $$payload.out += `<div id="music-video"><section id="musicVideo" class="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden"><div class="absolute inset-0 w-full h-full z-0"><img src="/images/desktop/video-thumbnail.png" alt="Video Thumbnail" class="w-full h-full object-cover pointer-events-none" draggable="false"></div> <div class="relative z-10 flex items-center justify-center w-full h-full"><button class="absolute inset-0 w-full h-full" aria-label="Play video" tabindex="0" style="background: transparent; border: none; padding: 0; margin: 0;"></button> <div class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="relative bg-black/10 p-1 rounded-lg shadow-lg flex items-center justify-center min-w-[220px] min-h-[80px] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_16px_4px_var(--color-secondary)] focus:scale-105 focus:shadow-[0_0_16px_4px_var(--color-secondary)]"><span class="pixel-text text-white text-2xl sm:text-3xl md:text-4xl font-paplane select-none">WATCH TO LEARN</span> `;
    DigitalElements($$payload, {
      type: "corner",
      pos: "-top-3 -left-3 z-30",
      color: "var(--color-secondary)",
      size: 24,
      rotate: 0
    });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, {
      type: "corner",
      pos: "-top-3 -right-3 z-30",
      color: "var(--color-secondary)",
      size: 24,
      rotate: 90
    });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, {
      type: "corner",
      pos: "-bottom-3 -right-3 z-30",
      color: "var(--color-secondary)",
      size: 24,
      rotate: 180
    });
    $$payload.out += `<!----> `;
    DigitalElements($$payload, {
      type: "corner",
      pos: "-bottom-3 -left-3 z-30",
      color: "var(--color-secondary)",
      size: 24,
      rotate: 270
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div> <button class="absolute inset-0 w-full h-full z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" aria-label="Play video" tabindex="0" style="background: transparent; border: none; padding: 0; margin: 0;"></button></div></section></div>`;
}
function WhyPsai($$payload) {
  $$payload.out += `<section id="why" class="h-screen flex flex-col items-center justify-center py-20 bg-black relative overflow-hidden">`;
  GridOverlay($$payload, { color: "rgba(255,255,255,0.04)", size: "40px" });
  $$payload.out += `<!----> <div class="absolute inset-0 pointer-events-none z-10">`;
  DigitalElements($$payload, {
    type: "dot",
    pos: "top-[15%] left-[10%]",
    color: "var(--color-primary)"
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "dot",
    pos: "bottom-[20%] right-[15%]",
    color: "var(--color-primary)"
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "arrow",
    pos: "top-[25%] right-[10%]",
    color: "var(--color-primary)"
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "arrow",
    pos: "bottom-[15%] left-[10%]",
    color: "var(--color-primary)"
  });
  $$payload.out += `<!----></div> <div class="container mx-auto px-6 relative z-20"><div class="text-center mb-12"><h2 class="font-paplane text-4xl md:text-5xl text-primary uppercase inline-block px-2 relative svelte-1myqos3"><span class="relative">WHY THIS MATTERS</span> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: "-top-2 -left-2",
    color: "var(--color-primary)",
    size: 6
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: "-top-2 -right-2",
    color: "var(--color-primary)",
    size: 6
  });
  $$payload.out += `<!----></h2></div> <div class="text-box mx-auto max-w-3xl relative bg-black bg-opacity-70 p-8 md:p-10 border border-primary rounded-sm shadow-lg backdrop-blur-sm">`;
  CornerSquares($$payload, {
    color: "var(--color-primary)",
    size: 8,
    offset: 1
  });
  $$payload.out += `<!----> <p class="text-center text-white font-inter font-light leading-7 text-md md:text-lg">At a time when trust in journalism is at a historic low, the Columbia Journalism Review has a responsibility to call out the threat AI poses to the media ecosystem. The PSAi is intended to help people stop the spread of misinformation by checking visuals before they share.</p></div> <div class="mt-12 flex justify-center"><div class="fingerprint-container text-primary border-2 border-primary p-5 relative group hover:shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105 hover:bg-primary/10 svelte-1myqos3"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16" class="transition-transform duration-300 group-hover:rotate-12"><path d="M8 1a7 7 0 0 1 0 14A7 7 0 0 1 8 1"></path><path d="M11 11.33A7 7 0 0 1 8 15a7 7 0 0 1 0-14 7 7 0 0 1 3 1.33"></path></svg> `;
  CornerSquares($$payload, {
    color: "var(--color-primary)",
    size: 6,
    offset: 1
  });
  $$payload.out += `<!----></div></div> <div class="mt-8 text-center"><p class="text-xs font-paplane text-primary uppercase tracking-wider svelte-1myqos3">© Columbia Journalism Review</p></div></div></section>`;
}
const imageUrls = {
  // Batch 1: Viral Social Media Images
  viralPlaceholder1: "/images/fightingwithAI/batch1/Shrimp-Jesus.jpg",
  viralPlaceholder2: "/images/fightingwithAI/batch1/baby.jpg",
  viralPlaceholder3: "/images/fightingwithAI/batch1/Giant.jpg",
  viralPlaceholder4: "/images/fightingwithAI/batch1/girl_cry.jpg",
  viralPlaceholder5: "/images/fightingwithAI/batch1/Pikachu.jpg",
  viralPlaceholder6: "/images/fightingwithAI/batch1/Kid.jpg",
  viralPlaceholder7: "/images/fightingwithAI/batch1/McDonalds.jpg",
  viralPlaceholder8: "/images/fightingwithAI/batch1/Swifties.jpg",
  viralPlaceholder9: "/images/fightingwithAI/batch1/1-mobile.jpg",
  // Batch 2: Celebrity Images
  celebPlaceholder1: "/images/fightingwithAI/batch2/Elizabeth.jpg",
  celebPlaceholder2: "/images/fightingwithAI/batch2/Pope.jpg",
  celebPlaceholder3: "/images/fightingwithAI/batch2/mrBean.jpg",
  celebPlaceholder4: "/images/fightingwithAI/batch2/WillSmith.jpg",
  celebPlaceholder5: "/images/fightingwithAI/batch2/Katy.jpg",
  celebPlaceholder6: "/images/fightingwithAI/batch2/Tyson.jpg",
  celebPlaceholder7: "/images/fightingwithAI/batch2/Zuckerberg.jpg",
  celebPlaceholder8: "/images/fightingwithAI/batch2/Party.jpg",
  celebPlaceholder9: "/images/fightingwithAI/batch2/Julian.jpg",
  celebPlaceholder10: "/images/fightingwithAI/batch2/Warren.jpg",
  // Batch 3: News and Political Images
  newsPoliticalPlaceholder1: "/images/fightingwithAI/batch3/Bolsonaro.jpg",
  newsPoliticalPlaceholder2: "/images/fightingwithAI/batch3/Pentagon.jpg",
  newsPoliticalPlaceholder3: "/images/fightingwithAI/batch3/Turkish.jpg",
  newsPoliticalPlaceholder4: "/images/fightingwithAI/batch3/Ukranian.jpg",
  newsPoliticalPlaceholder5: "/images/fightingwithAI/batch3/Earthquake.jpg",
  newsPoliticalPlaceholder6: "/images/fightingwithAI/batch3/Flood.jpg",
  newsPoliticalPlaceholder7: "/images/fightingwithAI/batch3/Hurricane.jpg",
  newsPoliticalPlaceholder8: "/images/fightingwithAI/batch3/Israeli.jpg",
  newsPoliticalPlaceholder9: "/images/fightingwithAI/batch3/Armed.jpg",
  newsPoliticalPlaceholder10: "/images/fightingwithAI/batch3/Rescuing.jpg",
  // Batch 4: Artistic and Realistic Images
  artisticPlaceholder1: "/images/fightingwithAI/batch4/david.jpg",
  artisticPlaceholder2: "/images/fightingwithAI/batch4/Luxor.jpg",
  artisticPlaceholder3: "/images/fightingwithAI/batch4/Pizza.jpg",
  artisticPlaceholder4: "/images/fightingwithAI/batch4/Mysterious.jpg",
  artisticPlaceholder5: "/images/fightingwithAI/batch4/Cryingwoman.jpg",
  artisticPlaceholder6: "/images/fightingwithAI/batch4/oldwomen.jpg"
};
const viralSocialMediaItems = [
  {
    id: 1,
    title: "Shrimp Jesus",
    description: "Surreal images like this have gone viral, fooling many people into believing they were real.",
    sourceAttribution: "@TheHornetsFury",
    platform: "X",
    stats: {
      views: 29e5,
      shares: 5500,
      likes: 53e3
    },
    sources: [
      "https://www.forbes.com/sites/danidiplacido/2024/04/28/facebooks-surreal-shrimp-jesus-trend-explained/",
      "https://www.linkedin.com/pulse/shrimp-jesus-ai-tsunami-navigating-sea-digital-sanzana-ph-d--4ubyc/",
      "https://manofmany.com/tech/shrimp-jesus-explained",
      "https://www.youtube.com/watch?v=nFsZ-mOw4Sc",
      "https://x.com/TheHornetsFury/status/1767792068947329106?lang=en"
    ],
    images: {
      small: imageUrls.viralPlaceholder1,
      medium: imageUrls.viralPlaceholder1
    }
  },
  {
    id: 2,
    title: "Baby Skydiving",
    description: "A digital creator introduced his series of images featuring babies skydiving on Facebook.",
    sourceAttribution: "Timothy J. Nemeth",
    platform: "Facebook",
    stats: {
      likes: 2e4,
      shares: 91e3
    },
    sources: [
      "https://www.boredpanda.com/ai-generated-images-of-babies-skydiving-timothy-j-nemeth/"
    ],
    images: {
      small: imageUrls.viralPlaceholder2,
      medium: imageUrls.viralPlaceholder2
    }
  },
  {
    id: 6,
    title: "Giant Strawberry",
    description: "Part of a trend of making images featuring huge fruits and vegetables. People even travelled to try and see these fruits.",
    sourceAttribution: "Gardening & Home",
    platform: "Facebook",
    stats: {
      likes: 587e3,
      shares: 108e3
    },
    sources: [
      "https://au.news.yahoo.com/amen-facebook-boomers-praising-jesus-143102189.html",
      "https://www.facebook.com/photo.php?fbid=647860824022116&id=100063946122079&set=a.480235930784607"
    ],
    images: {
      small: imageUrls.viralPlaceholder3,
      medium: imageUrls.viralPlaceholder3
    }
  },
  {
    id: 10,
    title: "Girl Crying With Dog",
    description: "This image went viral during Hurricane Milton. It was used by right wing MAGA supporters to show the effects of Biden's lack of support for residents in the wake of the hurricane.",
    sourceAttribution: "@GuntherEagleman",
    platform: "X",
    stats: {
      views: 42e4,
      shares: 7100,
      likes: 21e3
    },
    sources: [
      "https://www.rollingstone.com/culture/culture-news/ai-girl-maga-hurricane-helene-1235125285/",
      "https://x.com/GuntherEagleman/status/1841814492499374251"
    ],
    images: {
      small: imageUrls.viralPlaceholder4,
      medium: imageUrls.viralPlaceholder4
    }
  },
  {
    id: 13,
    title: "Pikachu at Protest",
    description: "Images like these, depicting Pikachu at a Turkish protest, recently went viral across social media.",
    sourceAttribution: "@hidden.ny",
    platform: "Instagram",
    stats: {
      likes: 164e3
    },
    sources: [
      "https://www.instagram.com/hidden.ny/"
    ],
    images: {
      small: imageUrls.viralPlaceholder5,
      medium: imageUrls.viralPlaceholder5
    }
  },
  {
    id: 21,
    title: "McDonald's Travis Scott Burger",
    description: "This AI-generated image was shared as if McDonald's had released a new Travis Scott burger, causing confusion among fans.",
    sourceAttribution: "@AIFoodPics",
    platform: "X",
    stats: {
      views: 89e4,
      likes: 42e3
    },
    sources: [
      "https://www.thefocus.news/celebrity/travis-scott-mcdonalds-meal-2023/"
    ],
    images: {
      small: imageUrls.viralPlaceholder7,
      medium: imageUrls.viralPlaceholder7
    }
  },
  {
    id: 22,
    title: "Kid at Arcade",
    description: "This image of a child at an arcade went viral on gaming forums, with many believing it was a real photo from the 1980s.",
    sourceAttribution: "@nostalgiaAI",
    platform: "Reddit",
    stats: {
      views: 24500,
      likes: 1800
    },
    sources: [
      "https://www.reddit.com/r/RetroGaming/"
    ],
    images: {
      small: imageUrls.viralPlaceholder6,
      medium: imageUrls.viralPlaceholder6
    }
  },
  {
    id: 23,
    title: "Taylor Swift Fans Concert",
    description: "This AI-generated image was shared as a crowd photo from a Taylor Swift concert, fooling many fans on social media.",
    sourceAttribution: "@swiftiesunite",
    platform: "Instagram",
    stats: {
      likes: 245e3,
      comments: 8700
    },
    sources: [
      "https://www.instagram.com/explore/tags/taylorswift/"
    ],
    images: {
      small: imageUrls.viralPlaceholder8,
      medium: imageUrls.viralPlaceholder8
    }
  },
  {
    id: 24,
    title: "Vintage Mobile Phone",
    description: "This image purporting to show an early 1980s mobile phone concept went viral, with many technology enthusiasts debating its authenticity.",
    sourceAttribution: "@RetroTechHistory",
    platform: "Facebook",
    stats: {
      shares: 37e3,
      comments: 4500
    },
    sources: [
      "https://www.facebook.com/groups/vintagetechnology/"
    ],
    images: {
      small: imageUrls.viralPlaceholder9,
      medium: imageUrls.viralPlaceholder9
    }
  }
];
const celebrityImages = [
  {
    id: 5,
    title: "Queen Elizabeth Dancing",
    description: "Part of a viral series of images rendered by AI. This one depicts the late Queen Elizabeth II breaking it down on the dance floor.",
    sourceAttribution: "Luca Allievi",
    platform: "New York Post",
    stats: {
      likes: 45e3,
      shares: 12e3
    },
    sources: [
      "https://nypost.com/2023/05/17/want-to-see-queen-elizabeth-get-low-on-the-dance-floor-thank-ai-for-that/"
    ],
    images: {
      small: imageUrls.celebPlaceholder1,
      medium: imageUrls.celebPlaceholder1
    }
  },
  {
    id: 8,
    title: "Pope in Designer Coat",
    description: "This image of the Pope in a designer jacket was first published on Reddit and went viral because of how real it looks.",
    sourceAttribution: "Pablo Xavier / @skyferrori",
    platform: "X",
    stats: {
      views: 28e6,
      shares: 28e3,
      likes: 184e3
    },
    sources: [
      "https://www.cbsnews.com/news/pope-francis-puffer-jacket-fake-photos-deepfake-power-peril-of-ai/"
    ],
    images: {
      small: imageUrls.celebPlaceholder2,
      medium: imageUrls.celebPlaceholder2
    }
  },
  {
    id: 9,
    title: "Mr. Bean at Met Gala",
    description: "This featured as part of a viral series of pop culture characters in strange situations.",
    sourceAttribution: "Andy Seige",
    platform: "Facebook",
    stats: {
      shares: 6900,
      likes: 4600
    },
    sources: [
      "https://www.facebook.com/andy.seige"
    ],
    images: {
      small: imageUrls.celebPlaceholder3,
      medium: imageUrls.celebPlaceholder3
    }
  },
  {
    id: 12,
    title: "Will Smith Spaghetti",
    description: "This was part of a series of AI content showing Will Smith eating spaghetti over a number of years. The images got more and more realistic as the AI software improved. Will Smith himself even parodied the videos.",
    sourceAttribution: "@unclescrooch / @venturetwins",
    platform: "X",
    stats: {
      views: 7e5
    },
    sources: [
      "https://x.com/unclescrooch",
      "https://x.com/venturetwins"
    ],
    images: {
      small: imageUrls.celebPlaceholder4,
      medium: imageUrls.celebPlaceholder4
    }
  },
  {
    id: 14,
    title: "Katy Perry Met Gala",
    description: "This image of Katy Perry at the Met Gala went viral. Even Katy Perry's mother thought it was real. But she wasn't even at the event.",
    sourceAttribution: "@jxries / @KatyPerry",
    platform: "X / Instagram",
    stats: {
      views: 179e5,
      likes: 27e5,
      comments: 18e3
    },
    sources: [
      "https://www.nbcnews.com/tech/tech-news/katy-perrys-rihanna-met-gala-fake-ai-images-spread-rcna151163",
      "https://www.nytimes.com/2024/05/07/style/katy-perry-met-gala-ai.html",
      "https://x.com/jxries/status/1787603212075233371"
    ],
    images: {
      small: imageUrls.celebPlaceholder5,
      medium: imageUrls.celebPlaceholder5
    }
  },
  {
    id: 16,
    title: "Mike Tyson Gaming",
    description: "Part of a series of AI images depicting celebrities playing their own video games.",
    sourceAttribution: "@theaipage",
    platform: "Threads",
    stats: {
      views: 3e3,
      likes: 1700
    },
    sources: [
      "https://www.threads.net/@theaipage/post/DIQPdVTyQlP/this-new-ai-image-trend-reimagines-iconic-game-characters-as-if-they-were-real-p"
    ],
    images: {
      small: imageUrls.celebPlaceholder6,
      medium: imageUrls.celebPlaceholder6
    }
  },
  {
    id: 25,
    title: "Mark Zuckerberg Surfing",
    description: "This AI-generated image of Mark Zuckerberg surfing went viral during discussions about social media and privacy issues.",
    sourceAttribution: "@TechMemes",
    platform: "X",
    stats: {
      views: 45e5,
      likes: 87e3
    },
    sources: [
      "https://www.theverge.com/2020/7/12/21321242/mark-zuckerberg-surfing-hawaii-sunscreen-memes"
    ],
    images: {
      small: imageUrls.celebPlaceholder7,
      medium: imageUrls.celebPlaceholder7
    }
  },
  {
    id: 26,
    title: "Hollywood Celebrities Party",
    description: "This image purporting to show various celebrities at an exclusive party was widely shared as a leaked photo from a private event.",
    sourceAttribution: "@CelebGossip",
    platform: "Instagram",
    stats: {
      likes: 378e3,
      comments: 12400
    },
    sources: [
      "https://www.instagram.com/explore/tags/hollywoodparty/"
    ],
    images: {
      small: imageUrls.celebPlaceholder8,
      medium: imageUrls.celebPlaceholder8
    }
  },
  {
    id: 27,
    title: "Julian Assange Interview",
    description: "This AI-generated image was circulated as a still from a supposed secret interview with Julian Assange during his confinement.",
    sourceAttribution: "@WhistleblowerNews",
    platform: "X",
    stats: {
      views: 32e5,
      shares: 42e3
    },
    sources: [
      "https://www.reuters.com/fact-check/"
    ],
    images: {
      small: imageUrls.celebPlaceholder9,
      medium: imageUrls.celebPlaceholder9
    }
  },
  {
    id: 28,
    title: "Elizabeth Warren Campaign",
    description: "This image was shared during election season as a candid moment from Elizabeth Warren's campaign trail.",
    sourceAttribution: "@PoliticsToday",
    platform: "Facebook",
    stats: {
      shares: 53e3,
      likes: 176e3
    },
    sources: [
      "https://www.politifact.com/factchecks/"
    ],
    images: {
      small: imageUrls.celebPlaceholder10,
      medium: imageUrls.celebPlaceholder10
    }
  }
];
const newsPoliticalImages = [
  {
    id: 11,
    title: "Jair Bolsonaro Drinking",
    description: "Images like these of the former Brazilian president were spread to attack him by his political opponents.",
    sourceAttribution: "O GLOBO",
    platform: "News Media",
    stats: {
      shares: 1e6
    },
    sources: [
      "https://oglobo.globo.com/english/noticia/2024/12/26/ai-generated-images-surge-on-x-amplifying-concerns-about-misinformation-risks.ghtml"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder1,
      medium: imageUrls.newsPoliticalPlaceholder1
    }
  },
  {
    id: 15,
    title: "Pentagon Explosion",
    description: "Multiple verified X accounts shared images like this showing an explosion near the Pentagon. People believed it and the stock market even dipped as a result.",
    sourceAttribution: "@CBKNews121",
    platform: "X",
    stats: {
      views: 2e6
    },
    sources: [
      "https://www.npr.org/2023/05/16/1176370565/pentagon-ufo-ai-generated-image"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder2,
      medium: imageUrls.newsPoliticalPlaceholder2
    }
  },
  {
    id: 17,
    title: "Turkish Ministers in Syria",
    description: "The spread of misinformation about the Middle East conflict on social media makes it even harder for people to stay accurately informed — and AI-generated images like this only add to the confusion.",
    sourceAttribution: "@AryJeay",
    platform: "X",
    stats: {
      views: 19500
    },
    sources: [
      "https://x.com/aryjeay/status/1868034685542289471"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder3,
      medium: imageUrls.newsPoliticalPlaceholder3
    }
  },
  {
    id: 18,
    title: "Ukranian Girl",
    description: "This image and others like it were widely shared in response to attacks on Ukraine by Russia.",
    sourceAttribution: "Frida Stenwall",
    platform: "Facebook",
    stats: {
      shares: 67e3,
      views: 34e5
    },
    sources: [
      "https://www.reuters.com/fact-check/ai-generated-image-ukraine-war-2023-03-15/"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder4,
      medium: imageUrls.newsPoliticalPlaceholder4
    }
  },
  {
    id: 29,
    title: "Earthquake Devastation",
    description: "This AI-generated image was shared as if it showed real earthquake damage, prompting calls for donations to non-existent relief efforts.",
    sourceAttribution: "@DisasterNews",
    platform: "X",
    stats: {
      views: 17e5,
      shares: 32e3
    },
    sources: [
      "https://www.bbc.com/news/technology-64599547"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder5,
      medium: imageUrls.newsPoliticalPlaceholder5
    }
  },
  {
    id: 30,
    title: "Flood Devastation",
    description: "This image purporting to show devastating floods was widely shared during severe weather events, causing panic in communities that weren't affected.",
    sourceAttribution: "@WeatherAlerts",
    platform: "Facebook",
    stats: {
      shares: 86e3,
      likes: 12e3
    },
    sources: [
      "https://www.weather.gov/safety/flood-turn-around-dont-drown"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder6,
      medium: imageUrls.newsPoliticalPlaceholder6
    }
  },
  {
    id: 31,
    title: "Hurricane Aftermath",
    description: "This AI-generated image was circulated as showing hurricane damage, causing confusion about the severity of actual storm impacts.",
    sourceAttribution: "@StormChaser",
    platform: "X",
    stats: {
      views: 39e5,
      shares: 57e3
    },
    sources: [
      "https://www.nhc.noaa.gov/"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder7,
      medium: imageUrls.newsPoliticalPlaceholder7
    }
  },
  {
    id: 32,
    title: "Israeli Conflict Scene",
    description: "This AI-generated image was shared as authentic documentation of conflict in Israel, contributing to misinformation about ongoing events.",
    sourceAttribution: "@MiddleEastWatch",
    platform: "X",
    stats: {
      views: 57e5,
      shares: 124e3
    },
    sources: [
      "https://www.reuters.com/world/middle-east/"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder8,
      medium: imageUrls.newsPoliticalPlaceholder8
    }
  },
  {
    id: 33,
    title: "Armed Conflict",
    description: "This image was shared as a documentary photograph of armed conflict but was entirely generated by AI.",
    sourceAttribution: "@GlobalConflictNews",
    platform: "X",
    stats: {
      views: 23e5,
      shares: 43e3
    },
    sources: [
      "https://www.icrc.org/en/document/ihl-rules-of-war-FAQ-Geneva-Conventions"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder9,
      medium: imageUrls.newsPoliticalPlaceholder9
    }
  },
  {
    id: 34,
    title: "Rescue Operations",
    description: "This image purporting to show heroic rescue efforts during a disaster was created by AI but shared as authentic news photography.",
    sourceAttribution: "@EmergencyUpdates",
    platform: "Facebook",
    stats: {
      shares: 132e3,
      likes: 347e3
    },
    sources: [
      "https://www.redcross.org/about-us/news-and-events/disaster-response.html"
    ],
    images: {
      small: imageUrls.newsPoliticalPlaceholder10,
      medium: imageUrls.newsPoliticalPlaceholder10
    }
  }
];
const artisticRealisticImages = [
  {
    id: 3,
    title: "Midjourney Portraits",
    description: "Midjourney's AI-generated portraits are so realistic that they're often mistaken for photographs. This has raised concerns about the potential for creating fake identities online.",
    sourceAttribution: "Midjourney",
    platform: "Discord",
    stats: {
      likes: 45e3
    },
    sources: [
      "https://www.midjourney.com/",
      "https://www.theverge.com/23650428/midjourney-ai-image-generator-artist-lawsuit-stable-diffusion-deviantart"
    ],
    images: {
      small: imageUrls.artisticPlaceholder1,
      medium: imageUrls.artisticPlaceholder1
    }
  },
  {
    id: 4,
    title: "DALL-E Landscapes",
    description: "DALL-E has revolutionized digital art creation with its ability to generate stunning landscapes from text prompts. These images have become so popular that they've created a new aesthetic in digital art.",
    sourceAttribution: "OpenAI",
    platform: "DALL-E",
    stats: {
      views: 12e5,
      likes: 32e3
    },
    sources: [
      "https://openai.com/dall-e-3",
      "https://www.wired.com/story/dall-e-3-ai-image-generator-openai/"
    ],
    images: {
      small: imageUrls.artisticPlaceholder2,
      medium: imageUrls.artisticPlaceholder2
    }
  },
  {
    id: 7,
    title: "Hyperrealistic Food",
    description: "AI-generated food images have become so realistic that they're being used in advertising and social media. This has raised questions about authenticity in food photography.",
    sourceAttribution: "@prompthero",
    platform: "Instagram",
    stats: {
      likes: 28e3,
      comments: 1200
    },
    sources: [
      "https://www.instagram.com/prompthero/",
      "https://www.forbes.com/sites/bernardmarr/2023/06/26/the-amazing-ways-restaurants-are-using-ai-and-automation/"
    ],
    images: {
      small: imageUrls.artisticPlaceholder3,
      medium: imageUrls.artisticPlaceholder3
    }
  },
  {
    id: 19,
    title: "Stable Diffusion Art",
    description: "Stable Diffusion has enabled artists to create dreamlike images that blend reality with imagination. These images have sparked debates about the nature of creativity and authorship.",
    sourceAttribution: "Stability AI",
    platform: "Stability AI",
    stats: {
      views: 89e4,
      likes: 18e3
    },
    sources: [
      "https://stability.ai/",
      "https://www.theverge.com/2023/3/24/23655699/ai-art-copyright-stable-diffusion-getty-images-lawsuit"
    ],
    images: {
      small: imageUrls.artisticPlaceholder4,
      medium: imageUrls.artisticPlaceholder4
    }
  },
  {
    id: 20,
    title: "Futuristic Architecture",
    description: "AI-generated architectural concepts are influencing real-world design. These images showcase possible futures for our cities and buildings.",
    sourceAttribution: "@midjourney_ai",
    platform: "Instagram",
    stats: {
      likes: 22e3,
      comments: 850
    },
    sources: [
      "https://www.instagram.com/midjourney_ai/",
      "https://www.architectmagazine.com/technology/artificial-intelligence/how-ai-is-changing-architecture_o"
    ],
    images: {
      small: imageUrls.artisticPlaceholder5,
      medium: imageUrls.artisticPlaceholder5
    }
  },
  {
    id: 35,
    title: "Elderly Women Skateboarding",
    description: "This AI-generated image of elderly women skateboarding went viral as a symbol of breaking age stereotypes, though many believed it was a real photograph.",
    sourceAttribution: "@AgingInspiration",
    platform: "Pinterest",
    stats: {
      views: 87e3,
      likes: 32e3
    },
    sources: [
      "https://www.pinterest.com/search/pins/?q=elderly%20active%20lifestyle"
    ],
    images: {
      small: imageUrls.artisticPlaceholder6,
      medium: imageUrls.artisticPlaceholder6
    }
  }
];
viralSocialMediaItems.forEach((item) => {
  item.batch = 1;
});
celebrityImages.forEach((item) => {
  item.batch = 2;
});
newsPoliticalImages.forEach((item) => {
  item.batch = 3;
});
artisticRealisticImages.forEach((item) => {
  item.batch = 4;
});
function FightingAI($$payload, $$props) {
  push();
  let batch = [];
  let positionLayouts = [];
  function getPositionStyle(index) {
    if (positionLayouts.length === 0) return "";
    const pos = positionLayouts[index % positionLayouts.length];
    let style = `
      width: ${pos.width}; 
      height: ${pos.height}; 
      top: ${pos.top}; 
      z-index: ${pos.zIndex};
      transform: rotate(${pos.rotate}deg) scale(${pos.scale});
      animation: floating ${5 + index % 3}s ease-in-out infinite;
      animation-delay: ${-1 * (index % 5)}s;
    `;
    if (pos.left) style += `left: ${pos.left};`;
    if (pos.right) style += `right: ${pos.right};`;
    return style;
  }
  const each_array = ensure_array_like(batch);
  $$payload.out += `<section id="fighting-ai" class="withAI section-full bg-secondary flex flex-col items-center justify-center py-16 relative svelte-1vmk23d"><div class="text-center mb-12 relative z-20 svelte-1vmk23d"><div class="flex justify-center items-center svelte-1vmk23d"><h2 class="heading-1 font-paplane text-4xl md:text-5xl text-primary svelte-1vmk23d">FIGHTING AI</h2> <div class="relative mx-3 svelte-1vmk23d"><h2 class="font-paplane text-4xl md:text-5xl text-primary svelte-1vmk23d"><span class="border-2 border-primary px-5 rounded-[20px] inline-block svelte-1vmk23d">WITH AI</span></h2></div></div> <h3 class="sub-heading text-xl mt-4 text-center font-paplane text-black svelte-1vmk23d">Learn about the images featured in The PSAi</h3></div> <div class="images-gallery-wrapper relative w-full max-w-6xl mx-auto mb-8 px-4 svelte-1vmk23d"><div class="images-gallery relative h-[600px] svelte-1vmk23d"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let item = each_array[i];
    $$payload.out += `<button type="button" class="absolute cursor-pointer rounded-lg overflow-hidden shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:z-10 border-0 p-0 m-0 transform-gpu svelte-1vmk23d"${attr_style(getPositionStyle(i))}${attr("aria-label", `View details for ${item.title}`)}><div class="absolute inset-0 bg-primary opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out z-10 svelte-1vmk23d"></div> <img${attr("src", item.images.small)}${attr("alt", item.title)} class="w-full h-full object-cover transition-all duration-500 ease-out hover:scale-110 transform-gpu svelte-1vmk23d"></button>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="text-center mb-10 svelte-1vmk23d"><button id="seeMoreBtn" class="dark_cta mt-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-xl px-8 py-2 font-medium flex items-center justify-center gap-2 shadow-md font-paplane svelte-1vmk23d" aria-label="See more images"><span class="svelte-1vmk23d">SEE MORE</span></button></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function AboutCJR($$payload) {
  $$payload.out += `<section id="whoCJR" class="relative w-full min-h-screen flex flex-col items-center justify-center bg-black py-40 md:py-48 overflow-hidden">`;
  GridOverlay($$payload, { color: "rgba(255,255,255,0.04)", size: "32px" });
  $$payload.out += `<!----> `;
  DigitalAccents($$payload, {
    variant: "scattered",
    color: "var(--color-primary)",
    class: "absolute inset-0 pointer-events-none z-10 opacity-40"
  });
  $$payload.out += `<!----> <div class="container mx-auto px-4 relative z-20"><div class="mb-16">`;
  SectionTitle($$payload, {
    title: "ABOUT COLUMBIA JOURNALISM REVIEW",
    color: "orange",
    fontSize: "text-6xl md:text-7xl tracking-[0.22em]",
    class: "text-center font-paplane font-extrabold drop-shadow-lg"
  });
  $$payload.out += `<!----> <div class="flex justify-center mt-3">`;
  DigitalElements($$payload, {
    type: "corner",
    color: "var(--color-accent, #FF4F2A)",
    size: 120,
    className: "h-2"
  });
  $$payload.out += `<!----></div></div> <div class="flex justify-center items-center w-full">`;
  ContentCard($$payload, {
    bgColor: "black",
    borderColor: "orange-400",
    textColor: "white",
    class: "w-full max-w-3xl p-10 md:p-16 rounded-[18px] shadow-[0_8px_32px_0_rgba(255,79,42,0.18)] border-4 border-orange-400 flex flex-col items-center relative pixel-shadow",
    children: ($$payload2) => {
      CornerSquares($$payload2, {
        color: "var(--color-accent, #FF4F2A)",
        size: 14,
        offset: -2,
        class: "absolute -top-5 -left-5"
      });
      $$payload2.out += `<!----> `;
      CornerSquares($$payload2, {
        color: "var(--color-accent, #FF4F2A)",
        size: 14,
        offset: -2,
        class: "absolute -top-5 -right-5"
      });
      $$payload2.out += `<!----> `;
      CornerSquares($$payload2, {
        color: "var(--color-accent, #FF4F2A)",
        size: 14,
        offset: -2,
        class: "absolute -bottom-5 -left-5"
      });
      $$payload2.out += `<!----> `;
      CornerSquares($$payload2, {
        color: "var(--color-accent, #FF4F2A)",
        size: 14,
        offset: -2,
        class: "absolute -bottom-5 -right-5"
      });
      $$payload2.out += `<!----> <div class="absolute inset-0 pointer-events-none opacity-10 z-0">`;
      GridOverlay($$payload2, { color: "rgba(255,255,255,0.08)", size: "20px" });
      $$payload2.out += `<!----></div> <div class="flex flex-col gap-8 relative z-10"><p class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white">The Columbia Journalism Review’s mission is to be the intellectual leader in the rapidly changing world of journalism.</p> <p class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white">As the most respected voice on press criticism and the future of news, CJR supports strong standards for verification, transparency, and media literacy.</p> <p class="text-lg md:text-xl font-paplane font-light text-center tracking-wide text-white">But if the press once had a singular power to document and publish news, versions of that work are now also visible across the internet—populated by disinformation agents, synthetic-media hobbyists, and all of us who share what we see when we scroll. At stake is trust in substantiated information and the health of democracy. CJR aims to promote a future based on truth—whether or not you consider yourself a journalist.</p></div>`;
    }
  });
  $$payload.out += `<!----></div></div></section>`;
}
function SpotAICard($$payload, $$props) {
  push();
  let image = fallback($$props["image"], () => ({ src: "", alt: "", tipNumber: 1 }), true);
  $$payload.out += `<div class="spot-ai-card relative overflow-hidden rounded-3xl border-4 border-[#FF5F33] shadow-lg svelte-1volc4x"><div class="absolute top-5 left-1/2 -translate-x-1/2 bg-[#333333]/80 text-white border-2 border-white rounded-full py-1 px-8 z-10"><span class="font-papplane font-bold uppercase tracking-[0.25em] text-[14px] leading-tight">TIP ${escape_html(String(image.tipNumber).padStart(2, "0"))}</span></div> <img${attr("src", image.src)}${attr("alt", image.alt)} class="w-full h-full object-cover" draggable="false"></div>`;
  bind_props($$props, { image });
  pop();
}
function SpotAI($$payload, $$props) {
  push();
  const imageFiles = Array.from({ length: 5 }, (_, i) => `${i + 1}.jpg`);
  const images = imageFiles.map((name, i) => ({
    id: i + 1,
    src: `/images/spot-ai/large/${name}`,
    alt: `AI Detection Example ${i + 1}`,
    loaded: false
  }));
  let currentGroup = 0;
  let isTransitioning = false;
  let cardsPerGroup = 5;
  function updateCardsPerGroup() {
    cardsPerGroup = window.innerWidth < 768 ? 2 : 5;
  }
  if (typeof window !== "undefined") {
    updateCardsPerGroup();
  }
  const totalGroups = () => Math.ceil(images.length / cardsPerGroup);
  const groupStart = () => currentGroup * cardsPerGroup;
  const groupImages = () => images.slice(groupStart(), groupStart() + cardsPerGroup);
  const totalGroupsVal = () => totalGroups();
  const groupImagesArr = () => groupImages();
  const each_array = ensure_array_like(groupImagesArr());
  const each_array_1 = ensure_array_like(Array(totalGroupsVal()));
  $$payload.out += `<section id="spotAI" class="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#FF5F33] py-20 md:py-32">`;
  GridOverlay($$payload, {
    color: "rgba(255,255,255,0.08)",
    size: "40px",
    class: "absolute inset-0 z-0 pointer-events-none"
  });
  $$payload.out += `<!----> `;
  GridOverlay($$payload, { color: "rgba(255,255,255,0.03)", size: "32px" });
  $$payload.out += `<!----> <div class="opacity-30">`;
  DigitalAccents($$payload, {});
  $$payload.out += `<!----></div> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 16,
    offset: -2,
    class: "absolute -top-6 -left-6 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 16,
    offset: -2,
    class: "absolute -top-6 -right-6 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 16,
    offset: -2,
    class: "absolute -bottom-6 -left-6 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 16,
    offset: -2,
    class: "absolute -bottom-6 -right-6 z-10"
  });
  $$payload.out += `<!----> <div class="absolute inset-0 pointer-events-none z-10"><div class="opacity-70">`;
  DigitalElements($$payload, {
    type: "dot",
    pos: "top-[10%] left-[15%]",
    color: "white"
  });
  $$payload.out += `<!----></div> <div class="opacity-70">`;
  DigitalElements($$payload, {
    type: "dot",
    pos: "bottom-[15%] right-[10%]",
    color: "white"
  });
  $$payload.out += `<!----></div> <div class="opacity-50">`;
  DigitalElements($$payload, {
    type: "arrow",
    pos: "top-[20%] right-[15%]",
    color: "white"
  });
  $$payload.out += `<!----></div> <div class="opacity-50">`;
  DigitalElements($$payload, {
    type: "arrow",
    pos: "bottom-[25%] left-[5%]",
    color: "white"
  });
  $$payload.out += `<!----></div></div> <div class="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8"><div class="mb-16"><h2 class="font-paplane text-6xl md:text-7xl font-extrabold uppercase text-center text-white tracking-[0.22em]">HOW TO SPOT AI</h2> <p class="text-white text-center mt-2 font-paplane text-lg tracking-wide">Signs to look for</p></div> <div class="relative flex flex-col items-center w-full max-w-5xl mx-auto"><div class="hidden md:block"><button class="absolute -left-6 lg:-left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-none flex items-center justify-center shadow-md hover:bg-black/80 focus:outline-none z-20" aria-label="Previous group"${attr("disabled", isTransitioning, true)} tabindex="0"><span class="text-white text-2xl">&lt;</span></button> <button class="absolute -right-6 lg:-right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-none flex items-center justify-center shadow-md hover:bg-black/80 focus:outline-none z-20" aria-label="Next group"${attr("disabled", isTransitioning, true)} tabindex="0"><span class="text-white text-2xl">></span></button></div> <div class="relative w-full px-0 py-6 flex flex-col items-center"><div class="flex flex-row justify-start md:justify-center items-stretch gap-4 w-full overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let img = each_array[i];
    $$payload.out += `<div class="snap-center w-[140px] sm:w-[160px] md:w-[180px] flex-shrink-0">`;
    SpotAICard($$payload, {
      image: {
        src: img.src,
        alt: img.alt,
        tipNumber: groupStart() + i + 1
      }
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex md:hidden justify-center w-full mt-8 gap-8"><button class="w-12 h-12 bg-black flex items-center justify-center shadow-lg hover:bg-black/80 focus:outline-none z-20" aria-label="Previous group"${attr("disabled", isTransitioning, true)}><span class="text-white text-2xl">&lt;</span></button> <button class="w-12 h-12 bg-black flex items-center justify-center shadow-lg hover:bg-black/80 focus:outline-none z-20" aria-label="Next group"${attr("disabled", isTransitioning, true)}><span class="text-white text-2xl">></span></button></div></div> <div class="flex items-center justify-center gap-1 mt-10"><!--[-->`;
  for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
    each_array_1[idx];
    $$payload.out += `<button${attr_class("w-4 h-4 rounded-full border border-white transition-all duration-200 focus:outline-none mx-1", void 0, {
      "bg-white": idx === currentGroup,
      "bg-transparent": idx !== currentGroup
    })}${attr("aria-label", `Go to group ${idx + 1}`)}${attr("disabled", isTransitioning, true)} tabindex="0"></button>`;
  }
  $$payload.out += `<!--]--></div> <div class="mt-6 text-xs font-paplane text-white opacity-80 text-center tracking-widest">© Columbia Journalism Review</div></div></div></section>`;
  pop();
}
function FurtherReadingCard($$payload, $$props) {
  push();
  let article = $$props["article"];
  $$payload.out += `<div class="article-card p-4 pt-8 pb-6 relative font-paplane svelte-1r1rcxq"><div class="corner-accent corner-tl svelte-1r1rcxq"></div> <div class="corner-accent corner-tr svelte-1r1rcxq"></div> <div class="corner-accent corner-bl svelte-1r1rcxq"></div> <div class="corner-accent corner-br svelte-1r1rcxq"></div> <a${attr("href", article.href)}${attr("aria-label", article.aria)} class="absolute top-6 right-6"><span class="border border-color-primary text-[10px] uppercase tracking-wider text-color-primary py-[3px] px-[10px] rounded-2xl hover:bg-color-primary hover:text-white transition-colors">READ MORE</span></a> <h3 class="text-black font-papplane text-[0.95rem] md:text-[1.15rem] mt-3 tracking-[0.08em] leading-[1.35] font-medium uppercase">${html(article.titleWithBreaks)}</h3> <div class="mt-5"><p class="text-xs uppercase tracking-[0.08em] text-gray-800 font-medium font-papplane">BY ${escape_html(article.author)}</p> <p class="text-xs tracking-[0.08em] text-gray-600 font-papplane">${escape_html(article.date)}</p></div></div>`;
  bind_props($$props, { article });
  pop();
}
const articles = [
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
function FurtherReading($$payload, $$props) {
  push();
  const each_array = ensure_array_like(articles);
  $$payload.out += `<section class="h-screen bg-[#FFF9EB] px-4 flex flex-col items-center justify-center relative" id="furtherReading">`;
  GridOverlay($$payload, {
    color: "rgba(255,79,42,0.03)",
    size: "40px",
    class: "absolute inset-0 pointer-events-none z-0"
  });
  $$payload.out += `<!----> <div class="max-w-7xl w-full mx-auto relative z-10"><div class="text-center mb-8"><h2 class="uppercase text-orange-500 tracking-[0.22em] text-3xl md:text-3xl font-extrabold font-paplane">FURTHER READING ON</h2> <div class="flex flex-col md:flex-row justify-center items-center mt-2"><span class="uppercase text-orange-500 tracking-[0.22em] text-2xl md:text-2xl md:mr-4 font-extrabold font-paplane">HOW</span> <span class="rounded-full border border-orange-500 px-6 md:px-10 py-2 md:py-3 mt-2 md:mt-0 font-paplane text-orange-500 text-2xl md:text-2xl tracking-[0.22em] uppercase font-extrabold">AI RESHAPES JOURNALISM</span></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-3 w-full mb-6"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let article = each_array[index];
    $$payload.out += `<div class="w-[70%] mx-auto relative">`;
    FurtherReadingCard($$payload, { article });
    $$payload.out += `<!----> `;
    if ((index + 1) % 3 !== 0) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="red-square absolute right-[-30px] top-1/2 transform -translate-y-1/2 hidden md:block svelte-ebw136"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="scroll-smooth">`;
  Hero($$payload);
  $$payload.out += `<!----> `;
  About($$payload);
  $$payload.out += `<!----> `;
  MusicVideo($$payload);
  $$payload.out += `<!----> `;
  FightingAI($$payload);
  $$payload.out += `<!----> `;
  WhyPsai($$payload);
  $$payload.out += `<!----> `;
  FurtherReading($$payload);
  $$payload.out += `<!----> `;
  SpotAI($$payload);
  $$payload.out += `<!----> `;
  AboutCJR($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _page as default
};
