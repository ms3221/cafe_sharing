import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ambassadors, colors, compare, faq, photos, reviewPhotos, sizes, versus, weight } from "@/data/samples/breeze-renewal";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

// 나이키 스킴스 컬렉션 페이지 구조를 브리즈 벨트 상세에 옮긴 안
// 사진이 주인공, 글은 작고 조용하게. 출처가 제각각인 사진은 흑백으로 통일하고 벨트 컬러컷만 컬러로 남긴다
// 문장은 새로 쓰지 않는다: 기존 상세 원본 문구 · 실제 구매평 · 숫자와 이름만 쓴다

const CROP = "/assets/breeze-belt/crops";

type Tile = { src: string; mono?: boolean; stage?: string };
const byName = (name: string) => colors.find((c) => c.name === name)!;

const grid: Tile[] = [
  { src: photos.athleteWod, mono: true },
  { src: byName("핑크").image, stage: byName("핑크").stage },
  { src: photos.squatBack, mono: true },
  { src: photos.heroPlate, mono: true },
  { src: photos.holdBelt, mono: true },
  { src: byName("오렌지").image, stage: byName("오렌지").stage },
  { src: photos.deadlift, mono: true },
  { src: reviewPhotos[2], mono: true },
  { src: `${CROP}/lifter-blur.jpg`, mono: true },
  { src: byName("블루").image, stage: byName("블루").stage },
  { src: photos.beltDark, mono: true },
  { src: reviewPhotos[4], mono: true },
];

// 컬러별 대표컷. 핑크 착용컷은 아직 없어 제품컷으로 둔다
const colorLooks: Record<string, string | undefined> = {
  오렌지: photos.holdBelt,
  블루: photos.athleteWod,
  핑크: undefined,
};

// 기존 상세 POINT 1 · DETAIL 01~03 문구
const materialGuide = [
  { name: "프리미엄 벨크로 락", desc: "풀업, 점프, 하이풀에서도 벨트가 흔들리지 않도록 유지하는 강력한 고정력", src: photos.velcro },
  { name: "슬림 핏 두께", desc: "내 몸에 딱 맞는 핏과 가동성을 보장하는 단일 압축 라인 설계", src: photos.slim },
  { name: "독보적인 디자인", desc: "고급스러우면서도 힙한 느낌의 로고 디자인", src: photos.patchHand },
  { name: "고밀도 내구성", desc: "폼과 텍스타일 결합구조, 장기간 형태 변형 없이 사용", src: photos.logoPatch },
];

// 실제 구매평 문장
const movements = [
  { name: "WOD", desc: "와드 할 때 너무 편해요", src: photos.athleteWod },
  { name: "SQUAT", desc: "숨을 들이마셨을 때 복압이 꽉 차는 느낌이 확실하게 듭니다", src: photos.squatBack },
  { name: "DEADLIFT", desc: "고중량 데드리프트를 할 때도 단단하게 유지돼서 믿고 운동 가능합니다", src: photos.deadlift },
];

function Heading({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-[15px] font-medium text-neutral-900", className)}>{children}</h2>;
}

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div className="scrollbar-hide -mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-1.5 overflow-x-auto px-5 md:mx-0 md:scroll-px-0 md:px-0">
      {children}
    </div>
  );
}

function Pill({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "rounded-full px-4 py-1.5 text-[13px] font-medium",
        dark ? "bg-neutral-950 text-white" : "bg-white text-neutral-950",
      )}
    >
      {children}
    </a>
  );
}

