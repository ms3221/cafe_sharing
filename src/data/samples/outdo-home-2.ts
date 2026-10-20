// 시안 2 홈 재료 — Velites 홈(eu.velitessport.com) 구조: 제품 진열 + 기술 스토리
// 상품 · 가격 · 사진은 시안 1 재료(outdo-home.ts)를 같이 쓴다
// 문장은 새로 쓰지 않는다: 현재 홈 · 브리즈 벨트 상세 이미지 · TAILORED SERVICE 섹션(사용자 캡처 10/20)에 있는 문구만
import type { SectionNote } from "./renewal-notes";
import { products, suffVideo, type Photo, type Product } from "./outdo-home";

const P = "/assets/outdo-home/products";
const CROP = "/assets/breeze-belt/crops";

// 현재 상세 18번 이미지 배송 안내
export const announcements = ["60,000원 이상 무료 배송", "오후 2시 이전 결제 시 당일 출고", "OUTDO THE BEST"];

// 히어로 슬라이드. 바탕 = 제품 컬러에서 뽑은 옅은 색 (누끼 흰 바탕은 곱하기로 지움)
export const heroSlides = [
  {
    name: "브리즈 벨트",
    // 상세 03 이미지 헤드카피 · 상세 POINT 2 수치
    headline: "움직임은 가볍게, 리프팅은 강하게.",
    sub: "브리즈 벨트 · 238g · 6.9mm",
    image: `${CROP}/color-pink.jpg`,
    stage: "#f6dbe6",
    href: "/samples/draft2/detail",
    cta: "구매하기",
  },
  {
    name: "리프팅벨트",
    // 브리즈 벨트 상세 11~12 '아웃두 벨트 한눈에 비교하기'의 리프팅 벨트 설명
    headline: "고중량 스쿼트 · 데드리프트 등 리프팅 전용",
    sub: `리프팅벨트 · ${products.liftingBelt.sale?.rate}% ${products.liftingBelt.sale?.price.toLocaleString("ko-KR")}원`,
    image: `${P}/p29-a.jpg`,
    stage: "#dde8e2",
    href: `https://www.outdothebest.com/shop_view/?idx=${products.liftingBelt.idx}`,
    cta: "구매하기",
  },
];

// 파트너 로고 띠. 로고 이미지가 아직 없어 이름만 (파트너 박스 로고는 현재 사이트 ABOUT PARTNER BOX에서 받기)
export const partners: { name: string; logo?: string }[] = [{ name: "SUFF" }];
export const PARTNER_SLOTS = 6;

// 옵션 컬러 이름 → 칩 색. 상품 사진에서 눈대중으로 뽑은 대략색 (확인 필요)
export const colorHex: Record<string, string> = {
  그린: "#3f8f5a",
  그레이: "#9a9a9a",
  핑크: "#e7a6c2",
  화이트: "#f4f4f4",
  오렌지: "#f26b1d",
  블루: "#2b6fd6",
  카키: "#59613a",
  퍼플옐로우: "#8a63d2",
  민트라벤더: "#9fd9c8",
  코튼캔디: "#f4b6d2",
  선셋오렌지: "#ff8a4c",
  블루레몬: "#4aa3e0",
  민트: "#8fd6c4",
  블랙: "#141414",
  옐로우: "#f2d23c",
};

// 제품 탭. BEST는 현재 홈 BEST 4개 그대로, 나머지는 카테고리 묶음
export const shelfTabs: { name: string; items: Product[] }[] = [
  { name: "BEST", items: [products.liftingBelt, products.bench, products.synergy, products.flex] },
  { name: "그립", items: [products.synergy, products.alpha, products.nano, products.nanoPlus, products.janus] },
  { name: "벨트", items: [products.liftingBelt, products.breeze] },
  { name: "니슬리브", items: [products.neopro, products.dualguard, products.flex] },
  { name: "손목 · 기타", items: [products.wristWrap, products.wristBand, products.sweatband, products.strap, products.tape, products.rope] },
];

// 카테고리 타일 4장. 옅은 단색 바탕 위에 대표 상품
export const categoryTiles = [
  { name: "그립", image: products.nano.image, stage: "#cfdcf6", count: 5 },
  { name: "벨트", image: products.liftingBelt.image, stage: "#f6d9df", count: 2 },
  { name: "니슬리브", image: products.neopro.image, stage: "#f2e3ad", count: 3 },
  { name: "액세서리", image: products.wristWrap.image, stage: "#d3e6d8", count: 7 },
];

