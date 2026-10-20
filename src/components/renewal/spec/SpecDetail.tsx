import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ambassadors, colors, compare, faq, photos, sizes, versus, weight } from "@/data/samples/breeze-renewal";
import { cn } from "@/lib/utils";
import { BeltScene } from "./BeltScene";
import { FlatView } from "./drawings";

// TECH SPEC 시안: 보여주는 구간은 차콜 + 3D, 읽는 구간은 밝은 실버 그레이. 코발트는 포인트만

const grid =
  "bg-[linear-gradient(rgba(184,188,196,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,188,196,0.08)_1px,transparent_1px)] bg-[size:24px_24px]";

function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("font-mono text-[11px] tracking-[0.18em] text-[var(--mono)] uppercase", className)}>{children}</p>;
}

function Sheet({ no, code, title, children, className }: { no: string; code: string; title: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("border-t border-[var(--line)] px-5 py-16 md:py-24", className)}>
      <div className="mx-auto max-w-[640px]">
        <div className="flex items-baseline justify-between">
          <Mono>
            <span className="text-[var(--accent)]">{no}</span> / {code}
          </Mono>
          <Mono>OUTDO · BRZ</Mono>
        </div>
        <h2 className="mt-5 text-[40px] leading-[1.05] font-black tracking-tighter whitespace-pre-line text-[var(--ink)] md:text-[52px]">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Fig({ no, name, children, className }: { no: string; name: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={cn("relative border border-[var(--line)] p-4", className)}>
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-r border-b"].map((c) => (
        <span key={c} className={cn("absolute h-3 w-3 border-[var(--accent)]", c)} />
      ))}
      <Mono>
        FIG.{no} — {name}
      </Mono>
      <div className="mt-3 text-[var(--draw)]">{children}</div>
    </figure>
  );
}

function Zoom({ src, fig, title, desc }: { src: string; fig: string; title: string; desc: string }) {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={src} alt={title} fill sizes="100vw" className="object-cover" />
        <Mono className="absolute top-4 left-5 text-white/90">DETAIL.{fig} · ×4</Mono>
      </div>
      <div className="mx-auto max-w-[640px] px-5">
        <p className="mt-5 text-[28px] leading-tight font-black tracking-tight text-white">{title}</p>
        <p className="mt-2 text-[16px] leading-relaxed text-neutral-300">{desc}</p>
      </div>
    </div>
  );
}

const darkVars = {
  "--ink": "#ffffff",
  "--mono": "rgba(184,188,196,0.85)",
  "--line": "rgba(184,188,196,0.15)",
  "--accent": "#2f6bff",
  "--draw": "#b8bcc4",
} as React.CSSProperties;

const lightVars = {
  "--ink": "#0a0a0a",
  "--mono": "#6b7280",
  "--line": "#d4d6db",
  "--accent": "#0047ab",
  "--draw": "#3f434b",
} as React.CSSProperties;

const colorCode: Record<string, string> = { 핑크: "PK", 오렌지: "OR", 블루: "BL" };

