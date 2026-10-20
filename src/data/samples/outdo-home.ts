// OUTDO 홈 리뉴얼 시안 재료
// 상품명·가격·옵션은 outdothebest.com/shop 기준 (2026-10-20 확인)
// 문장은 새로 쓰지 않는다: 현재 홈에 있는 원본 문구, 숫자, 상품명만 쓴다
import type { SectionNote } from "./renewal-notes";

const P = "/assets/outdo-home/products";
const SITE = "/assets/outdo-home/site";
const STAND = "/assets/outdo-home/standin";
const CROP = "/assets/breeze-belt/crops";

export const shopUrl = (idx: number) => `https://www.outdothebest.com/shop_view/?idx=${idx}`;

export interface Product {
  idx: number;
  name: string;
  price: number;
  sale?: { rate: number; price: number };
  image: string;
  hover?: string;
  colors: string[];
  sizes?: string;
  reviews?: number;
}

const img = (idx: number, ext = "jpg") => ({ image: `${P}/p${idx}-a.${ext}`, hover: `${P}/p${idx}-b.${ext}` });

export const products: Record<string, Product> = {
  liftingBelt: { idx: 29, name: "리프팅벨트", price: 51900, sale: { rate: 20, price: 41520 }, ...img(29), colors: ["그린", "그레이", "핑크", "화이트"], sizes: "XS–XL" },
  breeze: { idx: 108, name: "브리즈 벨트", price: 48000, image: `${P}/p108-a.jpg`, colors: ["핑크", "오렌지", "블루"], sizes: "XS–L" },
  synergy: { idx: 232, name: "시너지 그립 V2", price: 61900, ...img(232, "png"), colors: ["카키"], sizes: "M / L / XL" },
  alpha: { idx: 219, name: "알파 그립 3.8", price: 57000, ...img(219), colors: ["퍼플옐로우", "민트라벤더"], sizes: "M / L" },
  nano: { idx: 222, name: "나노 그립", price: 52000, ...img(222), colors: ["코튼캔디", "선셋오렌지", "오렌지", "블루레몬"], sizes: "M / L", reviews: 67 },
  nanoPlus: { idx: 106, name: "나노(+) 그립", price: 52000, ...img(106), colors: ["오렌지", "블루레몬"], sizes: "M / L", reviews: 30 },
  janus: { idx: 32, name: "야누스 그립", price: 42000, ...img(32), colors: ["블루"], sizes: "M / L / XL" },
  dualguard: { idx: 109, name: "듀얼가드 니슬리브", price: 32000, ...img(109), colors: ["민트", "블루"], sizes: "S / M / L" },
  neopro: { idx: 110, name: "네오프로 니슬리브", price: 38000, ...img(110), colors: ["블랙", "오렌지"], sizes: "XS–L" },
  flex: { idx: 30, name: "플렉스 니슬리브", price: 27000, ...img(30), colors: ["블랙", "화이트", "블루"], sizes: "S / M / L" },
  wristWrap: { idx: 111, name: "리스트 랩", price: 19000, ...img(111), colors: ["블랙", "카키"] },
  wristBand: { idx: 113, name: "리스트 밴드", price: 12900, ...img(113), colors: ["블랙", "블루"] },
  sweatband: { idx: 112, name: "스웻밴드 프로", price: 12900, ...img(112), colors: ["블랙", "옐로우", "블루", "오렌지"] },
  strap: { idx: 114, name: "리프팅 스트랩", price: 14900, ...img(114), colors: [] },
  tape: { idx: 115, name: "훅그립 테이프", price: 3300, ...img(115), colors: ["옐로우", "블랙"] },
  rope: { idx: 116, name: "볼티코 스피드 로프", price: 74000, ...img(116), colors: [] },
  suff: { idx: 120, name: "2025 SUFF SET", price: 16900, ...img(120), colors: [] },
  bench: { idx: 60, name: "아웃두 T 플랫벤치", price: 306000, ...img(60), colors: [] },
};

const all = Object.values(products);

// 현재 홈 BEST 4개 그대로
export const best = [products.liftingBelt, products.bench, products.synergy, products.flex];

// 사진 출처. standIn = 사진이 없어 무료 사진(Pexels)으로 대신 넣은 자리
export interface Photo {
  src: string;
  standIn?: string;
}

const stand = (id: string, need: string): Photo => ({ src: `${STAND}/px-${id}.jpg`, standIn: need });

export const heroGrid: Photo[] = [
  { src: `${SITE}/bg-adde45beafc3b.jpg` },
  stand("7673600", "링 · 풀업 착용컷"),
  { src: `${CROP}/athlete-wod.jpg` },
  stand("34794710", "리스트 랩 착용컷"),
  { src: `${CROP}/squat-back.jpg` },
  stand("4720310", "물구나무 · 그립 착용컷"),
  stand("1552248", "박스 점프 · 니슬리브"),
  { src: `${SITE}/bg-14e1c05a22068.jpg` },
  stand("9943222", "줄넘기 · 스웻밴드"),
  { src: `${CROP}/deadlift.jpg` },
  stand("32317373", "오버헤드 · 리스트 랩"),
  { src: `${CROP}/hold-belt.jpg` },
];

