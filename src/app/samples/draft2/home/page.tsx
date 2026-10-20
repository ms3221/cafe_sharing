import type { Metadata } from "next";
import { ReviewMode } from "@/components/renewal/ReviewMode";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { VelitesHome } from "@/components/home/VelitesHome";
import { home2Notes } from "@/data/samples/outdo-home-2";

export const metadata: Metadata = {
  title: "OUTDO 홈 | 시안 2",
};

export default function Draft2HomePage() {
  return (
    <div className="bg-white">
      <ReviewMode
        label="시안 2 · 홈"
        links={[
          { href: "https://www.outdothebest.com/", text: "현재 홈" },
          { href: "/samples/draft2/detail", text: "시안 2 상세" },
          { href: "/samples/home", text: "시안 1 홈" },
        ]}
        rationale={{ title: "OUTDO 홈 · 시안 2", notes: home2Notes }}
      >
        <ShopHeader />
        <VelitesHome />
        <ShopFooter />
      </ReviewMode>
    </div>
  );
}
