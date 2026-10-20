"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DetailImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  href?: string;
}

// 아임웹 기본 동작과 동일하게 상세정보는 접힌 상태로 시작하고 "펼쳐보기"로 전체 노출
export function DetailImages({ images }: { images: DetailImage[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="prod-detail" className="scroll-mt-14 pt-12 md:pt-20">
      <div className="relative mx-auto max-w-[1120px]">
        <div className={cn("overflow-hidden", !expanded && "max-h-[700px] md:max-h-[1070px]")}>
          {images.map((img, i) => {
            const picture = (
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                priority={i === 0}
                sizes="(min-width: 1120px) 1120px, 100vw"
                className="block h-auto w-full"
              />
            );
            return img.href ? (
              <a key={img.src} href={img.href} target="_blank" rel="noreferrer">
                {picture}
              </a>
            ) : (
              <div key={img.src}>{picture}</div>
            );
          })}
        </div>
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-white/0 to-white" />
        )}
      </div>
      <div className="mt-2 flex justify-center px-4">
        <button
          onClick={() => {
            if (expanded) document.getElementById("prod-detail")?.scrollIntoView();
            setExpanded(!expanded);
          }}
          className="w-full border border-neutral-300 bg-white py-3 text-[13px] font-semibold text-shop-ink md:w-[260px]"
        >
          {expanded ? "상세정보 접기" : "상세정보 펼쳐보기"}
        </button>
      </div>
    </section>
  );
}
