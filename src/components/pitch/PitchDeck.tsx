"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// 발표자료: 왜 이렇게 만들면 광고가 구매로 이어지는가 (마케터 대상, 노트북 발표용)
// 한 장 = 한 화면. → · 스페이스 · PageDown으로 다음 장, ← · PageUp으로 이전 장
// 개발 · 구현 이야기는 넣지 않는다. 효과 수치는 약속하지 않고 '무엇으로 확인하나'로 말한다

function Slide({ children, className, dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <section data-slide className={cn("relative flex min-h-screen snap-start flex-col justify-center px-8 py-16 md:px-20", dark ? "bg-shop-navy text-white" : "bg-white text-neutral-950", className)}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={cn("text-[18px] font-bold", dark ? "text-white/60" : "text-neutral-500")}>{children}</p>;
}

function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("mt-3 text-[40px] leading-[1.15] font-black tracking-tight md:text-[56px]", className)}>{children}</h2>;
}

// 시안 화면을 휴대폰 크기로 그대로 띄운다 (iframe 안에서는 시안 안내 띠가 숨겨짐)
function Phone({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[40px] bg-neutral-950 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
        <iframe src={src} title={label} className="block h-[min(680px,calc(100vh-180px))] w-[340px] rounded-[32px] bg-white" />
      </div>
      <a href={src} target="_blank" rel="noreferrer" className="mt-3 text-[15px] underline underline-offset-4 opacity-70 hover:opacity-100">
        {label} 크게 열기
      </a>
    </div>
  );
}

