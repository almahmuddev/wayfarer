import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-secondary py-16 text-secondary-foreground">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready for Your Next Trail?
        </h2>
        <p className="max-w-xl text-secondary-foreground/90">
          Browse experiences from verified local hosts, or list your own trip
          if you know a route worth sharing.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="default">
            <Link href="/experiences">Explore Experiences</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10"
          >
            <Link href="/register">Become a Host</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
