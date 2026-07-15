export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  publishedAt: string;
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hidden-trails-sylhet-hills",
    title: "5 Hidden Trails in the Sylhet Hills You Haven't Explored",
    excerpt:
      "Past the tea gardens tourists usually stop at, these routes climb into rarely-visited ridge lines.",
    image: "https://picsum.photos/seed/sylhet-hills-blog/1200/800",
    readTime: "6 min read",
    author: "Wayfarer Editorial",
    publishedAt: "2026-03-12",
    content: [
      {
        type: "paragraph",
        text: "Most visitors to Sylhet see the same handful of tea gardens from a car window and call it a day. Fair enough — they're beautiful. But the hills behind them hold a lot more than photo stops, if you're willing to walk a bit further than the parking lot.",
      },
      {
        type: "heading",
        text: "1. The ridge above Lalakhal",
      },
      {
        type: "paragraph",
        text: "Most people take the boat to Lalakhal and turn back once they've seen the blue-green water. Keep going past the boat landing and there's a footpath climbing into the hills that most tour operators never mention, with a clear view back down over the river bend.",
      },
      {
        type: "heading",
        text: "2. The back approach to Bichanakandi",
      },
      {
        type: "paragraph",
        text: "Everyone arrives at Bichanakandi from the main road. There's a quieter route in from the villages to the east that takes about 40 minutes longer but skips the crowds entirely, especially on weekends.",
      },
      {
        type: "heading",
        text: "3. Jaflong's upper stone fields",
      },
      {
        type: "paragraph",
        text: "The lower stone collection area near the river is where everyone stops. Further up, past where most day-trippers turn around, the terrain opens into quieter fields with a direct line of sight to the hills across the border.",
      },
      {
        type: "heading",
        text: "4. Volaganj's forgotten quarry paths",
      },
      {
        type: "paragraph",
        text: "The old quarry paths around Volaganj are mostly used by local workers rather than visitors, which means you'll have long stretches of trail to yourself, with views back over the stone collection points below.",
      },
      {
        type: "heading",
        text: "5. The tea estate boundary walk near Malnicherra",
      },
      {
        type: "paragraph",
        text: "Rather than a guided tour through the estate itself, the boundary path around Malnicherra gives a longer, quieter walk through the same terraced hills, with tea workers happy to point you in the right direction if you get turned around.",
      },
      {
        type: "heading",
        text: "Before you go",
      },
      {
        type: "list",
        items: [
          "Most of these are best walked between October and March, outside the heaviest monsoon rains",
          "A local guide isn't strictly required for any of these, but it makes the difference between a walk and actually learning something about the area",
          "Bring more water than you think you'll need — shade is inconsistent on ridge sections",
        ],
      },
    ],
  },
  {
    slug: "beginners-guide-kayaking-sundarbans",
    title: "A Beginner's Guide to Kayaking the Sundarbans",
    excerpt:
      "What to expect on your first paddle through the mangroves, from tide timing to what wildlife you'll actually see.",
    image: "https://picsum.photos/seed/sundarbans-blog/1200/800",
    readTime: "8 min read",
    author: "Wayfarer Editorial",
    publishedAt: "2026-04-02",
    content: [
      {
        type: "paragraph",
        text: "Kayaking the Sundarbans is not like kayaking anywhere else in Bangladesh. The channels are tidal, the wildlife is genuinely wild, and the margin for error is bigger than a calm lake paddle. None of that should scare you off — it just means going in with the right expectations.",
      },
      {
        type: "heading",
        text: "Tide timing matters more than you'd think",
      },
      {
        type: "paragraph",
        text: "The narrow channels that make for the best wildlife viewing are only passable at certain points in the tide cycle. A good guide will plan your paddle around this, launching early enough to catch the water while it's calm and the channels are navigable.",
      },
      {
        type: "heading",
        text: "What you'll actually see",
      },
      {
        type: "paragraph",
        text: "Spotted deer coming down to drink at the mudflats are the most reliable sighting. Estuarine crocodiles are seen but not guaranteed — they tend to keep their distance from paddling groups. Bird life is constant: kingfishers, egrets, and if you're paying attention, the occasional eagle overhead.",
      },
      {
        type: "heading",
        text: "What to pack",
      },
      {
        type: "list",
        items: [
          "Quick-dry clothing — you will get splashed",
          "A dry bag for your phone or camera",
          "Reef-safe sunscreen and a hat with a strap",
          "Closed-toe water shoes for muddy launch points",
        ],
      },
      {
        type: "heading",
        text: "Safety basics",
      },
      {
        type: "paragraph",
        text: "A life jacket isn't optional here, regardless of how confident a swimmer you are — the channels have current, and visibility underwater is close to zero. Stick with your guide's route; the mangrove channels look similar enough that it's easy to lose your bearing if you paddle off alone.",
      },
      {
        type: "paragraph",
        text: "None of this is meant to be intimidating. Guided trips are genuinely accessible to first-time kayakers — you just want a host who knows the tide charts, not one who's guessing.",
      },
    ],
  },
  {
    slug: "packing-list-first-overnight-camping-trip",
    title: "Packing List for Your First Overnight Camping Trip",
    excerpt:
      "The gear that matters, the gear that doesn't, and what most first-timers bring way too much of.",
    image: "https://picsum.photos/seed/camping-blog/1200/800",
    readTime: "5 min read",
    author: "Wayfarer Editorial",
    publishedAt: "2026-05-20",
    content: [
      {
        type: "paragraph",
        text: "Most first-time campers overpack clothing and underpack the few things that actually make a night outdoors comfortable. Here's a shorter list than you're expecting.",
      },
      {
        type: "heading",
        text: "Shelter and sleep",
      },
      {
        type: "list",
        items: [
          "A tent rated for at least one season above what you expect to need",
          "A sleeping mat — more important for warmth than comfort",
          "A light blanket or liner in addition to your sleeping bag during humid months",
        ],
      },
      {
        type: "heading",
        text: "Clothing — less than you think",
      },
      {
        type: "paragraph",
        text: "One change of clothes for sleeping, one set for the day, and a light rain layer. That's it for a single-night trip. The most common mistake is packing a full week's wardrobe for one night outdoors.",
      },
      {
        type: "heading",
        text: "Food and water",
      },
      {
        type: "list",
        items: [
          "More water than feels necessary, especially if there's no reliable refill point",
          "Simple, high-energy snacks that don't need cooking as backup",
          "A basic mosquito repellent — nights near water or forest can be intense",
        ],
      },
      {
        type: "heading",
        text: "The stuff people forget",
      },
      {
        type: "list",
        items: [
          "A headlamp, not just a phone flashlight — you'll want your hands free",
          "A small dry bag for anything electronic",
          "A basic first-aid kit, even for a short trip",
        ],
      },
      {
        type: "heading",
        text: "What you can leave at home",
      },
      {
        type: "paragraph",
        text: "Extra shoes, a full toiletry kit, and camp chairs if weight is a concern — most sites have logs or flat ground. Pack light enough that you'd actually enjoy carrying it, and you're far more likely to want to do this again.",
      },
    ],
  },
];