function FlowTable({ rows, dark = false }: { rows: { ad: string; lands: string; does: string; metric: string }[]; dark?: boolean }) {
  return (
    <table className="mt-10 w-full text-left text-[18px] md:text-[20px]">
      <thead>
        <tr className={cn("border-b-2", dark ? "border-white text-white/60" : "border-neutral-950 text-neutral-500")}>
          <th className="py-3 pr-6 font-medium">이 광고로 들어오면</th>
          <th className="py-3 pr-6 font-medium">여기에 도착해서</th>
          <th className="py-3 pr-6 font-medium">이렇게 움직이고</th>
          <th className="py-3 font-medium">이걸로 확인</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.ad} className={cn("border-b align-top", dark ? "border-white/20" : "border-neutral-200")}>
            <td className="py-4 pr-6 font-bold">{r.ad}</td>
            <td className="py-4 pr-6">{r.lands}</td>
            <td className={cn("py-4 pr-6", dark ? "text-white/80" : "text-neutral-700")}>{r.does}</td>
            <td className={cn("py-4", dark ? "text-white/80" : "text-neutral-700")}>{r.metric}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 광고 유형별로 잘 맞는 도착 페이지 — OUTDO 내부 상황 진단이 아니라 일반적인 퍼포먼스 마케팅 원칙(플레이북)
// 효과 수치는 쓰지 않고 '왜 맞는지'만. 실제 맞는지는 섹션 성적표로 확인
const coldPlaybook = [
  { ad: "피드 이미지 · 캐러셀 (선수 착용컷)", page: "같은 사진으로 시작하는 브랜드 홈", why: "광고 사진과 첫 화면이 이어져야 '잘못 들어왔다' 없이 계속 봅니다" },
  { ad: "릴스 · 영상 광고", page: "같은 영상 · 장면이 있는 섹션", why: "방금 본 장면을 다시 만나면 관심이 끊기지 않습니다" },
  { ad: "컬러 · 컬렉션 광고 ('오렌지로 맞추기')", page: "그 색만 모은 컬러 컬렉션", why: "광고가 약속한 '그 색'이 한눈에 있어야 여러 개를 함께 담습니다" },
  { ad: "관심사 광고 (체조 · 역도 · 컨디셔닝)", page: "그 종목에 필요한 장비 묶음", why: "내 상황에 맞는 묶음이면 고민 없이 한 번에 담습니다" },
  { ad: "선수 · 인플루언서 콘텐츠", page: "그 선수가 쓰는 장비 모음", why: "'저 사람이 쓰는 것'이 곧 사는 이유가 됩니다" },
];

const warmPlaybook = [
  { ad: "본 상품 다시 보여주기 (카탈로그 리타게팅)", page: "그 상품 상세로 바로", why: "이미 고른 사람에게 홈은 한 번 더 고르게 하는 우회로입니다" },
  { ad: "쇼핑 광고 · 상품명 검색", page: "상품 상세 (구매 버튼이 바로 보이는)", why: "찾던 그 상품 · 가격 · 옵션이 바로 보여야 합니다" },
  { ad: "비교형 검색 ('그립 추천', '크로스핏 벨트')", page: "비교 · 가이드 페이지", why: "고민 중인 사람은 나란히 놓인 비교가 결정을 쉽게 합니다" },
  { ad: "브랜드 검색 ('아웃두')", page: "홈 (신제품 · BEST)", why: "이미 아는 사람은 둘러보다가 삽니다" },
  { ad: "할인 · 시즌 · 대회 광고", page: "혜택이 첫 화면에 보이는 기획전", why: "약속한 혜택이 바로 안 보이면 바로 나갑니다" },
  { ad: "장바구니 이탈 리타게팅", page: "그 상품 + 배송 혜택 안내", why: "마지막 망설임(배송비 · 사이즈)을 풀어 줍니다" },
];

const principles = [
  { no: "1", title: "광고에서 본 것이 첫 화면에", body: "광고 사진 · 메시지와 도착 화면이 같으면 '잘못 들어왔다'는 느낌 없이 계속 봅니다.", where: "선수 그리드 · 제품 히어로 · 섹션별 도착 지점" },
  { no: "2", title: "고르는 수고를 줄인다", body: "사는 이유(컬러 · 종목 · 카테고리)별 입구, 그립을 나란히 보는 가이드, 실측이 적힌 사이즈 버튼.", where: "컬러별 · 종목별 · 기어 가이드 · 사이즈 버튼" },
  { no: "3", title: "망설임을 구매 버튼 옆에서 푼다", body: "무료 배송 기준 · 당일 출고(오후 2시 전 결제) · 대회 파트너 · 별점을 결정하는 순간 바로 옆에 둡니다.", where: "공지 띠 · 배송 상자 · SUFF 영상 · 리뷰" },
  { no: "4", title: "안 산 사람을 남긴다", body: "광고로 온 사람의 대부분은 첫 방문에 사지 않습니다. 광고를 다시 사지 않고도 직접 연락할 수 있는 연결을 남깁니다.", where: "알림 받기(카카오 채널)" },
];

const draft1Flows = [
  { ad: "메타 착용컷 · 캐러셀 광고", lands: "선수 그리드", does: "첫 화면만 보고도 '크로스핏 장비 브랜드'임을 알고 계속 봄", metric: "첫 화면 이탈률" },
  { ad: "SUFF 영상 광고 · 시청자 리타게팅", lands: "SUFF 영상", does: "대회 파트너라는 근거로 믿음", metric: "리타게팅 구매율" },
  { ad: "컬러 광고 ('오렌지로 맞추기')", lands: "컬러별", does: "같은 오렌지 톤의 그립 · 니슬리브 · 벨트(오렌지 로고)를 함께 담음", metric: "주문당 상품 수" },
  { ad: "종목 관심사 광고 (체조 · 역도)", lands: "종목별", does: "그 종목 장비를 한 번에 담음", metric: "종목 광고별 구매" },
  { ad: "검색 '크로스핏 그립 추천'", lands: "기어 가이드 (그립 · 니슬리브)", does: "그립 5종을 한눈에 나란히 보고 상세로 이동", metric: "가이드 → 상세 이동 · 구매" },
];

// 시안 2 홈은 브랜드 검색 · 직접 방문 · 신제품 광고용. 이미 본 상품 광고 · 쇼핑 광고는 플레이북 ②대로 상세로 바로
const draft2Flows = [
  { ad: "신제품 광고", lands: "제품 히어로", does: "광고와 같은 제품을 첫 화면에서 보고 바로 구매", metric: "신제품 광고 구매율" },
  { ad: "본 상품 리타게팅 · 쇼핑 광고", lands: "상세 (따라오는 구매 패널)", does: "홈을 거치지 않고 그 상품을 바로 담음", metric: "상세 → 장바구니" },
  { ad: "브랜드 검색 · 직접 방문", lands: "제품 탭", does: "원하는 종류만 보고, 컬러 점으로 옵션 미리 확인", metric: "탭 → 상세 이동" },
  { ad: "비교형 검색 ('크로스핏 벨트')", lands: "상세 벨트 비교", does: "맞는 벨트를 담거나 리프팅 벨트로 이동", metric: "'보러 가기' · 구매" },
  { ad: "'6만 원 이상 무료 배송 · 오후 2시 전 결제 당일 출고' 광고", lands: "공지 띠 · 배송 상자", does: "배송비 걱정 없이 결제까지", metric: "결제 단계 이탈률" },
  { ad: "박스 운영자 광고", lands: "TAILORED SERVICE", does: "서비스를 보고 문의", metric: "문의 건수" },
];

const detailChanges = [
  { before: "통이미지 18장 · 휴대폰 약 13화면", after: "첫 화면에서 보고 · 고르고, 한 번 내리면 담기 (시안 1 기준 약 3화면)", why: "결정하는 데 필요한 것만 위로, 더 알고 싶은 사람만 열어 봄" },
  { before: "색을 글자로만 고름 — '블루'는 실제로 청록 벨트, '오렌지'는 남색 벨트에 오렌지 로고", after: "벨트 사진을 눌러 고름 (시안 2는 바탕색 · 로고색 반반 동그라미)", why: "생각한 색과 다른 벨트를 받아 교환하는 일을 줄일 수 있음" },
  { before: "허리 실측은 16번째 이미지", after: "사이즈 버튼에 허리 실측(cm)", why: "'안 맞으면 어떡하지'를 고르는 자리에서 해결" },
  { before: "배송 안내는 맨 끝 이미지", after: "구매 버튼 바로 아래 '오후 2시 전 결제 당일 출고 · 6만 원 이상 무료 배송'", why: "마지막 망설임을 버튼 옆에서 풂" },
  { before: "벨트 하나 (48,000원) 담고 끝", after: "함께 쓰는 장비 추천 줄", why: "6만 원 무료 배송까지 함께 담게 → 객단가" },
];

// 예시 캠페인은 실제로 상품이 여러 개인 오렌지로 (브리즈 벨트 · 나노 그립 · 나노(+) 그립 · 네오프로 니슬리브 · 스웻밴드 프로)
// 오렌지 브리즈 벨트는 '네이비 바탕 + 오렌지 로고'라 벨트는 '오렌지 로고'로 밝힌다
const scenario = [
  { who: "메타 피드", what: "오렌지 그립 · 니슬리브와 오렌지 로고 벨트를 찬 선수 사진 광고를 봄 (착용컷 촬영 필요)" },
  { who: "홈 · 컬러별", what: "광고를 누르면 컬러 섹션으로 바로 도착. 오렌지 칸에 그립 · 니슬리브 · 벨트 · 스웻밴드 5개 제품" },
  { who: "상세", what: "사진 칩으로 색 확인, 허리 실측 보고 사이즈 선택, 버튼 옆 '6만 원 이상 무료 배송'" },
  { who: "함께 담기", what: "벨트 48,000원 + 같은 오렌지 톤 그립 · 니슬리브로 무료 배송 기준을 넘김" },
  { who: "안 샀다면", what: "카카오 채널 친구로 남음 → 다음 신제품 때 광고를 다시 사지 않고 직접 알림" },
];

// 오렌지 칸 실제 제품 (outdo-home.ts 옵션 컬러 기준). 브리즈 벨트는 네이비 바탕 + 오렌지 로고
const orangeItems = [
  { name: "브리즈 벨트 (오렌지 로고)", image: "/assets/breeze-belt/crops/color-orange.jpg" },
  { name: "나노 그립", image: "/assets/outdo-home/products/p222-a.jpg" },
  { name: "나노(+) 그립", image: "/assets/outdo-home/products/p106-a.jpg" },
  { name: "네오프로 니슬리브", image: "/assets/outdo-home/products/p110-a.jpg" },
  { name: "스웻밴드 프로", image: "/assets/outdo-home/products/p112-a.jpg" },
];

const scorecard = [
  { see: "많이 보는데 클릭이 적다", then: "문구 · 사진이 약함 → 바꿔서 다시 본다" },
  { see: "클릭은 많은데 장바구니가 적다", then: "상세에서 막힘 → 사이즈 · 배송 · 가격 안내를 점검" },
  { see: "특정 광고로 온 사람만 잘 산다", then: "그 광고에 예산을 더 싣고, 그 섹션을 위로" },
  { see: "거의 안 보는 섹션", then: "아래로 내리거나 뺀다" },
];

// 대회 캘린더: 다시 올 이유 + 살 시점. 일정은 주최 측 공지 기준 (2026-10-21 확인)
// HYROX 서울: hyrox.com/event/hyrox-seoul 공식 페이지 / CrossFit Open 2027: 보도(Prism News) 기준, 공식 확인 전
const competitionWhy = [
  { title: "다시 올 이유", body: "살 때만 오던 사이트에 일정을 보러 들어옵니다. 광고로 사 오지 않은 재방문입니다." },
  { title: "살 시점", body: "대회 3주 전 '대회 준비 장비' 묶음 · 광고. 대회 종목에 따라 맞는 장비 묶음이 다릅니다." },
  { title: "검색 유입", body: "'크로스핏 대회 일정'을 찾는 사람이 장비 브랜드 사이트로 들어올 수 있습니다." },
  { title: "파트너 이미지", body: "SUFF 대회 파트너로서 대회 소식을 함께 전하는 브랜드로 보이게 할 수 있습니다." },
];

const competitions = [
  { name: "HYROX 서울", date: "2026-11-13", when: "2026. 11. 13 ~ 15", place: "고양 킨텍스", note: "선수 티켓 판매 중 (종목별 매진 여부는 공식 페이지 확인)" },
  { name: "CrossFit Open 2027", date: "2027-02-18", when: "2027. 2. 18 · 2. 25 · 3. 4 와드 공개", place: "온라인 · 전 세계", note: "보도 기준 일정, 공식 발표 확인 필요 · 등록은 보통 1월 중순" },
  { name: "SUFF 2027", date: "", when: "일정 발표 전", place: "2025년엔 7월 완도", note: "파트너로서 함께 알릴 수 있는 대회" },
];

// 남은 날은 페이지가 열린 뒤에 계산 (미리 만든 화면과 날짜가 어긋나지 않게)
function DDay({ date }: { date: string }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    if (date) setDays(Math.max(0, Math.ceil((new Date(`${date}T00:00:00+09:00`).getTime() - Date.now()) / 86400000)));
  }, [date]);
  if (!date)
    return (
      <span className="text-[15px] leading-tight font-bold">
        발표
        <br />전
      </span>
    );
  return <span className="text-[22px] font-black tabular-nums">{days === null ? "D-" : `D-${days}`}</span>;
}

