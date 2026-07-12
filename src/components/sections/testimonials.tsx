import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    quote:
      "Our kayak guide in the Sundarbans knew exactly which channels the deer come down to at low tide. Nothing like the tour-bus version of this trip.",
    rating: 5,
  },
  {
    name: "James Carter",
    location: "London, UK",
    quote:
      "Booked the Bandarban trek two days before landing in Dhaka. The host met us at the bus stop and the whole thing felt properly local, not staged.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    location: "Sylhet",
    quote:
      "Went for the Ratargul photography trail expecting nice photos and got a genuinely good history lesson on the swamp forest from our boatman too.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          What Travelers Say
        </h2>
        <p className="mt-3 text-muted-foreground">
          Reviews are collected after each completed trip, from verified
          bookings only.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < testimonial.rating
                        ? "h-4 w-4 fill-secondary text-secondary"
                        : "h-4 w-4 text-muted"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
