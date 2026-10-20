import { ShopHeader } from "@/components/shop/ShopHeader";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductSummary } from "@/components/shop/ProductSummary";
import { DetailTabs } from "@/components/shop/DetailTabs";
import { ReviewSection } from "@/components/shop/ReviewSection";
import { QnaSection } from "@/components/shop/QnaSection";
import { BuyBar } from "@/components/shop/BuyBar";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { product, qna, reviewSummary } from "@/data/samples/breeze-belt";
import type { SectionNote } from "@/data/samples/renewal-notes";
import { ReviewMode } from "./ReviewMode";

// 상단 상품정보·구매평·Q&A는 아임웹 고정 영역이라 원본 클론을 그대로 쓰고, 상세정보 영역만 시안별로 바꾼다
export function RenewalShell({
  label,
  links,
  rationale,
  children,
}: {
  label: string;
  links: { href: string; text: string }[];
  rationale?: { title: string; notes: SectionNote[] };
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <ReviewMode label={label} links={links} rationale={rationale}>
        <ShopHeader />
        <main className="mx-auto max-w-[1440px] pt-6 md:pt-14">
          <ProductGallery images={product.gallery} alt={product.name} />
          <div className="mt-8 md:mt-6">
            <ProductSummary />
          </div>
          <DetailTabs counts={{ "prod-review": reviewSummary.total, "prod-qna": qna.length }} />
          <div id="prod-detail" className="scroll-mt-14 pt-8">
            {children}
          </div>
          <ReviewSection />
          <QnaSection />
        </main>
        <ShopFooter />
        <BuyBar />
      </ReviewMode>
    </div>
  );
}
