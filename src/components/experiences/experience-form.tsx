"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  experienceFormSchema,
  categoryOptions,
  difficultyOptions,
  parseLines,
  type ExperienceFormInput,
} from "@/lib/validations/experience-form";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ExperienceForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormInput>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      isPublished: true,
    },
  });

  async function onSubmit(data: ExperienceFormInput) {
    setServerError("");
    setIsSubmitting(true);

    const payload = {
      title: data.title,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      price: data.price,
      durationLabel: data.durationLabel,
      difficulty: data.difficulty,
      category: data.category,
      location: data.location,
      maxGroupSize: data.maxGroupSize,
      startDates: [new Date(data.startDate).toISOString()],
      images: [
        ...(data.imageUrl ? [data.imageUrl] : []),
        ...parseLines(data.additionalImages),
      ],
      highlights: parseLines(data.highlights),
      included: parseLines(data.included),
      isPublished: data.isPublished,
    };

    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        setServerError(body.message || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/experiences/${body.slug}`);
      router.refresh();
    } catch {
      setServerError("Could not reach the server. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        {serverError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Sunset Kayaking on the Surma River"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shortDescription">Short description</Label>
            <Textarea
              id="shortDescription"
              rows={2}
              placeholder="One or two sentences shown on the listing card (max 200 characters)"
              {...register("shortDescription")}
            />
            {errors.shortDescription && (
              <p className="text-xs text-destructive">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fullDescription">Full description</Label>
            <Textarea
              id="fullDescription"
              rows={6}
              placeholder="Describe the full experience: what travelers will do, see, and feel."
              {...register("fullDescription")}
            />
            {errors.fullDescription && (
              <p className="text-xs text-destructive">
                {errors.fullDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <select id="category" className={selectClass} {...register("category")}>
                <option value="">Select a category</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="difficulty">Difficulty</Label>
              <select id="difficulty" className={selectClass} {...register("difficulty")}>
                <option value="">Select difficulty</option>
                {difficultyOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.difficulty && (
                <p className="text-xs text-destructive">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. Sylhet, Bangladesh"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="durationLabel">Duration</Label>
              <Input
                id="durationLabel"
                placeholder="e.g. Half day, 2 days"
                {...register("durationLabel")}
              />
              {errors.durationLabel && (
                <p className="text-xs text-destructive">
                  {errors.durationLabel.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step="0.01"
                placeholder="45"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="maxGroupSize">Max group size</Label>
              <Input
                id="maxGroupSize"
                type="number"
                min={1}
                placeholder="8"
                {...register("maxGroupSize")}
              />
              {errors.maxGroupSize && (
                <p className="text-xs text-destructive">
                  {errors.maxGroupSize.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-xs text-destructive">{errors.startDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="imageUrl">Cover image URL (optional)</Label>
            <Input
              id="imageUrl"
              placeholder="https://..."
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-xs text-destructive">{errors.imageUrl.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Leave blank to use a placeholder photo for now.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="additionalImages">
              Additional image URLs (optional, one per line)
            </Label>
            <Textarea
              id="additionalImages"
              rows={3}
              placeholder={"https://...\nhttps://..."}
              {...register("additionalImages")}
            />
            {errors.additionalImages && (
              <p className="text-xs text-destructive">
                {errors.additionalImages.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="highlights">Highlights (optional, one per line)</Label>
            <Textarea
              id="highlights"
              rows={3}
              placeholder={"Sunrise viewpoint\nSmall group size"}
              {...register("highlights")}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="included">What&apos;s included (optional, one per line)</Label>
            <Textarea
              id="included"
              rows={3}
              placeholder={"Local guide\nMeals\nTransport"}
              {...register("included")}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-input"
              {...register("isPublished")}
            />
            Publish immediately (uncheck to save as a draft)
          </label>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Experience
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
