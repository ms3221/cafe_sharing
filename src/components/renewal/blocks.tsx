import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  ambassadors,
  colors,
  compare,
  faq,
  gauges,
  keyNumbers,
  materials,
  photos,
  sizes,
  structure,
  weight,
} from "@/data/samples/breeze-renewal";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

// 풀폭 배경 + 모바일 상세 폭(640px) 본문
export function Band({
  tone = "light",
  className,
  children,
}: {
  tone?: Tone | "gray" | "cobalt";
  className?: string;
  children: React.ReactNode;
}) {
  const toneClass = {
    light: "bg-white text-neutral-950",
    gray: "bg-neutral-100 text-neutral-950",
    dark: "bg-neutral-950 text-white",
    cobalt: "bg-cobalt text-white",
  }[tone];
  return (
    <section className={cn(toneClass, "px-5 py-16 md:py-24", className)}>
      <div className="mx-auto max-w-[640px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={cn("text-xs font-black tracking-[0.2em]", tone === "dark" ? "text-silver" : "text-cobalt")}>
      {children}
    </p>
  );
}

export function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("mt-3 text-[32px] leading-[1.15] font-black tracking-tight md:text-[40px]", className)}>{children}</h2>;
}

export function Lead({ children, tone = "light" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <p className={cn("mt-4 text-[15px] leading-relaxed", tone === "dark" ? "text-neutral-400" : "text-neutral-600")}>
      {children}
    </p>
  );
}

export function Photo({ src, alt, className, ratio = "aspect-[4/3]" }: { src: string; alt: string; className?: string; ratio?: string }) {
  return (
    <div className={cn("relative overflow-hidden", ratio, className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 640px, 100vw" className="object-cover" />
    </div>
  );
}

export function Quote({ text, tone = "light", size = "md" }: { text: string; tone?: Tone; size?: "md" | "lg" }) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-cobalt pl-4 font-bold",
        size === "lg" ? "text-[22px] leading-snug" : "text-[16px] leading-relaxed",
        tone === "dark" ? "text-white" : "text-neutral-900",
      )}
    >
      “{text}”
    </blockquote>
  );
}

export function KeyNumbers({ tone = "light" }: { tone?: Tone }) {
  return (
    <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-neutral-300/40">
      {keyNumbers.map((n) => (
        <div key={n.label} className={cn("px-3 py-5 text-center", tone === "dark" ? "bg-neutral-900" : "bg-white")}>
          <dd className="text-[34px] leading-none font-black tracking-tight">
            {n.value}
            <span className="ml-0.5 text-base font-bold">{n.unit}</span>
          </dd>
          <dt className="mt-2 text-[13px] font-bold">{n.label}</dt>
          <p className={cn("mt-0.5 text-[11px]", tone === "dark" ? "text-neutral-500" : "text-neutral-500")}>{n.sub}</p>
        </div>
      ))}
    </dl>
  );
}

export function WeightBars({ tone = "light" }: { tone?: Tone }) {
  return (
    <div className="mt-8 space-y-3">
      {[
        { label: "타사 벨트", value: weight.other, bar: tone === "dark" ? "bg-neutral-700" : "bg-neutral-300" },
        { label: "브리즈 벨트", value: weight.breeze, bar: "bg-cobalt" },
      ].map((row) => (
        <div key={row.label}>
          <div className="flex justify-between text-sm font-bold">
            <span>{row.label}</span>
            <span>약 {row.value}g</span>
          </div>
          <div className="mt-1.5 h-3 rounded-full bg-neutral-500/15">
            <div className={cn("h-3 rounded-full", row.bar)} style={{ width: `${(row.value / weight.other) * 100}%` }} />
          </div>
        </div>
      ))}
      <p className="text-xs text-neutral-500">* {weight.note}</p>
    </div>
  );
}

