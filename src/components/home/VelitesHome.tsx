"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  announcements,
  categoryTiles,
  colorHex,
  heroSlides,
  movementTabs,
  PARTNER_SLOTS,
  partners,
  shelfTabs,
  statement,
  stories,
  suff,
  STORY_PHOTO_RATIO,
  suffVideo,
  tailored,
  type Story,
} from "@/data/samples/outdo-home-2";
import { shopUrl, type Product } from "@/data/samples/outdo-home";
import { cn } from "@/lib/utils";

// Velites 홈 구조를 OUTDO 홈에 옮긴 안 (시안 2)
// 공지 띠 → 히어로 → 파트너 로고 → 제품 탭 → 카테고리 타일 → 종목 탭 → 브랜드 선언 → TAILORED SERVICE → SUFF 영상 → 알림
// 밝은 바탕 + 연회색 제품 카드. 누끼의 흰 바탕은 mix-blend-multiply로 카드 색에 녹인다

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function StandIn({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("absolute z-10 max-w-[calc(100%-16px)] truncate rounded-sm bg-[#fff3b0] px-1.5 py-0.5 text-[11px] font-bold text-amber-950", className)} title={`대체 · ${text}`}>
      대체 · {text}
    </span>
  );
}

function Tabs({ names, active, onChange }: { names: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div role="tablist" className="scrollbar-hide flex gap-2 overflow-x-auto">
      {names.map((name, i) => (
        <button
          key={name}
          role="tab"
          aria-selected={i === active}
          onClick={() => onChange(i)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors",
            i === active ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

// 시안 2 상세 '함께 보면 좋은 상품'도 같은 카드
export function ProductCard({ product }: { product: Product }) {
  return (
    <a href={shopUrl(product.idx)} className="group block w-[62%] shrink-0 snap-start sm:w-[38%] md:w-auto">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#f2f2f2]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 22vw, 62vw"
          className="object-contain p-6 mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-[16px] font-medium">{product.name}</p>
      <p className="mt-0.5 text-[15px] text-neutral-600">
        {product.sale ? (
          <>
            <span className="mr-1 font-bold text-[#e3283f]">{product.sale.rate}%</span>
            {won(product.sale.price)}
          </>
        ) : (
          won(product.price)
        )}
      </p>
      {product.colors.length > 0 && (
        <p className="mt-2 flex items-center gap-1.5" aria-label={`컬러 ${product.colors.join(", ")}`}>
          {product.colors.slice(0, 5).map((c) => (
            <span key={c} className="h-3.5 w-3.5 rounded-full ring-1 ring-black/15" style={{ background: colorHex[c] ?? "#ccc" }} title={c} />
          ))}
          {product.colors.length > 5 && <span className="text-[12px] text-neutral-500">+{product.colors.length - 5}</span>}
        </p>
      )}
    </a>
  );
}

// 모바일은 옆으로 넘기고, PC는 4열 그리드
function Shelf({ items }: { items: Product[] }) {
  return (
    <div className="scrollbar-hide -mx-5 mt-6 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
      {items.map((p) => (
        <ProductCard key={p.idx} product={p} />
      ))}
    </div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [index]);
  const go = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length);

  return (
    <section data-note="hero" className="relative overflow-hidden" aria-roledescription="carousel">
      <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {heroSlides.map((s, i) => (
          <div
            key={s.name}
            aria-hidden={i !== index}
            className="grid w-full shrink-0 items-center lg:min-h-[620px] lg:grid-cols-2"
            style={{ background: s.stage }}
          >
            <div className="order-2 px-5 pt-6 pb-16 md:px-10 lg:order-1 lg:px-16 lg:py-20">
              <p className="text-[15px] font-medium text-neutral-700">{s.sub}</p>
              {/* 페이지 제목은 첫 슬라이드 하나만 */}
              {(() => {
                const Heading = i === 0 ? "h1" : "h2";
                return <Heading className="mt-3 text-[34px] leading-[1.15] font-black tracking-tight md:text-[44px] lg:text-[56px]">{s.headline}</Heading>;
              })()}
              <a href={s.href} tabIndex={i === index ? 0 : -1} className="mt-8 inline-block rounded-full bg-neutral-950 px-7 py-3.5 text-[15px] font-medium text-white hover:bg-neutral-700">
                {s.cta}
              </a>
            </div>
            <div className="relative order-1 aspect-[4/3] md:aspect-[16/9] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-[620px]">
              <Image src={s.image} alt={s.name} fill priority={i === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-8 mix-blend-multiply md:p-12 lg:p-16" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-5 bottom-5 flex items-center gap-2 md:right-16 md:bottom-10">
        <button onClick={() => go(index - 1)} aria-label="이전 슬라이드" className="grid h-10 w-10 place-items-center rounded-full bg-white/80 hover:bg-white">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => go(index + 1)} aria-label="다음 슬라이드" className="grid h-10 w-10 place-items-center rounded-full bg-white/80 hover:bg-white">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-7 left-5 flex gap-1.5 md:left-16 md:bottom-12">
        {heroSlides.map((s, i) => (
          <button key={s.name} onClick={() => go(i)} aria-label={`${i + 1}번째 슬라이드`} className={cn("h-1 rounded-full transition-all", i === index ? "w-8 bg-neutral-950" : "w-4 bg-neutral-950/30")} />
        ))}
      </div>
    </section>
  );
}

function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  // 같은 줄을 두 번 이어 붙여 끊김 없이 흐르게
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="flex w-[82%] shrink-0 snap-start flex-col sm:w-[46%] md:w-auto">
      {/* 카드 이미지 한 장에 글자까지 들어 있어 위쪽 사진 부분만 보이게 */}
      <div className="relative overflow-hidden rounded-lg bg-neutral-200" style={{ aspectRatio: STORY_PHOTO_RATIO }}>
        <Image src={story.photo.src} alt={story.title} fill sizes="(min-width: 768px) 33vw, 82vw" className="object-cover object-top" />
        {story.photo.standIn && <StandIn text={story.photo.standIn} className="top-2 left-2" />}
      </div>
      <p className="mt-4 text-[13px] font-medium text-neutral-500">{story.label}</p>
      <h3 className="mt-1 text-[22px] font-black tracking-tight">{story.title}</h3>
      <p className="mt-2 text-[16px] leading-relaxed text-neutral-700">{story.body}</p>
      {story.note && <p className="mt-2 text-[13px] text-neutral-500">{story.note}</p>}
      {/* 글 길이가 달라도 버튼은 카드 맨 아래 한 줄에 */}
      <div className="mt-auto pt-5">
        <a href={story.href} className="inline-flex items-center gap-2 rounded-full border border-neutral-950 px-5 py-2.5 text-[14px] font-medium hover:bg-neutral-950 hover:text-white">
          WATCH <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function VelitesHome() {
  const [shelf, setShelf] = useState(0);
  const [move, setMove] = useState(0);

  return (
    // break-keep: 한글 단어가 줄 끝에서 '최/고의'처럼 잘리지 않게
    <div className="bg-white break-keep text-neutral-950">
      {/* 공지 띠 — 현재 배송 안내 문구 */}
      <div data-note="announce" className="bg-neutral-950 py-2.5 text-[13px] font-medium text-white">
        <Marquee>
          {[...announcements, ...announcements].map((t, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8">{t}</span>
              <span className="opacity-40">●</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Hero />

      {/* 파트너 로고 띠 — 로고 이미지를 받기 전까지 이름 · 빈 자리 */}
      <section data-note="partners" className="relative border-b border-neutral-200 py-6" aria-label="파트너">
        <Marquee>
          {[...partners.map((p) => p.name), ...Array.from({ length: PARTNER_SLOTS - partners.length }, () => "")].map((name, i) => (
            <span key={i} className="flex h-10 w-40 items-center justify-center px-6">
              {name ? (
                <span className="text-[22px] font-black tracking-widest text-neutral-800">{name}</span>
              ) : (
                <span className="h-8 w-28 rounded bg-neutral-100" />
              )}
            </span>
          ))}
        </Marquee>
        <StandIn text="파트너 박스 로고 자리 (ABOUT PARTNER BOX 이미지 필요)" className="top-1 left-5" />
      </section>

      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        {/* 제품 탭 */}
        <section data-note="shelf" className="pt-16 md:pt-24">
          <h2 className="text-[28px] font-black tracking-tight md:text-[40px]">OUTDO 장비</h2>
          <div className="mt-5">
            <Tabs names={shelfTabs.map((t) => t.name)} active={shelf} onChange={setShelf} />
          </div>
          <Shelf items={shelfTabs[shelf].items} />
        </section>

        {/* 카테고리 타일 */}
        <section data-note="categories" className="pt-20 md:pt-28">
          <h2 className="text-[28px] font-black tracking-tight md:text-[40px]">카테고리</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {categoryTiles.map((c) => (
              <a key={c.name} href="https://www.outdothebest.com/shop" className="group relative block aspect-[3/4] overflow-hidden rounded-lg" style={{ background: c.stage }}>
                <Image src={c.image} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain p-8 pb-20 mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
                  <div>
                    <p className="text-[22px] font-black md:text-[26px]">{c.name}</p>
                    <p className="text-[14px] text-neutral-700">{c.count}개 제품</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white transition-colors group-hover:bg-neutral-950 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 종목 탭 */}
        <section id="movement" data-note="movement" className="scroll-mt-4 pt-20 md:pt-28">
          <h2 className="text-[28px] font-black tracking-tight md:text-[40px]">종목별 장비</h2>
          <div className="mt-5">
            <Tabs names={movementTabs.map((t) => t.name)} active={move} onChange={setMove} />
          </div>
          <p className="mt-3 text-[15px] text-neutral-600">{movementTabs[move].ko}</p>
          <Shelf items={movementTabs[move].items} />
        </section>
      </div>

      {/* 브랜드 선언 — 현재 홈 문구 */}
      <section data-note="statement" className="mt-24 bg-neutral-100 md:mt-32">
        <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
          <p className="text-[44px] leading-none font-black tracking-tight md:text-[88px]">{statement.title}</p>
          <p className="mt-6 max-w-[760px] text-[22px] leading-snug font-bold text-neutral-800 md:text-[32px]">{statement.body}</p>
        </div>
      </section>

      {/* 스토리 카드 — 제품 이야기 + TAILORED SERVICE */}
      <section data-note="stories" className="mx-auto max-w-[1280px] pt-20 md:px-10 md:pt-28">
        <div className="px-5 md:px-0">
          <h2 className="text-[28px] font-black tracking-tight md:text-[40px]">{tailored.title}</h2>
          <p className="mt-2 text-[16px] text-neutral-700">{tailored.sub}</p>
        </div>
        <div className="scrollbar-hide mt-8 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {stories.map((s) => (
            <StoryCard key={s.title} story={s} />
          ))}
        </div>
        <a href={tailored.href} className="mx-5 mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-[15px] font-medium text-white hover:bg-neutral-700 md:mx-0">
          TAILORED SERVICE 문의 <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      {/* SUFF 영상 — 현재 홈 유튜브 배경 영상, 포스터는 아임웹 CDN 주소 그대로 */}
      <section id="partner" data-note="campaign" className="relative mt-20 overflow-hidden md:mt-28">
        <div className="relative aspect-[4/5] bg-cover bg-center md:aspect-[21/9]" style={{ backgroundImage: `url('${suffVideo.poster}')`, containerType: "size" }}>
          <iframe
            src={`https://www.youtube.com/embed/${suffVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${suffVideo.youtubeId}&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
            title={suffVideo.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{ width: "max(100cqw, 177.78cqh)", height: "max(100cqh, 56.25cqw)" }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-16">
            <p className="text-[14px] font-bold">{suff.label}</p>
            <p className="mt-2 max-w-[720px] text-[24px] leading-tight font-black md:text-[36px] lg:text-[44px]">{suff.title}</p>
            <a href={shopUrl(suff.product.idx)} className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-[15px] font-medium text-neutral-950 hover:bg-neutral-200">
              {suff.product.name} 보기
            </a>
          </div>
        </div>
      </section>

      {/* 알림 받기 */}
      <section data-note="signup" className="mx-auto max-w-[1280px] px-5 py-20 md:flex md:items-end md:justify-between md:px-10 md:py-28">
        <p className="text-[28px] leading-tight font-black tracking-tight md:text-[40px]">
          OUTDO 업데이트를
          <br />
          가장 먼저 만나 보세요.
        </p>
        <div className="mt-6 flex gap-2 md:mt-0">
          <a href="#" className="rounded-full bg-neutral-950 px-6 py-3 text-[15px] font-medium text-white hover:bg-neutral-700">
            카카오 채널 추가
          </a>
          <a href="#" className="rounded-full border border-neutral-300 px-6 py-3 text-[15px] font-medium hover:border-neutral-950">
            인스타그램
          </a>
        </div>
      </section>

    </div>
  );
}
