import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { Events } from "@/components/sections/Events";
import { Instagram } from "@/components/sections/Instagram";

// 이전 프로젝트(카페 쉐어링 홈페이지) 보존용 경로
export const metadata: Metadata = {
  title: "쉐어링 | 광주 동구 소금빵 & 커피 전문 카페",
  description:
    "광주 동구 소태역 근처 카페 쉐어링. 매일 오후 갓 구워내는 버터 듬뿍 소금빵, 프리미엄 블렌딩 커피, 바스크 치즈케이크를 만나보세요.",
};

export default function CafePage() {
  return (
    <div className="bg-cream-50 text-[#3a2e25]">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Location />
        <Events />
        <Instagram />
      </main>
      <Footer />
    </div>
  );
}
