import type { Metadata } from "next";
import { ReviewMode } from "@/components/renewal/ReviewMode";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { SkimsProduct } from "@/components/product/SkimsProduct";
import { productNotes } from "@/data/samples/skims-product";

export const metadata: Metadata = {
  title: "브리즈 벨트 상세 | SKIMS 구조",
};

export default function DetailRenewalPage() {
  return (
    <div className="bg-white">
      <ReviewMode
        label="상세 리뉴얼 · SKIMS 구조"
        links={[
          { href: "https://www.outdothebest.com/shop_view/?idx=108", text: "현재 상세" },
          { href: "/samples/home", text: "SKIMS 홈" },
          { href: "/", text: "샘플 목록" },
        ]}
        rationale={{ title: "브리즈 벨트 상세", notes: productNotes }}
      >
        <ShopHeader />
        <SkimsProduct />
        <ShopFooter />
      </ReviewMode>
    </div>
  );
}