export const features = [
  {
    eyebrow: "NEW",
    title: "브리즈 벨트",
    sub: "238g · 6.9mm",
    photo: { src: `${CROP}/hold-belt.jpg` } as Photo,
    href: "/samples/v2/skims",
    cta: "구매하기",
  },
  {
    eyebrow: "GRIP",
    title: "시너지 그립 V2",
    sub: "M / L / XL · 카키",
    photo: stand("4164645", "시너지 그립 V2 착용컷"),
    href: shopUrl(232),
    cta: "구매하기",
  },
];

// 상품 옵션 컬러를 묶어서. 칩 색은 사진에서 뽑은 대표색
const has = (...names: string[]) => all.filter((p) => p.colors.some((c) => names.some((n) => c.includes(n)))).length;

export const shopColors = [
  { name: "블랙", chip: "#141414", image: `${P}/p110-b.jpg`, count: has("블랙") },
  { name: "오렌지", chip: "#f26b1d", image: `${P}/p106-a.jpg`, count: has("오렌지") },
  { name: "블루", chip: "#2b6fd6", image: `${P}/p32-a.jpg`, count: has("블루") },
  { name: "민트", chip: "#8fd6c4", image: `${P}/p109-a.jpg`, count: has("민트") },
  { name: "핑크", chip: "#e7a6c2", image: `${CROP}/color-pink.jpg`, count: has("핑크") },
  { name: "카키", chip: "#59613a", image: `${P}/p232-a.png`, count: has("카키") },
];

// 스킴스 '컬렉션 가이드' 자리. 설명 대신 고를 때 필요한 사실(사이즈·컬러·가격)만
export const guides = [
  { title: "그립", items: [products.synergy, products.alpha, products.nano, products.nanoPlus, products.janus] },
  { title: "니슬리브", items: [products.neopro, products.dualguard, products.flex] },
];

export const categories = [
  { name: "그립", image: products.nano.image, items: [products.synergy, products.alpha, products.nano, products.nanoPlus, products.janus] },
  { name: "벨트", image: products.liftingBelt.image, items: [products.liftingBelt, products.breeze] },
  { name: "니슬리브", image: products.flex.image, items: [products.neopro, products.dualguard, products.flex] },
  { name: "손목", image: products.wristWrap.image, items: [products.wristWrap, products.wristBand, products.sweatband] },
  { name: "스트랩 · 테이프", image: products.strap.image, items: [products.strap, products.tape] },
  { name: "줄넘기", image: products.rope.image, items: [products.rope] },
  { name: "장비", image: products.bench.image, items: [products.bench] },
];

// 현재 홈의 STRENGTH · CONDITIONING · ACCESSORIES 배너를 종목 기준으로
export const movements = [
  { name: "GYMNASTICS", ko: "풀업 · 토투바 · 링", photo: stand("4164648", "링 · 그립 착용컷"), items: [products.nano, products.synergy, products.tape] },
  { name: "WEIGHTLIFTING", ko: "스내치 · 클린 · 스쿼트", photo: { src: `${SITE}/bg-adde45beafc3b.jpg` } as Photo, items: [products.liftingBelt, products.wristWrap, products.strap, products.neopro] },
  { name: "CONDITIONING", ko: "줄넘기 · 박스 점프 · 러닝", photo: stand("9943222", "줄넘기 · 스웻밴드"), items: [products.rope, products.sweatband, products.breeze] },
];

export const sitePhotos = {
  suff: `${SITE}/bg-7dc019f8e8f64.jpg`,
  box: `${SITE}/bg-14e1c05a22068.jpg`,
};

// 현재 홈에 있는 문구 그대로
export const copy = {
  slogan: "OUTDO THE BEST",
  brand: "모든 크로스핏터들의 최고의 퍼포먼스 순간을 서포트하는 최고의 파트너가 되어드리고픈 마음을 담아 제작했습니다.",
  suff: "OUTDO는 아시아 최대 규모 SUFF 크로스핏 대회의 파트너 입니다.",
  boxTitle: "나만의 BOX를 만들어보세요.",
  boxSub: "TAILORED SERVICE는 당신의 박스를 단 10분만에 완성시켜드립니다.",
};

