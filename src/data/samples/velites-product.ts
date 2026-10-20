// 시안 2 상세 재료 — Velites 상품 페이지(eu.velitessport.com/products/all-terrain) 구조로 만든 브리즈 벨트 상세
// 문장은 새로 쓰지 않는다: 현재 상세 이미지에 적힌 문구 · 수치, 구매평 원문만 (출처 주석)
import { colors, compare, faq, photos, sizes, ambassadors, type BeltColor } from "./breeze-renewal";
import { photoReviews, product, reviews, reviewSummary } from "./breeze-belt";
import { description, shipping, spinFrames } from "./skims-product";
import { products, type Product } from "./outdo-home";
import type { SectionNote } from "./renewal-notes";

export { colors, sizes, ambassadors, product, reviewSummary, shipping, faq };
export type { BeltColor };

// 상세 03 이미지 헤드카피
export const oneLine = "움직임은 가볍게, 리프팅은 강하게.";

export interface Tile {
  src: string;
  alt: string;
  fit: "contain" | "cover";
  spin?: string[];
}

// PC 2열 그리드 · 모바일 스와이프. 첫 장과 360 칸만 선택한 컬러로 바뀐다
export const tilesFor = (color: BeltColor): Tile[] => [
  { src: color.image, alt: `브리즈 벨트 ${color.name}`, fit: "contain" },
  { src: color.image, alt: `브리즈 벨트 ${color.name} 360도 보기`, fit: "contain", spin: spinFrames[color.name] ?? [] },
  { src: photos.holdBelt, alt: "브리즈 벨트 착용컷", fit: "cover" },
  { src: photos.squatBack, alt: "스쿼트 착용 뒷모습", fit: "cover" },
  { src: photos.velcro, alt: "프리미엄 벨크로 락", fit: "cover" },
  { src: photos.slim, alt: "슬림 핏 두께", fit: "cover" },
];

// 배송 상자 — 현재 상세 18번 이미지 배송 안내
export const delivery = ["오후 2시 이전 결제 시 당일 출고", "60,000원 이상 무료 배송 · 택배 3,000원"];

// 사진 아래 접는 메뉴 4개 (Velites: Details / Materials / Innovation / Shipping & returns)
export const accordions = [
  { title: "상세 정보", body: [description] },
  {
    title: "소재",
    body: [
      // 상세 POINT 1 · DETAIL 01 원문
      "폼과 텍스타일 결합구조로 제작되어 튼튼한 내구성을 가져 장기간 형태 변형없이 오랜기간 사용이 가능합니다.",
      "풀업, 점프, 하이풀에서도 벨트가 흔들리지 않도록 유지할 수 있도록 강력한 고정력을 가진 프리미엄 벨크로를 사용하여 제작하였습니다.",
      "무게 238g (XS 기준) · 두께 6.9mm · 폭 10cm · 원산지 CHINA",
    ],
  },
  {
    title: "특징",
    body: [
      // 상세 DETAIL 02 · 03 원문
      "내 몸에 딱 맞는 핏과 가동성을 보장하는 단일 압축 라인 설계로 가벼우면서도 운동 시 방해요소가 되지 않는 최적의 벨트입니다.",
      "아웃두의 고급스러우면서도 힙한 느낌의 로고 디자인을 넣어 어디에서도 보지 못한 독보적인 디자인을 갖춘 제품입니다.",
    ],
  },
];

// Design features 카드 — 상세 POINT 1 · 2, DETAIL 01 · 02 · 03 제목과 본문 원문
export const features = [
  { title: "고밀도 내구성", body: "폼과 텍스타일 결합구조로 제작되어 튼튼한 내구성을 가져 장기간 형태 변형없이 오랜기간 사용이 가능합니다.", image: photos.beltDark },
  {
    title: "착용한듯 안한듯한 가벼움",
    body: "착용한 걸 잊게 만드는 가벼움, WOD 내내 유지되는 지지력. 초경량화를 통해 벨트 기능은 유지하되 착용하지 않은듯한 가벼운 착용감을 제공합니다.",
    image: photos.holdBelt,
  },
  {
    title: "프리미엄 벨크로 락",
    body: "풀업, 점프, 하이풀에서도 벨트가 흔들리지 않도록 유지할 수 있도록 강력한 고정력을 가진 프리미엄 벨크로를 사용하여 제작하였습니다.",
    image: photos.velcro,
  },
  {
    title: "슬림 핏 두께",
    body: "내 몸에 딱 맞는 핏과 가동성을 보장하는 단일 압축 라인 설계로 가벼우면서도 운동 시 방해요소가 되지 않는 최적의 벨트입니다.",
    image: photos.slim,
  },
  {
    title: "독보적인 디자인",
    body: "아웃두의 고급스러우면서도 힙한 느낌의 로고 디자인을 넣어 어디에서도 보지 못한 독보적인 디자인을 갖춘 제품입니다.",
    image: photos.patchHand,
  },
];

