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
// 컬러별 착용컷이 없어 칸 전체를 그 색으로 채우고 실제 상품 사진을 올린다 (착용컷 촬영 후 교체)
const has = (...names: string[]) => all.filter((p) => p.colors.some((c) => names.some((n) => c.includes(n)))).length;

export const shopColors = [
  { name: "블랙", chip: "#141414", ink: "#fff", image: `${P}/p110-b.jpg`, count: has("블랙") },
  { name: "오렌지", chip: "#f26b1d", ink: "#0a1939", image: `${P}/p106-a.jpg`, count: has("오렌지") },
  { name: "블루", chip: "#2b6fd6", ink: "#fff", image: `${P}/p32-a.jpg`, count: has("블루") },
  { name: "민트", chip: "#8fd6c4", ink: "#0a1939", image: `${P}/p109-a.jpg`, count: has("민트") },
  { name: "핑크", chip: "#e7a6c2", ink: "#0a1939", image: `${CROP}/color-pink.jpg`, count: has("핑크") },
  { name: "카키", chip: "#59613a", ink: "#fff", image: `${P}/p232-a.png`, count: has("카키") },
];

// 스킴스 '컬렉션 가이드' 자리. 설명 대신 고를 때 필요한 사실(사이즈·컬러·가격)만
export const guides = [
  { title: "그립", items: [products.synergy, products.alpha, products.nano, products.nanoPlus, products.janus] },
  { title: "니슬리브", items: [products.neopro, products.dualguard, products.flex] },
];

// 카테고리는 착용 · 사용 사진으로. 벨트만 실제 상품 사진, 나머지는 대체 사진
export const categories = [
  { name: "그립", photo: stand("7674493", "그립 착용컷"), items: [products.synergy, products.alpha, products.nano, products.nanoPlus, products.janus] },
  { name: "벨트", photo: { src: `${CROP}/hero-plate.jpg` } as Photo, items: [products.liftingBelt, products.breeze] },
  { name: "니슬리브", photo: stand("39635351", "니슬리브 착용컷"), items: [products.neopro, products.dualguard, products.flex] },
  { name: "손목", photo: stand("1552106", "리스트 랩 착용컷"), items: [products.wristWrap, products.wristBand, products.sweatband] },
  { name: "스트랩 · 테이프", photo: stand("27433227", "스트랩 착용컷"), items: [products.strap, products.tape] },
  { name: "줄넘기", photo: stand("6389871", "볼티코 로프 사용컷"), items: [products.rope] },
  { name: "장비", photo: stand("38675855", "플랫벤치 사용컷"), items: [products.bench] },
];

// 현재 홈의 STRENGTH · CONDITIONING · ACCESSORIES 배너를 종목 기준으로
export const movements = [
  { name: "GYMNASTICS", ko: "풀업 · 토투바 · 링", photo: stand("4164648", "링 · 그립 착용컷"), items: [products.nano, products.synergy, products.tape] },
  { name: "WEIGHTLIFTING", ko: "스내치 · 클린 · 스쿼트", photo: { src: `${SITE}/bg-adde45beafc3b.jpg` } as Photo, items: [products.liftingBelt, products.wristWrap, products.strap, products.neopro] },
  { name: "CONDITIONING", ko: "줄넘기 · 박스 점프 · 러닝", photo: stand("9943222", "줄넘기 · 스웻밴드"), items: [products.rope, products.sweatband, products.breeze] },
];

export const sitePhotos = {
  box: `${SITE}/bg-14e1c05a22068.jpg`,
};