// 펼친 벨트 도면 위 번호 콜아웃
export function StructureMap({ tone = "light", only }: { tone?: Tone; only?: number[] }) {
  const points = only ? structure.filter((p) => only.includes(p.no)) : structure;
  return (
    <div className="mt-10">
      <div className="relative rounded-lg bg-white">
        <Image src={colors[1].image} alt="브리즈 벨트 구조" width={1000} height={487} className="h-auto w-full rounded-lg" />
        {points.map((p) => (
          <span
            key={p.no}
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cobalt text-xs font-black text-white ring-4 ring-cobalt/25"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.no}
          </span>
        ))}
      </div>
      <ol className="mt-6 space-y-4">
        {points.map((p) => (
          <li key={p.no} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cobalt text-xs font-black text-white">
              {p.no}
            </span>
            <div>
              <p className="font-bold">{p.name}</p>
              <p className={cn("mt-0.5 text-sm", tone === "dark" ? "text-neutral-400" : "text-neutral-600")}>{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MaterialGrid({ tone = "light" }: { tone?: Tone }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3">
      {materials.map((m) => (
        <li key={m.name}>
          <Photo src={m.image} alt={m.name} ratio="aspect-square" className="rounded-lg" />
          <p className="mt-3 text-[15px] font-black">{m.name}</p>
          <p className={cn("mt-1 text-[13px] leading-relaxed", tone === "dark" ? "text-neutral-400" : "text-neutral-600")}>{m.desc}</p>
        </li>
      ))}
    </ul>
  );
}

export function CompareTable({ tone = "light", rows = compare.rows.length }: { tone?: Tone; rows?: number }) {
  const line = tone === "dark" ? "border-neutral-800" : "border-neutral-200";
  return (
    <div className="mt-10">
      <div className="grid grid-cols-[72px_1fr_1fr] gap-3">
        <span />
        {[compare.breeze, compare.lifting].map((m, i) => (
          <div key={m.name} className="text-center">
            <div className={cn("overflow-hidden rounded-lg bg-white", i === 0 && "ring-2 ring-cobalt")}>
              <Image src={m.image} alt={m.name} width={600} height={520} className="h-auto w-full" />
            </div>
            <p className={cn("mt-2 text-sm font-black", i === 0 && "text-cobalt")}>{m.name}</p>
          </div>
        ))}
      </div>
      <dl className="mt-4">
        {compare.rows.slice(0, rows).map((row, r) => (
          <div key={row} className={cn("grid grid-cols-[72px_1fr_1fr] gap-3 border-t py-3 text-[13px]", line)}>
            <dt className="font-bold text-neutral-500">{row}</dt>
            <dd className="font-bold">{compare.breeze.values[r]}</dd>
            <dd className={tone === "dark" ? "text-neutral-400" : "text-neutral-600"}>{compare.lifting.values[r]}</dd>
          </div>
        ))}
      </dl>
      <a
        href={compare.lifting.href}
        target="_blank"
        rel="noreferrer"
        className={cn("mt-2 block border py-3 text-center text-sm font-bold", tone === "dark" ? "border-neutral-700" : "border-neutral-300")}
      >
        리프팅 벨트 보러가기 →
      </a>
    </div>
  );
}

export function Gauges({ tone = "light" }: { tone?: Tone }) {
  return (
    <div className="mt-10 space-y-5">
      <div className="flex gap-4 text-xs font-bold">
        <span className="flex items-center gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-cobalt" />
          브리즈 벨트
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-silver" />
          리프팅 벨트
        </span>
      </div>
      {gauges.map((g) => (
        <div key={g.label}>
          <p className="text-sm font-bold">{g.label}</p>
          {[
            { value: g.breeze, color: "bg-cobalt" },
            { value: g.lifting, color: "bg-silver" },
          ].map((bar, i) => (
            <div key={i} className="mt-1.5 flex gap-1">
              {Array.from({ length: 5 }, (_, n) => (
                <span key={n} className={cn("h-2 flex-1 rounded-sm", n < bar.value ? bar.color : tone === "dark" ? "bg-neutral-800" : "bg-neutral-200")} />
              ))}
            </div>
          ))}
        </div>
      ))}
      <p className="text-xs text-neutral-500">* 예시 수치입니다. 기준은 브랜드 확정 후 반영합니다.</p>
    </div>
  );
}

export function SizeGuide({ tone = "light", ambassadorFirst = false }: { tone?: Tone; ambassadorFirst?: boolean }) {
  const sub = tone === "dark" ? "text-neutral-400" : "text-neutral-600";
  const table = (
    <table key="table" className="mt-8 w-full text-center text-sm">
      <thead>
        <tr className={cn("border-b-2", tone === "dark" ? "border-white" : "border-neutral-950")}>
          <th className="py-2.5">사이즈</th>
          <th className="py-2.5">허리 실측(cm)</th>
          <th className="py-2.5">인치</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map((s) => (
          <tr key={s.size} className={cn("border-b", tone === "dark" ? "border-neutral-800" : "border-neutral-200")}>
            <td className="py-3 font-black">{s.size}</td>
            <td className="py-3">{s.cm}</td>
            <td className={cn("py-3", sub)}>{s.inch}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const people = (
    <ul key="people" className="mt-8 grid grid-cols-2 gap-3">
      {ambassadors.map((a) => (
        <li key={a.name} className={cn("rounded-lg p-4", tone === "dark" ? "bg-neutral-900" : "bg-neutral-100")}>
          <p className="text-xs font-bold text-neutral-500">{a.gender === "M" ? "MALE" : "FEMALE"} AMBASSADOR</p>
          <p className="mt-1 font-black">{a.name}</p>
          <p className={cn("mt-1 text-xs", sub)}>
            {a.height}cm · {a.weight} · 허리 {a.waist}
          </p>
          <p className="mt-3 text-[13px]">
            브리즈 <b className="text-lg font-black text-cobalt">{a.breeze}</b>
            <span className={cn("ml-2 text-xs", sub)}>리프팅 {a.lifting}</span>
          </p>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {ambassadorFirst ? [people, table] : [table, people]}
      <p className={cn("mt-4 text-xs", sub)}>* 허리 부분 실측 사이즈가 범위 안에 들어오도록 선택해주세요.</p>
    </>
  );
}

export function Faq({ tone = "light", items = faq }: { tone?: Tone; items?: typeof faq }) {
  return (
    <div className="mt-8">
      {items.map((item) => (
        <details key={item.q} className={cn("group border-b", tone === "dark" ? "border-neutral-800" : "border-neutral-200")}>
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-bold">
            <span>
              <span className="mr-2 text-cobalt">Q</span>
              {item.q}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className={cn("pb-5 pl-6 text-sm leading-relaxed", tone === "dark" ? "text-neutral-400" : "text-neutral-600")}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

// 신규 촬영이 필요한 자리 표시
export function ShootNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 inline-flex items-center gap-1.5 rounded border border-dashed border-amber-500/60 bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">
      촬영 필요 · {children}
    </p>
  );
}

const angles = [
  { label: "정면", src: "/assets/breeze-belt/crops/color-orange.jpg", contain: true },
  { label: "측면", src: photos.slim },
  { label: "펼친 상태", src: photos.sizeDiagram, contain: true },
  { label: "디테일", src: photos.logoPatch },
  { label: "후면" },
  { label: "위 · 아래" },
];

export function MultiAngle() {
  return (
    <ul className="mt-6 grid grid-cols-3 gap-2">
      {angles.map((a) => (
        <li key={a.label}>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
            {a.src ? (
              <Image src={a.src} alt={a.label} fill sizes="220px" className={a.contain ? "object-contain p-2 mix-blend-multiply" : "object-cover"} />
            ) : (
              <span className="absolute inset-1 flex items-center justify-center rounded border border-dashed border-amber-500/60 text-[11px] font-bold text-amber-700">
                촬영 필요
              </span>
            )}
          </div>
          <p className="mt-1.5 text-center text-xs font-bold text-neutral-500">{a.label}</p>
        </li>
      ))}
    </ul>
  );
}
