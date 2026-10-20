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
  suffVideo,
  type Photo,
  type Product,
} from "@/data/samples/outdo-home";
import { cn } from "@/lib/utils";

// 나이키 스킴스 홈 구조를 OUTDO 홈에 옮긴 안
// 그리드 → 한 줄 소개 → SUFF 영상 → 신제품 카드 → BEST → 컬러 → 가이드 → 카테고리 → 종목 → 박스 문의 → 알림
// 사진이 없는 자리는 무료 사진으로 채우고 노란 '대체 사진' 표시를 단다 (실제 사이트에는 들어가지 않음)
// 스킴스처럼 페이지 전체를 한 바탕색(OUTDO 헤더 · 푸터 남색)으로, 버튼은 흰색 한 가지. 가격은 BEST에만

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
      <h2 className="text-[17px] font-bold tracking-tight text-white md:text-xl">{children}</h2>
      {more && (
        <a href={more} className="text-[13px] text-white/70 underline underline-offset-2">
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
        dark ? "bg-white text-shop-navy" : "border border-white/40 text-white",
      )}
    >
      {children}
    </a>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <a href={shopUrl(product.idx)} className="group block">
      <div className="relative aspect-square overflow-hidden bg-white">
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
      {product.colors.length > 0 && <p className="text-[13px] text-white/65">{product.colors.length}가지 컬러</p>}
      <p className="mt-1 text-[16px] font-bold">
        {product.sale ? (
          <>
            <span className="mr-1 text-[#ff6b7d]">{product.sale.rate}%</span>
            {won(product.sale.price)}
            <span className="ml-1 text-[13px] font-normal text-white/55 line-through">{won(product.price)}</span>
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
    // break-keep: 한글 단어가 줄 끝에서 '크로/스핏'처럼 잘리지 않게
    <div className="bg-shop-navy break-keep text-white">
      {/* 서브 메뉴 — 스킴스 '전체 구매하기 · 컬렉션 가이드 · 룩북' 자리 */}
      <nav className="scrollbar-hide sticky top-0 z-30 flex gap-5 overflow-x-auto border-b border-white/10 bg-shop-navy px-5 py-3 text-[13px] font-medium md:justify-center">
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
      <section data-note="grid" className="grid grid-cols-3 gap-px bg-shop-navy md:grid-cols-6">
        {heroGrid.map((photo, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
            <Shot photo={photo} sizes="(min-width: 768px) 17vw, 33vw" compact />
          </div>
        ))}
      </section>

      {/* 02 한 줄 소개 — 원본 문구 */}
      <section data-note="intro" className="px-5 py-14 text-center md:py-20">
        <p className="text-[34px] leading-none font-black tracking-tight md:text-[52px]">{copy.slogan}</p>
        <p className="mx-auto mt-5 max-w-[340px] text-[16px] leading-relaxed text-white/80 md:max-w-[520px]">{copy.brand}</p>
        <div className="mt-7 flex justify-center gap-2">
          <Pill href="https://www.outdothebest.com/shop" dark>
            전체 구매하기
          </Pill>
          <Pill href="#movement">종목별 보기</Pill>
        </div>
      </section>

      {/* SUFF 영상 — 현재 홈의 유튜브 배경 영상 그대로, 스킴스 홈 중간 영상 자리 */}
      <section id="partner" data-note="partner" className="relative mb-1.5 scroll-mt-14 overflow-hidden">
        {/* 영상이 뜨기 전 · 재생이 막혔을 때 보이는 사진 (아임웹 CDN 주소 그대로) */}
        <div
          className="relative aspect-[4/5] bg-cover bg-center md:aspect-[21/9]"
          style={{ backgroundImage: `url('${suffVideo.poster}')`, containerType: "size" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${suffVideo.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${suffVideo.youtubeId}&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
            title={suffVideo.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            // 16:9 영상을 칸에 꽉 차게 (넘치는 부분은 잘림)
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{ width: "max(100cqw, 177.78cqh)", height: "max(100cqh, 56.25cqw)" }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
            <p className="text-[12px] font-bold tracking-widest">OFFICIAL PARTNER</p>
            <p className="mt-3 max-w-[320px] text-[22px] leading-snug font-black md:max-w-none md:text-3xl">{copy.suff}</p>
            <a href={shopUrl(products.suff.idx)} className="mt-6 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-shop-navy">
              {products.suff.name} 보기
            </a>
          </div>
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
              <span className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-shop-navy">{card.cta}</span>
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
          {/* 칸 전체를 그 색으로. 착용컷 촬영 후 사진으로 교체할 자리 */}
          <div className="mt-4 grid grid-cols-2 gap-1.5 md:grid-cols-3 lg:grid-cols-6">
            {shopColors.map((c) => (
              <a key={c.name} href="https://www.outdothebest.com/shop" className="flex aspect-[3/4] flex-col p-4" style={{ background: c.chip, color: c.ink }}>
                <p className="text-xl font-black">{c.name}</p>
                <p className="text-[13px] font-medium">{c.count}개 제품</p>
                <div className="relative mt-auto aspect-square w-full overflow-hidden bg-white">
                  <Image src={c.image} alt={`${c.name} 상품`} fill sizes="(min-width: 1024px) 15vw, (min-width: 768px) 30vw, 45vw" className="object-contain" />
                </div>
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
                <p className="border-b border-white/60 pb-2 text-[14px] font-bold">{g.title}</p>
                <ul>
                  {g.items.map((p) => (
                    <li key={p.idx}>
                      <a href={shopUrl(p.idx)} className="flex items-center gap-3 border-b border-white/15 py-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-white">
                          <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[16px] font-bold">{p.name}</p>
                          <p className="mt-0.5 truncate text-[13px] text-white/65">
                            {p.sizes} · {p.colors.join(", ")}
                          </p>
                          {p.reviews && <p className="text-[13px] text-white/65">구매평 {p.reviews}개</p>}
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white/50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 07 Shop by Category — 착용 · 사용 사진 카드를 옆으로 넘겨 보기 */}
        <section data-note="category" className="pt-16">
          <Heading>Shop by Category</Heading>
        </section>
      </div>
      <div className="scrollbar-hide mx-auto mt-4 flex max-w-[1200px] snap-x scroll-px-5 gap-1.5 overflow-x-auto px-5">
        {categories.map((c) => (
          <a key={c.name} href="https://www.outdothebest.com/shop" className="block w-[68%] shrink-0 snap-start md:w-[30%] lg:w-[23.5%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
              <Shot photo={c.photo} alt={c.name} sizes="(min-width: 1024px) 280px, 68vw" badgeTop />
            </div>
            <p className="mt-2 text-[16px] font-bold">{c.name}</p>
            <p className="text-[13px] text-white/65">{c.items.length}개 제품</p>
          </a>
        ))}
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
                    <a href={shopUrl(p.idx)} className="flex items-center gap-3 border-b border-white/15 py-2">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-white">
                        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <p className="flex-1 text-[16px] font-medium">{p.name}</p>
                      <ArrowRight className="h-4 w-4 text-white/50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 10 박스 문의 (B2B) — 원본 문구, 위치만 아래로 */}
      <section data-note="box" className="mx-auto mt-4 grid max-w-[1200px] items-center gap-6 px-5 pt-16 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
          <Image src={sitePhotos.box} alt="TAILORED SERVICE" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-[12px] font-bold tracking-widest text-white/60">TAILORED SERVICE · 박스 운영자</p>
          <p className="mt-2 text-2xl font-black">{copy.boxTitle}</p>
          <p className="mt-2 text-[16px] leading-relaxed text-white/80">{copy.boxSub}</p>
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