// 운영 · 유지보수: 쇼핑몰에 이미 쌓이는 데이터(+ 있다면 광고 · 섹션 데이터) → 정리 · 제안 → 확인 후 반영
// 발표에서는 도구 이름 · 개인정보 이야기를 빼고, Claude로 대시보드 · 제안을 빠르게 만든다는 점만 한 줄로
const careLoop = [
  { step: "모으기", body: "쇼핑몰에 이미 쌓이는 주문 · 상품 · 리뷰 · 문의, 그리고 있다면 광고 · 섹션 성적표를 한 대시보드에" },
  { step: "읽기", body: "무엇이 팔리고, 어디서 새고, 고객이 리뷰 · 문의에서 무슨 말을 하는지 정리" },
  { step: "고치기", body: "'지금 바꿀 것' 제안 → 문구 · 순서 · 노출 상품을 바꾸고 다시 확인" },
];

const careExamples = [
  { data: "리뷰에 같은 불만이 반복된다", fix: "상세 FAQ · 사이즈 안내 문구를 그 내용으로 보강" },
  { data: "한 달간 안 팔린 상품이 있다", fix: "홈 노출 · 묶음 상품 · 광고 대상을 조정" },
  { data: "특정 컬러 · 종목 광고로 온 손님이 잘 산다", fix: "그 섹션을 위로, 그 광고에 예산을 더" },
  { data: "재고가 얼마 안 남은 상품이 있다", fix: "광고를 먼저 멈추거나 다른 상품으로 바꿈" },
  { data: "3주 뒤 대회가 있다", fix: "대회 일정 · 공지를 올리고 '대회 준비 장비' 묶음 · 광고 시작" },
];

