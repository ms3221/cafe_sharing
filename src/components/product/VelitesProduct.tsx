"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Plus, Star, Truck, X } from "lucide-react";
import {
  accordions,
  ambassadors,
  banner,
  colors,
  compareModels,
  delivery,
  faq,
  features,
  oneLine,
  product,
  related,
  reviewList,
  reviewPhotos,
  reviewSummary,
  shipping,
  sizes,
  tilesFor,
  type BeltColor,
  type Tile,
} from "@/data/samples/velites-product";
import { ProductCard } from "@/components/home/VelitesHome";
import { cn } from "@/lib/utils";
import { Spin360 } from "./Spin360";

// Velites 상품 페이지 구조를 브리즈 벨트에 옮긴 안 (시안 2)
// 사진 그리드 + 고정 구매 패널 → 접는 메뉴 → 특징 카드 → 배너 → 벨트 비교 → 리뷰 → 함께 보면 좋은 상품 → FAQ
// 구매 버튼이 화면 밖으로 나가면 아래에 고정 구매 바

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function StandIn({ text, className }: { text: string; className?: string }) {
  return <span className={cn("absolute z-10 rounded-sm bg-[#fff3b0] px-1.5 py-0.5 text-[11px] font-bold text-amber-950", className)}>대체 · {text}</span>;
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex", className)} aria-label={`별점 ${value}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn("h-4 w-4", n <= Math.round(value) ? "fill-current" : "text-neutral-300")} />
      ))}
    </span>
  );
}

function TileView({ tile, priority }: { tile: Tile; priority?: boolean }) {
  if (tile.spin) return <Spin360 src={tile.src} alt={tile.alt} frames={tile.spin} hintClassName="bottom-4" />;
  return (
    <Image
      src={tile.src}
      alt={tile.alt}
      fill
      priority={priority}
      sizes="(min-width: 768px) 30vw, 100vw"
      className={tile.fit === "contain" ? "object-contain p-8 mix-blend-multiply" : "object-cover"}
    />
  );
}

