import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// 시안마다 섹션 하나: 왜 이 구조인지 설명 + 홈 · 상세 카드
const drafts = [
  {
    no: 1,
    title: "사람과 장비로 고르게 하는 구조",
    summary:
      "광고로 처음 들어온 사람이 OUTDO를 몰라도 3초 안에 '크로스핏하는 사람들이 쓰는 장비'라는 걸 알게 하고, 각자 사는 이유(컬러 · 종목 · 카테고리)대로 바로 고르게 하는 안입니다. 상세는 긴 통이미지 대신 첫 화면에서 고르고 담기까지 끝나게 줄였습니다.",
    points: [
      {
        title: "첫 화면은 로고 대신 사람",
        body: "운동하는 사람들의 착용컷 그리드로 시작합니다. 브랜드를 모르는 사람에게는 로고보다 '누가, 어떻게 쓰는지'가 빨리 전달됩니다.",
      },
      {
        title: "고르는 길을 여러 개로",
        body: "컬러 깔맞춤, 오늘 할 종목, 찾는 카테고리, 그립 비교. 고객이 장비를 사는 이유대로 입구를 나눴습니다.",
      },
      {
        title: "광고와 같은 메시지로 도착",
        body: "컬러 광고는 컬러 섹션으로, 종목 광고는 종목 섹션으로 보냅니다. 섹션 하나하나가 광고 소재이자 도착 페이지가 됩니다.",
      },
      {
        title: "상세는 짧게, 필요한 사람만 더 보게",
        body: "사진 · 컬러 · 사이즈 · 구매 버튼을 첫 화면에 모으고, 특징 · 사이즈표 · 배송 · 리뷰는 접어 둡니다. 통이미지 13화면 분량이 약 3.5화면으로 줄었습니다.",
      },
    ],
    samples: [
      {
        href: "/samples/home",
        title: "홈",
        description: "선수 그리드 · 신제품 카드 · 컬러별 · 그립 가이드 · 카테고리 · 종목별 · 알림 받기",
        thumbnail: "/assets/outdo-home/site/bg-adde45beafc3b.jpg",
        source: "https://www.outdothebest.com/",
      },
      {
        href: "/samples/detail",
        title: "상세 · 브리즈 벨트",
        description: "갤러리 + 컬러 칩 · 사이즈 버튼 → 짧은 설명 → 상세 정보 팝업 → 접는 메뉴 → 함께 보면 좋은 상품",
        thumbnail: "/assets/breeze-belt/crops/hold-belt.jpg",
        source: "https://www.outdothebest.com/shop_view/?idx=108",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold text-neutral-500">OUTDO Renewal</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">OUTDO 리뉴얼 시안</h1>
      <p className="mt-3 text-neutral-600">시안마다 홈과 상세페이지를 한 세트로 만들었습니다.</p>

      {drafts.map((draft) => (
        <section key={draft.no} className="mt-16 border-t border-neutral-200 pt-10">
          <p className="text-sm font-bold text-neutral-500">시안 {draft.no}</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">{draft.title}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-700">{draft.summary}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {draft.points.map((point) => (
              <li key={point.title}>
                <p className="font-bold text-neutral-900">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{point.body}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {draft.samples.map((sample) => (
              <li key={sample.href} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <Link href={sample.href} className="group block">
                  <Image
                    src={sample.thumbnail}
                    alt={sample.title}
                    width={750}
                    height={750}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                  <div className="p-5">
                    <span className="rounded bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">시안 {draft.no}</span>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900">{sample.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{sample.description}</p>
                  </div>
                </Link>
                <a
                  href={sample.source}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 border-t border-neutral-100 px-5 py-3 text-xs text-neutral-500 hover:text-neutral-900"
                >
                  현재 페이지 보기 <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