export const homeNotes: SectionNote[] = [
  {
    id: "grid",
    label: "선수 그리드",
    before: "첫 화면이 검은 바탕 OUTDO 로고 이미지 한 장.",
    after: "운동하는 사람 12컷 그리드. 노란 '대체 사진' 표시는 사진이 없어 무료 사진으로 채운 자리.",
    why: "로고는 이미 아는 사람에게만 의미가 있습니다. 광고로 처음 온 사람에게 '크로스핏하는 사람들이 쓰는 브랜드'를 3초 안에 보여줍니다. 대체 사진 자리는 엠버서더 촬영 리스트로 그대로 씁니다.",
    ref: "나이키 스킴스 'Body Obsessed' 24인 그리드",
  },
  {
    id: "intro",
    label: "브랜드 한 줄",
    before: "'OUTDO THE BEST' 문구가 4번째 섹션, 해변 사진 위.",
    after: "그리드 바로 아래에 슬로건 + 원본 문구 + 바로가기 버튼.",
    why: "글은 원본 그대로 두고 위치만 앞으로. 버튼으로 바로 쇼핑과 종목별 보기로 갈라 줍니다.",
    ref: "나이키 스킴스 '올데이 유니폼' 소개",
  },
  {
    id: "feature",
    label: "신제품 카드",
    before: "신제품 소개 영역 없음. 브리즈 벨트는 SHOP 목록 안에만.",
    after: "NEW 브리즈 벨트 · 시너지 그립 V2 카드 2장.",
    why: "홈에서 지금 밀고 싶은 상품을 고정으로 노출. 광고 소재와 같은 카드라 광고 → 홈 → 상세 흐름이 끊기지 않습니다. 시즌마다 카드만 교체.",
    ref: "나이키 스킴스 '셰르파 & 크런치 나일론 · 시즌 컬러' 카드",
  },
  {
    id: "best",
    label: "BEST",
    before: "BEST 4개, 같은 상품이 슬라이드에서 두 번씩 반복.",
    after: "같은 4개를 2열 그리드로. 마우스를 올리면(PC) 두 번째 사진.",
    why: "인기 상품은 그대로 두되 반복을 없애 한눈에 보이게. 아임웹 상품 목록 위젯으로 바로 구현됩니다.",
  },
  {
    id: "color",
    label: "Shop by Color",
    before: "없음.",
    after: "상품 옵션 컬러를 6개로 묶어 컬러별 보기. 칸마다 해당 컬러 상품 수.",
    why: "그립 · 니슬리브 · 벨트를 맞춰 사는 고객이 많은 카테고리라 '컬러 깔맞춤'이 구매 이유가 됩니다. 컬러별 묶음 = 세트 할인 · 컬러 광고 소재로 연결.",
    ref: "나이키 스킴스 Shop by Color",
  },
  {
    id: "guide",
    label: "그립 · 니슬리브 가이드",
    before: "없음. 그립 5종이 목록에 나란히 있어 차이를 알 수 없음.",
    after: "그립 5종, 니슬리브 3종을 이름 · 사이즈 · 컬러 · 가격으로 한 줄씩.",
    why: "같은 카테고리 상품이 많을수록 '뭐가 다른데?'에서 이탈합니다. 한 줄 설명은 상품팀이 채울 자리로 비워 두고 지금은 사실만 넣었습니다.",
    ref: "나이키 스킴스 컬렉션 가이드",
  },
  {
    id: "category",
    label: "Shop by Category",
    before: "상단 메뉴 SHOP 하위에만 Strength · Conditioning · Accessories.",
    after: "그립 · 벨트 · 니슬리브 · 손목 · 스트랩 · 줄넘기 · 장비 7칸.",
    why: "Strength / Accessories는 브랜드 기준 분류라 고객이 찾는 말(그립, 니슬리브)과 다릅니다. 고객이 검색하는 단어로 나눕니다.",
    ref: "나이키 스킴스 Shop by Category",
  },
  {
    id: "movement",
    label: "Shop by Movement",
    before: "STRENGTH · CONDITIONING · ACCESSORIES 배너 3장 (글자가 이미지에 박힘).",
    after: "GYMNASTICS · WEIGHTLIFTING · CONDITIONING. 종목마다 쓰는 장비 상품을 바로 아래에.",
    why: "크로스핏터는 '오늘 무슨 종목이냐'로 장비를 삽니다. 종목 = 광고 타겟 단위라 광고에서 바로 이 섹션으로 보낼 수 있습니다.",
    ref: "나이키 스킴스 Shop by Movement",
  },
  {
    id: "partner",
    label: "SUFF 파트너",
    before: "같은 문구, 해변 러닝 사진 배너.",
    after: "문구 그대로 + 2025 SUFF SET 바로가기.",
    why: "공식 파트너는 신뢰 근거라 남기고, 대회 굿즈로 바로 연결해 배너가 매출로 이어지게.",
  },
  {
    id: "box",
    label: "박스 문의 (B2B)",
    before: "히어로 바로 다음, 두 번째 섹션.",
    after: "맨 아래로 이동. 문구 · 문의 버튼 그대로.",
    why: "개인 고객이 대부분인데 두 번째 화면이 박스 운영자용이면 대부분에게는 지나가는 화면. 필요한 사람은 끝까지 찾아옵니다.",
  },
  {
    id: "signup",
    label: "알림 받기",
    before: "없음. 하단에 INSTAGRAM 링크만.",
    after: "신제품 소식 받기 버튼 (카카오 채널 · 인스타그램).",
    why: "광고로 온 사람 중 바로 안 사는 사람을 붙잡는 장치. 채널 친구 = 다음 신제품 때 무료로 다시 닿는 리스트입니다.",
    ref: "나이키 스킴스 '업데이트를 가장 먼저 만나 보세요'",
  },
];

