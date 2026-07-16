/**
 * Seeds demo credentials and sample experiences into MongoDB.
 * Run with: npm run seed
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../src/models/User";
import { Experience } from "../src/models/Experience";
import { Review } from "../src/models/Review";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const DEMO_USER = {
  name: "Demo Traveler",
  email: "demo@wayfarer-travel.com",
  password: "Demo@1234",
  role: "user" as const,
};

const ADMIN_USER = {
  name: "Wayfarer Admin",
  email: "admin@wayfarer-travel.com",
  password: "wayfarer_Admin1",
  role: "admin" as const,
};

const photo = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

async function seedExperiences(hostId: mongoose.Types.ObjectId) {
  const experiences = [
    {
      title: "Sunrise Trek: Bandarban Hill Tracks",
      slug: "sunrise-trek-bandarban-hill-tracks",
      shortDescription:
        "A two-day trek through the Chittagong Hill Tracts, ending at a ridge-top sunrise over the clouds.",
      fullDescription:
        "Start in the lowland villages outside Bandarban town and climb steadily through betel-leaf farms and bamboo groves before making camp near the ridge line. The second morning starts before dawn for the final push to the viewpoint, where the valley fills with cloud beneath you. Evenings are spent around a fire with your host's family, who have guided this route for over a decade.",
      images: [photo("bandarban-1"), photo("bandarban-2"), photo("bandarban-3")],
      price: 45,
      currency: "USD",
      durationLabel: "2 days",
      difficulty: "Moderate",
      category: "Hiking",
      location: "Bandarban, Bangladesh",
      maxGroupSize: 8,
      startDates: [daysFromNow(10), daysFromNow(24), daysFromNow(45)],
      highlights: [
        "Ridge-top sunrise above the cloud line",
        "Overnight camp with a local hill-tribe family",
        "Small groups of 8 or fewer",
      ],
      included: ["Local guide", "Tent & sleeping mat", "Two meals per day", "Boiled drinking water"],
    },
    {
      title: "Sundarbans Mangrove Kayaking",
      slug: "sundarbans-mangrove-kayaking",
      shortDescription:
        "Paddle narrow tidal channels through the world's largest mangrove forest, home to spotted deer and estuarine crocodiles.",
      fullDescription:
        "Launch at first light when the water is still and wildlife is most active. Your guide reads the tide charts to route you through channels too narrow for tour boats, past mudflats where spotted deer come down to drink. Stops include a forest ranger outpost and a mid-morning tea break on a stilted platform.",
      images: [photo("sundarbans-1"), photo("sundarbans-2"), photo("sundarbans-3")],
      price: 65,
      currency: "USD",
      durationLabel: "1 day",
      difficulty: "Moderate",
      category: "Water Adventure",
      location: "Khulna, Bangladesh",
      maxGroupSize: 6,
      startDates: [daysFromNow(6), daysFromNow(20), daysFromNow(34)],
      highlights: [
        "Early-morning wildlife sightings",
        "Narrow channels inaccessible to motor boats",
        "Certified life jackets and safety kayaks provided",
      ],
      included: ["Kayak & paddle", "Life jacket", "Guide", "Lunch"],
    },
    {
      title: "Sylhet Tea Garden Cultural Walk",
      slug: "sylhet-tea-garden-cultural-walk",
      shortDescription:
        "Wander through terraced tea estates with a local guide, followed by a tasting session with a smallholder family.",
      fullDescription:
        "This half-day walk moves through working tea estates in the hills outside Sylhet, with stops to learn how leaves are picked and graded by hand. The walk ends at a smallholder family's home for a tasting of three local tea grades alongside traditional snacks.",
      images: [photo("sylhet-1"), photo("sylhet-2"), photo("sylhet-3")],
      price: 25,
      currency: "USD",
      durationLabel: "Half day",
      difficulty: "Easy",
      category: "Cultural",
      location: "Sylhet, Bangladesh",
      maxGroupSize: 10,
      startDates: [daysFromNow(3), daysFromNow(9), daysFromNow(16)],
      highlights: [
        "Hands-on tea picking demonstration",
        "Tasting session with a local family",
        "Easy walking pace, suitable for most fitness levels",
      ],
      included: ["Local guide", "Tea tasting", "Light snacks"],
    },
    {
      title: "Lawachara Rainforest Wildlife Safari",
      slug: "lawachara-rainforest-wildlife-safari",
      shortDescription:
        "Track hoolock gibbons and hundreds of bird species through Bangladesh's last major stretch of semi-evergreen forest.",
      fullDescription:
        "A slow-paced walk through Lawachara National Park with a naturalist guide trained to spot and identify calls from the forest canopy. Morning departures give the best chance of seeing hoolock gibbons and capped langurs before the midday heat.",
      images: [photo("lawachara-1"), photo("lawachara-2"), photo("lawachara-3")],
      price: 35,
      currency: "USD",
      durationLabel: "1 day",
      difficulty: "Easy",
      category: "Wildlife",
      location: "Moulvibazar, Bangladesh",
      maxGroupSize: 8,
      startDates: [daysFromNow(5), daysFromNow(15), daysFromNow(28)],
      highlights: [
        "Guided by a trained naturalist",
        "Chance to see hoolock gibbons",
        "Includes forest entry permits",
      ],
      included: ["Naturalist guide", "Park entry fees", "Bottled water"],
    },
    {
      title: "Camping Under the Stars: Saint Martin's Island",
      slug: "saint-martins-island-camping",
      shortDescription:
        "Three nights on the coral coastline, with beach bonfires and a boat trip around the reef at low tide.",
      fullDescription:
        "Set up camp steps from the coral coastline of Saint Martin's Island. Days are unstructured beyond a low-tide reef walk and an evening boat trip; most guests spend their time swimming, reading, and gathering for bonfires after dark.",
      images: [photo("saintmartins-1"), photo("saintmartins-2"), photo("saintmartins-3")],
      price: 80,
      currency: "USD",
      durationLabel: "3 days",
      difficulty: "Easy",
      category: "Camping",
      location: "Cox's Bazar, Bangladesh",
      maxGroupSize: 12,
      startDates: [daysFromNow(12), daysFromNow(30), daysFromNow(50)],
      highlights: [
        "Beachfront camping on coral coastline",
        "Low-tide reef walk",
        "Evening bonfire gatherings",
      ],
      included: ["Tent & bedding", "Three meals per day", "Reef boat trip"],
    },
    {
      title: "Ratargul Swamp Forest Photography Trail",
      slug: "ratargul-swamp-forest-photography-trail",
      shortDescription:
        "A guided boat route through the flooded freshwater forest, timed for the still, mirror-like water of early morning.",
      fullDescription:
        "Departing before sunrise, this trip routes a small boat through the flooded trees of Ratargul while the water is still enough to mirror the canopy. Your guide, a local photographer, points out the best compositions and waits for the light without rushing the group.",
      images: [photo("ratargul-1"), photo("ratargul-2"), photo("ratargul-3")],
      price: 30,
      currency: "USD",
      durationLabel: "Half day",
      difficulty: "Easy",
      category: "Photography",
      location: "Sylhet, Bangladesh",
      maxGroupSize: 6,
      startDates: [daysFromNow(4), daysFromNow(11), daysFromNow(19)],
      highlights: [
        "Sunrise departure for still water",
        "Guided by a local photographer",
        "Small boats, groups of 6 or fewer",
      ],
      included: ["Boat & boatman", "Photography guide", "Bottled water"],
    },
  ];

  const experienceIdBySlug = new Map<string, mongoose.Types.ObjectId>();

  for (const exp of experiences) {
    const doc = await Experience.findOneAndUpdate(
      { slug: exp.slug },
      { ...exp, host: hostId, isPublished: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    experienceIdBySlug.set(exp.slug, doc._id);
  }

  console.log(`Seeded ${experiences.length} experiences.`);
  return experienceIdBySlug;
}

const reviewsBySlug: Record<
  string,
  { authorName: string; authorLocation: string; rating: number; comment: string }[]
> = {
  "sunrise-trek-bandarban-hill-tracks": [
    {
      authorName: "James Carter",
      authorLocation: "London, UK",
      rating: 5,
      comment:
        "Our host met us at the bus stop and the whole trip felt properly local, not staged. The ridge-top sunrise was worth every step of the climb.",
    },
    {
      authorName: "Tanvir Ahmed",
      authorLocation: "Dhaka",
      rating: 4,
      comment:
        "Good pace for a moderate trek, though the second day started earlier than I expected. Camping with the host's family was the highlight.",
    },
  ],
  "sundarbans-mangrove-kayaking": [
    {
      authorName: "Nusrat Jahan",
      authorLocation: "Dhaka",
      rating: 5,
      comment:
        "Our guide knew exactly which channels the deer come down to at low tide. Nothing like the tour-bus version of this trip.",
    },
    {
      authorName: "Priya Nair",
      authorLocation: "Kolkata, India",
      rating: 5,
      comment:
        "Went in expecting a boat tour and got an actual paddling trip through channels too narrow for motor boats. Saw a crocodile from about 20 meters away.",
    },
  ],
  "sylhet-tea-garden-cultural-walk": [
    {
      authorName: "Farhana Akter",
      authorLocation: "Sylhet",
      rating: 5,
      comment:
        "Did this as a half-day trip before a flight and it was more than enough time. The tasting session with the smallholder family was genuinely educational, not just a photo stop.",
    },
    {
      authorName: "Michael Chen",
      authorLocation: "Singapore",
      rating: 4,
      comment:
        "Easy walk, good for a group with mixed fitness levels. Would have liked a bit more time at the tasting.",
    },
  ],
  "lawachara-rainforest-wildlife-safari": [
    {
      authorName: "Sarah Whitfield",
      authorLocation: "Manchester, UK",
      rating: 4,
      comment:
        "We got lucky and heard the gibbons calling early on, though didn't spot them until later. Our naturalist guide was excellent at identifying bird calls.",
    },
    {
      authorName: "Rafiq Islam",
      authorLocation: "Chattogram",
      rating: 5,
      comment:
        "Went twice now. Morning departure really does make the difference for wildlife activity.",
    },
  ],
  "saint-martins-island-camping": [
    {
      authorName: "Elena Petrova",
      authorLocation: "Sofia, Bulgaria",
      rating: 5,
      comment:
        "Three nights was the right amount of time to actually relax instead of rushing between spots. The reef boat trip at low tide was a highlight.",
    },
    {
      authorName: "Imran Kabir",
      authorLocation: "Sylhet",
      rating: 5,
      comment:
        "Camping right on the coastline instead of a hotel changed the whole trip. Bonfire nights were exactly what I needed.",
    },
  ],
  "ratargul-swamp-forest-photography-trail": [
    {
      authorName: "David Okafor",
      authorLocation: "Lagos, Nigeria",
      rating: 5,
      comment:
        "The sunrise departure is non-negotiable if you want the mirror-water shots - our guide timed it perfectly and knew the compositions that actually work.",
    },
    {
      authorName: "Farhana Akter",
      authorLocation: "Sylhet",
      rating: 4,
      comment:
        "Small boat, small group, and nobody rushing you for the light. Water was a bit choppier than expected by the time we left.",
    },
  ],
};

async function seedReviews(experienceIdBySlug: Map<string, mongoose.Types.ObjectId>) {
  let count = 0;

  for (const [slug, reviews] of Object.entries(reviewsBySlug)) {
    const experienceId = experienceIdBySlug.get(slug);
    if (!experienceId) continue;

    // Avoid duplicating reviews if the seed script is run more than once
    const existing = await Review.countDocuments({ experience: experienceId });
    if (existing > 0) continue;

    await Review.insertMany(
      reviews.map((r) => ({ ...r, experience: experienceId }))
    );
    count += reviews.length;
  }

  console.log(`Seeded ${count} reviews.`);
}

async function seedUser(config: typeof DEMO_USER | typeof ADMIN_USER) {
  const hashedPassword = await bcrypt.hash(config.password, 10);

  const user = await User.findOneAndUpdate(
    { email: config.email },
    {
      name: config.name,
      email: config.email,
      password: hashedPassword,
      role: config.role,
      provider: "credentials",
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return user;
}

async function main() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  const demoUser = await seedUser(DEMO_USER);
  console.log(`Demo user ready: ${DEMO_USER.email} / ${DEMO_USER.password}`);

  const adminUser = await seedUser(ADMIN_USER);
  console.log(`Admin user ready: ${ADMIN_USER.email} / ${ADMIN_USER.password}`);

  const experienceIdBySlug = await seedExperiences(adminUser._id);
  await seedReviews(experienceIdBySlug);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
