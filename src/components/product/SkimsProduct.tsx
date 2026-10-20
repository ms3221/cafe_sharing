"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { ambassadors, compare, faq, sizes, type BeltColor } from "@/data/samples/breeze-renewal";
import { photoReviews, product, reviewSummary, reviews } from "@/data/samples/breeze-belt";
import { shopUrl } from "@/data/samples/outdo-home";
import {
  benefits,
  colors,
  description,
  facts,
  galleryFor,
  notice,
  related,
  shipping,
  specs,
  subtitle,
  type Shot,
} from "@/data/samples/skims-product";
import { cn } from "@/lib/utils";

// 나이키 스킴스 상품 페이지 구조를 브리즈 벨트에 옮긴 안
// 갤러리 + 구매 영역 → 짧은 설명 → 상세 정보 팝업 → 접는 메뉴(사이즈 · 배송 · 리뷰 · FAQ · 추가 정보) → 추천 상품
// 접는 메뉴는 <details>로 만든다: 아임웹 상세 HTML에도 그대로 옮길 수 있는 방식

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function Photo({ shot, sizes, priority }: { shot: Shot; sizes: string; priority?: boolean }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={shot.fit === "contain" ? "object-contain p-6" : "object-cover"}
    />
  );
}

function Title({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="text-[20px] font-medium md:text-[24px]">{product.name}</h1>
      <p className="text-[15px] text-neutral-500">{subtitle}</p>
      <p className="mt-3 text-[16px] font-medium">{won(product.price)}</p>
    </div>
  );
}

