// Data types for the Fighting AI with AI section
export type ImageData = {
  small: string;
  medium: string;
};

export type Stats = {
  likes?: number;
  shares?: number | string;
  views?: number;
  comments?: number;
};

export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  stats?: Stats;
  sources: string[];
  sourceAttribution?: string; // Who created or first shared the image
  platform?: string; // Platform where it was shared (X, Facebook, Instagram, etc.)
  images: ImageData;
  batch?: BatchCategory; // Which batch this item belongs to
};

// Batch categories with descriptive names
export enum BatchCategory {
  All = 0,
  ViralSocialMedia = 1,
  CelebrityImages = 2,
  NewsPolitical = 3,
  ArtisticRealistic = 4
}

// Batch category descriptions
export const batchDescriptions = {
  [BatchCategory.All]: "All Images",
  [BatchCategory.ViralSocialMedia]: "Viral Social Media Images",
  [BatchCategory.CelebrityImages]: "Celebrity Images",
  [BatchCategory.NewsPolitical]: "News and Political Images",
  [BatchCategory.ArtisticRealistic]: "Artistic and Realistic Images"
};

// Real image paths from the static directory (SvelteKit serves static assets from root path)
export const imageUrls = {
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

// Batch 1: Viral Social Media Images
const viralSocialMediaItems: GalleryItem[] = [
  {
    id: 1,
    title: "Shrimp Jesus",
    description: "Surreal images like this have gone viral, fooling many people into believing they were real.",
    sourceAttribution: "@TheHornetsFury",
    platform: "X",
    stats: {
      views: 2900000,
      shares: 5500,
      likes: 53000
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
      likes: 20000,
      shares: 91000
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
      likes: 587000,
      shares: 108000
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
      views: 420000,
      shares: 7100,
      likes: 21000
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
      likes: 164000
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
      views: 890000,
      likes: 42000
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
      likes: 245000,
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
      shares: 37000,
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

// Batch 2: Celebrity Images
const celebrityImages: GalleryItem[] = [
  {
    id: 5,
    title: "Queen Elizabeth Dancing",
    description: "Part of a viral series of images rendered by AI. This one depicts the late Queen Elizabeth II breaking it down on the dance floor.",
    sourceAttribution: "Luca Allievi",
    platform: "New York Post",
    stats: {
      likes: 45000,
      shares: 12000
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
      views: 28000000,
      shares: 28000,
      likes: 184000
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
      views: 700000
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
      views: 17900000,
      likes: 2700000,
      comments: 18000
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
      views: 3000,
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
      views: 4500000,
      likes: 87000
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
      likes: 378000,
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
      views: 3200000,
      shares: 42000
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
      shares: 53000,
      likes: 176000
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

// Batch 3: News and Political Images
const newsPoliticalImages: GalleryItem[] = [
  {
    id: 11,
    title: "Jair Bolsonaro Drinking",
    description: "Images like these of the former Brazilian president were spread to attack him by his political opponents.",
    sourceAttribution: "O GLOBO",
    platform: "News Media",
    stats: {
      shares: 1000000
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
      views: 2000000
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
      shares: 67000,
      views: 3400000
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
      views: 1700000,
      shares: 32000
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
      shares: 86000,
      likes: 12000
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
      views: 3900000,
      shares: 57000
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
      views: 5700000,
      shares: 124000
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
      views: 2300000,
      shares: 43000
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
      shares: 132000,
      likes: 347000
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
const artisticRealisticImages: GalleryItem[] = [
  {
    id: 3,
    title: "Midjourney Portraits",
    description: "Midjourney's AI-generated portraits are so realistic that they're often mistaken for photographs. This has raised concerns about the potential for creating fake identities online.",
    sourceAttribution: "Midjourney",
    platform: "Discord",
    stats: {
      likes: 45000
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
      views: 1200000,
      likes: 32000
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
      likes: 28000,
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
      views: 890000,
      likes: 18000
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
      likes: 22000,
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
      views: 87000,
      likes: 32000
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

// Assign batch categories to each item
viralSocialMediaItems.forEach(item => {
  item.batch = BatchCategory.ViralSocialMedia;
});

celebrityImages.forEach(item => {
  item.batch = BatchCategory.CelebrityImages;
});

newsPoliticalImages.forEach(item => {
  item.batch = BatchCategory.NewsPolitical;
});

artisticRealisticImages.forEach(item => {
  item.batch = BatchCategory.ArtisticRealistic;
});

// Combine all batches into allImages
const allImages: GalleryItem[] = [
  ...viralSocialMediaItems,
  ...celebrityImages,
  ...newsPoliticalImages,
  ...artisticRealisticImages
];

// Export all images as fightingAIData to match the component's import
export const fightingAIData = allImages;

// Helper function to get images by batch
export function getImagesByBatch(batchNumber: BatchCategory): GalleryItem[] {
  if (batchNumber === BatchCategory.ViralSocialMedia) return viralSocialMediaItems;
  else if (batchNumber === BatchCategory.CelebrityImages) return celebrityImages;
  else if (batchNumber === BatchCategory.NewsPolitical) return newsPoliticalImages;
  else if (batchNumber === BatchCategory.ArtisticRealistic) return artisticRealisticImages;
  return allImages; // Return all images if batch number is invalid or All
}

// Helper function to get a random batch of images
export function getRandomBatch(count: number = 10): GalleryItem[] {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Helper function to get a random batch of images from a specific batch
export function getRandomImagesFromBatch(batchNumber: BatchCategory, count: number = 5): GalleryItem[] {
  const batchImages = getImagesByBatch(batchNumber);
  const shuffled = [...batchImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, batchImages.length));
}