function Gallery({ tiles }: { tiles: Tile[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div data-note="top">
      {/* 모바일: 옆으로 넘기는 사진 */}
      <div className="relative md:hidden">
        <div onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto">
          {tiles.map((t, i) => (
            <div key={`${i}-${t.src}`} className={cn("relative aspect-square w-full shrink-0 snap-center", t.spin ? "bg-white" : "bg-[#f2f2f2]")}>
              <TileView tile={t} priority={i === 0} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {tiles.map((t, i) => (
            <span key={`${i}-${t.src}`} className={cn("h-1 rounded-full transition-all", i === index ? "w-5 bg-neutral-950" : "w-1.5 bg-neutral-400")} />
          ))}
        </div>
      </div>
      {/* PC: 2열 그리드 */}
      <div className="hidden grid-cols-2 gap-3 md:grid">
        {tiles.map((t, i) => (
          // 360 칸은 입체 회전 때문에 흰 바탕을 회색에 녹일 수 없어 바탕을 흰색으로
          <div key={`${i}-${t.src}`} className={cn("relative aspect-square overflow-hidden rounded-lg", t.spin ? "bg-white ring-1 ring-neutral-200" : "bg-[#f2f2f2]")}>
            <TileView tile={t} priority={i < 2} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 바탕색과 로고색을 반씩 담은 컬러 스와치 (옵션명과 실제 바탕색이 달라서)
function Swatch({ color, active, onClick }: { color: BeltColor; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={color.name}
      aria-pressed={active}
      className={cn("grid h-10 w-10 place-items-center rounded-full", active ? "ring-2 ring-neutral-950 ring-offset-2" : "ring-1 ring-neutral-300 hover:ring-neutral-950")}
    >
      <span className="h-8 w-8 rounded-full" style={{ background: `linear-gradient(135deg, ${color.base} 50%, ${color.logo} 50%)` }} />
    </button>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 md:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 md:max-w-[560px] md:rounded-2xl md:p-8">
        <button onClick={onClose} aria-label="닫기" className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-neutral-100">
          <X className="h-4 w-4" />
        </button>
        <p className="text-[20px] font-bold">{title}</p>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function SimpleTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full text-left text-[14px]">
      <thead>
        <tr className="border-b border-neutral-950">
          {head.map((h) => (
            <th key={h} className="py-2 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join()} className="border-b border-neutral-200">
            {row.map((cell, i) => (
              <td key={i} className="py-2.5 text-neutral-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-neutral-200">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <Plus className="h-5 w-5 transition-transform group-open:rotate-45" />
      </summary>
      <div className="space-y-3 pb-6 text-[16px] leading-relaxed text-neutral-700">{children}</div>
    </details>
  );
}

function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <>
      <div className="flex items-end justify-between px-5 md:px-0">
        <h2 className="text-[26px] font-bold tracking-tight md:text-[32px]">{label}</h2>
        <div className="hidden gap-2 md:flex">
          <button onClick={() => scroll(-1)} aria-label="이전" className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 hover:border-neutral-950">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="다음" className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 hover:border-neutral-950">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={rail} className="scrollbar-hide mt-6 flex snap-x scroll-px-5 gap-4 overflow-x-auto px-5 md:scroll-px-0 md:px-0">
        {children}
      </div>
    </>
  );
}

export function VelitesProduct() {
  const [color, setColor] = useState<BeltColor>(colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [stickyBar, setStickyBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const tiles = tilesFor(color);

  // 구매 버튼이 화면 위로 지나가면 아래 고정 구매 바
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const submit = (action: string) => {
    if (!size) {
      setSizeError(true);
      buyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setAdded(`${color.name} · ${size} ${action} (시안이라 실제 주문되지 않아요)`);
  };

  return (
    <main className="bg-white break-keep text-neutral-950">
      <div className="mx-auto max-w-[1280px] md:grid md:grid-cols-[minmax(0,1fr)_400px] md:gap-x-12 md:px-10 md:pt-10 lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* 모바일은 상품명이 사진 위 */}
        <div className="px-5 pt-5 pb-4 md:hidden">
          <a href="#reviews" className="flex items-center gap-2 text-[13px]">
            <Stars value={reviewSummary.average} /> 리뷰 {reviewSummary.total}
          </a>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="text-[22px] font-bold">{product.name}</h1>
            <p className="text-[18px] font-medium">{won(product.price)}</p>
          </div>
          <p className="mt-1 text-[15px] text-neutral-600">{oneLine}</p>
        </div>

        <Gallery tiles={tiles} />

        {/* 고정 구매 패널 */}
        <aside className="px-5 pt-6 md:col-start-2 md:row-span-2 md:row-start-1 md:px-0 md:pt-0">
          <div className="md:sticky md:top-6">
            <div className="hidden md:block">
              <a href="#reviews" className="flex items-center gap-2 text-[13px]">
                <Stars value={reviewSummary.average} /> 리뷰 {reviewSummary.total}
              </a>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h1 className="text-[28px] leading-tight font-bold">{product.name}</h1>
                <p className="pt-1 text-[20px] font-medium">{won(product.price)}</p>
              </div>
              <p className="mt-2 text-[16px] text-neutral-600">{oneLine}</p>
            </div>

            <div data-note="buy" className="md:mt-8">
              <p className="text-[15px]">
                컬러: <span className="font-medium">{color.name}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {colors.map((c) => (
                  <Swatch key={c.name} color={c} active={c.name === color.name} onClick={() => setColor(c)} />
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between">
                <p className={cn("text-[15px]", sizeError && "text-[#d43f21]")}>
                  사이즈: <span className="font-medium">{size ?? "선택해 주세요"}</span>
                </p>
                <button onClick={() => setSizeGuide(true)} className="text-[14px] text-neutral-600 underline underline-offset-4 hover:text-neutral-950">
                  사이즈 가이드
                </button>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      setSize(s.size);
                      setSizeError(false);
                    }}
                    aria-pressed={size === s.size}
                    className={cn(
                      "rounded-full border py-2.5 text-center transition-colors",
                      size === s.size ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-300 hover:border-neutral-950",
                      sizeError && size !== s.size && "border-[#d43f21]",
                    )}
                  >
                    <span className="block text-[15px] font-medium">{s.size}</span>
                    <span className={cn("block text-[11px]", size === s.size ? "text-white/70" : "text-neutral-500")}>{s.cm}cm</span>
                  </button>
                ))}
              </div>
              {sizeError && <p className="mt-2 text-[14px] text-[#d43f21]">사이즈를 선택해 주세요.</p>}

              <div ref={buyRef} className="mt-7 space-y-2">
                <button onClick={() => submit("구매하기")} className="h-14 w-full rounded-full bg-neutral-950 text-[16px] font-medium text-white hover:bg-neutral-700">
                  구매하기 · {won(product.price)}
                </button>
                <button onClick={() => submit("장바구니에 담았어요")} className="h-14 w-full rounded-full border border-neutral-300 text-[16px] font-medium hover:border-neutral-950">
                  장바구니
                </button>
              </div>
              {added && <p className="mt-3 rounded-lg bg-[#f2f2f2] px-4 py-3 text-[14px]">{added}</p>}

              {/* 배송 상자 */}
              <div className="mt-5 space-y-2 rounded-lg border border-neutral-200 p-4 text-[14px]">
                {delivery.map((d, i) => (
                  <p key={d} className="flex items-center gap-2">
                    {i === 0 ? <Truck className="h-4 w-4 shrink-0" /> : <Check className="h-4 w-4 shrink-0" />}
                    {d}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* 접는 메뉴 — PC는 사진 아래, 모바일은 구매 패널 아래 */}
        <div data-note="accordion" className="mt-8 px-5 md:col-start-1 md:mt-10 md:px-0">
          <div className="border-t border-neutral-200">
            {accordions.map((a) => (
              <Fold key={a.title} title={a.title}>
                {a.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Fold>
            ))}
            <Fold title="배송 및 반품">
              <p className="font-medium text-neutral-950">{shipping.fee}</p>
              <ul className="list-disc space-y-1 pl-5">
                {shipping.basic.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="pt-2 font-medium text-neutral-950">취소 · 교환 · 반품</p>
              <ul className="list-disc space-y-1 pl-5">
                {[...shipping.returns, ...shipping.limits].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Fold>
          </div>
        </div>
      </div>

      {/* 특징 카드 */}
      <section data-note="features" className="mx-auto mt-20 max-w-[1280px] md:mt-28 md:px-10">
        <Rail label="특징">
          {features.map((f) => (
            <article key={f.title} className="w-[78%] shrink-0 snap-start sm:w-[45%] md:w-[calc((100%-32px)/3)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                <Image src={f.image} alt={f.title} fill sizes="(min-width: 768px) 33vw, 78vw" className="object-cover" />
              </div>
              <h3 className="mt-4 text-[18px] font-bold">{f.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-neutral-700">{f.body}</p>
            </article>
          ))}
        </Rail>
      </section>

      {/* 배너 — Velites는 제품 영상 자리 */}
      <section data-note="banner" className="mx-auto mt-20 max-w-[1280px] md:mt-28 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-[21/9] md:rounded-lg">
          <Image src={banner.image} alt="" fill sizes="(min-width: 768px) 1200px, 100vw" className="object-cover opacity-80" />
          <StandIn text="브리즈 벨트 착용 영상이 생기면 이 자리를 영상으로" className="top-3 left-3" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-12">
            <p className="text-[15px] text-white/80">{banner.sub}</p>
            <p className="mt-2 text-[30px] leading-tight font-black md:text-[48px]">{banner.headline}</p>
            <a href="#compare" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-neutral-950">
              리프팅 벨트와 비교 <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 벨트 비교 */}
      <section id="compare" data-note="compare" className="mx-auto mt-20 max-w-[960px] scroll-mt-6 px-5 md:mt-28">
        <h2 className="text-[26px] font-bold tracking-tight md:text-[32px]">벨트 비교</h2>
        <div className="mt-6 overflow-hidden rounded-xl bg-[#f6f6f6]">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr>
                <th className="w-[26%] p-4 md:w-[30%]" />
                {compareModels.models.map((m) => (
                  <th key={m.name} className="p-3 text-center align-bottom font-normal md:p-5">
                    <div className="relative mx-auto aspect-[6/5] w-full max-w-[200px]">
                      <Image src={m.image} alt={m.name} fill sizes="200px" className="object-contain mix-blend-multiply" />
                    </div>
                    <p className="mt-3 text-[15px] font-bold md:text-[17px]">{m.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[14px] md:text-[15px]">
              {compareModels.rows.map((row, i) => (
                <tr key={row} className="border-t border-neutral-200">
                  <th className="p-4 font-medium">{row}</th>
                  {compareModels.models.map((m) => (
                    <td key={m.name} className="p-3 text-center text-neutral-700 md:p-5">
                      {m.values[i]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-neutral-200">
                <th className="p-4 font-medium">가격</th>
                {compareModels.models.map((m) => (
                  <td key={m.name} className="p-3 text-center md:p-5">
                    <p className="text-[16px] font-bold">{won(m.price)}</p>
                    {m.current ? (
                      <span className="mt-3 inline-block rounded-full border border-neutral-950 px-4 py-2 text-[13px] font-medium">보고 있는 상품</span>
                    ) : (
                      <a href={m.href} className="mt-3 inline-block rounded-full bg-neutral-950 px-4 py-2 text-[13px] font-medium text-white hover:bg-neutral-700">
                        보러 가기
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 리뷰 */}
      <section id="reviews" data-note="reviews" className="mx-auto mt-20 max-w-[960px] scroll-mt-6 px-5 md:mt-28">
        <h2 className="text-[26px] font-bold tracking-tight md:text-[32px]">리뷰</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-[44px] leading-none font-bold">{reviewSummary.average.toFixed(1)}</span>
              <span className="pb-1 text-[15px] text-neutral-500">/ 5 · {reviewSummary.total}건</span>
            </div>
            <Stars value={reviewSummary.average} className="mt-2" />
            <ul className="mt-5 space-y-1.5 text-[13px]">
              {reviewSummary.distribution.map((d) => (
                <li key={d.score} className="flex items-center gap-2">
                  <span className="w-8">{d.score}점</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
                    <span className="block h-full bg-neutral-950" style={{ width: `${d.ratio * 100}%` }} />
                  </span>
                  <span className="w-9 text-right text-neutral-500">{Math.round(d.ratio * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <div className="scrollbar-hide flex gap-2 overflow-x-auto">
              {reviewPhotos.map((src) => (
                <div key={src} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={src} alt="포토 후기" fill sizes="96px" className="object-cover" />
                </div>
              ))}
            </div>
            <ul className="mt-6 divide-y divide-neutral-200">
              {reviewList.map((r) => (
                <li key={r.content} className="py-5">
                  <Stars value={r.rating} />
                  <p className="mt-2 line-clamp-4 text-[16px] leading-relaxed">{r.content}</p>
                  {r.author && (
                    <p className="mt-1 text-[13px] text-neutral-500">
                      {r.author} · {r.date?.slice(0, 10)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <a href="#" className="mt-2 inline-block text-[15px] font-medium underline underline-offset-4">
              리뷰 더 보기
            </a>
          </div>
        </div>
      </section>

      {/* 함께 보면 좋은 상품 */}
      <section data-note="related" className="mx-auto mt-20 max-w-[1280px] md:mt-28 md:px-10">
        <Rail label="함께 보면 좋은 상품">
          {related.map((p) => (
            <div key={p.idx} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[calc((100%-48px)/4)] [&>a]:w-full">
              <ProductCard product={p} />
            </div>
          ))}
        </Rail>
      </section>

      {/* FAQ 2단 */}
      <section data-note="faq" className="mx-auto mt-20 max-w-[1280px] px-5 pb-28 md:mt-28 md:px-10">
        <h2 className="text-[26px] font-bold tracking-tight md:text-[32px]">자주 묻는 질문</h2>
        <div className="mt-6 grid gap-x-12 md:grid-cols-2">
          {[faq.slice(0, Math.ceil(faq.length / 2)), faq.slice(Math.ceil(faq.length / 2))].map((col, c) => (
            <div key={c} className={cn(c === 0 && "border-t border-neutral-200", c === 1 && "md:border-t md:border-neutral-200")}>
              {col.map((f) => (
                <details key={f.q} className="group border-b border-neutral-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-[16px] leading-relaxed text-neutral-700">{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 고정 구매 바 */}
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 md:inset-x-auto md:right-6 md:bottom-6 md:w-[420px]",
          stickyBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
        aria-hidden={!stickyBar}
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f2f2f2]">
          <Image src={color.image} alt="" fill sizes="48px" className="object-contain p-1 mix-blend-multiply" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium">
            {product.name} · {color.name}
          </p>
          <p className="text-[13px] text-neutral-600">{won(product.price)}</p>
        </div>
        <button onClick={() => submit("구매하기")} tabIndex={stickyBar ? 0 : -1} className="rounded-full bg-neutral-950 px-5 py-3 text-[14px] font-medium text-white hover:bg-neutral-700">
          구매하기
        </button>
      </div>

      {sizeGuide && (
        <Modal title="사이즈 가이드" onClose={() => setSizeGuide(false)}>
          <p className="text-[14px] text-neutral-600">{faq[3].a}</p>
          <div className="mt-4">
            <SimpleTable head={["사이즈", "허리(cm)", "허리(inch)"]} rows={sizes.map((s) => [s.size, s.cm, s.inch])} />
          </div>
          <p className="mt-6 text-[15px] font-medium">엠버서더 착용 사이즈</p>
          <div className="mt-2">
            <SimpleTable
              head={["", "키", "체중", "허리", "착용"]}
              rows={ambassadors.map((a) => [`${a.name} (${a.gender === "F" ? "여" : "남"})`, `${a.height}cm`, a.weight, a.waist, a.breeze])}
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
