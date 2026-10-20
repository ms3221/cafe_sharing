"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cafeInfo } from "@/data/cafe-info";

export function About() {
  return (
    <section id="about" className="py-24 bg-cream-50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle subtitle="Our Story" title="카페 소개" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-warm-200">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop')" }}
              />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-warm-800">
                좋은 것을 함께 나누는 공간
              </h3>
              <p className="text-warm-600 leading-relaxed">
                {cafeInfo.story}
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-warm-500">Premium</p>
                  <p className="text-sm text-warm-400 mt-1">프리미엄 원두</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-warm-500">2~3시</p>
                  <p className="text-sm text-warm-400 mt-1">매일 갓 구운 빵</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-warm-500">NO밀가루</p>
                  <p className="text-sm text-warm-400 mt-1">바스크 치즈케이크</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
