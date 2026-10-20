import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// 시안마다 섹션 하나: 왜 이 구조인지 설명 + 홈 · 상세 카드
const drafts = [
  {
    no: 1,
    title: "사람과 장비로 고르게 하는 구조",
    summary:
      "광고로 처음 들어온 사람이 OUTDO를 몰라도 3초 안에 '크로스핏하는 사람들이 쓰는 장비'라는 걸 알게 하고, 각자 사는 이유(컬러 · 종목 · 카테고리)대로 바로 고르게 하는 안입니다. SUFF 대회 영상처럼 지금 사이트에 있는 OUTDO만의 자산은 그대로 살렸습니다. 상세는 긴 통이미지 대신 첫 화면에서 고르고 담기까지 끝나게 줄였습니다.",
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
        // 휴대폰 한 화면 약 800px 기준: 원본 통이미지 약 10,350px, 시안 약 2,400px (2026-10-20 측정)
        body: "착용컷 · 360도 보기 · 컬러 · 사이즈 · 구매 버튼을 첫 화면에 모으고, 특징 · 사이즈표 · 배송 · 리뷰는 접어 둡니다. 통이미지 13화면 분량이 약 3화면으로 줄었습니다.",
      },
    ],
    // 보는 사람이 시안을 오해하지 않게: 사진 상태 · 홈 순서의 이유 · 묶음 방식이 바뀔 수 있다는 점
    notes: [
      {
        title: "사진은 무료 샘플 이미지로 대체한 자리가 있습니다",
        body: "노란 '대체 사진' 표시가 붙은 사진은 아직 촬영본이 없어 무료 샘플 이미지로 채웠습니다. 실제 촬영으로 바꾸거나, 지금 있는 제품 사진을 바탕으로 AI 연출컷을 만들어 채울 수 있습니다. 자리마다 필요한 컷을 적어 두었고, AI 컷은 제품 모양 · 색이 실물과 같은지 확인한 뒤 씁니다.",
      },
      {
        title: "홈 순서: 알게 하기 → 믿게 하기 → 고르게 하기 → 남기기",
        body: "광고로 처음 온 사람도 첫 화면의 착용컷 그리드로 3초 안에 '크로스핏하는 사람들이 쓰는 장비'라는 걸 알게 하고, SUFF 대회 영상으로 믿음을 줍니다. 그다음 신제품 · BEST · 컬러 · 가이드 · 카테고리 · 종목으로 고르게 하고, 박스 문의와 알림 받기로 오늘 사지 않는 사람도 남깁니다. 위로 갈수록 모든 방문자에게, 아래로 갈수록 일부에게 필요한 내용을 두었습니다.",
      },
      {
        title: "고르는 기준별로 모아 보여주기",
        body: "최근 운동복 · 운동 장비 브랜드 사이트들은 상품을 목록 하나로 늘어놓기보다, 고객이 고르는 기준(컬러, 운동 종목, 카테고리)별로 묶어 홈에서 바로 보여줍니다. 시안 1도 같은 방식으로, 들어온 사람이 자기 기준에 맞는 묶음부터 보게 했습니다.",
      },
      {
        title: "묶는 기준은 얼마든지 바꿀 수 있습니다",
        body: "컬러 · 종목 · 카테고리는 예시입니다. 묶음을 섹션 단위로 만들어 두어서 'WOD 입문 세트', '시즌 컬러', '박스 운영자용'처럼 OUTDO가 밀고 싶은 기준으로 바꾸거나 더할 수 있습니다. 광고 주제가 바뀌면 그 주제에 맞는 묶음을 하나 더 만들어 도착 지점으로 쓰면 됩니다.",
      },
    ],
    samples: [
      {
        href: "/samples/home",
        title: "홈",
        description: "선수 그리드 · SUFF 영상 · 신제품 카드 · BEST · 컬러별 · 기어 가이드 · 카테고리 · 종목별 · 박스 문의 · 알림 받기",
        thumbnail: "/assets/outdo-home/site/bg-adde45beafc3b.jpg",
        source: "https://www.outdothebest.com/",
      },
      {
        href: "/samples/detail",
        title: "상세 · 브리즈 벨트",
        description: "착용컷 갤러리(360도 보기) + 컬러 칩 · 사이즈 버튼 → 짧은 설명 → 상세 정보 팝업 → 접는 메뉴 → 함께 보면 좋은 상품",
        thumbnail: "/assets/breeze-belt/crops/hold-belt.jpg",
        source: "https://www.outdothebest.com/shop_view/?idx=108",
      },
    ],
  },
  {
    no: 2,
    title: "제품을 먼저 보여주고 이야기로 설득하는 구조",
    summary:
      "첫 화면부터 제품을 크게 보여주고, 탭으로 정리된 진열에서 바로 고르게 한 뒤, 브랜드 문장 · 박스 구축 서비스(TAILORED SERVICE) · SUFF 영상으로 'OUTDO는 장비부터 공간까지 만드는 브랜드'라는 믿음을 주는 안입니다. 시안 1이 사람으로 시작한다면 시안 2는 제품으로 시작합니다.",
    points: [
      {
        title: "첫 화면은 제품",
        body: "광고에서 본 제품이 첫 화면에 그대로 크게 있습니다. 바탕은 제품 컬러에서 뽑은 색이라 시즌 · 신제품마다 슬라이드만 바꾸면 됩니다.",
      },
      {
        title: "탭으로 정리된 진열",
        body: "BEST · 그립 · 벨트 · 니슬리브 · 손목 · 기타, 그리고 종목별 탭. 원하는 종류만 바로 보고, 컬러 점으로 몇 가지 색이 있는지 목록에서 미리 압니다.",
      },
      {
        title: "제품 다음에 브랜드 이야기",
        body: "제품을 다 본 뒤 큰 글씨의 브랜드 문장과 TAILORED SERVICE 3단계 카드로 '누가, 왜 만드는가'를 보여줍니다. 장비부터 박스 공간까지 만드는 브랜드라는 점이 드러납니다.",
      },
      {
        title: "파트너로 증명",
        body: "파트너 로고 띠와 SUFF 공식 파트너 영상으로 '실제로 쓰는 곳'을 보여줍니다. 파트너 박스 로고가 들어가면 근거가 더 단단해집니다.",
      },
    ],
    notes: [
      {
        title: "노란 '대체' 표시는 재료를 받을 자리입니다",
        body: "파트너 박스 로고는 아직 받지 못해 자리만 표시했습니다. TAILORED SERVICE 사진 · SUFF 영상처럼 현재 사이트에 있는 이미지 · 영상은 주소를 그대로 가져다 씁니다.",
      },
      {
        title: "상세는 사진 옆에 구매 패널이 따라옵니다",
        body: "PC에서는 사진을 내려 보는 동안 오른쪽 구매 패널이 같이 따라오고, 구매 버튼을 지나치면 아래에 작은 구매 바가 나타납니다. 특징 · 비교 · 리뷰를 보다가도 바로 담을 수 있습니다.",
      },
    ],
    samples: [
      {
        href: "/samples/draft2/home",
        title: "홈",
        description: "공지 띠 · 제품 히어로 · 파트너 로고 · 제품 탭 · 카테고리 타일 · 종목 탭 · 브랜드 선언 · TAILORED SERVICE · SUFF 영상 · 알림 받기",
        thumbnail: "/assets/breeze-belt/crops/hero-plate.jpg",
        source: "https://www.outdothebest.com/",
      },
      {
        href: "/samples/draft2/detail",
        title: "상세 · 브리즈 벨트",
        description: "사진 그리드(360도 보기) + 고정 구매 패널 → 접는 메뉴 → 특징 카드 → 배너 → 벨트 비교 → 리뷰 → 함께 보면 좋은 상품 → FAQ",
        thumbnail: "/assets/breeze-belt/crops/velcro.jpg",
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

          <div className="mt-10 rounded-xl bg-neutral-100 p-6 md:p-8">
            <p className="text-sm font-bold text-neutral-900">참고 사항</p>
            <ul className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {draft.notes.map((note) => (
                <li key={note.title}>
                  <p className="font-bold text-neutral-900">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-700">{note.body}</p>
                </li>
              ))}
            </ul>
          </div>

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
