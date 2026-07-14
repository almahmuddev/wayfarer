import { notFound } from "next/navigation";
import { MapPin, Star, Clock, Users, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/experiences/image-gallery";
import { BookingPanel } from "@/components/experiences/booking-panel";
import { ReviewList } from "@/components/experiences/review-list";
import { RelatedExperiences } from "@/components/experiences/related-experiences";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/Experience";
import { Review } from "@/models/Review";
import { User } from "@/models/User";
import type {
  ExperienceDetail,
  ExperienceListItem,
  ReviewItem,
} from "@/types/experience";

interface PageProps {
  params: { slug: string };
}

async function getExperienceData(slug: string) {
  await connectDB();

  const doc = await Experience.findOne({ slug, isPublished: true }).lean();
  if (!doc) return null;

  const hostDoc = await User.findById(doc.host).select("name image").lean();

  const experience: ExperienceDetail = {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    fullDescription: doc.fullDescription,
    images: doc.images,
    price: doc.price,
    currency: doc.currency,
    durationLabel: doc.durationLabel,
    difficulty: doc.difficulty,
    category: doc.category,
    location: doc.location,
    maxGroupSize: doc.maxGroupSize,
    startDates: doc.startDates.map((d) => new Date(d).toISOString()),
    highlights: doc.highlights,
    included: doc.included,
    ratingAverage: doc.ratingAverage,
    ratingCount: doc.ratingCount,
    host: { name: hostDoc?.name ?? "Wayfarer Host", image: hostDoc?.image },
  };

  const reviewDocs = await Review.find({ experience: doc._id })
    .sort({ createdAt: -1 })
    .lean();

  const reviews: ReviewItem[] = reviewDocs.map((r) => ({
    id: r._id.toString(),
    authorName: r.authorName,
    authorLocation: r.authorLocation,
    rating: r.rating,
    comment: r.comment,
    createdAt: new Date(r.createdAt).toISOString(),
  }));

  const relatedDocs = await Experience.find({
    category: doc.category,
    _id: { $ne: doc._id },
    isPublished: true,
  })
    .sort({ ratingAverage: -1 })
    .limit(4)
    .lean();

  const related: ExperienceListItem[] = relatedDocs.map((r) => ({
    id: r._id.toString(),
    slug: r.slug,
    title: r.title,
    shortDescription: r.shortDescription,
    image: r.images?.[0] ?? "",
    price: r.price,
    currency: r.currency,
    durationLabel: r.durationLabel,
    difficulty: r.difficulty,
    category: r.category,
    location: r.location,
    ratingAverage: r.ratingAverage,
    ratingCount: r.ratingCount,
  }));

  return { experience, reviews, related };
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getExperienceData(params.slug);
  if (!data) return { title: "Experience Not Found | Wayfarer" };
  return {
    title: `${data.experience.title} | Wayfarer`,
    description: data.experience.shortDescription,
  };
}

export default async function ExperienceDetailsPage({ params }: PageProps) {
  const data = await getExperienceData(params.slug);
  if (!data) notFound();

  const { experience, reviews, related } = data;

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <ImageGallery images={experience.images} title={experience.title} />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{experience.category}</Badge>
                <Badge variant="outline">{experience.difficulty}</Badge>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
                {experience.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {experience.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {experience.durationLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> Up to {experience.maxGroupSize} people
                </span>
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  {experience.ratingAverage.toFixed(1)} ({experience.ratingCount} reviews)
                </span>
              </div>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {experience.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Key Information
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Difficulty</p>
                  <p className="mt-1 font-medium text-foreground">
                    {experience.difficulty}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="mt-1 font-medium text-foreground">
                    {experience.durationLabel}
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Group size</p>
                  <p className="mt-1 font-medium text-foreground">
                    Up to {experience.maxGroupSize} people
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="mt-1 font-medium text-foreground">
                    {experience.category}
                  </p>
                </div>
              </div>

              {experience.highlights.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-foreground">Highlights</p>
                  <ul className="mt-2 space-y-1.5">
                    {experience.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.included.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-foreground">
                    What&apos;s Included
                  </p>
                  <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {experience.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
              <div className="mt-3">
                <ReviewList reviews={reviews} />
              </div>
            </section>
          </div>

          <div>
            <BookingPanel
              price={experience.price}
              currency={experience.currency}
              maxGroupSize={experience.maxGroupSize}
              startDates={experience.startDates}
              hostName={experience.host.name}
            />
          </div>
        </div>

        <div className="mt-14">
          <RelatedExperiences items={related} />
        </div>
      </main>
      <Footer />
    </>
  );
}
