import type { Metadata } from "next";
import { ReviewMode } from "@/components/renewal/ReviewMode";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { VelitesProduct } from "@/components/product/VelitesProduct";
import { productNotes2 } from "@/data/samples/velites-product";

export const metadata: Metadata = {
  title: "브리즈 벨트 | 시안 2 상세",
};

export default function Draft2DetailPage() {
  return (
    <div className="bg-white">
      <ReviewMode
        label="시안 2 · 상세"
        links={[
          { href: "https://www.outdothebest.com/shop_view/?idx=108", text: "현재 상세" },
          { href: "/samples/draft2/home", text: "시안 2 홈" },
          { href: "/samples/detail", text: "시안 1 상세" },
        ]}
        rationale={{ title: "브리즈 벨트 상세 · 시안 2", notes: productNotes2 }}
      >
        <ShopHeader />
        <VelitesProduct />
        <ShopFooter />
      </ReviewMode>
    </div>
  );
}
