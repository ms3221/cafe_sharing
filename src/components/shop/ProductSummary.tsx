import Image from "next/image";
import { ChevronRight, Heart, Share2 } from "lucide-react";
import { product } from "@/data/samples/breeze-belt";
import { formatWon } from "@/lib/utils";

export function ProductSummary() {
  const meta = product.info.filter((row) => row.label === "제조사" || row.label === "브랜드");

  return (
    <section className="px-4 text-center md:px-5">
      <ol className="hidden items-center justify-center gap-2 text-[13px] text-shop-sub md:flex">
        {product.breadcrumb.map((crumb, i) => (
          <li key={crumb} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {crumb}
          </li>
        ))}
      </ol>

      <h1 className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[22px] font-bold text-shop-ink md:mt-2">
        {product.name}
        <span className="flex gap-1">
          {product.badges.map((badge) => (
            <Image
              key={badge.alt}
              src={badge.src}
              alt={badge.alt}
              width={badge.width}
              height={17}
              className="h-[17px] w-auto"
            />
          ))}
        </span>
      </h1>
      <p className="mt-2 text-[19px] text-shop-ink">{formatWon(product.price)}</p>

      <table className="mt-5 w-full border-collapse border-y border-shop-line text-[13px] text-shop-ink">
        <tbody>
          {product.specs.map((spec) => (
            <tr key={spec.label} className="border-b border-shop-line last:border-b-0">
              <th className="w-[30%] border-r border-shop-line py-2 font-normal">{spec.label}</th>
              <td className="py-2">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-center gap-5 text-shop-ink md:hidden">
        <span className="flex items-center gap-1 text-sm">
          <Heart className="h-5 w-5" /> 0
        </span>
        <Share2 className="h-5 w-5" />
      </div>

      <dl className="mx-auto mt-6 max-w-[400px] text-left text-[12px] text-neutral-800">
        <div className="flex gap-14 border-b border-neutral-200 pb-3">
          <dt className="w-8 shrink-0 text-shop-sub">상품</dt>
          <dd className="space-y-1">
            {meta.map((row) => (
              <p key={row.label}>
                {row.label} <b className="font-semibold">{row.value}</b>
              </p>
            ))}
          </dd>
        </div>
        <div className="flex gap-14 pt-3">
          <dt className="w-8 shrink-0 text-shop-sub">적립</dt>
          <dd>
            <b className="font-semibold">{product.point.toLocaleString("ko-KR")}</b> 포인트 적립예정
          </dd>
        </div>
      </dl>
    </section>
  );
}
