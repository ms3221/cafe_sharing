import { Lock } from "lucide-react";
import { qna } from "@/data/samples/breeze-belt";

export function QnaSection() {
  return (
    <section id="prod-qna" className="scroll-mt-14 px-4 pt-16 pb-12 md:px-5 md:pt-24">
      <h3 className="text-[14px] font-bold text-shop-ink">
        Q&A <span className="text-[11px] font-normal">({qna.length})</span>
      </h3>
      <p className="mt-3 text-[11px] text-shop-sub">구매하시려는 상품에 대해 궁금한 점이 있으면 문의주세요.</p>
      <div className="mt-4 flex gap-1.5">
        <button className="bg-shop-blue px-3 py-2.5 text-[11px] font-semibold text-white">상품문의</button>
        <button className="border border-neutral-300 px-3 py-2.5 text-[11px] font-semibold text-shop-ink">1:1 문의</button>
      </div>
      <table className="mt-6 w-full border-t border-shop-ink text-[12px] text-shop-ink">
        <thead className="text-shop-sub">
          <tr className="border-b border-shop-line">
            <th className="w-24 py-3 font-normal">상태</th>
            <th className="py-3 text-left font-normal">제목</th>
          </tr>
        </thead>
        <tbody>
          {qna.map((item) => (
            <tr key={item.title} className="border-b border-shop-line">
              <td className="py-3 text-center">
                <span className="bg-shop-ink px-2 py-1 text-[10px] text-white">{item.status}</span>
              </td>
              <td className="py-3">
                <span className="flex items-center gap-1">
                  {item.title} <Lock className="h-3 w-3 text-shop-sub" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
