// 원본: https://www.outdothebest.com/shop_view/?idx=108 (아임웹)
// 이미지는 public/assets/breeze-belt 에 원본 그대로 저장되어 있음

const BASE = "/assets/breeze-belt";

export interface Review {
  rating: number;
  content: string;
  author?: string;
  date?: string;
  image?: string;
}

export const product = {
  name: "브리즈 벨트",
  price: 48000,
  point: 1440,
  badges: [
    { src: `${BASE}/badge-best.png`, alt: "BEST", width: 32 },
    { src: `${BASE}/badge-recommended.png`, alt: "RECOMMENDED", width: 91 },
    { src: `${BASE}/badge-hot.png`, alt: "HOT", width: 31 },
  ],
  breadcrumb: ["Home", "Shop", "Accessories"],
  gallery: [`${BASE}/gallery-01.jpg`, `${BASE}/gallery-02.jpg`],
  specs: [
    { label: "사이즈", value: "XS / S / M / L" },
    { label: "색상", value: "오렌지 / 블루 / 핑크" },
  ],
  options: {
    size: ["XS", "S", "M", "L"],
    color: ["오렌지", "블루", "핑크"],
  },
  info: [
    { label: "원산지", value: "CHINA" },
    { label: "제조사", value: "OUTDO" },
    { label: "브랜드", value: "OUTDO" },
    { label: "무게", value: "1kg" },
  ],
  shipping: {
    method: "택배",
    fee: 3000,
    freeOver: 60000,
  },
};

// 상세정보 영역: 원본과 동일한 순서의 통이미지 18장 (폭 1792px, 06번만 1201px png)
export const detailImages = [
  { src: `${BASE}/detail-01.jpg`, width: 1792, height: 2385, alt: "OUTDO 브리즈 벨트 메인 비주얼" },
  { src: `${BASE}/detail-02.jpg`, width: 1792, height: 2412, alt: "OUTDO는 이렇습니다 - 브랜드 소개" },
  { src: `${BASE}/detail-03.jpg`, width: 1792, height: 2669, alt: "움직임은 가볍게, 리프팅은 강하게 - 브리즈 벨트" },
  { src: `${BASE}/detail-04.jpg`, width: 1792, height: 3788, alt: "써본 사람들이 인정한 리얼 후기" },
  { src: `${BASE}/detail-05.jpg`, width: 1792, height: 2544, alt: "POINT 1 고밀도 내구성" },
  { src: `${BASE}/detail-06.png`, width: 1201, height: 1309, alt: "POINT 2 착용한듯 안한듯한 가벼움" },
  { src: `${BASE}/detail-07.jpg`, width: 1792, height: 4327, alt: "DETAIL 01 프리미엄 벨크로 락 / DETAIL 02 슬림 핏 두께" },
  { src: `${BASE}/detail-08.jpg`, width: 1792, height: 2873, alt: "DETAIL 03 독보적인 디자인" },
  { src: `${BASE}/detail-09.jpg`, width: 1792, height: 2335, alt: "DETAIL 04 크로스핏에 특화, 의도적인 설계" },
  { src: `${BASE}/detail-10.jpg`, width: 1792, height: 2822, alt: "착용 화보" },
  { src: `${BASE}/detail-11.jpg`, width: 1792, height: 610, alt: "아웃두 벨트 한눈에 비교하기" },
  {
    src: `${BASE}/detail-12.jpg`,
    width: 1792,
    height: 667,
    alt: "리프팅 벨트 - 두께 9mm, 너비 11mm",
    href: "https://www.outdothebest.com/shop_view/?idx=29",
  },
  { src: `${BASE}/detail-13.jpg`, width: 1792, height: 667, alt: "브리즈 벨트 - 두께 6.9mm, 너비 10mm" },
  { src: `${BASE}/detail-14.jpg`, width: 1792, height: 329, alt: "제품 이미지를 클릭하시면 해당 상품 상세페이지로 이동합니다" },
  { src: `${BASE}/detail-15.jpg`, width: 1792, height: 4605, alt: "COLOR 핑크 / 오렌지 / 블루" },
  { src: `${BASE}/detail-16.jpg`, width: 1792, height: 1465, alt: "SIZE INFO XS 68~83cm, S 73~88cm, M 80~93cm, L 83~98cm" },
  { src: `${BASE}/detail-17.jpg`, width: 1792, height: 3140, alt: "엠버서더 착용 사이즈" },
  { src: `${BASE}/detail-18.jpg`, width: 1792, height: 3546, alt: "Q&A, 기본 주의사항, 배송 안내, 취소/교환/반품 안내" },
];

