import Image from "next/image";
import { photoReviews } from "@/data/samples/breeze-belt";
import { Stars } from "./Stars";

export function PhotoReviewStrip() {
  return (
    <section className="mx-4 mt-12 md:mx-5 md:mt-24 md:border md:border-shop-line md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] text-shop-ink">포토 구매평 ({photoReviews.length})</h2>
        <a href="#prod-review" className="text-[12px] text-shop-ink">
          더보기
        </a>
      </div>
      <ul className="scrollbar-hide mt-5 flex snap-x gap-4 overflow-x-auto md:gap-12">
        {photoReviews.map((review, i) => (
          <li
            key={i}
            className="flex w-[240px] shrink-0 snap-start gap-3 border border-shop-line p-5 md:w-[calc(50%-24px)] md:border-0 md:p-0"
          >
            <div className="min-w-0 flex-1">
              <Stars rating={review.rating} />
              <p className="mt-3 line-clamp-4 text-[12px] leading-[1.45] text-shop-ink">{review.content}</p>
            </div>
            <Image
              src={review.image!}
              alt="구매평 사진"
              width={120}
              height={120}
              className="h-[110px] w-[110px] shrink-0 object-cover md:h-[120px] md:w-[120px]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
