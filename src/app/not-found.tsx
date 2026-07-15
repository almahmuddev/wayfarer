import Link from "next/link";
import { Compass } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="mt-2 text-lg font-medium text-foreground">
          This trail doesn&apos;t exist
        </p>
        <p className="mt-2 max-w-sm text-muted-foreground">
          The page you&apos;re looking for may have been moved, renamed, or
          never existed in the first place.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/experiences">Explore Experiences</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