// 종목 탭 (시안 1 Shop by Movement와 같은 묶음)
export const movementTabs: { name: string; ko: string; items: Product[] }[] = [
  { name: "GYMNASTICS", ko: "풀업 · 토투바 · 링", items: [products.nano, products.synergy, products.tape, products.alpha] },
  { name: "WEIGHTLIFTING", ko: "스내치 · 클린 · 스쿼트", items: [products.liftingBelt, products.wristWrap, products.strap, products.neopro] },
  { name: "CONDITIONING", ko: "줄넘기 · 박스 점프 · 러닝", items: [products.rope, products.sweatband, products.breeze, products.flex] },
];

// 현재 홈 문구 그대로
export const statement = {
  title: "OUTDO THE BEST",
  body: "모든 크로스핏터들의 최고의 퍼포먼스 순간을 서포트하는 최고의 파트너가 되어드리고픈 마음을 담아 제작했습니다.",
};

// TAILORED SERVICE 카드 — Velites 'View project' 자리. 문구는 현재 홈 섹션(사용자 캡처) 그대로
// 카드 이미지는 아임웹 CDN 주소 그대로 (사용자 제공 10/20). 이미지 한 장에 사진 + 글자가 같이 들어 있어
// 화면에서는 위쪽 사진 부분만 보이게 자른다 (1280×1379 중 위 약 785px)
// WATCH는 영상이 아니라 현재 사이트 소개 페이지 링크 (현재 홈 위젯 HTML 기준: /FitSpace · /BrandingMyBox · /41)
export interface Story {
  label: string;
  title: string;
  body: string;
  note?: string;
  photo: Photo;
  href: string;
}

const TAILORED_CDN = "https://cdn.imweb.me/thumbnail/20250410";
export const STORY_PHOTO_RATIO = "1280 / 785";

export const stories: Story[] = [
  {
    label: "STEP 1",
    title: "FIT SPACE",
    body: "현재 설정하신 매장의 도면을 바탕으로 최적화된 공간설계 및 필요 기구 산출을 도와드립니다.",
    note: "OUTDO는 “Studio SADA” 와 함께 합니다.",
    photo: { src: `${TAILORED_CDN}/a0adbd0757f48.png` },
    href: "https://www.outdothebest.com/FitSpace",
  },
  {
    label: "STEP 2",
    title: "BRANDING MY BOX",
    body: "구성하신 인테리어 컨셉과 OUTDO 기구를 완벽히 조합해, 나만의 센터를 더 멋지고 특별하게 만들어보세요.",
    note: "OUTDO는 “Studio SADA” 와 함께 합니다.",
    photo: { src: `${TAILORED_CDN}/2da43857f4351.png` },
    href: "https://www.outdothebest.com/BrandingMyBox",
  },
  {
    label: "STEP 3",
    title: "COMING SOON",
    body: "OUTDO의 또 다른 서비스",
    note: "해당 서비스는 곧 오픈 예정입니다.",
    photo: { src: `${TAILORED_CDN}/a942a44be0fce.png` },
    href: "https://www.outdothebest.com/41",
  },
];

export const tailored = {
  title: "TAILORED SERVICE",
  sub: "TAILORED SERVICE는 당신의 박스를 단 10분만에 완성시켜드립니다.",
  href: "https://www.outdothebest.com/TAILOREDSERVICE",
};

export { suffVideo };

// 현재 홈 문구
export const suff = {
  label: "OFFICIAL PARTNER",
  title: "OUTDO는 아시아 최대 규모 SUFF 크로스핏 대회의 파트너 입니다.",
  product: products.suff,
};