// 마지막 장: 오늘 결정을 요구하지 않고, 시점별로 앞으로 함께 정해 갈 것
const nextSteps = [
  {
    when: "오픈 전",
    items: [
      { title: "지금 쌓이는 데이터 확인 · 측정 켜기", body: "광고 추적 · 분석 도구 · 쇼핑몰 주문 · 리뷰 중 무엇이 있는지 보고, 필요한 측정(구매 추적 · 섹션 클릭)을 먼저 켠 뒤 바꾸기 전 숫자를 기록" },
      { title: "누구를 먼저 늘릴지", body: "처음 보는 사람(시안 1)과 찾아온 사람(시안 2) 중 어디에 먼저 힘을 줄지. 홈은 1 · 상세는 2 같은 조합도 가능" },
      { title: "무엇을 성공으로 볼지", body: "첫 화면 이탈률, 광고별 구매율, 주문당 상품 수 중 우리 기준 숫자" },
      { title: "도착 페이지를 채울 재료", body: "착용컷 · 컬러별 · 360 사진 촬영, 파트너 박스 로고, 기획전 틀, SUFF 영상 사용 범위" },
    ],
  },
  {
    when: "오픈하면서",
    items: [
      { title: "어떤 광고부터 돌릴지", body: "플레이북 중 어느 줄로 시작할지, 처음 보는 사람용과 다시 부르는 광고의 비중 · 다시 보여줄 기간" },
      { title: "광고 이름 붙이는 규칙", body: "광고마다 어디로 보냈는지 나중에 비교할 수 있게 남기는 주소 규칙(UTM)" },
    ],
  },
  {
    when: "오픈 후 계속",
    items: [
      { title: "시즌 · 대회 달력", body: "SUFF · HYROX · CrossFit Open 등 어느 대회 · 시즌에 기획전과 광고를 맞출지" },
      { title: "점검 리듬", body: "성적표를 얼마나 자주 보고 누가 판단할지, 데이터가 쌓이는 속도에 맞춰 함께 정함" },
    ],
  },
];