// 현재 홈 SUFF 섹션 배경 영상 (아임웹 유튜브 배경, 제목 'CROSSFIT SUFF / OUTDO VIDEO')
// 내려받지 않고 유튜브 · 아임웹 CDN 주소를 그대로 쓴다. poster = 영상이 뜨기 전 보이는 현재 섹션 배경 사진
export const suffVideo = {
  youtubeId: "xOGnQCl-Dzs",
  title: "CROSSFIT SUFF / OUTDO VIDEO",
  poster: "https://cdn.imweb.me/thumbnail/20240920/a50b470c77af0.png",
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
    marketing: {
      who: "메타 · 인스타그램 피드 광고로 처음 들어온, OUTDO를 모르는 크로스핏터.",
      does: "3초 안에 '크로스핏하는 사람들이 쓰는 장비'라는 걸 알아채고 계속 내려 보게 합니다.",
      ads: "착용컷 이미지 · 캐러셀 광고. 광고 사진과 첫 화면이 같은 결이라 '잘못 들어왔다'는 느낌 없이 이어집니다.",
      measure: "첫 화면에서 바로 나간 비율(이탈률), 첫 스크롤까지 간 비율.",
    },
    before: "첫 화면이 검은 바탕 OUTDO 로고 이미지 한 장.",
    after: "운동하는 사람 12컷 그리드. 노란 '대체 사진' 표시는 사진이 없어 무료 사진으로 채운 자리.",
    ref: "나이키 스킴스 'Body Obsessed' 24인 그리드",
  },
  {
    id: "intro",
    label: "브랜드 한 줄",
    marketing: {
      who: "그리드를 보고 '무슨 브랜드지?' 궁금해진 사람, 그리고 이미 살 마음이 있는 사람.",
      does: "브랜드 이름을 기억하게 하고, 바로 살 사람은 '전체 구매하기' · '종목별 보기'로 곧장 보냅니다.",
      ads: "구글 브랜드 검색('OUTDO', '아웃두')의 도착 지점.",
      measure: "두 버튼 클릭 수, 브랜드 검색 유입의 구매율.",
    },
    before: "'OUTDO THE BEST' 문구가 4번째 섹션, 해변 사진 위.",
    after: "그리드 바로 아래에 슬로건 + 원본 문구 + 바로가기 버튼.",
    ref: "나이키 스킴스 '올데이 유니폼' 소개",
  },
  {
    id: "partner",
    label: "SUFF 영상",
    marketing: {
      who: "처음 와서 '믿을 만한 브랜드인가?' 망설이는 사람.",
      does: "아시아 최대 규모 대회의 공식 파트너라는 사실로 신뢰를 주고, 대회 굿즈(SUFF SET)로 연결합니다.",
      ads: "같은 SUFF 영상을 메타 · 유튜브 영상 광고로 쓰고, 영상을 본 사람에게 다시 광고(리타게팅) → 같은 영상이 있는 홈에 도착.",
      measure: "영상 구간까지 내려온 비율, SUFF SET 클릭, 영상 시청자 리타게팅 광고의 구매율.",
    },
    before: "홈 중간, SUFF 대회 유튜브 영상이 배경으로 깔린 섹션 + 같은 문구.",
    after: "같은 영상 · 문구를 브랜드 한 줄 바로 아래로 올림. 영상은 소리 없이 자동 반복, 2025 SUFF SET 바로가기 추가.",
    ref: "나이키 스킴스 홈 중간 영상",
  },
  {
    id: "feature",
    label: "신제품 카드",
    marketing: {
      who: "신제품 광고를 보고 온 사람, 새로 나온 게 있나 보러 온 재방문 고객.",
      does: "지금 밀고 싶은 상품을 홈 위쪽에서 바로 보고 상세로 넘어가게 합니다.",
      ads: "신제품 런칭 광고 소재 = 이 카드. 광고 → 홈 → 상세가 같은 그림으로 이어지고, 시즌마다 카드만 바꿉니다.",
      measure: "카드 클릭 → 상세 이동 수, 그 상세에서 장바구니 담기.",
    },
    before: "신제품 소개 영역 없음. 브리즈 벨트는 SHOP 목록 안에만.",
    after: "NEW 브리즈 벨트 · 시너지 그립 V2 카드 2장.",
    ref: "나이키 스킴스 '셰르파 & 크런치 나일론 · 시즌 컬러' 카드",
  },
  {
    id: "best",
    label: "BEST",
    marketing: {
      who: "뭘 사야 할지 모르는 처음 온 사람.",
      does: "'많이 팔린 것'이라는 가장 쉬운 기준으로 첫 선택을 하게 합니다. 홈에서 가격은 여기에만 둬 고르는 데 집중시킵니다.",
      ads: "브랜드 광고로 들어온 사람의 기본 선택지.",
      measure: "BEST 상품 클릭률, BEST에서 시작한 장바구니 수.",
    },
    before: "BEST 4개, 같은 상품이 슬라이드에서 두 번씩 반복.",
    after: "같은 4개를 2열 그리드로. 마우스를 올리면(PC) 두 번째 사진.",
  },
  {
    id: "color",
    label: "Shop by Color",
    marketing: {
      who: "그립 · 니슬리브 · 벨트를 색 맞춰 사고 싶은 사람.",
      does: "같은 색 상품을 한 번에 보여줘 여러 개를 함께 담게 합니다(객단가).",
      ads: "컬러 광고('핑크로 맞추기')를 이 섹션으로 바로 보냅니다. 컬러별 세트 할인 행사와 바로 이어집니다.",
      measure: "컬러 블록 클릭, 주문 한 건에 담긴 상품 수.",
    },
    before: "없음.",
    after: "상품 옵션 컬러를 6개로 묶어 컬러별 보기. 칸 전체를 그 색으로 채우고 해당 컬러 상품 수 표시. 컬러별 착용컷을 촬영하면 사진으로 교체.",
    ref: "나이키 스킴스 Shop by Color",
  },
  {
    id: "guide",
    label: "OUTDO 기어 가이드",
    marketing: {
      who: "그립 5종이 뭐가 다른지 몰라 망설이는 비교형 고객.",
      does: "이름 · 사이즈 · 컬러를 한눈에 비교하게 해 '모르겠다, 나가자' 대신 하나를 고르게 합니다.",
      ads: "구글 검색 '크로스핏 그립 추천', '그립 비교' 같은 비교형 키워드의 도착 지점.",
      measure: "가이드에서 상세로 넘어간 수, 그립 상세의 이탈률 변화.",
    },
    before: "없음. 그립 5종이 목록에 나란히 있어 차이를 알 수 없음.",
    after: "그립 5종, 니슬리브 3종을 이름 · 사이즈 · 컬러로 한 줄씩. 가격은 BEST와 상세에서.",
    ref: "나이키 스킴스 컬렉션 가이드",
  },
  {
    id: "category",
    label: "Shop by Category",
    marketing: {
      who: "살 물건을 정하고 온 사람('그립만 볼래').",
      does: "고객이 쓰는 말(그립, 니슬리브)로 바로 해당 상품군에 들어가게 합니다.",
      ads: "구글 검색 카테고리 키워드('니슬리브', '리스트랩') 광고.",
      measure: "카테고리 카드 클릭, 카테고리 키워드 광고의 구매율.",
    },
    before: "상단 메뉴 SHOP 하위에만 Strength · Conditioning · Accessories.",
    after: "그립 · 벨트 · 니슬리브 · 손목 · 스트랩 · 줄넘기 · 장비 7칸. 상품 누끼 대신 착용 · 사용 사진 카드를 옆으로 넘겨 보기.",
    ref: "나이키 스킴스 Shop by Category",
  },
  {
    id: "movement",
    label: "Shop by Movement",
    marketing: {
      who: "'오늘 체조한다', '역도 시작한다'처럼 종목 기준으로 장비를 찾는 크로스핏터.",
      does: "그 종목에 필요한 장비를 한 번에 보여줘 여러 개를 함께 담게 합니다.",
      ads: "메타 관심사 타겟(체조 · 역도 · 컨디셔닝)별 광고를 각 종목으로 보냅니다. 종목 = 광고 타겟 단위.",
      measure: "종목별 상품 클릭, 종목 광고별 장바구니 · 구매.",
    },
    before: "STRENGTH · CONDITIONING · ACCESSORIES 배너 3장 (글자가 이미지에 박힘).",
    after: "GYMNASTICS · WEIGHTLIFTING · CONDITIONING. 종목마다 쓰는 장비 이름을 바로 아래에 (가격은 상세에서).",
    ref: "나이키 스킴스 Shop by Movement",
  },
  {
    id: "box",
    label: "박스 문의 (B2B)",
    marketing: {
      who: "박스(체육관) 운영자. 수는 적지만 한 번 거래의 규모가 큰 고객.",
      does: "찾아온 운영자를 문의로 연결합니다. 개인 고객의 쇼핑 흐름은 방해하지 않게 맨 아래에 둡니다.",
      ads: "박스 운영자 대상 광고는 TAILORED SERVICE 페이지로 직접 보내고, 홈에서는 찾아온 사람만 받습니다.",
      measure: "문의하기 클릭, 문의 건수.",
    },
    before: "히어로 바로 다음, 두 번째 섹션.",
    after: "맨 아래로 이동. 문구 · 문의 버튼 그대로.",
  },
  {
    id: "signup",
    label: "알림 받기",
    marketing: {
      who: "오늘은 사지 않고 나가려는 사람 (광고로 들어온 사람의 대부분).",
      does: "카카오 채널 친구로 남겨, 다음 신제품 때 광고비 없이 다시 연락할 수 있는 목록을 만듭니다.",
      ads: "모든 광고의 마지막 안전망. 채널 친구 수가 곧 다음 신제품 알림 대상입니다.",
      measure: "채널 추가 수, 채널 메시지로 돌아온 방문의 구매.",
    },
    before: "없음. 하단에 INSTAGRAM 링크만.",
    after: "신제품 소식 받기 버튼 (카카오 채널 · 인스타그램).",
    ref: "나이키 스킴스 '업데이트를 가장 먼저 만나 보세요'",
  },
];
