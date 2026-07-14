import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { ReviewItem } from "@/types/experience";

export function ReviewList({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reviews yet for this experience.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{review.authorName}</p>
                {review.authorLocation && (
                  <p className="text-xs text-muted-foreground">
                    {review.authorLocation}
                  </p>
                )}
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-3.5 w-3.5 fill-secondary text-secondary"
                        : "h-3.5 w-3.5 text-muted"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