export const photoReviews: Review[] = [
  {
    rating: 5,
    image: `${BASE}/review-01.jpg`,
    content:
      "벨크로 방식 밸트는 쓰다 보면 찍찍이가 헐거워지며 풀릴까봐 걱정되는데 이 제품은 벨크로 부착력이 강하고 고중량 데드리프트를 할 떄도 단단하게 유지되서 믿고 운동 가능합니다.",
  },
  {
    rating: 5,
    image: `${BASE}/review-02.jpg`,
    content:
      "고중량 스쿼트 시 허리 보호를 위해 단단한 가죽 벨트를 써왔는데, 복압은 잘 잡아주지만 골반과 갈비뼈를 눌러 멍이 들거나 통증이 생겨 불편함이 있었습니다. 브리즈벨트로 바꾸고 나서는 그런 통증이 싹 사라졌네요. 유연한 재질이면서도 숨을 들이마셨을 때 복압을 밀도 있게 바짝 잡아주어 허리가 흔들리지 않고 탄탄하게 고정 됩니다. 중량을 칠 때 허리에 가해지는 부담이 확실히 줄어들어서 불안함 없이 운동할 수 있게 되어서 너무 만족스럽습니다.",
  },
  {
    rating: 5,
    image: `${BASE}/review-03.jpg`,
    content:
      "다양한 벨트를 써봤지만, 사실 벨트 다 거기서 거기고 헬스, 크로스핏에서도 벨트를 쓰기 때문에 워낙 많잖아요. 그래서 기대 안했었습니다. 그런데... 이런 제 마음을 돌려준 이 친구.. 요물입니다. 일단 가볍고 역도 규정에 맞는 적절한 두께 덕분에 휴대도 간편하고 베어링처럼 돌아가는 링 덕분에 코어 지지력이 남다르고 복압도 꽉 잘 잡아줍니다. 얘만 차면 자꾸 PR해요...",
  },
  {
    rating: 5,
    image: `${BASE}/review-04.jpg`,
    content:
      "고중량 스쿼트나 데드리프트를 할 때 허리가 불안해서 중량을 올리기 꺼렸었는데 브리즈벨트 착용 후 바로 기록 경신했습니다 !!!! 허리를 잡아주는 면이 넓고 탄탄해서 숨을 들이마셨을 때 복압이 꽉 차는 느낌이 확실하게 듭니다. 허리 부상 예방하고 안전하게 운동하고 싶으신 분들께 추천합니다 ~!!!!!!",
  },
  {
    rating: 5,
    image: `${BASE}/review-05.jpg`,
    content:
      "와드 할 때 너무 편해요..!!! 가볍고 짱짱하고 복압도 잘 잡아주네요!! 걸리적 거리는 느낌을 싫어하는데 그런 느낌이 없어서 더 좋은거 같아요👍👍",
  },
  {
    rating: 5,
    image: `${BASE}/review-06.jpg`,
    content: "두께도 좋고 일단 짱짱해서 너무 좋아요!! 고중량할때 잘잡아줍니당!",
  },
  {
    rating: 5,
    image: `${BASE}/review-07.jpg`,
    content: "투푸드 쓰다가 오래되어 바꿧는데 돈 번듯합니다",
  },
  {
    rating: 5,
    image: `${BASE}/review-08.jpg`,
    content: "개좋아요 복압도 잘잡아주구 너무 잘맞아요 잘쓸께요",
  },
];

export const reviewSummary = {
  average: 5.0,
  total: 48,
  distribution: [
    { score: 5, ratio: 1 },
    { score: 4, ratio: 0 },
    { score: 3, ratio: 0 },
    { score: 2, ratio: 0 },
    { score: 1, ratio: 0 },
  ],
};

// 구매평 1페이지(최신순 10건)
export const reviews: Review[] = [
  { rating: 5, content: "좋습니다. 추천받아서 샀어요,", author: "김태****", date: "2026-10-19 15:36" },
  { rating: 5, content: "복압을 잘 잡아줍니다 !!!!!!!!!!!!!", author: "정원****", date: "2026-10-19 14:52" },
  { rating: 5, content: "디자인도 예쁜데 성능도 우수합니다", author: "김지****", date: "2026-10-13 18:31" },
  { rating: 5, content: "친구 선물로 샀는데 좋다고해서 저도 샀어요 !", author: "정석****", date: "2026-10-13 18:30" },
  { rating: 5, content: "복압을 잘 잡아줍니다", author: "임지****", date: "2026-10-13 18:14" },
  { rating: 5, content: "핑크색 벨트라니 너무 좋아용", author: "pink****", date: "2026-10-12 17:55" },
  {
    rating: 5,
    content: "벨크로 부착력도 강하고 허리를 탄탄하게 잡아줘서 중량 칠 때 유용해요 ! 크로스핏터들에게 딱 맞는 벨트네요",
    author: "김지****",
    date: "2026-10-12 17:54",
  },
  { rating: 5, content: "배송이 옴총 빠루네용!", author: "니****", date: "2026-10-12 17:44" },
  {
    rating: 5,
    content: "평소 허리가 안 좋아서 벨트를 굉장히 신중하게 고르는데 굉장히 만족스럽습니다. 핑크랑 네이비중에 고민하다가 둘다 사버렸어요 ㅎ",
    author: "김철****",
    date: "2026-10-12 17:43",
  },
  { rating: 5, content: "이것저것 찾아보다가 구매했는데 너무 만족스러우어요.", author: "정준****", date: "2026-10-12 17:36" },
];

export const qna = [{ status: "답변완료", title: "사이즈" }];

export const brand = {
  logo: `${BASE}/misc-35bd8073d8173.png`,
  nav: ["SHOP", "NOTICE", "ABOUT PARTNER BOX", "ABOUT"],
  company: [
    "상호명: 주식회사 에스티비 파밀리아",
    "대표자: 장승현",
    "사업장주소: 광주 서구 운천로32번길 7 (금호동, 금호시영일반분양아파트) 상가 지하1층 5호",
    "사업자등록번호: 2708103380",
    "통신판매업신고번호: 2024-광주서구-0767",
    "대표자 이메일: outdothebest@gmail.com",
    "호스팅 제공자: (주)아임웹",
  ],
  copyright: "Copyright ⓒ 2026 아웃두 All rights reserved.",
};
