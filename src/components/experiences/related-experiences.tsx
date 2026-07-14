import { ExperienceCard } from "@/components/cards/experience-card";
import type { ExperienceListItem } from "@/types/experience";

export function RelatedExperiences({ items }: { items: ExperienceListItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        You Might Also Like
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ExperienceCard key={item.id} experience={item} />
        ))}
      </div>
    </section>
  );
}
