export interface ExperiencePreview {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  price: number;
  currency: string;
  durationLabel: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: string;
  location: string;
  ratingAverage: number;
  ratingCount: number;
}

// Development placeholder photography (Lorem Picsum, seeded for consistency).
// Swap for licensed/original photos before final submission.
const photo = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

export const featuredExperiences: ExperiencePreview[] = [
  {
    slug: "sunrise-trek-bandarban-hill-tracks",
    title: "Sunrise Trek: Bandarban Hill Tracks",
    shortDescription:
      "A two-day trek through the Chittagong Hill Tracts, ending at a ridge-top sunrise over the clouds.",
    image: photo("bandarban-trek"),
    price: 45,
    currency: "USD",
    durationLabel: "2 days",
    difficulty: "Moderate",
    category: "Hiking",
    location: "Bandarban, Bangladesh",
    ratingAverage: 4.8,
    ratingCount: 132,
  },
  {
    slug: "sundarbans-mangrove-kayaking",
    title: "Sundarbans Mangrove Kayaking",
    shortDescription:
      "Paddle narrow tidal channels through the world's largest mangrove forest, home to spotted deer and estuarine crocodiles.",
    image: photo("sundarbans-kayak"),
    price: 65,
    currency: "USD",
    durationLabel: "1 day",
    difficulty: "Moderate",
    category: "Water Adventure",
    location: "Khulna, Bangladesh",
    ratingAverage: 4.9,
    ratingCount: 87,
  },
  {
    slug: "sylhet-tea-garden-cultural-walk",
    title: "Sylhet Tea Garden Cultural Walk",
    shortDescription:
      "Wander through terraced tea estates with a local guide, followed by a tasting session with a smallholder family.",
    image: photo("sylhet-tea"),
    price: 25,
    currency: "USD",
    durationLabel: "Half day",
    difficulty: "Easy",
    category: "Cultural",
    location: "Sylhet, Bangladesh",
    ratingAverage: 4.7,
    ratingCount: 156,
  },
  {
    slug: "lawachara-rainforest-wildlife-safari",
    title: "Lawachara Rainforest Wildlife Safari",
    shortDescription:
      "Track hoolock gibbons and hundreds of bird species through Bangladesh's last major stretch of semi-evergreen forest.",
    image: photo("lawachara-safari"),
    price: 35,
    currency: "USD",
    durationLabel: "1 day",
    difficulty: "Easy",
    category: "Wildlife",
    location: "Moulvibazar, Bangladesh",
    ratingAverage: 4.6,
    ratingCount: 64,
  },
  {
    slug: "saint-martins-island-camping",
    title: "Camping Under the Stars: Saint Martin's Island",
    shortDescription:
      "Three nights on the coral coastline, with beach bonfires and a boat trip around the reef at low tide.",
    image: photo("saint-martins-camp"),
    price: 80,
    currency: "USD",
    durationLabel: "3 days",
    difficulty: "Easy",
    category: "Camping",
    location: "Cox's Bazar, Bangladesh",
    ratingAverage: 4.9,
    ratingCount: 201,
  },
  {
    slug: "ratargul-swamp-forest-photography-trail",
    title: "Ratargul Swamp Forest Photography Trail",
    shortDescription:
      "A guided boat route through the flooded freshwater forest, timed for the still, mirror-like water of early morning.",
    image: photo("ratargul-photo"),
    price: 30,
    currency: "USD",
    durationLabel: "Half day",
    difficulty: "Easy",
    category: "Photography",
    location: "Sylhet, Bangladesh",
    ratingAverage: 4.8,
    ratingCount: 98,
  },
];
