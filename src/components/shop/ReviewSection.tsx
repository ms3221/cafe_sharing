import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { photoReviews, reviewSummary, reviews } from "@/data/samples/breeze-belt";
import { Stars } from "./Stars";

const notices = [
  "구매평은 아무나 작성할 수 있고, 삭제 전까지 기간 제한 없이 게시돼요.",
  "별점은 5점 만점으로 표시돼요.",
  "운영자가 뽑은 베스트 구매평은 배지와 함께 상단에, 워스트 구매평은 하단에 노출돼요.",
  "포토 구매평이 일반 구매평보다 먼저 보일 수 있어요.",
  "삭제 기준과 이의제기 절차는 운영사 내부 규칙을 따라요.",
];

export function ReviewSection() {
  return (
    <section id="prod-review" className="scroll-mt-14 px-4 pt-16 md:px-5 md:pt-24">
      <div className="grid gap-8 bg-[#f5f6f8] px-6 py-8 md:grid-cols-[1fr_1.2fr_2fr] md:items-center">
        <div className="text-center">
          <Stars rating={5} className="justify-center" />
          <p className="mt-1 text-[32px] text-shop-ink">{reviewSummary.average.toFixed(1)}</p>
          <p className="text-[11px] text-shop-sub">(총 {reviewSummary.total}개의 구매평)</p>
        </div>
        <ul className="space-y-1.5">
          {reviewSummary.distribution.map((row) => (
            <li key={row.score} className="flex items-center gap-3 text-[11px] text-shop-ink">
              <span className="w-6">{row.score}점</span>
              <span className="h-1 flex-1 bg-neutral-200">
                <span className="block h-full bg-shop-star" style={{ width: `${row.ratio * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
        <div>
          <p className="text-center text-[12px] text-shop-ink">포토 구매평 모아보기</p>
          <ul className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto">
            {photoReviews.map((review, i) => (
              <li key={i} className="shrink-0">
                <Image
                  src={review.image!}
                  alt="포토 구매평"
                  width={110}
                  height={110}
                  className="h-[110px] w-[110px] object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-8 text-[14px] font-bold text-shop-ink">
        구매평 <span className="text-[11px] font-normal">({reviewSummary.total})</span>
      </h3>
      <ul className="mt-3 space-y-1.5 text-[11px] text-shop-sub">
        {notices.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
      <button className="mt-4 bg-shop-blue px-3 py-2.5 text-[11px] font-semibold text-white">구매평 작성</button>

      <div className="mt-7 flex items-center justify-between border-b border-shop-ink pb-2">
        <span className="flex items-center gap-1.5 text-[12px] text-shop-sub">
          <ImageIcon className="h-4 w-4" /> 포토 구매평만 보기
        </span>
        <span className="border border-neutral-300 px-3 py-1.5 text-[12px] font-semibold text-shop-ink">전체 평점 보기</span>
      </div>
      <ul>
        {reviews.map((review, i) => (
          <li key={i} className="flex justify-between gap-4 border-b border-shop-line py-4">
            <div>
              <Stars rating={review.rating} />
              <p className="mt-2 text-[13px] text-shop-ink">{review.content}</p>
            </div>
            <div className="shrink-0 text-right text-[11px] text-shop-sub">
              <p>{review.author}</p>
              <p>{review.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
