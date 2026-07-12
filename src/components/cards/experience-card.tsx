import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ExperiencePreview } from "@/lib/data/experiences";

export function ExperienceCard({ experience }: { experience: ExperiencePreview }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <Badge className="absolute left-3 top-3" variant="secondary">
          {experience.category}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {experience.location}
        </div>
        <h3 className="line-clamp-1 font-semibold text-foreground">
          {experience.title}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {experience.shortDescription}
        </p>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 font-medium text-foreground">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            {experience.ratingAverage.toFixed(1)}
            <span className="text-muted-foreground">
              ({experience.ratingCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {experience.durationLabel}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <span className="text-lg font-bold text-foreground">
          ${experience.price}
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            / person
          </span>
        </span>
        <Button asChild size="sm" variant="outline">
          <Link href={`/experiences/${experience.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
