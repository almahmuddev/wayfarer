import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stories = [
  {
    slug: "hidden-trails-sylhet-hills",
    title: "5 Hidden Trails in the Sylhet Hills You Haven't Explored",
    excerpt:
      "Past the tea gardens tourists usually stop at, these five routes climb into rarely-visited ridge lines.",
    image: "https://picsum.photos/seed/sylhet-hills-blog/600/400",
    readTime: "6 min read",
  },
  {
    slug: "beginners-guide-kayaking-sundarbans",
    title: "A Beginner's Guide to Kayaking the Sundarbans",
    excerpt:
      "What to expect on your first paddle through the mangroves, from tide timing to what wildlife you'll actually see.",
    image: "https://picsum.photos/seed/sundarbans-blog/600/400",
    readTime: "8 min read",
  },
  {
    slug: "packing-list-first-overnight-camping-trip",
    title: "Packing List for Your First Overnight Camping Trip",
    excerpt:
      "The gear that matters, the gear that doesn't, and what most first-timers bring way too much of.",
    image: "https://picsum.photos/seed/camping-blog/600/400",
    readTime: "5 min read",
  },
];

export function TravelStories() {
  return (
    <section className="container py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Stories from the Trail
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Trip reports and planning guides from hosts and past travelers.
          </p>
        </div>
        <Link
          href="/blog"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Visit the blog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.slug} href={`/blog/${story.slug}`}>
            <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="line-clamp-2 font-semibold text-foreground">
                  {story.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {story.excerpt}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {story.readTime}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
