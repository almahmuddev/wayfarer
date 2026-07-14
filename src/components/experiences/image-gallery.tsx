"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images.length > 0 ? images : ["https://picsum.photos/seed/wayfarer-fallback/1200/800"];

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={gallery[activeIndex]}
          alt={`${title} - photo ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {gallery.map((image, index) => (
            <button
              key={image + index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                index === activeIndex ? "border-primary" : "border-transparent"
              )}
              aria-label={`Show photo ${index + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
