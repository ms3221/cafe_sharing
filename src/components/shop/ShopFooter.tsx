import { brand } from "@/data/samples/breeze-belt";

export function ShopFooter() {
  return (
    <footer className="bg-shop-navy px-5 pt-10 pb-28 text-[12px] text-white/70">
      <div className="mx-auto max-w-[1120px]">
        <p className="space-x-4 font-semibold text-white">
          <span>이용약관</span>
          <span>개인정보처리방침</span>
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
          {brand.company.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-5">{brand.copyright}</p>
      </div>
    </footer>
  );
}
