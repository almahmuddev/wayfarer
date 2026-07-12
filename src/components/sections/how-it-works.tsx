import { Search, CalendarCheck, Backpack } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find your trail",
    description:
      "Filter by category, location, price, or difficulty until you find an experience that matches your pace.",
  },
  {
    icon: CalendarCheck,
    title: "Book with your host",
    description:
      "Pick a start date, confirm your group size, and message your host directly with any questions before you go.",
  },
  {
    icon: Backpack,
    title: "Pack up and go",
    description:
      "We send a checklist based on the experience type, so you show up with exactly what the trip needs.",
  },
];

export function HowItWorks() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          How Wayfarer Works
        </h2>
        <p className="mt-3 text-muted-foreground">
          Three steps between browsing and being on the trail.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            <span className="absolute -top-3 right-1/2 translate-x-10 text-5xl font-bold text-muted/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <step.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
