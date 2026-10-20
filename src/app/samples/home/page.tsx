import type { Metadata } from "next";
import { ReviewMode } from "@/components/renewal/ReviewMode";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { SkimsHome } from "@/components/home/SkimsHome";
import { homeNotes } from "@/data/samples/outdo-home";

export const metadata: Metadata = {
  title: "OUTDO 홈 | 시안 1",
};

export default function HomeRenewalPage() {
  return (
    <div className="bg-white">
      <ReviewMode
        label="시안 1 · 홈"
        links={[
          { href: "https://www.outdothebest.com/", text: "현재 홈" },
          { href: "/samples/detail", text: "시안 1 상세" },
          { href: "/", text: "샘플 목록" },
        ]}
        rationale={{ title: "OUTDO 홈", notes: homeNotes }}
      >
        <ShopHeader />
        <SkimsHome />
        <ShopFooter />
      </ReviewMode>
    </div>
  );
}
