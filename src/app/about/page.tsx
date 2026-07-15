import { Compass, HeartHandshake, Users2, Eye } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Stats } from "@/components/sections/stats";
import { CallToAction } from "@/components/sections/cta";

export const metadata = {
  title: "About | Wayfarer",
  description:
    "Wayfarer connects travelers with guided outdoor experiences led by verified local hosts across Bangladesh.",
};

const values = [
  {
    icon: Eye,
    title: "Authenticity first",
    description:
      "Every listing is run by someone who actually lives and works in that landscape — not a call center reading from a script.",
  },
  {
    icon: HeartHandshake,
    title: "Fair to hosts",
    description:
      "The price you see goes almost entirely to the host who's guiding you. No hidden platform markup buried in the checkout.",
  },
  {
    icon: Users2,
    title: "Small groups, always",
    description:
      "Most experiences cap out well under 12 people. It changes how a trip feels, and it's non-negotiable for us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="About Wayfarer"
          subtitle="Built by travelers, run by locals."
        />

        <section className="container py-16">
          <div className="mx-auto max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Compass className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              Our Story
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Wayfarer started from a simple frustration: the best trips
                we&apos;d taken around Bangladesh never came from a tour
                brochure. They came from a boatman in Sylhet who knew which
                channel the deer used at low tide, or a family in Bandarban
                who let us camp on their land and cooked dinner over a fire.
                None of that was bookable online. You had to already know
                someone.
              </p>
              <p>
                So we built a place where that kind of knowledge could be
                listed directly — by the people who have it, not by an agency
                repackaging it. Every host on Wayfarer is verified and based
                where the experience actually happens, whether that&apos;s a
                tea garden in Sylhet, a mangrove channel in Khulna, or a
                rainforest trail in Moulvibazar.
              </p>
              <p>
                We&apos;re still small and still mostly focused on
                Bangladesh. That&apos;s deliberate — we&apos;d rather get a
                handful of regions right than spread thin across a hundred
                destinations we don&apos;t understand.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-accent/30 py-16">
          <div className="container">
            <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
              What We Actually Care About
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-lg border border-border bg-card p-6 text-center shadow-sm"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
