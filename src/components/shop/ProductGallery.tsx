"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="mx-auto w-full max-w-[750px]">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((src, i) => (
            <div key={src} className="embla__slide">
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                width={750}
                height={750}
                priority={i === 0}
                className="aspect-square h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`${i + 1}번 이미지`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1 rounded-full transition-all",
              i === selected ? "w-4 bg-neutral-500" : "w-1.5 bg-neutral-300",
            )}
          />
        ))}
      </div>
    </div>
  );
}