function Gallery({ shots, index, onIndex }: { shots: Shot[]; index: number; onIndex: (i: number) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const go = (i: number) => onIndex((i + shots.length) % shots.length);

  // 모바일 레일: 컬러를 바꾸면(index가 0으로) 첫 장으로 되감기
  useEffect(() => {
    const el = rail.current;
    if (el && Math.round(el.scrollLeft / el.clientWidth) !== index) el.scrollTo({ left: index * el.clientWidth });
  }, [index]);

  return (
    <div>
      {/* 모바일: 옆으로 넘기는 사진 + 점 */}
      <div className="relative md:hidden">
        <div
          ref={rail}
          onScroll={(e) => onIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
        >
          {shots.map((shot, i) => (
            <div key={shot.src} className="relative aspect-square w-full shrink-0 snap-center bg-[#f5f5f5]">
              <Photo shot={shot} sizes="100vw" priority={i === 0} />
            </div>
          ))}
        </div>
        <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium shadow-sm">
          <Star className="h-3.5 w-3.5 fill-current" /> 평점 {reviewSummary.average.toFixed(1)}
        </span>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {shots.map((shot, i) => (
            <span key={shot.src} className={cn("h-[3px] rounded-full transition-all", i === index ? "w-4 bg-neutral-950" : "w-1.5 bg-neutral-400")} />
          ))}
        </div>
      </div>

      {/* PC: 세로 썸네일 + 큰 사진 */}
      <div className="hidden gap-4 md:flex">
        <div className="scrollbar-hide flex max-h-[660px] w-[60px] shrink-0 flex-col gap-2 overflow-y-auto">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              onMouseEnter={() => onIndex(i)}
              onClick={() => onIndex(i)}
              aria-label={`${i + 1}번째 사진`}
              className="relative aspect-square w-[60px] shrink-0 overflow-hidden rounded bg-[#f5f5f5]"
            >
              <Image src={shot.src} alt="" fill sizes="60px" className={shot.fit === "contain" ? "object-contain p-1" : "object-cover"} />
              {i === index && <span className="absolute inset-0 bg-black/20" />}
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded bg-[#f5f5f5]">
          <Photo shot={shots[index]} sizes="(min-width: 768px) 40vw, 100vw" priority />
          <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium">
            <Star className="h-3.5 w-3.5 fill-current" /> 평점 {reviewSummary.average.toFixed(1)}
          </span>
          <div className="absolute right-6 bottom-6 flex gap-2">
            <button onClick={() => go(index - 1)} aria-label="이전 사진" className="grid h-9 w-9 place-items-center rounded-full bg-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(index + 1)} aria-label="다음 사진" className="grid h-9 w-9 place-items-center rounded-full bg-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fold({ title, aside, note, open, id, children }: { title: string; aside?: React.ReactNode; note: string; open?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <details id={id} data-note={note} open={open} className="group scroll-mt-4 border-t border-neutral-200">
      <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-[18px] font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <span className="flex items-center gap-3">
          {aside}
          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="pb-8 text-[15px] leading-relaxed">{children}</div>
    </details>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={cn("h-4 w-4", n <= Math.round(value) ? "fill-current" : "text-neutral-300")} />
      ))}
    </span>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
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

function DetailModal({ color, onClose }: { color: BeltColor; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 md:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="상품 상세 정보"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white px-6 pt-6 pb-10 md:max-w-[720px] md:rounded-3xl md:px-12 md:pt-10"
      >
        <button onClick={onClose} aria-label="닫기" className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-neutral-100">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 rounded bg-[#f5f5f5]">
            <Image src={color.image} alt="" fill sizes="64px" className="object-contain p-1" />
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-[14px] text-neutral-500">{won(product.price)}</p>
          </div>
        </div>

        <h3 className="mt-10 text-[18px] font-medium">특징</h3>
        <ul className="mt-4 grid gap-6 md:grid-cols-2">
          {benefits.map((b) => (
            <li key={b.title}>
              <div className="relative aspect-[3/2] overflow-hidden rounded bg-[#f5f5f5]">
                <Image src={b.image} alt={b.title} fill sizes="(min-width: 768px) 300px, 90vw" className="object-cover" />
              </div>
              <p className="mt-3 font-medium">{b.title}</p>
              <p className="mt-1 text-[14px] text-neutral-600">{b.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-[18px] font-medium">제품 사양</h3>
        <dl className="mt-3 text-[14px]">
          {specs.map(([k, v]) => (
            <div key={k} className="flex border-b border-neutral-200 py-2.5">
              <dt className="w-24 shrink-0 text-neutral-500">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-10 text-[18px] font-medium">리프팅 벨트와 비교</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[compare.breeze, compare.lifting].map((b) => (
            <div key={b.name} className="rounded bg-[#f5f5f5] p-4">
              <div className="relative aspect-[6/5]">
                <Image src={b.image} alt={b.name} fill sizes="(min-width: 768px) 300px, 45vw" className="object-contain" />
              </div>
              <p className="mt-3 font-medium">{b.name}</p>
              <dl className="mt-2 space-y-1.5 text-[13px]">
                {compare.rows.map((row, i) => (
                  <div key={row}>
                    <dt className="text-neutral-500">{row}</dt>
                    <dd>{b.values[i]}</dd>
                  </div>
                ))}
              </dl>
              {b === compare.lifting && (
                <a href={compare.lifting.href} className="mt-3 inline-block text-[13px] font-medium underline underline-offset-4">
                  리프팅 벨트 보기
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedRail() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section data-note="related" className="mx-auto mt-16 max-w-[1440px] pb-20 md:mt-24 md:px-12">
      <div className="flex items-center justify-between px-5 md:px-0">
        <h2 className="text-[20px] font-medium md:text-[24px]">함께 보면 좋은 상품</h2>
        <div className="hidden gap-2 md:flex">
          <button onClick={() => scroll(-1)} aria-label="이전" className="grid h-11 w-11 place-items-center rounded-full bg-neutral-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="다음" className="grid h-11 w-11 place-items-center rounded-full bg-neutral-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={rail} className="scrollbar-hide mt-5 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 md:scroll-px-0 md:px-0">
        {related.map((p) => (
          <a key={p.idx} href={shopUrl(p.idx)} className="w-[62%] shrink-0 snap-start md:w-[calc((100%-36px)/4)]">
            <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 25vw, 62vw" className="object-cover" />
            </div>
            <p className="mt-3 text-[15px] font-medium">{p.name}</p>
            {p.colors.length > 0 && <p className="text-[14px] text-neutral-500">{p.colors.length}가지 컬러</p>}
            <p className="mt-1 text-[15px] font-medium">{won(p.sale?.price ?? p.price)}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SkimsProduct() {
  const [color, setColor] = useState<BeltColor>(colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const shots = galleryFor(color);
  const closeModal = useCallback(() => setModal(false), []);

  const pickColor = (c: BeltColor) => {
    setColor(c);
    setIndex(0);
  };

  const submit = (action: string) => {
    if (!size) return setSizeError(true);
    setAdded(`${color.name} · ${size} ${action} (시안이라 실제 주문되지 않아요)`);
  };

  const openSizeGuide = () => {
    const el = document.getElementById("size-tip") as HTMLDetailsElement | null;
    if (!el) return;
    el.open = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-white text-neutral-950">
      <div className="mx-auto max-w-[1100px] md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 md:px-8 md:pt-12">
        <Title className="px-5 pt-6 pb-4 md:hidden" />

        <div data-note="top" className="md:sticky md:top-6 md:self-start">
          <Gallery shots={shots} index={Math.min(index, shots.length - 1)} onIndex={setIndex} />
        </div>

        <div className="px-5 md:px-0">
          <Title className="hidden md:block" />

          {/* 컬러 칩 */}
          <div data-note="color" className="scrollbar-hide -mx-5 mt-2 flex gap-2 overflow-x-auto px-5 md:mx-0 md:mt-8 md:px-0">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => pickColor(c)}
                aria-label={c.name}
                aria-pressed={c.name === color.name}
                className={cn(
                  "relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded bg-[#f5f5f5] md:h-[70px] md:w-[70px]",
                  c.name === color.name ? "ring-[1.5px] ring-neutral-950" : "hover:ring-1 hover:ring-neutral-400",
                )}
              >
                <Image src={c.image} alt="" fill sizes="82px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>

          {/* 사이즈 */}
          <div data-note="size" className="mt-8">
            <div className="flex items-center justify-between">
              <p className={cn("font-medium", sizeError && "text-[#d43f21]")}>사이즈 선택</p>
              <button onClick={openSizeGuide} className="text-[15px] text-neutral-500 hover:text-neutral-950">
                사이즈 가이드
              </button>
            </div>
            <div className={cn("mt-3 grid grid-cols-2 gap-2 rounded", sizeError && "ring-1 ring-[#d43f21] ring-offset-4")}>
              {sizes.map((s) => (
                <button
                  key={s.size}
                  onClick={() => {
                    setSize(s.size);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s.size}
                  className={cn(
                    "rounded border py-3 text-center transition-colors",
                    size === s.size ? "border-neutral-950" : "border-neutral-200 hover:border-neutral-950",
                  )}
                >
                  <span className="block text-[16px]">{s.size}</span>
                  <span className="block text-[12px] text-neutral-500">허리 {s.cm}cm</span>
                </button>
              ))}
            </div>
            {sizeError && <p className="mt-3 text-[14px] text-[#d43f21]">사이즈를 선택해 주세요.</p>}
          </div>

          {/* 구매 버튼 */}
          <div className="mt-8 space-y-3">
            <button onClick={() => submit("구매하기")} className="h-[60px] w-full rounded-full bg-neutral-950 font-medium text-white hover:bg-neutral-700">
              구매하기
            </button>
            <button
              onClick={() => submit("장바구니에 담았어요")}
              className="h-[60px] w-full rounded-full border border-neutral-300 font-medium hover:border-neutral-950"
            >
              장바구니
            </button>
            {added && <p className="rounded bg-[#f5f5f5] px-4 py-3 text-[14px]">{added}</p>}
            <p className="text-center text-[13px] text-neutral-500">{shipping.fee}</p>
          </div>

          {/* 설명 */}
          <div data-note="desc" className="mt-10">
            <p className="text-[16px] leading-[1.75]">{description}</p>
            <ul className="mt-5 list-disc space-y-1 pl-5 text-[16px]">
              {facts(color).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button data-note="more" onClick={() => setModal(true)} className="mt-6 font-medium underline underline-offset-[6px]">
              상품 상세 정보 보기
            </button>
          </div>

          {/* 접는 메뉴 */}
          <div className="mt-12 border-b border-neutral-200">
            <Fold id="size-tip" note="size-tip" title="사이즈 & 팁">
              <ul className="list-disc space-y-1 pl-5">
                <li>{faq[3].a}</li>
                <li>벨트 폭 10cm · 두께 6.9mm. 허리 실측 기준입니다.</li>
              </ul>
              <div className="mt-6">
                <Table head={["사이즈", "허리(cm)", "허리(inch)"]} rows={sizes.map((s) => [s.size, s.cm, s.inch])} />
              </div>
              <p className="mt-8 font-medium">엠버서더 착용 사이즈</p>
              <div className="mt-2">
                <Table
                  head={["", "키", "체중", "허리", "착용"]}
                  rows={ambassadors.map((a) => [`${a.name} (${a.gender === "F" ? "여" : "남"})`, `${a.height}cm`, a.weight, a.waist, a.breeze])}
                />
              </div>
            </Fold>

            <Fold note="shipping" title="배송 및 반품">
              <p className="font-medium">{shipping.fee}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                {shipping.basic.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-6 font-medium">취소 · 교환 · 반품</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                {shipping.returns.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-6 font-medium">교환 및 반품이 제한되는 경우</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                {shipping.limits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Fold>

            <Fold
              note="review"
              title={`리뷰 (${reviewSummary.total})`}
              aside={<Stars value={reviewSummary.average} />}
            >
              <div className="flex items-center gap-3">
                <span className="text-[28px] font-medium">{reviewSummary.average.toFixed(1)}</span>
                <Stars value={reviewSummary.average} />
              </div>
              <div className="scrollbar-hide -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
                {photoReviews.map((r) => (
                  <div key={r.image} className="relative h-24 w-24 shrink-0 overflow-hidden rounded bg-[#f5f5f5]">
                    <Image src={r.image!} alt="포토 후기" fill sizes="96px" className="object-cover" />
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-6">
                {[photoReviews[1], photoReviews[4], ...reviews.slice(0, 3)].map((r) => (
                  <li key={r.content}>
                    <Stars value={r.rating} />
                    <p className="mt-2 line-clamp-4 text-neutral-800">{r.content}</p>
                    {r.author && (
                      <p className="mt-1 text-[13px] text-neutral-500">
                        {r.author} · {r.date?.slice(0, 10)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-6 inline-block font-medium underline underline-offset-[6px]">
                리뷰 더 보기
              </a>
            </Fold>

            <Fold note="faq" title="자주 묻는 질문">
              <dl className="space-y-5">
                {faq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-medium">Q. {f.q}</dt>
                    <dd className="mt-1 text-neutral-700">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Fold>

            <Fold note="info" title="추가 정보">
              <p className="font-medium">상품정보제공고시</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
                {notice.map(([k, v]) => (
                  <li key={k}>
                    {k}: {v}
                  </li>
                ))}
              </ul>
            </Fold>
          </div>
        </div>
      </div>

      <RelatedRail />
      {modal && <DetailModal color={color} onClose={closeModal} />}
    </main>
  );
}
