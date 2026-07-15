// NOTE: This is placeholder seed data for the landing page only, used until
// the /experiences API + database seeding is built in a later step. Images
// are picsum.photos stand-ins for the URLs a real host would eventually
// paste into the "Optional image URL" field on /items/add.

export interface SampleExperience {
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
  rating: number;
  ratingCount: number;
}

const img = (seed: string) => `https://picsum.photos/seed/${seed}/640/480`;

export const sampleExperiences: SampleExperience[] = [
  {
    slug: "bandarban-hill-trek",
    title: "Bandarban Hill Trekking",
    shortDescription:
      "Climb misty ridgelines and pass Bawm villages deep in the Chittagong Hill Tracts.",
    image: img("bandarban-trek"),
    price: 65,
    currency: "USD",
    durationLabel: "2 days",
    difficulty: "Moderate",
    category: "Hiking",
    location: "Bandarban, Bangladesh",
    rating: 4.8,
    ratingCount: 132,
  },
  {
    slug: "sundarbans-mangrove-kayak",
    title: "Sundarbans Mangrove Kayaking",
    shortDescription:
      "Paddle silent tidal channels through the world's largest mangrove forest.",
    image: img("sundarbans-kayak"),
    price: 90,
    currency: "USD",
    durationLabel: "3 days",
    difficulty: "Moderate",
    category: "Water Adventure",
    location: "Khulna, Bangladesh",
    rating: 4.9,
    ratingCount: 87,
  },
  {
    slug: "sylhet-tea-garden-walk",
    title: "Sylhet Tea Garden Nature Walk",
    shortDescription:
      "Wander manicured tea estates and hidden waterfalls with a local guide.",
    image: img("sylhet-tea"),
    price: 35,
    currency: "USD",
    durationLabel: "Half day",
    difficulty: "Easy",
    category: "Cultural",
    location: "Sylhet, Bangladesh",
    rating: 4.7,
    ratingCount: 204,
  },
  {
    slug: "himalayan-foothills-trek",
    title: "Himalayan Foothills Trek",
    shortDescription:
      "Cross pine forests and suspension bridges toward snow-capped ridgelines.",
    image: img("himalaya-trek"),
    price: 210,
    currency: "USD",
    durationLabel: "5 days",
    difficulty: "Challenging",
    category: "Hiking",
    location: "Solukhumbu, Nepal",
    rating: 4.9,
    ratingCount: 156,
  },
  {
    slug: "riverside-camping-retreat",
    title: "Riverside Camping Retreat",
    shortDescription:
      "Sleep under open sky beside a quiet river, campfire cooking included.",
    image: img("riverside-camp"),
    price: 55,
    currency: "USD",
    durationLabel: "2 nights",
    difficulty: "Easy",
    category: "Camping",
    location: "Rangamati, Bangladesh",
    rating: 4.6,
    ratingCount: 98,
  },
  {
    slug: "savanna-wildlife-safari",
    title: "Savanna Wildlife Safari",
    shortDescription:
      "Track elephants and big cats at dawn with an experienced ranger.",
    image: img("savanna-safari"),
    price: 180,
    currency: "USD",
    durationLabel: "3 days",
    difficulty: "Easy",
    category: "Wildlife",
    location: "Maasai Mara, Kenya",
    rating: 4.9,
    ratingCount: 211,
  },
];
