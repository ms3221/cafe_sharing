import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const samples = [
  {
    href: "/samples/home",
    title: "OUTDO 홈 · SKIMS 구조",
    label: "홈 리뉴얼",
    description: "선수 그리드 · 신제품 카드 · Shop by Color · 기어 가이드 · Shop by Category · Shop by Movement. 노란 표시는 대체 사진",
    thumbnail: "/assets/outdo-home/site/bg-adde45beafc3b.jpg",
    source: "https://www.outdothebest.com/",
  },
  {
    href: "/samples/detail",
    title: "브리즈 벨트 상세 · SKIMS 구조",
    label: "상세 리뉴얼",
    description: "나이키 스킴스 상품 페이지 구조. 갤러리 + 컬러 칩 · 사이즈 버튼 → 짧은 설명 → 상세 정보 팝업 → 접는 메뉴 → 추천 상품",
    thumbnail: "/assets/breeze-belt/crops/color-pink.jpg",
    source: "https://www.outdothebest.com/shop_view/?idx=108",
  },
  {
    href: "/samples/v2/skims",
    title: "브리즈 벨트 · SKIMS",
    label: "리뉴얼 v2",
    description: "나이키 스킴스 구조. 착장 그리드 · Shop by Color · 소재 가이드 · Shop by Movement",
    thumbnail: "/assets/breeze-belt/crops/hold-belt.jpg",
    source: "https://www.outdothebest.com/shop_view/?idx=108",
  },
  {
    href: "/samples/v2/spec",
    title: "브리즈 벨트 · TECH SPEC",
    label: "리뉴얼 v2",
    description: "블랙 · 실버 라인 도면 · 코발트 포인트. 앞뒤옆위아래 도면, 분해도, 확대샷까지 디테일 끝까지 보여주는 안",
    thumbnail: "/assets/breeze-belt/crops/belt-dark.jpg",
    source: "https://www.outdothebest.com/shop_view/?idx=108",
  },
  {
    href: "/samples/breeze-belt",
    title: "OUTDO 브리즈 벨트",
    label: "원본 클론",
    description: "아임웹 상세페이지를 이미지·구성 그대로 재현한 기준 페이지",
    thumbnail: "/assets/breeze-belt/gallery-01.jpg",
    source: "https://www.outdothebest.com/shop_view/?idx=108",
  },
  {
    href: "/samples/layouts",
    title: "브리즈 벨트 리뉴얼 시안 4종",
    label: "리뉴얼 시안",
    description: "증명형 · 탐색형 · 문제해결형 · 컬러·룩형. 실제 상세페이지 시안과 블록별 배치 이유·마케팅 연결",
    thumbnail: "/assets/breeze-belt/gallery-02.jpg",
    source: "https://www.outdothebest.com/shop_view/?idx=108",
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold text-neutral-500">Detail Page Renewal</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">상세페이지 리뉴얼 샘플</h1>
      <p className="mt-3 text-neutral-600">원본 상세페이지와 리뉴얼 제안안을 비교해볼 수 있는 샘플 모음입니다.</p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {samples.map((sample) => (
          <li key={sample.href} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <Link href={sample.href} className="group block">
              <Image
                src={sample.thumbnail}
                alt={sample.title}
                width={750}
                height={750}
                className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.02]"
              />
              <div className="p-5">
                <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
                  {sample.label}
                </span>
                <h2 className="mt-3 text-lg font-bold text-neutral-900">{sample.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">{sample.description}</p>
              </div>
            </Link>
            <a
              href={sample.source}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 border-t border-neutral-100 px-5 py-3 text-xs text-neutral-500 hover:text-neutral-900"
            >
              원본 페이지 보기 <ArrowUpRight className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
