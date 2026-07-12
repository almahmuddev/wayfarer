import { ShieldCheck, CreditCard, BadgePercent, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified local hosts",
    description:
      "Every host completes an identity and location check before their first listing goes live.",
  },
  {
    icon: CreditCard,
    title: "Secure booking",
    description:
      "Payments are held until 24 hours after your trip starts, so you're covered if plans change.",
  },
  {
    icon: BadgePercent,
    title: "Fair, transparent pricing",
    description:
      "The price you see includes the guide's fee &mdash; no surprise add-ons at checkout.",
  },
  {
    icon: Headphones,
    title: "Support when you need it",
    description:
      "Reach a real person by chat or phone if anything about your trip needs sorting out.",
  },
];

export function WhyWayfarer() {
  return (
    <section className="bg-accent/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why Travelers Choose Wayfarer
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