export function PitchDeck() {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const slides = [...(root.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? [])];
    setTotal(slides.length);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          currentRef.current = slides.indexOf(e.target as HTMLElement);
          setCurrent(currentRef.current);
        }),
      { threshold: 0.55 },
    );
    slides.forEach((s) => io.observe(s));

    const go = (dir: number) => {
      const next = Math.min(Math.max(currentRef.current + dir, 0), slides.length - 1);
      slides[next].scrollIntoView({ behavior: "smooth" });
    };
    const key = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div ref={root} className="h-screen snap-y snap-mandatory overflow-y-auto break-keep" id="deck">
      {/* 1 표지 */}
      <Slide dark>
        <Kicker dark>OUTDO 홈페이지 리뉴얼 · 시안 1 · 2</Kicker>
        <h1 className="mt-4 text-[52px] leading-[1.1] font-black tracking-tight md:text-[88px]">
          광고비가
          <br />
          매출로 이어지는 홈페이지
        </h1>
        <p className="mt-8 max-w-[760px] text-[22px] leading-relaxed text-white/80 md:text-[26px]">왜 이렇게 만들면 광고를 돌렸을 때 구매로 이어지는지, 마케팅 관점으로 설명드립니다.</p>
        <p className="absolute bottom-10 left-8 flex items-center gap-2 text-[16px] text-white/50 md:left-20">
          <ArrowDown className="h-4 w-4" /> 키보드 → 또는 스페이스로 넘깁니다
        </p>
      </Slide>

      {/* 2 결론 */}
      <Slide>
        <Kicker>결론부터</Kicker>
        <Title>
          광고마다 잘 맞는 도착 페이지가 따로 있습니다.
          <br />
          시안은 그 자리를 미리 만들어 둔 홈 · 상세이고,
          <br />
          숫자를 보고 OUTDO에 맞게 고쳐 갑니다.
        </Title>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            ["도착", "광고에서 본 것이 첫 화면에 그대로"],
            ["결정", "고르고 담는 길을 짧게, 망설임은 버튼 옆에서 해결"],
            ["재접촉", "안 산 사람은 다음에 다시 닿게 남김"],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl bg-neutral-100 p-7">
              <p className="text-[28px] font-black">{t}</p>
              <p className="mt-2 text-[20px] leading-relaxed text-neutral-700">{b}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 3 · 4 광고별로 잘 맞는 도착 페이지 (플레이북) */}
      {[
        { kicker: "광고 플레이북 ① · 처음 보는 사람을 데려오는 광고", title: "관심을 끈 그 장면이 도착 페이지에서 이어져야 합니다", rows: coldPlaybook, bg: "bg-neutral-50" },
        { kicker: "광고 플레이북 ② · 사려는 사람을 데려오는 광고", title: "살 마음이 있는 사람은 가장 짧은 길로 보냅니다", rows: warmPlaybook, bg: "" },
      ].map((s) => (
        <Slide key={s.kicker} className={s.bg}>
          <Kicker>{s.kicker}</Kicker>
          <Title>{s.title}</Title>
          <table className="mt-10 w-full text-left text-[18px] md:text-[20px]">
            <thead>
              <tr className="border-b-2 border-neutral-950 text-neutral-500">
                <th className="py-3 pr-6 font-medium">이런 광고는</th>
                <th className="py-3 pr-6 font-medium">이런 페이지에서 잘 됩니다</th>
                <th className="py-3 font-medium">왜</th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r) => (
                <tr key={r.ad} className="border-b border-neutral-200 align-top">
                  <td className="py-4 pr-6 font-bold">{r.ad}</td>
                  <td className="py-4 pr-6 font-medium text-shop-navy">{r.page}</td>
                  <td className="py-4 text-neutral-700">{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Slide>
      ))}

      {/* 고객 두 종류 → 시안 2개 (플레이북 ① → 시안 1, ② → 시안 2) */}
      <Slide dark>
        <Kicker dark>왜 시안이 두 개인가</Kicker>
        <Title>광고로 오는 고객은 두 종류입니다</Title>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { name: "시안 1 · 플레이북 ①", who: "OUTDO를 처음 보는 사람", ad: "메타 · 인스타그램 피드에서 사진 · 영상을 보고 들어옴", need: "'여기 뭐 하는 데지?' → 누가 쓰는 브랜드인지부터", first: "사람(선수 그리드)으로 시작" },
            { name: "시안 2 · 플레이북 ②", who: "이미 알고 찾아온 사람", ad: "브랜드 검색 · 직접 방문 · 신제품 광고로 들어옴 (이미 본 상품 광고는 상세로 바로)", need: "'뭐가 있지?' → 빨리 찾고 빨리 사기", first: "제품(히어로 · 탭)으로 시작" },
          ].map((c) => (
            <div key={c.name} className="rounded-2xl bg-white/10 p-8">
              <p className="text-[18px] font-bold text-white/60">{c.name}</p>
              <p className="mt-2 text-[32px] leading-tight font-black">{c.who}</p>
              <dl className="mt-6 space-y-4 text-[19px] leading-relaxed">
                <div>
                  <dt className="text-[15px] font-bold text-white/50">어떻게 들어오나</dt>
                  <dd>{c.ad}</dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white/50">처음 궁금한 것</dt>
                  <dd>{c.need}</dd>
                </div>
                <div>
                  <dt className="text-[15px] font-bold text-white/50">그래서 첫 화면은</dt>
                  <dd className="font-bold">{c.first}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[20px] text-white/70">디자인 취향이 아니라 ‘어떤 고객을 어떤 광고로 데려오느냐’로 고릅니다.</p>
      </Slide>

      {/* 전환을 올리는 4가지 원리 */}
      <Slide>
        <Kicker>원리</Kicker>
        <Title>구매를 막는 이유를 하나씩 없앱니다</Title>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.no} className="rounded-2xl border-2 border-neutral-950 p-7">
              <p className="text-[44px] leading-none font-black text-shop-navy">{p.no}</p>
              <p className="mt-3 text-[26px] font-black">{p.title}</p>
              <p className="mt-2 text-[19px] leading-relaxed text-neutral-700">{p.body}</p>
              <p className="mt-4 text-[16px] font-medium text-neutral-500">시안에서 · {p.where}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 6 시안 1 시연 */}
      <Slide>
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Kicker>시안 1 · 처음 보는 사람을 손님으로</Kicker>
            <Title>알게 하고 → 믿게 하고 → 고르게 하고 → 남깁니다</Title>
            <ol className="mt-10 space-y-5 text-[20px] leading-relaxed">
              <li>
                <b>알게 하기</b> — 로고 대신 크로스핏 선수 착용컷. 첫 화면만 보고도 ‘크로스핏 장비 브랜드’
              </li>
              <li>
                <b>믿게 하기</b> — ‘아시아 최대 규모 SUFF 크로스핏 대회의 파트너’(현재 OUTDO 홈 문구) 영상
              </li>
              <li>
                <b>고르게 하기</b> — 신제품 · BEST · 컬러별 · 기어 가이드(그립 · 니슬리브) · 카테고리 · 종목별. 사는 이유대로 입구를 나눔
              </li>
              <li>
                <b>남기기</b> — 박스 문의, 그리고 오늘 안 사는 사람은 카카오 채널로
              </li>
            </ol>
          </div>
          <Phone src="/samples/home" label="시안 1 홈" />
        </div>
      </Slide>

      {/* 7 시안 1 광고 → 도착 */}
      <Slide>
        <Kicker>시안 1 · 광고 운영</Kicker>
        <Title>광고 하나하나에 도착할 자리가 있습니다</Title>
        <FlowTable rows={draft1Flows} />
      </Slide>

      {/* 8 시안 2 시연 */}
      <Slide className="bg-neutral-50">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Kicker>시안 2 · 알고 찾아온 사람을 바로 구매로</Kicker>
            <Title>보자마자 고르고, 브랜드 이야기로 확신을 줍니다</Title>
            <ol className="mt-10 space-y-5 text-[20px] leading-relaxed">
              <li>
                <b>바로 보기</b> — 첫 화면에 지금 밀고 있는 제품(신제품 · 할인 광고와 같은 제품). 맨 위에 ‘6만 원 이상 무료 배송 · 오후 2시 전 결제 당일 출고’
              </li>
              <li>
                <b>빨리 고르기</b> — 그립 · 벨트 · 니슬리브 탭, 종목 탭, 컬러 점으로 옵션 미리 확인
              </li>
              <li>
                <b>확신 주기</b> — 브랜드 문장, 박스 공간까지 만드는 TAILORED SERVICE, SUFF 대회 파트너
              </li>
              <li>
                <b>남기기</b> — 카카오 채널
              </li>
            </ol>
          </div>
          <Phone src="/samples/draft2/home" label="시안 2 홈" />
        </div>
      </Slide>

      {/* 9 시안 2 광고 → 도착 */}
      <Slide className="bg-neutral-50">
        <Kicker>시안 2 · 광고 운영</Kicker>
        <Title>구매 의도가 있는 광고를 놓치지 않습니다</Title>
        <FlowTable rows={draft2Flows} />
      </Slide>

      {/* 10 상세 */}
      <Slide>
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <Kicker>상세페이지 · 시안 1 · 2 공통</Kicker>
            <Title>담기까지의 거리를 줄입니다</Title>
            <table className="mt-8 w-full text-left text-[17px]">
              <thead>
                <tr className="border-b-2 border-neutral-950 text-neutral-500">
                  <th className="py-2 pr-4 font-medium">지금</th>
                  <th className="py-2 pr-4 font-medium">시안</th>
                  <th className="py-2 font-medium">그래서</th>
                </tr>
              </thead>
              <tbody>
                {detailChanges.map((d) => (
                  <tr key={d.before} className="border-b border-neutral-200 align-top">
                    <td className="py-3 pr-4 text-neutral-500">{d.before}</td>
                    <td className="py-3 pr-4 font-bold">{d.after}</td>
                    <td className="py-3 text-neutral-700">{d.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Phone src="/samples/draft2/detail" label="시안 2 상세" />
        </div>
      </Slide>

      {/* 11 캠페인 하나 따라가기 */}
      <Slide dark>
        <Kicker dark>예시 · 오렌지 컬러 캠페인 하나를 따라가 보면</Kicker>
        <Title>광고 한 번이 구매와 다음 연락까지 이어집니다</Title>
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {scenario.map((s, i) => (
            <li key={s.who} className="relative rounded-2xl bg-white/10 p-6">
              <p className="text-[15px] font-bold text-white/50">{i + 1}</p>
              <p className="mt-1 text-[22px] font-black">{s.who}</p>
              <p className="mt-3 text-[17px] leading-relaxed text-white/80">{s.what}</p>
              {i < scenario.length - 1 && <ArrowRight className="absolute top-1/2 -right-4 z-10 hidden h-6 w-6 -translate-y-1/2 text-white/60 md:block" />}
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          {/* 오렌지 칸의 실제 5개 제품을 나란히 — '그 색 상품들이 모인 곳'을 눈으로 */}
          <ul className="flex gap-2">
            {orangeItems.map((it) => (
              <li key={it.name} className="w-[88px]">
                <div className="relative h-[88px] w-[88px] overflow-hidden rounded-xl bg-[#ffe2cf]">
                  <Image src={it.image} alt={it.name} fill sizes="88px" className="object-contain p-1.5 mix-blend-multiply" />
                </div>
                <p className="mt-1.5 text-center text-[13px] leading-tight text-white/80">{it.name}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-[620px] text-[19px] text-white/80">
            컬러별로 모아 둔 도착지가 있어야 컬러 광고를 그 색 상품들이 모인 곳으로 바로 보낼 수 있습니다. 실제 오픈 때는 컬러 칸이 그 색 상품만 모은 목록으로 이어집니다.
          </p>
        </div>
      </Slide>

      {/* 12 숫자로 확인하고 고친다 */}
      <Slide>
        <Kicker>만들고 끝이 아닙니다</Kicker>
        <Title>데이터가 쌓이면, 데이터에 맞게 고칩니다</Title>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p className="text-[22px] font-black">이미 있는 쇼핑몰 데이터로도</p>
            <ul className="mt-3 space-y-2 text-[18px] text-neutral-700">
              <li>• 함께 팔리는 상품 → 추천 줄 · 묶음 구성</li>
              <li>• 많이 팔리는 컬러 · 사이즈 → 홈 노출 · 컬러 광고</li>
              <li>• 반복되는 질문 · 불만(리뷰 · 문의) → 상세 안내 · FAQ</li>
              <li>• 잘 안 팔리는 상품 · 재고 → 노출 · 광고 조정</li>
            </ul>
            <p className="mt-6 text-[22px] font-black">측정을 켜면 더</p>
            <ul className="mt-3 space-y-2 text-[18px] text-neutral-700">
              <li>• 섹션까지 본 사람 · 누른 사람 · 담고 산 사람</li>
              <li>• 어느 광고로 온 사람이었나</li>
            </ul>
          </div>
          <div>
            <p className="text-[22px] font-black">숫자를 보고 이렇게 바꿉니다</p>
            <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
              {scorecard.map((s) => (
                <li key={s.see} className="grid gap-1 py-4 md:grid-cols-2 md:gap-6">
                  <p className="text-[19px] font-bold">{s.see}</p>
                  <p className="text-[19px] text-neutral-700">{s.then}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[16px] text-neutral-500">첫 화면 같은 핵심 자리는 A안 · B안을 반씩 보여주고 더 잘 팔리는 쪽을 남기는 시험도 할 수 있습니다.</p>
          </div>
        </div>
        <p className="mt-8 rounded-xl bg-neutral-100 p-5 text-[17px] leading-relaxed text-neutral-700">
          OUTDO에 지금 어떤 데이터가 쌓이고 있는지는 모릅니다. 광고 추적 도구가 없어도 쇼핑몰 데이터로 시작할 수 있고, 데이터가 충분히 쌓이면 데이터가 가리키는 대로 페이지를 바꿉니다. 빠르게 운영하는 곳은 1~2주 단위로도 바꾸지만, 비교할 만큼 데이터가 충분할 때만 가능합니다.
        </p>
      </Slide>

      {/* 13 대회 캘린더 — 다시 올 이유와 살 시점 */}
      <Slide dark>
        <Kicker dark>대회 일정 · 공지</Kicker>
        <Title>대회 캘린더로 다시 올 이유와 살 시점을 만듭니다</Title>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {competitionWhy.map((c) => (
              <li key={c.title} className="rounded-2xl bg-white/10 p-6">
                <p className="text-[22px] font-black">{c.title}</p>
                <p className="mt-2 text-[17px] leading-relaxed text-white/80">{c.body}</p>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-[16px] font-bold text-white/60">지금 기준 예시 · 2026년 10월 21일 확인</p>
            <ul className="mt-3 space-y-3">
              {competitions.map((c) => (
                <li key={c.name} className="flex items-center gap-5 rounded-2xl bg-white p-5 text-neutral-950">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-shop-navy text-center text-white">
                    <DDay date={c.date} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[22px] font-black">{c.name}</p>
                    <p className="text-[17px] font-medium">
                      {c.when} · {c.place}
                    </p>
                    <p className="mt-1 text-[15px] text-neutral-500">{c.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] text-white/60">일정은 주최 측 공식 공지 기준으로만 올리고, 지난 대회는 바로 내립니다(운영 점검에 포함).</p>
          </div>
        </div>
      </Slide>

      {/* 14 운영 · 유지보수 — 대시보드 + Claude로 매주 개선 */}
      <Slide className="bg-neutral-50">
        <Kicker>운영 · 유지보수</Kicker>
        <Title>오픈 후에는 데이터를 보고 고쳐 갑니다</Title>
        <p className="mt-4 max-w-[900px] text-[20px] leading-relaxed text-neutral-700">
          쇼핑몰에 쌓이는 데이터를 대시보드로 모아 보고, 무엇을 바꿀지 정리한 제안으로 사이트를 고칩니다. 대시보드와 제안은 AI(Claude)로 빠르게 만들어 드립니다.
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {careLoop.map((c, i) => (
            <li key={c.step} className="relative rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-[15px] font-bold text-neutral-400">{i + 1}</p>
              <p className="mt-1 text-[28px] font-black">{c.step}</p>
              <p className="mt-3 text-[18px] leading-relaxed text-neutral-700">{c.body}</p>
              {i < careLoop.length - 1 && <ArrowRight className="absolute top-1/2 -right-4 z-10 hidden h-6 w-6 -translate-y-1/2 text-neutral-400 md:block" />}
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <p className="text-[20px] font-black">예를 들면</p>
          <ul className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200">
            {careExamples.map((e) => (
              <li key={e.data} className="grid gap-1 py-2 md:grid-cols-2 md:gap-6">
                <p className="text-[18px] font-bold">{e.data}</p>
                <p className="text-[18px] text-neutral-700">→ {e.fix}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] text-neutral-500">고치는 주기는 데이터가 쌓이는 속도에 맞춥니다. 제안은 확인한 뒤 반영합니다.</p>
        </div>
      </Slide>

      {/* 16 앞으로 함께 정해 갈 것 */}
      <Slide dark>
        <Kicker dark>다음 단계</Kicker>
        <Title>앞으로 함께 정해 갈 것</Title>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {nextSteps.map((s) => (
            <div key={s.when} className="rounded-2xl bg-white/10 p-6">
              <p className="text-[24px] font-black">{s.when}</p>
              <ul className="mt-4 space-y-4">
                {s.items.map((it) => (
                  <li key={it.title}>
                    <p className="text-[18px] font-bold">{it.title}</p>
                    <p className="mt-1 text-[16px] leading-relaxed text-white/75">{it.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-[16px]">
          {[
            ["/samples/home", "시안 1 홈"],
            ["/samples/detail", "시안 1 상세"],
            ["/samples/draft2/home", "시안 2 홈"],
            ["/samples/draft2/detail", "시안 2 상세"],
          ].map(([href, text]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-white/40 px-5 py-2.5 hover:bg-white hover:text-shop-navy">
              {text} 열기
            </a>
          ))}
        </div>
      </Slide>

      {/* 장 번호 */}
      <div className="pointer-events-none fixed right-6 bottom-6 z-50 rounded-full bg-neutral-950/70 px-4 py-2 text-[14px] font-medium text-white tabular-nums">
        {current + 1} / {total || 16}
      </div>
    </div>
  );
}