export function SkimsDetail() {
  return (
    <div className="bg-[#ececec] text-neutral-900">
      {/* 01 착장 그리드 — 첫 화면을 사람으로 채운다 */}
      <section data-note="grid">
        <div className="grid grid-cols-3 gap-px md:grid-cols-6">
          {grid.map((tile, i) => (
            <div key={i} className="relative aspect-[3/4] overflow-hidden" style={{ background: tile.stage ?? "#d9d9d9" }}>
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="(min-width: 768px) 17vw, 33vw"
                className={cn(tile.stage ? "object-contain p-3 mix-blend-multiply" : "object-cover", tile.mono && "grayscale contrast-[1.1]")}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 02 카피 — 짧고 조용하게 */}
      <section data-note="copy" className="px-5 py-14 text-center md:py-20">
        <p className="text-xs font-medium text-neutral-500">OUTDO</p>
        <p className="mt-2 text-[34px] leading-tight font-black tracking-tight md:text-[44px]">BREEZE BELT</p>
        <p className="mt-3 text-[14px] text-neutral-600">238g · 6.9mm · 3 colors</p>
        <div className="mt-6 flex justify-center gap-2">
          <Pill href="#by-color" dark>
            컬러 보기
          </Pill>
          <Pill href="#size">사이즈 가이드</Pill>
        </div>
      </section>

      {/* 03 피처 카드 2개 */}
      <section data-note="feature" className="grid gap-px md:grid-cols-2">
        {[
          { src: photos.deadlift, eyebrow: "IN ACTION", title: "움직임은 가볍게, 리프팅은 강하게", href: "#movement" },
          { src: photos.holdBelt, eyebrow: "3 COLORS", title: "오렌지 · 블루 · 핑크", href: "#by-color" },
        ].map((card) => (
          <a key={card.title} href={card.href} className="relative block aspect-[4/5] overflow-hidden md:aspect-square">
            <Image src={card.src} alt={card.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            {/* 원본 사진 하단에 로고가 박혀 있어 문구는 위쪽에 둔다 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-5 text-white">
              <p className="text-xs font-medium opacity-80">{card.eyebrow}</p>
              <p className="mt-1 text-xl font-bold">{card.title}</p>
              <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-neutral-950">보기</span>
            </div>
          </a>
        ))}
      </section>

      <div className="mx-auto max-w-[1120px] px-5">
        {/* 04 Shop by Color */}
        <section id="by-color" data-note="by-color" className="scroll-mt-16 pt-16">
          <Heading>Shop by Color</Heading>
          <Rail>
            {colors.map((c) => {
              const look = colorLooks[c.name];
              return (
                <figure key={c.name} className="w-[72%] shrink-0 snap-start md:w-[32%]">
                  <div className="relative aspect-[3/4] overflow-hidden" style={{ background: c.stage }}>
                    {!look && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-white/80 px-2.5 py-1 text-[11px] text-neutral-600">착용컷 촬영 예정</span>
                    )}
                    {look ? (
                      <Image src={look} alt={`${c.name} 착용`} fill sizes="(min-width: 768px) 33vw, 72vw" className="object-cover" />
                    ) : (
                      <Image src={c.image} alt={c.name} fill sizes="72vw" className="object-contain p-6 mix-blend-multiply" />
                    )}
                    {look && (
                      <div className="absolute right-3 bottom-3 w-[44%] bg-white p-1.5 shadow-lg">
                        <Image src={c.image} alt="" width={1000} height={480} className="h-auto w-full" />
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-2 flex items-center gap-2 text-[13px] font-medium">
                    <span className="h-3 w-3 rounded-full" style={{ background: `linear-gradient(${c.base} 60%, ${c.logo} 60%)` }} />
                    {c.name}
                    <span className="text-neutral-400">{c.en}</span>
                  </figcaption>
                </figure>
              );
            })}
          </Rail>
        </section>

        {/* 05 소재 가이드 (나이키스킴스 컬렉션 가이드) */}
        <section data-note="material" className="pt-16">
          <Heading>소재 가이드</Heading>
          <Rail>
            {materialGuide.map((m) => (
              <figure key={m.name} className="w-[72%] shrink-0 snap-start md:w-[24%]">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={m.src} alt={m.name} fill sizes="(min-width: 768px) 25vw, 72vw" className="object-cover" />
                </div>
                <figcaption className="mt-3">
                  <p className="text-[13px] font-bold">{m.name}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{m.desc}</p>
                </figcaption>
              </figure>
            ))}
          </Rail>
        </section>
      </div>

      {/* 06 360° — 촬영 전이라 자리와 촬영 사양만 표시 */}
      <div className="mx-auto max-w-[1120px] px-5">
        <section data-note="spin" className="pt-16">
          <Heading>360° View</Heading>
          <div className="mt-4 flex aspect-square flex-col items-center justify-center bg-[#e0e0e0] px-8 text-center md:aspect-[16/9]">
            <RotateCw className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
            <p className="mt-4 text-[15px] font-bold text-neutral-700">드래그로 돌려 보는 360° 뷰</p>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
              턴테이블 회전 촬영 24~36컷 × 3컬러
              <br />위 · 아래 정지컷 별도
            </p>
            <p className="mt-4 rounded-full border border-neutral-400 px-3 py-1 text-[11px] text-neutral-500">촬영 후 들어갈 자리</p>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-[1120px] px-5">
        {/* 07 Shop by Movement */}
        <section id="movement" data-note="movement" className="scroll-mt-16 pt-16">
          <Heading>Shop by Movement</Heading>
          <Rail>
            {movements.map((m) => (
              <figure key={m.name} className="w-[72%] shrink-0 snap-start md:w-[32%]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={m.src} alt={m.name} fill sizes="(min-width: 768px) 33vw, 72vw" className="object-cover" />
                </div>
                <figcaption className="mt-2">
                  <p className="text-[13px] font-bold">{m.name}</p>
                  <p className="mt-0.5 text-[13px] text-neutral-600">“{m.desc}”</p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">구매평</p>
                </figcaption>
              </figure>
            ))}
          </Rail>
        </section>

      </div>

      {/* 08 타사 대비 — 밝은 페이지에서 유일한 검정 풀폭 블록, 스크롤이 여기서 멈추게 */}
      <section data-note="versus" className="mt-20 bg-neutral-950 text-white">
        <div className="mx-auto max-w-[1120px] px-5 py-16 md:py-24">
          <p className="text-[13px] font-bold tracking-widest text-neutral-400">VS 타사 벨트</p>
          <p className="mt-3 text-[96px] leading-[0.9] font-black tracking-tighter md:text-[160px]">
            −143<span className="text-[40px] md:text-[64px]">g</span>
          </p>
          <p className="mt-4 text-xl font-bold md:text-2xl">
            타사 벨트보다 <span className="bg-white px-1.5 text-neutral-950">{Math.round(((weight.other - weight.breeze) / weight.other) * 100)}% 가볍게</span>
          </p>

          <div className="mt-12 space-y-3">
            {[
              { label: "타사 벨트", value: weight.other, bar: "bg-neutral-700 text-neutral-300" },
              { label: "브리즈 벨트", value: weight.breeze, bar: "bg-white text-neutral-950" },
            ].map((row) => (
              <div key={row.label} className="flex h-14 items-center bg-neutral-900">
                <div
                  className={cn("flex h-full items-center justify-between px-4 text-[15px] font-bold", row.bar)}
                  style={{ width: `${(row.value / weight.other) * 100}%` }}
                >
                  <span>{row.label}</span>
                  <span className="font-black">{row.value}g</span>
                </div>
              </div>
            ))}
          </div>

          <table className="mt-12 w-full text-left text-[14px]">
            <thead>
              <tr className="border-b border-neutral-700 text-xs text-neutral-400">
                <th className="w-[22%] py-3 font-medium" />
                <th className="py-3 font-medium">타사 벨트</th>
                <th className="py-3 font-bold text-white">브리즈 벨트</th>
              </tr>
            </thead>
            <tbody>
              {versus.map((row) => (
                <tr key={row.label} className="border-b border-neutral-800">
                  <th className="py-4 text-xs font-medium text-neutral-400">{row.label}</th>
                  <td className="py-4 text-neutral-500">{row.other}</td>
                  <td className="py-4 text-[16px] font-black">{row.breeze}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-[11px] text-neutral-500">* {weight.note} 타사 무게는 현재 상세 기준, 나머지는 일반 가죽 리프팅 벨트 기준입니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1120px] px-5">
        {/* 09 사이즈 — 엠버서더 핏 */}
        <section id="size" data-note="size" className="scroll-mt-16 pt-16">
          <Heading>사이즈 가이드</Heading>
          <table className="mt-4 w-full bg-white text-center text-[13px]">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500">
                <th className="py-3 font-medium">사이즈</th>
                <th className="py-3 font-medium">허리 실측(cm)</th>
                <th className="py-3 font-medium">인치</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((s) => (
                <tr key={s.size} className="border-b border-neutral-100 last:border-0">
                  <td className="py-3 font-bold">{s.size}</td>
                  <td className="py-3">{s.cm}</td>
                  <td className="py-3 text-neutral-500">{s.inch}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-1.5 grid grid-cols-2 gap-1.5 md:grid-cols-4">
            {ambassadors.map((a) => (
              <li key={a.name} className="bg-white p-4">
                <p className="text-[13px] font-bold">{a.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {a.height}cm · {a.weight}
                </p>
                <p className="mt-3 text-xs text-neutral-500">
                  브리즈 <b className="text-lg text-neutral-950">{a.breeze}</b>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* 10 선택지 */}
        <section data-note="choose" className="pt-16">
          <Heading>OUTDO 리프팅 벨트</Heading>
          <a
            href={compare.lifting.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 grid grid-cols-[120px_1fr] items-center gap-4 bg-white p-3"
          >
            <Image src={compare.lifting.image} alt={compare.lifting.name} width={600} height={520} className="h-auto w-full" />
            <span>
              <span className="block text-[13px] font-bold">{compare.lifting.name}</span>
              <span className="mt-1 block text-[13px] text-neutral-600">{compare.lifting.values[3]}</span>
              <span className="mt-2 block text-[13px] font-medium underline underline-offset-2">보러가기</span>
            </span>
          </a>
        </section>

        {/* 11 FAQ */}
        <section data-note="faq" className="pt-16 pb-20">
          <Heading>자주 묻는 질문</Heading>
          <div className="mt-4 bg-white px-5">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-neutral-100 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[14px] font-medium">
                  {item.q}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-[13px] leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
