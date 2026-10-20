"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Share2, ShoppingCart, X } from "lucide-react";
import { product } from "@/data/samples/breeze-belt";
import { formatWon } from "@/lib/utils";

interface Line {
  size: string;
  color: string;
  qty: number;
}

// 원본의 하단 고정 구매바 + 옵션 선택 패널(실제 결제 연동 없음)
export function BuyBar() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("");
  const [lines, setLines] = useState<Line[]>([]);

  const addLine = (color: string) => {
    if (!size) return;
    setLines((prev) =>
      prev.some((l) => l.size === size && l.color === color)
        ? prev
        : [...prev, { size, color, qty: 1 }],
    );
    setSize("");
  };

  const updateQty = (index: number, delta: number) =>
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, l.qty + delta) } : l)));

  const total = lines.reduce((sum, l) => sum + l.qty * product.price, 0);
  const shippingFee = total >= product.shipping.freeOver ? 0 : product.shipping.fee;

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />}

      <div className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-[0_-1px_6px_rgba(0,0,0,0.08)]">
        {open && (
          <div className="mx-auto max-h-[60vh] max-w-[720px] overflow-y-auto px-5 pt-4 pb-2">
            <button aria-label="닫기" onClick={() => setOpen(false)} className="ml-auto block">
              <X className="h-5 w-5 text-shop-sub" />
            </button>
            <label className="mt-2 block text-[12px] text-shop-ink">
              사이즈 (필수)
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="mt-1 w-full border border-neutral-300 px-3 py-2.5 text-[13px]"
              >
                <option value="">선택해주세요</option>
                {product.options.size.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="mt-3 block text-[12px] text-shop-ink">
              색상 (필수)
              <select
                value=""
                disabled={!size}
                onChange={(e) => addLine(e.target.value)}
                className="mt-1 w-full border border-neutral-300 px-3 py-2.5 text-[13px] disabled:bg-neutral-100"
              >
                <option value="">{size ? "선택해주세요" : "사이즈를 먼저 선택해주세요"}</option>
                {product.options.color.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>

            <ul className="mt-3 space-y-2">
              {lines.map((line, i) => (
                <li key={`${line.size}-${line.color}`} className="bg-[#f5f6f8] px-4 py-3 text-[12px] text-shop-ink">
                  <div className="flex justify-between">
                    <span>
                      {line.size} / {line.color}
                    </span>
                    <button aria-label="삭제" onClick={() => setLines(lines.filter((_, j) => j !== i))}>
                      <X className="h-4 w-4 text-shop-sub" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center border border-neutral-300 bg-white">
                      <button aria-label="수량 감소" className="p-1.5" onClick={() => updateQty(i, -1)}>
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center">{line.qty}</span>
                      <button aria-label="수량 증가" className="p-1.5" onClick={() => updateQty(i, 1)}>
                        <Plus className="h-3 w-3" />
                      </button>
                    </span>
                    <span>{formatWon(line.qty * product.price)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-end justify-between border-t border-shop-line pt-3 text-shop-ink">
              <span className="text-[12px]">
                총 상품금액
                {lines.length > 0 && (
                  <span className="ml-1 text-shop-sub">
                    (배송비 {shippingFee ? formatWon(shippingFee) : "무료"})
                  </span>
                )}
              </span>
              <span className="text-[20px] font-bold">{formatWon(total)}</span>
            </div>
            <p className="mt-1 text-right text-[11px] text-shop-sub">
              {formatWon(product.shipping.freeOver)} 이상 구매 시 무료배송
            </p>
          </div>
        )}

        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center md:h-16">
          <div className="hidden items-center gap-6 pl-3 text-shop-ink md:flex">
            <span className="flex items-center gap-1 text-[13px] font-bold">
              <Heart className="h-5 w-5" /> 0
            </span>
            <Share2 className="h-5 w-5" />
            <span className="flex items-center gap-1 text-[13px] font-bold">
              <ShoppingCart className="h-5 w-5" /> 장바구니
            </span>
          </div>
          <button aria-label="장바구니" className="mx-3 flex h-12 w-14 items-center justify-center border border-neutral-300 md:hidden">
            <ShoppingCart className="h-5 w-5 text-shop-ink" />
          </button>
          <span className="ml-auto mr-4 hidden items-baseline gap-2 md:flex">
            <span className="text-[14px] text-shop-sub">판매가</span>
            <span className="text-[19px] text-shop-ink">{formatWon(product.price)}</span>
          </span>
          <button className="flex h-12 flex-1 items-center justify-center bg-shop-npay text-[17px] font-black text-white md:w-[110px] md:flex-none">
            N pay
          </button>
          <button
            onClick={() => setOpen(true)}
            className="ml-2 h-12 flex-1 bg-shop-blue text-[15px] font-bold text-white md:w-[160px] md:flex-none"
          >
            구매하기
          </button>
        </div>
      </div>
    </>
  );
}
