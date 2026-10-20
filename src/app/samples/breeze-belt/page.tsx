import type { Metadata } from "next";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductSummary } from "@/components/shop/ProductSummary";
import { PhotoReviewStrip } from "@/components/shop/PhotoReviewStrip";
import { DetailTabs } from "@/components/shop/DetailTabs";
import { DetailImages } from "@/components/shop/DetailImages";
import { ReviewSection } from "@/components/shop/ReviewSection";
import { QnaSection } from "@/components/shop/QnaSection";
import { BuyBar } from "@/components/shop/BuyBar";
import { ShopFooter } from "@/components/shop/ShopFooter";
import { detailImages, product, qna, reviewSummary } from "@/data/samples/breeze-belt";

export const metadata: Metadata = {
  title: "브리즈 벨트 | OUTDO (원본 클론)",
  description: "아웃두 브리즈 벨트 상세페이지 원본 클론",
};

export default function BreezeBeltPage() {
  return (
    <div className="bg-white">
      <ShopHeader />
      <main className="mx-auto max-w-[1440px] pt-6 md:pt-14">
        <ProductGallery images={product.gallery} alt={product.name} />
        <div className="mt-8 md:mt-6">
          <ProductSummary />
        </div>
        <PhotoReviewStrip />
        <DetailTabs counts={{ "prod-review": reviewSummary.total, "prod-qna": qna.length }} />
        <DetailImages images={detailImages} />
        <ReviewSection />
        <QnaSection />
      </main>
      <ShopFooter />
      <BuyBar />
    </div>
  );
}