// Velites는 이 자리가 제품 영상. 브리즈 벨트 영상이 없어 사진 + 헤드카피로 대신 (영상 받으면 교체)
export const banner = { image: photos.heroPlate, headline: oneLine, sub: "XS 기준 238g · 두께 6.9mm" };

// 모델 비교 — 상세 11~13 '아웃두 벨트 한눈에 비교하기' 원문. 리프팅 벨트 너비는 원본 이미지 표기(11mm) 확인 필요
export const compareModels = {
  rows: compare.rows,
  models: [
    { ...compare.breeze, price: product.price, current: true, href: "" },
    { ...compare.lifting, price: products.liftingBelt.sale?.price ?? products.liftingBelt.price, current: false },
  ],
};

// 리뷰: 포토 후기 사진 + 원문
export const reviewPhotos = photoReviews.map((r) => r.image!);
export const reviewList = [photoReviews[0], photoReviews[4], ...reviews.slice(0, 4)];

export const related: Product[] = [products.liftingBelt, products.neopro, products.nano, products.wristWrap, products.synergy, products.sweatband];

export const productNotes2: SectionNote[] = [
  {
    id: "top",
    label: "사진 그리드 + 따라오는 구매 패널",
    marketing: {
      who: "광고나 홈에서 상품을 눌러 들어온 사람.",
      does: "사진을 내려 보는 내내 구매 버튼이 옆에 붙어 있어, 마음먹은 그 순간에 바로 담게 합니다.",
      ads: "상품 광고(메타 카탈로그 · 구글 쇼핑)의 도착 지점.",
      measure: "상세 → 장바구니 비율.",
    },
    before: "아임웹 기본 영역: 사진 2장, 상품명 · 가격 아래에 옵션 드롭다운 2개.",
    after: "PC는 왼쪽 2열 사진 그리드(360 보기 칸 포함), 오른쪽은 스크롤해도 따라오는 구매 패널. 모바일은 사진 스와이프.",
    ref: "Velites 상품 상단",
  },
  {
    id: "buy",
    label: "컬러 스와치 · 사이즈 · 배송 상자",
    marketing: {
      who: "컬러 · 사이즈 · 배송비 중 하나로 망설이는 사람.",
      does: "두 색 스와치(바탕색 + 로고색), 허리 실측 사이즈, 구매 버튼 바로 아래 배송 상자로 세 가지 망설임을 한 자리에서 풉니다.",
      ads: "컬러 광고에서 그 컬러가 고른 상태로 바로 보이게 연결할 수 있습니다.",
      measure: "스와치 · 사이즈 가이드 클릭, 장바구니 담기.",
    },
    before: "'색상' · '사이즈' 드롭다운. 배송 조건은 상세 맨 끝 이미지에만.",
    after: "벨트 바탕색 + 로고색 두 가지를 반씩 담은 동그란 스와치, 허리 실측이 적힌 사이즈 버튼, 구매 버튼 바로 아래 당일 출고 · 무료 배송 상자.",
    ref: "Velites 컬러 스와치 · 배송 상자",
  },
  {
    id: "accordion",
    label: "접는 메뉴 (상세 · 소재 · 특징 · 배송)",
    marketing: {
      who: "더 알고 싶은 사람만.",
      does: "페이지는 짧게 두고, 궁금한 사람은 필요한 정보만 열어 보게 합니다.",
      measure: "메뉴별 열기 수. 많이 열리는 메뉴가 고객이 가장 궁금해하는 것 = 다음 광고 문구의 힌트.",
    },
    before: "POINT · DETAIL · 배송 안내가 통이미지 18장에 나뉘어 있음.",
    after: "상세 정보 · 소재 · 특징 · 배송 및 반품 4개로 접어 둠. 문구는 원본 그대로.",
    ref: "Velites Details · Materials · Innovation · Shipping",
  },
  {
    id: "features",
    label: "특징 카드",
    marketing: {
      who: "특징을 하나씩 확인하는 비교형 고객.",
      does: "카드 한 장 = 사야 하는 이유 하나. 다섯 가지 이유를 넘겨 보며 확신하게 합니다.",
      ads: "카드 그대로 메타 캐러셀 광고 소재가 됩니다. 광고와 상세가 같은 카드로 이어집니다.",
      measure: "카드 넘김, 이 구간 이후 장바구니.",
    },
    before: "POINT 1 · 2, DETAIL 01~03이 긴 이미지 사이사이에.",
    after: "사진 + 제목 + 원문 한 문단 카드 5장을 옆으로 넘겨 보기.",
    ref: "Velites Design features",
  },
  {
    id: "banner",
    label: "배너",
    marketing: {
      who: "특징까지 다 본 사람.",
      does: "'움직임은 가볍게, 리프팅은 강하게.' 한 문장으로 정리하고 벨트 비교로 이어 줍니다.",
      ads: "브리즈 벨트 착용 영상이 생기면 영상 광고와 같은 장면을 이 자리에 둡니다.",
      measure: "'리프팅 벨트와 비교' 버튼 클릭.",
    },
    before: "상세 03 '움직임은 가볍게, 리프팅은 강하게' 이미지.",
    after: "같은 헤드카피를 화면 가득한 사진 배너로. Velites는 이 자리에 제품 영상을 둡니다.",
    ref: "Velites 풀폭 영상 배너",
  },
  {
    id: "compare",
    label: "벨트 비교",
    marketing: {
      who: "'나한테 맞는 벨트가 뭐지?' 고민하는 사람.",
      does: "맞으면 브리즈 벨트를 담고, 고중량 리프팅이 목적이면 리프팅 벨트로 보내 이탈 대신 다른 상품 구매로 잇습니다.",
      ads: "구글 검색 '크로스핏 벨트', '리프팅 벨트 추천' 같은 비교형 키워드.",
      measure: "'보러 가기' 클릭, 리프팅 벨트 상세로 넘어간 뒤 구매.",
    },
    before: "'아웃두 벨트 한눈에 비교하기' 이미지 3장.",
    after: "브리즈 벨트 vs 리프팅 벨트 표: 두께 · 너비 · 특징 · 추천 · 가격, '보고 있는 상품' / '보러 가기'.",
    ref: "Velites Compare models",
  },
  {
    id: "reviews",
    label: "리뷰",
    marketing: {
      who: "다른 사람의 평가로 마지막 확인을 하려는 사람.",
      does: "점수 · 사진 · 글을 한곳에 모아 마지막 확신을 줍니다.",
      ads: "구매평 원문은 그대로 광고 문구로 쓸 수 있습니다.",
      measure: "리뷰 구간 도달 후 장바구니.",
    },
    before: "상세 아래 별도 구매평 탭. 상세 중간 '리얼 후기'는 이미지.",
    after: "별점 5.0 · 48건, 포토 후기 줄, 별점 분포, 구매평 원문.",
    ref: "Velites 리뷰 영역",
  },
  {
    id: "related",
    label: "함께 보면 좋은 상품",
    marketing: {
      who: "벨트 하나만 담은 사람.",
      does: "6만 원 이상 무료 배송이라 4.8만 원 벨트 하나면 배송비가 붙습니다. 함께 쓰는 장비로 무료 배송까지 함께 담게 합니다(객단가).",
      measure: "추천 상품 클릭, 주문 한 건에 담긴 상품 수.",
    },
    before: "없음. 리프팅 벨트만 상세 중간 이미지 링크로.",
    after: "함께 쓰는 장비 6개를 컬러 점과 함께 옆으로 넘기는 줄로.",
    ref: "Velites You may also like",
  },
  {
    id: "faq",
    label: "자주 묻는 질문",
    marketing: {
      who: "물어보고 사려던 사람.",
      does: "문의를 남기고 기다리지 않고 바로 답을 찾게 해, 구매가 미뤄지는 걸 막습니다.",
      measure: "문의 게시판 질문 수 변화.",
    },
    before: "18번 이미지 상단 Q&A.",
    after: "질문 4개를 2단 접는 메뉴로.",
    ref: "Velites FAQ",
  },
];
