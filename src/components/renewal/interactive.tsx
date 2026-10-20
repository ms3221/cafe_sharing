"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import { colors, type BeltColor } from "@/data/samples/breeze-renewal";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

function Swatch({ color, active, onClick, tone }: { color: BeltColor; active: boolean; onClick: () => void; tone: Tone }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2" aria-pressed={active}>
      <span
        className={cn(
          "relative h-11 w-11 overflow-hidden rounded-full ring-offset-2 transition",
          active ? "ring-2 ring-cobalt" : "ring-1 ring-neutral-400/40",
          tone === "dark" ? "ring-offset-neutral-950" : "ring-offset-white",
        )}
        style={{ background: color.base }}
      >
        <span className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: color.logo }} />
      </span>
      <span className={cn("text-xs font-bold", active ? "" : "opacity-50")}>{color.name}</span>
    </button>
  );
}

/**
 * 360° 드래그 뷰 시안.
 * 실제 회전 촬영본(frames)이 들어오면 각도에 맞는 컷을 보여주고,
 * 지금은 컷이 1장뿐이라 기울기만 반응한다.
 */
export function Spin360({
  tone = "light",
  frames,
  initial = 1,
  full = false,
}: {
  tone?: Tone;
  frames?: Record<string, string[]>;
  initial?: number;
  full?: boolean;
}) {
  const [colorIndex, setColorIndex] = useState(initial);
  const [angle, setAngle] = useState(0);
  const [touched, setTouched] = useState(false);
  const drag = useRef<{ x: number; angle: number } | null>(null);
  const color = colors[colorIndex];
  const sequence = frames?.[color.name];
  const src = sequence ? sequence[Math.round((angle / 360) * sequence.length) % sequence.length] : color.image;
  const tilt = sequence ? 0 : Math.sin((angle * Math.PI) / 180) * 28;

  return (
    <div className={cn(full && "-mx-5")}>
      <div
        className={cn(
          "relative cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing",
          full ? "aspect-[4/5]" : "aspect-square rounded-xl",
          "bg-white",
          tone === "light" && "ring-1 ring-neutral-200",
        )}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, angle };
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const next = (drag.current.angle + (e.clientX - drag.current.x) * 0.8) % 360;
          setAngle(next < 0 ? next + 360 : next);
          setTouched(true);
        }}
        onPointerUp={() => (drag.current = null)}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8 [perspective:900px]">
          <Image
            src={src}
            alt={`브리즈 벨트 ${color.name}`}
            width={1000}
            height={480}
            draggable={false}
            className="h-auto w-full transition-transform duration-75"
            style={{ transform: `rotateY(${tilt}deg)` }}
          />
        </div>

        <svg viewBox="0 0 100 100" className="pointer-events-none absolute right-4 bottom-4 h-14 w-14">
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="6" className="stroke-neutral-400/30" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-cobalt"
            strokeDasharray={`${(angle / 360) * 264} 264`}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="56" textAnchor="middle" className="fill-neutral-900 text-[20px] font-black">
            {Math.round(angle)}°
          </text>
        </svg>

        <p
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-sm font-bold text-neutral-900 transition-opacity",
            touched && "opacity-0",
          )}
        >
          <RotateCw className="h-4 w-4 text-cobalt" /> 좌우로 드래그해서 돌려보세요
        </p>
        <span className="absolute top-4 left-4 rounded bg-cobalt px-2 py-1 text-[11px] font-black tracking-wider text-white">360° VIEW</span>
        {!sequence && (
          <span className="absolute top-4 right-4 rounded border border-dashed border-amber-500/70 bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
            회전 촬영본 교체 예정
          </span>
        )}
      </div>

      <div className={cn("mt-5 flex justify-center gap-6", full && "px-5")}>
        {colors.map((c, i) => (
          <Swatch key={c.name} color={c} active={i === colorIndex} onClick={() => setColorIndex(i)} tone={tone} />
        ))}
      </div>
    </div>
  );
}

/** 컬러칩. 고른 컬러의 단독컷과 함께 착용컷을 보여준다 */
export function ColorPicker({ tone = "light", looks }: { tone?: Tone; looks?: Record<string, string> }) {
  const [index, setIndex] = useState(0);
  const color = colors[index];
  return (
    <div className="mt-10">
      <div className="rounded-xl p-8 transition-colors duration-300" style={{ background: color.stage }}>
        <Image src={color.image} alt={color.name} width={1000} height={480} className="h-auto w-full mix-blend-multiply" />
      </div>
      {looks?.[color.name] && (
        <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl">
          <Image src={looks[color.name]} alt={`${color.name} 착용컷`} fill sizes="640px" className="object-cover" />
        </div>
      )}
      <div className="mt-6 flex justify-center gap-6">
        {colors.map((c, i) => (
          <Swatch key={c.name} color={c} active={i === index} onClick={() => setIndex(i)} tone={tone} />
        ))}
      </div>
    </div>
  );
}

/** 컬러별 풀스크린 히어로. 좌우로 넘기면 배경색까지 바뀐다 */
export function ColorHero() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const color = colors[index];
  const go = (step: number) => setIndex((i) => (i + step + colors.length) % colors.length);

  return (
    <section
      className="relative flex min-h-[640px] touch-pan-y flex-col justify-between overflow-hidden px-5 pt-12 pb-10 transition-colors duration-500 select-none md:min-h-[760px]"
      style={{ background: color.stage }}
      onPointerDown={(e) => (start.current = e.clientX)}
      onPointerUp={(e) => {
        if (start.current === null) return;
        const dx = e.clientX - start.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        start.current = null;
      }}
    >
      <div className="mx-auto w-full max-w-[640px]">
        <p className="text-xs font-black tracking-[0.2em] text-neutral-900/60">OUTDO BREEZE BELT</p>
        <p className="mt-2 text-[88px] leading-[0.85] font-black tracking-tighter md:text-[120px]" style={{ color: color.logo }}>
          {color.en}
        </p>
      </div>
      <div className="mx-auto w-full max-w-[640px]">
        <Image
          key={color.name}
          src={color.image}
          alt={`브리즈 벨트 ${color.name}`}
          width={1000}
          height={480}
          priority
          draggable={false}
          className="h-auto w-full animate-[fade_0.5s_ease] mix-blend-multiply"
        />
      </div>
      <div className="mx-auto flex w-full max-w-[640px] items-end justify-between">
        <p className="text-[22px] leading-snug font-black text-neutral-950">
          오늘 WOD,
          <br />
          무슨 컬러로 갈래요?
        </p>
        <div className="flex gap-2">
          {colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setIndex(i)}
              aria-label={c.name}
              className={cn("h-2 rounded-full bg-neutral-950 transition-all", i === index ? "w-8" : "w-2 opacity-30")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
