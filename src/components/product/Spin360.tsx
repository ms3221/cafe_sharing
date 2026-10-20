"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// 360도 보기: 좌우로 끌어서 돌린다 (시안 1 · 2 상세 공용)
// frames가 있으면 회전판 사진을 각도에 맞춰 바꿔 보여주고, 없으면 사진 한 장을 입체로 돌려 동작만 보여준다
export function Spin360({
  src,
  alt,
  frames = [],
  hintClassName = "bottom-12 md:bottom-20",
}: {
  src: string;
  alt: string;
  frames?: string[];
  hintClassName?: string;
}) {
  const [angle, setAngle] = useState(0);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; angle: number } | null>(null);

  const frame = frames.length > 0 ? frames[((Math.round((angle / 360) * frames.length) % frames.length) + frames.length) % frames.length] : null;

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="360도 보기. 좌우로 끌거나 화살표 키로 돌려 보세요"
      aria-valuemin={0}
      aria-valuemax={359}
      aria-valuenow={((Math.round(angle) % 360) + 360) % 360}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, angle };
        setTouched(true);
      }}
      onPointerMove={(e) => drag.current && setAngle(drag.current.angle + (e.clientX - drag.current.x) * 0.6)}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setAngle((a) => a - 15);
        if (e.key === "ArrowRight") setAngle((a) => a + 15);
      }}
      // 모바일 갤러리 안에서 끌면 옆 사진으로 넘어가지 않고 돌아가게
      className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing [perspective:900px]"
    >
      {frame ? (
        <Image src={frame} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" draggable={false} className="pointer-events-none object-contain p-6" />
      ) : (
        <div className="absolute inset-0" style={{ transform: `rotateY(${angle}deg)`, transformStyle: "preserve-3d" }}>
          <Image src={src} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" draggable={false} className="pointer-events-none object-contain p-6" />
        </div>
      )}
      {frames.length === 0 && (
        <span className="absolute top-4 right-4 z-10 rounded-sm bg-[#fff3b0] px-1.5 py-0.5 text-[11px] font-bold text-amber-950">대체 · 360 회전판 촬영 필요(24~36장)</span>
      )}
      <span
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-neutral-950/80 px-3 py-1.5 text-[13px] whitespace-nowrap text-white transition-opacity",
          hintClassName,
          touched && "opacity-0",
        )}
      >
        ← 끌어서 360° 돌려보기 →
      </span>
    </div>
  );
}
