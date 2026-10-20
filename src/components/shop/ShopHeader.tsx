import Image from "next/image";
import { Search } from "lucide-react";
import { brand } from "@/data/samples/breeze-belt";

export function ShopHeader() {
  return (
    <header className="bg-shop-navy text-white">
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-5 pb-3 md:pt-10 md:pb-5">
        <span className="absolute top-5 left-5 text-[13px] md:top-12 md:left-11">🇰🇷 한국어 ▾</span>
        <Image
          src={brand.logo}
          alt="OUTDO"
          width={770}
          height={80}
          priority
          className="h-auto w-[130px] md:w-[406px]"
        />
        <nav className="mt-9 hidden gap-10 text-[13px] font-bold md:flex">
          {brand.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <div className="absolute right-6 bottom-5 hidden items-center gap-6 text-[12px] md:flex">
          <Search className="h-4 w-4" />
          <span>LOGIN</span>
          <span>JOIN</span>
          <span>CART</span>
        </div>
      </div>
    </header>
  );
}