export function SpecDetail() {
  return (
    <div className={cn("bg-[#121418] text-silver", grid)} style={darkVars}>
      {/* HERO — 3D 벨트가 주인공. 드래그·시점 버튼으로 앞뒤옆위아래를 직접 본다 */}
      <section className="relative overflow-hidden px-5 pt-12 pb-10 md:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(47,107,255,0.28),transparent_65%)]" />
        <div className="relative mx-auto max-w-[640px]">
          <div className="flex justify-between">
            <Mono>OUTDO / BREEZE BELT</Mono>
            <Mono>360° · 3D</Mono>
          </div>
          <h2 className="mt-8 text-[44px] leading-[1.02] font-black tracking-tighter text-white md:text-[60px]">
            숨긴 각도는
            <br />
            없습니다<span className="text-cobalt-bright">.</span>
          </h2>
          <BeltScene className="-mx-5 mt-2 h-[520px] md:h-[600px]" />
          <dl className="mt-8 grid grid-cols-3 border-y border-silver/20 text-center">
            {[
              { k: "WEIGHT", v: "238", u: "g" },
              { k: "THICKNESS", v: "6.9", u: "mm" },
              { k: "WIDTH", v: "10", u: "cm" },
            ].map((s, i) => (
              <div key={s.k} className={cn("py-5", i > 0 && "border-l border-silver/20")}>
                <Mono>{s.k}</Mono>
                <dd className="mt-2 text-[34px] leading-none font-black text-white">
                  {s.v}
                  <span className="ml-0.5 text-base text-cobalt-bright">{s.u}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Mono className="mt-3 normal-case tracking-normal">* 3D는 코드로 그린 모형입니다. 실측 3D 스캔·제품 사진으로 교체할 수 있습니다.</Mono>
        </div>
      </section>

      {/* 감정 — 사람과 장면으로 끌어당긴다 */}
      <section className="relative">
        <div className="relative aspect-[4/5] md:aspect-[16/10]">
          <Image src={photos.athleteWod} alt="브리즈 벨트 착용" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/20 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12">
          <div className="mx-auto max-w-[640px]">
            <Mono className="text-silver/80">IN ACTION</Mono>
            <p className="mt-3 text-[44px] leading-[1.02] font-black tracking-tighter text-white md:text-[64px]">
              움직임은 가볍게<span className="text-cobalt-bright">,</span>
              <br />
              리프팅은 강하게<span className="text-cobalt-bright">.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 01 레이어 — 스크롤하면 벨트가 벌어지며 구조가 드러난다 */}
      <Sheet no="01" code="LAYERS" title={"얇은데\n버티는 이유."}>
        <p className="mt-4 text-[16px] leading-relaxed text-neutral-300">
          폼과 텍스타일을 결합한 구조라 오래 써도 형태가 무너지지 않습니다. 단일 압축 라인이 몸에 딱 맞게 잡아줍니다.
        </p>
        <BeltScene mode="explode" className="-mx-5 mt-6 h-[620px]" />
        <Mono className="mt-4 normal-case tracking-normal">* 레이어 구성은 예시입니다. 실제 구성은 브랜드 확인 후 반영합니다.</Mono>
      </Sheet>

      {/* 02 확대샷 — 풀폭 사진 + 큰 제목 */}
      <section className="border-t border-silver/15 pt-16 md:pt-24">
        <div className="mx-auto max-w-[640px] px-5">
          <Mono>
            <span className="text-cobalt-bright">02</span> / DETAIL ×4
          </Mono>
          <h2 className="mt-5 text-[40px] leading-[1.05] font-black tracking-tighter text-white md:text-[52px]">
            가까이.
            <br />
            더 가까이.
          </h2>
        </div>
        <div className="mt-10 space-y-16 pb-16">
          <Zoom src={photos.velcro} fig="01" title="프리미엄 벨크로 락" desc="풀업 · 점프 · 하이풀에서도 흔들리지 않는 고정력." />
          <Zoom src={photos.patchHand} fig="02" title="I'M THE BEST" desc="고급스러우면서도 힙한 OUTDO만의 로고 패치." />
          <Zoom src={photos.slim} fig="03" title="슬림 핏 6.9mm" desc="몸에 딱 맞는 핏과 가동성을 보장하는 단일 압축 라인 설계." />
        </div>
      </section>

      {/* 여기부터 읽는 구간: 밝은 실버 그레이로 전환 */}
      <div className="bg-[#f2f3f5] text-neutral-800" style={lightVars}>
        {/* 05 무게 비교 — 차이를 숫자 하나로 */}
        <Sheet no="03" code="VS OTHERS" title={<>−143g<span className="text-cobalt">.</span></>}>
          <p className="mt-4 text-[16px] text-neutral-700">타사 벨트보다 이만큼 가볍습니다. 더 얇고, 더 빨리 차고 풉니다. 착용한 걸 잊게 만드는 가벼움, WOD 내내 유지되는 지지력.</p>
          <div className="mt-10 space-y-6">
            {[
              { label: "타사 벨트", value: weight.other, bar: "bg-neutral-300" },
              { label: "BREEZE", value: weight.breeze, bar: "bg-cobalt" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between">
                  <Mono>{row.label}</Mono>
                  <span className="text-2xl font-black text-neutral-950">{row.value}g</span>
                </div>
                <div className="mt-2 h-6 border border-neutral-300">
                  <div className={cn("h-full", row.bar)} style={{ width: `${(row.value / weight.other) * 100}%` }} />
                </div>
              </div>
            ))}
            <Mono className="normal-case tracking-normal">* {weight.note}</Mono>
          </div>
          <dl className="mt-12 border-t border-neutral-900">
            <div className="grid grid-cols-[64px_1fr_1fr] gap-3 py-3">
              <span />
              <Mono>일반 벨트</Mono>
              <Mono className="text-cobalt">BREEZE</Mono>
            </div>
            {versus.map((row) => (
              <div key={row.label} className="grid grid-cols-[64px_1fr_1fr] items-baseline gap-3 border-t border-neutral-300 py-4">
                <dt>
                  <Mono>{row.label}</Mono>
                </dt>
                <dd className="text-sm text-neutral-500">{row.other}</dd>
                <dd className="text-lg leading-tight font-black text-neutral-950">{row.breeze}</dd>
              </div>
            ))}
          </dl>
          <Mono className="mt-3 normal-case tracking-normal">
            * 타사 무게는 현재 상세 기준. 일반 벨트 두께·고정 방식은 일반적인 가죽 리프팅 벨트 기준이며 브랜드 확인 후 반영합니다.
          </Mono>
        </Sheet>

        {/* 06 컬러칩 — 정확한 색으로 */}
        <Sheet no="04" code="COLORWAY" title={"3 COLORS.\n정확한 색으로."}>
          <ul className="mt-10 space-y-3">
            {colors.map((c) => (
              <li key={c.name} className="grid grid-cols-[96px_1fr] border border-neutral-300">
                <div className="flex flex-col">
                  <span className="flex-[3]" style={{ background: c.base }} />
                  <span className="flex-1" style={{ background: c.logo }} />
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-black text-neutral-950">{c.en}</p>
                    <Mono>BRZ-{colorCode[c.name]}</Mono>
                  </div>
                  <div className="mt-3 bg-white p-2">
                    <Image src={c.image} alt={c.name} width={1000} height={480} className="h-auto w-full" />
                  </div>
                  <Mono className="mt-3">
                    BASE {c.base} · LOGO {c.logo}
                  </Mono>
                </div>
              </li>
            ))}
          </ul>
        </Sheet>

        {/* 07 사이즈 */}
        <Sheet no="05" code="SIZE" title={"내 허리에\n맞는 숫자."}>
          <Fig no="04" name="LENGTH" className="mt-10">
            <FlatView className="w-full" />
          </Fig>
          <table className="mt-6 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-900">
                {["SIZE", "WAIST (cm)", "INCH"].map((h) => (
                  <th key={h} className="py-2 font-mono text-[10px] font-normal tracking-widest text-neutral-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((s) => (
                <tr key={s.size} className="border-b border-neutral-300 text-neutral-950">
                  <td className="py-3 text-lg font-black">{s.size}</td>
                  <td className="py-3">{s.cm}</td>
                  <td className="py-3 text-neutral-600">{s.inch}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Mono className="mt-10">AMBASSADOR FIT</Mono>
          <ul className="mt-3">
            {ambassadors.map((a) => (
              <li key={a.name} className="flex items-center justify-between border-b border-neutral-300 py-3 text-sm">
                <span className="text-neutral-950">
                  {a.name}
                  <span className="ml-2 text-xs text-neutral-500">
                    {a.height}cm · {a.weight} · {a.waist}
                  </span>
                </span>
                <span className="text-xl font-black text-cobalt">{a.breeze}</span>
              </li>
            ))}
          </ul>
        </Sheet>

        {/* 08 선택지 — 대비가 아니라 용도 안내. 결정 직전에 이탈시키지 않도록 맨 뒤에 짧게 */}
        <Sheet no="06" code="CHOOSE YOURS" title={"WOD엔 브리즈.\n리프팅만 한다면?"}>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[compare.breeze, compare.lifting].map((m, i) => (
              <div key={m.name} className={cn("flex flex-col border p-3", i === 0 ? "border-cobalt" : "border-neutral-300")}>
                <Mono className={i === 0 ? "text-cobalt" : undefined}>{i === 0 ? "지금 보는 벨트" : "같은 OUTDO"}</Mono>
                <div className="mt-2 bg-white">
                  <Image src={m.image} alt={m.name} width={600} height={520} className="h-auto w-full" />
                </div>
                <p className="mt-3 font-black text-neutral-950">{m.name}</p>
                <p className="mt-1 flex-1 text-[13px] leading-relaxed text-neutral-600">{m.values[3]}</p>
                {i === 1 && (
                  <a href={compare.lifting.href} target="_blank" rel="noreferrer" className="mt-3 border border-neutral-400 py-2 text-center text-xs font-bold text-neutral-950">
                    보러가기 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Sheet>

        {/* 09 Q&A */}
        <Sheet no="07" code="Q&A" title="자주 묻는 질문">
          <div className="mt-8">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-neutral-300">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-bold text-neutral-950">
                  <span>
                    <span className="mr-2 font-mono text-cobalt">Q</span>
                    {item.q}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 pl-6 text-sm leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Sheet>
      </div>
    </div>
  );
}
