import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceCard } from "@/components/cards/experience-card";
import { featuredExperiences } from "@/lib/data/experiences";

export function FeaturedExperiences() {
  return (
    <section className="bg-accent/30 py-20">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Featured Experiences
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              A sample of what&apos;s on Wayfarer right now &mdash; every listing
              is run by a host based where the trip happens.
            </p>
          </div>
          <Link
            href="/experiences"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all experiences
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredExperiences.map((experience) => (
            <ExperienceCard key={experience.slug} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
