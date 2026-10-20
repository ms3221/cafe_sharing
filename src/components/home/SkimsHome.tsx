import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  best,
  categories,
  copy,
  features,
  guides,
  heroGrid,
  movements,
  products,
  shopColors,
  shopUrl,
  sitePhotos,
  type Photo,
  type Product,
} from "@/data/samples/outdo-home";
import { cn } from "@/lib/utils";

// 나이키 스킴스 홈 구조를 OUTDO 홈에 옮긴 안
// 그리드 → 한 줄 소개 → 신제품 카드 → BEST → 컬러 → 가이드 → 카테고리 → 종목 → 파트너 → 박스 문의 → 알림
// 사진이 없는 자리는 무료 사진으로 채우고 노란 '대체 사진' 표시를 단다 (실제 사이트에는 들어가지 않음)

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function Shot({ photo, sizes, className, alt = "", badgeTop = false, compact = false }: { photo: Photo; sizes: string; className?: string; alt?: string; badgeTop?: boolean; compact?: boolean }) {
  return (
    <>
      <Image src={photo.src} alt={alt} fill sizes={sizes} className={cn("object-cover", className)} />
      {photo.standIn && (
        <span className={cn("absolute left-1.5 z-10", badgeTop ? "top-1.5" : "bottom-1.5", "max-w-[calc(100%-12px)] truncate rounded-sm bg-[#fff3b0] px-1.5 py-0.5 text-[10px] leading-tight font-bold text-amber-950 shadow")} title={`대체 사진 · ${photo.standIn}`}>
          대체 사진<span className={cn(compact && "hidden md:inline")}> · {photo.standIn}</span>
        </span>
      )}
    </>
  );
}

function Heading({ children, more }: { children: React.ReactNode; more?: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-[17px] font-bold tracking-tight text-neutral-950 md:text-xl">{children}</h2>
      {more && (
        <a href={more} className="text-[13px] text-neutral-500 underline underline-offset-2">
          전체 보기
        </a>
      )}
    </div>
  );
}

function Pill({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap",
        dark ? "bg-neutral-950 text-white" : "border border-neutral-300 bg-white text-neutral-950",
      )}
    >
      {children}
    </a>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a href={shopUrl(product.idx)} className="group block">
      <div className="relative aspect-square overflow-hidden bg-white ring-1 ring-neutral-100">
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
        {product.hover && (
          <Image
            src={product.hover}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <p className="mt-2 text-[14px] font-medium">{product.name}</p>
      {product.colors.length > 0 && <p className="text-[12px] text-neutral-500">{product.colors.length}가지 컬러</p>}
      <p className="mt-1 text-[14px] font-bold">
        {product.sale ? (
          <>
            <span className="mr-1 text-[#e3283f]">{product.sale.rate}%</span>
            {won(product.sale.price)}
            <span className="ml-1 text-[12px] font-normal text-neutral-400 line-through">{won(product.price)}</span>
          </>
        ) : (
          won(product.price)
        )}
      </p>
    </a>
  );
}

