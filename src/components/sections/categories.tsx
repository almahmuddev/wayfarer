import Link from "next/link";
import { Mountain, Tent, Waves, Landmark, PawPrint, Camera } from "lucide-react";
import { categories } from "@/lib/site-config";

const icons = { Mountain, Tent, Waves, Landmark, PawPrint, Camera } as const;

export function Categories() {
  return (
    <section id="categories" className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Browse by Adventure Type
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every category is hosted by people who live and work in that
          landscape &mdash; not a call center.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = icons[category.icon as keyof typeof icons];
          return (
            <Link
              key={category.slug}
              href={`/experiences?category=${encodeURIComponent(category.slug)}`}
              className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-5 text-center shadow-sm transition-colors hover:border-primary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {category.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.blurb}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