export const home2Notes: SectionNote[] = [
  {
    id: "announce",
    label: "공지 띠",
    before: "배송 조건은 상세 맨 끝 이미지에만 있음.",
    after: "맨 위에 무료 배송 기준 · 당일 출고를 흐르는 띠로.",
    why: "구매를 망설이게 하는 배송비 · 배송 시점을 들어오자마자 보여줍니다. 문구는 현재 배송 안내 그대로입니다.",
    ref: "Velites 상단 공지 띠",
  },
  {
    id: "hero",
    label: "히어로 슬라이드",
    before: "첫 화면이 검은 바탕 OUTDO 로고 이미지 한 장.",
    after: "제품을 크게 보여주는 슬라이드 2장 (브리즈 벨트 · 리프팅벨트). 바탕은 제품 컬러에서 뽑은 색.",
    why: "시안 1이 사람으로 시작한다면 시안 2는 제품으로 시작합니다. 광고에서 본 제품이 첫 화면에 그대로 있어 바로 구매로 이어집니다. 시즌마다 슬라이드만 바꿉니다.",
    ref: "Velites 홈 히어로",
  },
  {
    id: "partners",
    label: "파트너 로고 띠",
    before: "SUFF 파트너 문구가 홈 중간 영상 위에만.",
    after: "히어로 바로 아래 파트너 로고가 흐르는 띠. 지금은 SUFF만 이름으로, 나머지는 로고를 받을 자리.",
    why: "'누가 이 장비를 쓰는가'를 로고 한 줄로 증명합니다. ABOUT PARTNER BOX의 박스 로고가 들어가면 국내 박스들이 쓰는 브랜드라는 근거가 됩니다.",
    ref: "Velites 파트너 로고 띠",
  },
  {
    id: "shelf",
    label: "제품 탭",
    before: "BEST 4개 슬라이드, 같은 상품이 두 번씩 반복.",
    after: "BEST · 그립 · 벨트 · 니슬리브 · 손목 · 기타 탭. 연회색 카드에 컬러 점.",
    why: "탭 하나로 원하는 종류만 바로 봅니다. 컬러 점으로 몇 가지 색이 있는지 목록에서 미리 압니다. 아임웹 상품 목록 위젯 + 탭으로 구현할 수 있는 구조입니다.",
    ref: "Velites Bestsellers 탭",
  },
  {
    id: "categories",
    label: "카테고리 타일",
    before: "상단 메뉴 SHOP 하위에만 Strength · Conditioning · Accessories.",
    after: "그립 · 벨트 · 니슬리브 · 액세서리 큰 단색 타일 4장.",
    why: "고객이 찾는 말(그립, 니슬리브)로 나눈 큰 입구입니다. 타일 색은 광고 소재 색과 맞출 수 있습니다.",
    ref: "Velites Categories 타일",
  },
  {
    id: "movement",
    label: "종목 탭",
    before: "STRENGTH · CONDITIONING · ACCESSORIES 배너 3장 (글자가 이미지에 박힘).",
    after: "GYMNASTICS · WEIGHTLIFTING · CONDITIONING 탭으로 종목별 장비 줄.",
    why: "Velites는 이 자리에 Women · Men 의류 줄을 두지만, OUTDO는 장비라서 종목으로 나눴습니다. 크로스핏터는 '오늘 무슨 종목이냐'로 장비를 삽니다.",
    ref: "Velites Women · Men 탭 줄",
  },
  {
    id: "statement",
    label: "브랜드 선언",
    before: "'OUTDO THE BEST' 문구가 해변 사진 위 4번째 섹션.",
    after: "제품을 다 본 뒤 큰 글씨로 브랜드 문장. 문구는 현재 홈 그대로.",
    why: "제품을 먼저 보고 나면 '누가 만드는가'가 궁금해집니다. 그때 브랜드 이야기를 꺼냅니다.",
    ref: "Velites 'We are Made, not Born'",
  },
  {
    id: "stories",
    label: "TAILORED SERVICE",
    before: "TAILORED SERVICE 3단계 카드(FIT SPACE · BRANDING MY BOX · COMING SOON)가 홈 두 번째 섹션. 카드 글자가 이미지에 박혀 있음.",
    after: "같은 3단계를 브랜드 선언 바로 아래로. 사진은 현재 이미지 그대로 쓰고 글자는 텍스트로 꺼냄. WATCH는 지금처럼 각 소개 페이지로.",
    why: "제품을 다 본 뒤 'OUTDO는 장비부터 박스 공간까지 만드는 브랜드'라는 이야기로 이어집니다. 개인 고객이 대부분이라 두 번째 섹션에서는 내렸고, 글자를 텍스트로 꺼내 검색 · 번역 · 수정이 됩니다. 문구는 현재 섹션 그대로입니다.",
    ref: "Velites 'View project' 카드",
  },
  {
    id: "campaign",
    label: "SUFF 영상",
    before: "홈 중간, SUFF 대회 유튜브 영상이 배경으로 깔린 섹션 + 같은 문구.",
    after: "같은 영상을 화면 가득, 문구는 왼쪽 아래 + 2025 SUFF SET 바로가기.",
    why: "공식 파트너는 가장 강한 신뢰 근거입니다. 이미 있는 영상 자산을 그대로 씁니다.",
    ref: "Velites 'Endless road' 캠페인",
  },
  {
    id: "signup",
    label: "알림 받기",
    before: "없음. 하단에 INSTAGRAM 링크만.",
    after: "푸터 바로 위 카카오 채널 · 인스타그램.",
    why: "광고로 온 사람 중 바로 안 사는 사람을 붙잡는 장치. 채널 친구 = 다음 신제품 때 무료로 다시 닿는 리스트입니다.",
    ref: "Velites 푸터 뉴스레터",
  },
];