export function SkimsHome() {
  return (
    <div className="bg-white text-neutral-950">
      {/* 서브 메뉴 — 스킴스 '전체 구매하기 · 컬렉션 가이드 · 룩북' 자리 */}
      <nav className="scrollbar-hide sticky top-0 z-30 flex gap-5 overflow-x-auto border-b border-neutral-200 bg-white px-5 py-3 text-[13px] font-medium md:justify-center">
        {[
          ["전체 구매하기", "https://www.outdothebest.com/shop"],
          ["컬러별", "#color"],
          ["그립 가이드", "#guide"],
          ["종목별", "#movement"],
          ["SUFF", "#partner"],
        ].map(([text, href]) => (
          <a key={text} href={href} className="whitespace-nowrap">
            {text}
          </a>
        ))}
      </nav>

      {/* 01 선수 그리드 */}
      <section data-note="grid" className="grid grid-cols-3 gap-px bg-white md:grid-cols-6">
        {heroGrid.map((photo, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
            <Shot photo={photo} sizes="(min-width: 768px) 17vw, 33vw" compact />
          </div>
        ))}
      </section>

      {/* 02 한 줄 소개 — 원본 문구 */}
      <section data-note="intro" className="px-5 py-14 text-center md:py-20">
        <p className="text-[34px] leading-none font-black tracking-tight md:text-[52px]">{copy.slogan}</p>
        <p className="mx-auto mt-5 max-w-[340px] text-[14px] leading-relaxed text-neutral-600 md:max-w-[460px]">{copy.brand}</p>
        <div className="mt-7 flex justify-center gap-2">
          <Pill href="https://www.outdothebest.com/shop" dark>
            전체 구매하기
          </Pill>
          <Pill href="#movement">종목별 보기</Pill>
        </div>
      </section>

      {/* 03 신제품 카드 */}
      <section data-note="feature" className="grid gap-1.5 px-0 md:grid-cols-2 md:px-5">
        {features.map((card) => (
          <a key={card.title} href={card.href} className="relative block aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-square">
            <Shot photo={card.photo} alt={card.title} sizes="(min-width: 768px) 50vw, 100vw" badgeTop />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 text-white md:p-8">
              <p className="text-[12px] font-bold tracking-widest">{card.eyebrow}</p>
              <p className="mt-1 text-2xl font-black">{card.title}</p>
              <p className="mt-0.5 text-[13px] text-white/80">{card.sub}</p>
              <span className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-neutral-950">{card.cta}</span>
            </div>
          </a>
        ))}
      </section>

      <div className="mx-auto max-w-[1200px] px-5">
        {/* 04 BEST */}
        <section data-note="best" className="pt-16">
          <Heading more="https://www.outdothebest.com/shop">BEST</Heading>
          <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4">
            {best.map((p) => (
              <ProductCard key={p.idx} product={p} />
            ))}
          </div>
        </section>

        {/* 05 Shop by Color */}
        <section id="color" data-note="color" className="scroll-mt-14 pt-16">
          <Heading>Shop by Color</Heading>
          <div className="mt-4 grid grid-cols-3 gap-1.5 md:grid-cols-6">
            {shopColors.map((c) => (
              <a key={c.name} href="https://www.outdothebest.com/shop" className="block">
                <div className="relative aspect-square overflow-hidden bg-white ring-1 ring-neutral-100">
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 768px) 17vw, 33vw" className="object-contain" />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium">
                  <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: c.chip }} />
                  {c.name}
                </p>
                <p className="text-[12px] text-neutral-500">{c.count}개 제품</p>
              </a>
            ))}
          </div>
        </section>

        {/* 06 그립 · 니슬리브 가이드 — 스킴스 컬렉션 가이드 자리 */}
        <section id="guide" data-note="guide" className="scroll-mt-14 pt-16">
          <Heading>OUTDO 기어 가이드</Heading>
          <div className="mt-4 grid gap-8 md:grid-cols-2">
            {guides.map((g) => (
              <div key={g.title}>
                <p className="border-b border-neutral-950 pb-2 text-[13px] font-bold">{g.title}</p>
                <ul>
                  {g.items.map((p) => (
                    <li key={p.idx}>
                      <a href={shopUrl(p.idx)} className="flex items-center gap-3 border-b border-neutral-200 py-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#f5f5f5]">
                          <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-bold">{p.name}</p>
                          <p className="mt-0.5 truncate text-[12px] text-neutral-500">
                            {p.sizes} · {p.colors.join(", ")}
                          </p>
                          {p.reviews && <p className="text-[12px] text-neutral-500">구매평 {p.reviews}개</p>}
                        </div>
                        <p className="shrink-0 text-[13px] font-bold">{won(p.price)}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 07 Shop by Category */}
        <section data-note="category" className="pt-16">
          <Heading>Shop by Category</Heading>
          <div className="mt-4 grid grid-cols-4 gap-x-1.5 gap-y-4 md:grid-cols-7">
            {categories.map((c) => (
              <a key={c.name} href="https://www.outdothebest.com/shop" className="block">
                <div className="relative aspect-square overflow-hidden bg-white ring-1 ring-neutral-100">
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 768px) 14vw, 30vw" className="object-cover" />
                </div>
                <p className="mt-2 text-[13px] font-medium">{c.name}</p>
                <p className="text-[12px] text-neutral-500">{c.items.length}개</p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* 08 Shop by Movement */}
      <section id="movement" data-note="movement" className="scroll-mt-14 pt-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <Heading>Shop by Movement</Heading>
        </div>
        <div className="mx-auto mt-4 grid max-w-[1200px] gap-10 md:grid-cols-3 md:gap-2 md:px-5">
          {movements.map((m) => (
            <div key={m.name}>
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 md:aspect-[4/5]">
                <Shot photo={m.photo} alt={m.name} sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="absolute inset-x-0 top-0 p-5 text-white">
                  <p className="text-2xl font-black tracking-tight drop-shadow">{m.name}</p>
                  <p className="text-[13px] text-white/85 drop-shadow">{m.ko}</p>
                </div>
              </div>
              <ul className="mx-5 mt-1 md:mx-0">
                {m.items.map((p) => (
                  <li key={p.idx}>
                    <a href={shopUrl(p.idx)} className="flex items-center gap-3 border-b border-neutral-200 py-2">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[#f5f5f5]">
                        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <p className="flex-1 text-[13px] font-medium">{p.name}</p>
                      <p className="text-[13px] text-neutral-600">{won(p.sale?.price ?? p.price)}</p>
                      <ArrowRight className="h-4 w-4 text-neutral-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 09 SUFF 파트너 — 원본 문구 */}
      <section id="partner" data-note="partner" className="relative mt-20 scroll-mt-14 overflow-hidden">
        <div className="relative aspect-square md:aspect-[21/9]">
          <Image src={sitePhotos.suff} alt="SUFF" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
            <p className="text-[12px] font-bold tracking-widest">OFFICIAL PARTNER</p>
            <p className="mt-3 max-w-[320px] text-[22px] leading-snug font-black md:max-w-none md:text-3xl">{copy.suff}</p>
            <a href={shopUrl(products.suff.idx)} className="mt-6 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-neutral-950">
              {products.suff.name} 보기
            </a>
          </div>
        </div>
      </section>

      {/* 10 박스 문의 (B2B) — 원본 문구, 위치만 아래로 */}
      <section data-note="box" className="mx-auto grid max-w-[1200px] items-center gap-6 px-5 pt-16 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
          <Image src={sitePhotos.box} alt="TAILORED SERVICE" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[12px] font-bold tracking-widest text-neutral-500">TAILORED SERVICE · 박스 운영자</p>
          <p className="mt-2 text-2xl font-black">{copy.boxTitle}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{copy.boxSub}</p>
          <div className="mt-5">
            <Pill href="https://www.outdothebest.com/TAILOREDSERVICE" dark>
              문의하기
            </Pill>
          </div>
        </div>
      </section>

      {/* 11 알림 받기 */}
      <section data-note="signup" className="px-5 py-20 text-center">
        <p className="text-[22px] leading-snug font-black md:text-3xl">
          OUTDO 업데이트를
          <br />
          가장 먼저 만나 보세요.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Pill href="#" dark>
            카카오 채널 추가
          </Pill>
          <Pill href="#">인스타그램</Pill>
        </div>
      </section>
    </div>
  );
}

