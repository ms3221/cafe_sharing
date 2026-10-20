// 나이키 스킴스 상품 페이지(nike.com/kr IQ7158-601) 구조로 만든 브리즈 벨트 상세 재료
// 문장은 새로 쓰지 않는다: 현재 상세 이미지에 적힌 문구·수치, 구매평 원문만 옮긴다
// 배송·반품 문구는 현재 상세 18번 이미지(detail-18.jpg)를 그대로 옮겨 적음
import { colors, photos, type BeltColor } from "./breeze-renewal";
import { products } from "./outdo-home";
import type { SectionNote } from "./renewal-notes";

export interface Shot {
  src: string;
  alt: string;
  // 누끼 제품컷은 회색 바탕 위에 contain, 착용컷은 cover
  fit: "contain" | "cover";
  // 360도 보기 칸. frames가 비어 있으면 src 한 장을 입체로 돌려 동작만 보여준다 (대체 표시)
  spin?: { frames: string[] };
}

// 360도 회전 사진: 회전판에 올려 0°부터 같은 간격으로 24~36장. 촬영 전이라 비어 있음
// 예) ["/assets/breeze-belt/spin/pink-00.jpg", "/assets/breeze-belt/spin/pink-01.jpg", ...]
export const spinFrames: Record<string, string[]> = { 핑크: [], 오렌지: [], 블루: [] };

// 첫 장은 착용컷(가로로 긴 누끼는 세로 칸에서 빈 공간이 커서). 두 번째 장과 360도 칸만 선택한 컬러로 바뀐다
// 컬러별 착용컷이 없어 나머지는 공통
export const COLOR_SHOT = 1;
export const galleryFor = (color: BeltColor): Shot[] => [
  { src: photos.holdBelt, alt: "브리즈 벨트 착용컷", fit: "cover" },
  { src: color.image, alt: `브리즈 벨트 ${color.name}`, fit: "contain" },
  { src: color.image, alt: `브리즈 벨트 ${color.name} 360도 보기`, fit: "contain", spin: { frames: spinFrames[color.name] ?? [] } },
  { src: "/assets/breeze-belt/gallery-01.jpg", alt: "브리즈 벨트 3컬러", fit: "contain" },
  { src: photos.squatBack, alt: "스쿼트 착용 뒷모습", fit: "cover" },
  { src: photos.athleteWod, alt: "WOD 착용컷", fit: "cover" },
  { src: photos.deadlift, alt: "데드리프트 착용컷", fit: "cover" },
  { src: photos.heroPlate, alt: "플레이트 위 브리즈 벨트", fit: "cover" },
  { src: photos.slim, alt: "슬림 두께", fit: "cover" },
  { src: photos.velcro, alt: "프리미엄 벨크로 락", fit: "cover" },
  { src: photos.patchHand, alt: "I'M THE BEST 로고 패치", fit: "cover" },
  { src: photos.logoPatch, alt: "버클과 스트랩", fit: "cover" },
];

export { colors };

// 나이키 '여성 신발' 자리. 상세 DETAIL 04 '크로스핏에 특화' 문구에서
export const subtitle = "크로스핏 · WOD 벨트";

// 현재 상세 03 '움직임은 가볍게, 리프팅은 강하게', POINT 1·2, DETAIL 01~04 문구를 한 문단으로 이어 붙임
export const description = [
  "움직임은 가볍게, 리프팅은 강하게.",
  "폼과 텍스타일을 결합한 6.9mm 경량 벨트로, 타사 벨트(약 381g)보다 가벼운 238g입니다.",
  "프리미엄 벨크로 락이 풀업 · 점프 · 하이풀에서도 흔들리지 않게 잡아 주고, 단일 압축 라인이 몸에 딱 맞는 핏과 가동성을 만듭니다.",
  "WOD 중 빠른 움직임과 짧은 세트 간 전환에 맞춘 벨트입니다.",
].join(" ");

export const facts = (color: BeltColor) => [
  `현재 컬러: ${color.name}`,
  "무게: 238g (XS 기준)",
  "두께 6.9mm · 폭 10cm",
  "원산지: CHINA",
];

// '상품 상세 정보 보기' 팝업 — 나이키는 여기에 혜택 · 상세 정보를 모아 둔다
export const benefits = [
  { title: "착용한 듯 안 한 듯한 가벼움", body: "XS 기준 238g. 타사 벨트 약 381g보다 143g 가볍습니다.", image: photos.slim },
  // 상세 DETAIL 01 원문: "풀업, 점프, 하이풀에서도 벨트가 흔들리지 않도록 유지할 수 있도록 강력한 고정력을 가진 프리미엄 벨크로"
  { title: "프리미엄 벨크로 락", body: "풀업 · 점프 · 하이풀에서도 벨트가 흔들리지 않도록 강력한 고정력을 가진 프리미엄 벨크로를 사용했습니다.", image: photos.velcro },
  { title: "고밀도 내구성", body: "폼 + 텍스타일 결합 구조로 오래 써도 형태가 무너지지 않습니다.", image: photos.beltDark },
  { title: "독보적인 디자인", body: "'I'M THE BEST' 로고 패치. OUTDO만의 디테일입니다.", image: photos.patchHand },
];

export const specs = [
  ["무게", "238g (XS 기준)"],
  ["두께", "6.9mm"],
  ["폭", "10cm"],
  ["고정", "벨크로 락"],
  ["사이즈", "XS / S / M / L"],
  ["컬러", "핑크 / 오렌지 / 블루"],
];

export const shipping = {
  fee: "택배 3,000원 · 60,000원 이상 무료 배송",
  basic: [
    "의류, 보호대, 악세사리 등의 주문은 오후 2시 이전 결제 시 당일 출고됩니다.",
    "기본 배송기간 이상 소요되는 상품이거나 품절 상품은 개별 연락을 드립니다. (도서산간 지역 배송, 제품 사이즈가 크거나 특이한 경우)",
    "출고 완료 이후의 배송일정은 송장조회 후, 관할 지역 택배 기사님께 문의 바랍니다.",
  ],
  returns: [
    "상품의 하자 혹은 오배송일 경우 수령일로부터 7일 이내에 고객센터 접수 후 교환 · 반품이 가능합니다.",
    "고객 변심(색상 및 사이즈 변경, 주문 오류, 배송 후 취소 등)으로 인한 교환 · 반품은 왕복 배송비(최초 주문 배송비 + 반품 배송비)를 고객님이 부담하셔야 합니다.",
  ],
  limits: [
    "구성품 분실 및 취급 부주의로 인한 파손, 고장으로 상품 가치가 상실된 경우",
    "상품 패키지, 택, 라벨 등이 훼손된 경우",
    "구매자의 사용, 시간 경과로 상품의 가치가 떨어진 경우",
  ],
};

// 상품정보제공고시 — 아임웹 상품 정보 + 푸터 사업자 정보
export const notice = [
  ["제조사 · 브랜드", "OUTDO"],
  ["원산지", "CHINA(중국)"],
  ["판매자", "주식회사 에스티비 파밀리아"],
  ["A/S 문의", "outdothebest@gmail.com"],
];

// 나이키 '추천 상품' 자리. 함께 차는 WOD 장비 위주
export const related = [products.liftingBelt, products.neopro, products.nano, products.wristWrap, products.synergy, products.sweatband];

export const productNotes: SectionNote[] = [
  {
    id: "top",
    label: "상단 구매 영역",
    marketing: {
      who: "광고나 홈에서 상품을 눌러 들어온 사람. 사고 싶은 마음이 가장 큰 순간입니다.",
      does: "첫 화면에서 보고 · 고르고 · 담기를 끝내게 합니다. 착용컷이 첫 장이라 '내가 차면 어떨지'부터 보여줍니다.",
      ads: "상품 광고(메타 카탈로그 · 구글 쇼핑)의 도착 지점.",
      measure: "상세 → 장바구니 비율.",
    },
    before: "아임웹 기본 영역: 사진 2장, 상품명 · 가격 아래에 옵션 드롭다운 2개.",
    after: "착용컷이 첫 장인 사진 갤러리(360도 보기 칸 포함) + 상품명 · 가격 · 컬러 사진 칩 · 사이즈 버튼 · 구매 버튼. 360도 칸은 회전판 촬영(24~36장) 전이라 사진 한 장을 돌려 동작만 보여줍니다.",
    ref: "나이키 스킴스 리프트 새틴 상단",
  },
  {
    id: "color",
    label: "컬러 사진 칩",
    marketing: {
      who: "색 때문에 망설이는 사람. 옵션명(오렌지)과 실제 바탕색(네이비)이 달라 헷갈려 하는 사람.",
      does: "사진으로 고르게 해 잘못 주문하고 교환하는 일을 줄입니다.",
      ads: "컬러별 광고에서 그 컬러가 고른 상태로 바로 보이게 연결할 수 있습니다.",
      measure: "컬러 칩 클릭, 컬러 때문에 생긴 교환 · 반품 문의 수.",
    },
    before: "'색상' 드롭다운에 오렌지 / 블루 / 핑크 글자만.",
    after: "벨트 사진 칩 3개. 누르면 갤러리가 그 컬러 사진으로 넘어가고 '현재 컬러'가 바뀜.",
    ref: "나이키 컬러웨이 썸네일",
  },
  {
    id: "size",
    label: "사이즈 버튼",
    marketing: {
      who: "사이즈를 몰라 망설이는 사람.",
      does: "고르는 자리에서 허리 실측을 보여줘 '안 맞으면 어떡하지(사이즈 교환은 왕복 배송비 고객 부담)' 걱정을 덜어 줍니다.",
      measure: "사이즈 가이드 클릭, 사이즈 교환 문의 수.",
    },
    before: "'사이즈' 드롭다운. 실측은 상세 16번 이미지까지 내려가야 보임.",
    after: "XS~L 버튼에 허리 실측(cm)을 같이 적음. 옆에 사이즈 가이드 바로가기. 사이즈를 안 고르고 담으면 바로 안내.",
  },
  {
    id: "desc",
    label: "짧은 설명 + 핵심 수치",
    marketing: {
      who: "사진만으로는 결정을 못 한 사람.",
      does: "한 문단과 숫자(238g · 6.9mm)로 핵심만 전해 길게 읽지 않고도 결정하게 합니다.",
      measure: "'상품 상세 정보 보기' 클릭률, 설명 구간 이후 장바구니.",
    },
    before: "통이미지 18장 (모바일 기준 약 10,000px, 화면 13개 분량).",
    after: "설명 한 문단 + 현재 컬러 · 무게 · 두께 · 원산지 네 줄.",
    ref: "나이키 상품 설명 + 스타일 번호",
  },
  {
    id: "more",
    label: "상품 상세 정보 보기",
    marketing: {
      who: "꼼꼼히 따져 보는 비교형 고객.",
      does: "특징 · 사양 · 리프팅 벨트 비교를 한 번에 보여줘 확신을 줍니다. 원본의 설득 포인트는 버리지 않고 모았습니다.",
      ads: "특징 하나하나가 광고 문구 후보입니다(원문 그대로).",
      measure: "팝업 열기 수 → 그 뒤 장바구니.",
    },
    before: "POINT 1 · 2, DETAIL 01~04, 리프팅 벨트 비교가 이미지 9장에 나뉘어 있음.",
    after: "팝업 하나에 특징 4개 · 제품 사양 · 리프팅 벨트 비교.",
    ref: "나이키 '상품 상세 정보 보기' 팝업",
  },
  {
    id: "size-tip",
    label: "사이즈 & 팁",
    marketing: {
      who: "'나랑 비슷한 사람은 뭘 입었지?'가 궁금한 사람.",
      does: "엠버서더 키 · 체중 · 착용 사이즈로 내 사이즈를 정하게 합니다.",
      measure: "메뉴 열기 수, 사이즈 교환 문의 수.",
    },
    before: "SIZE INFO와 엠버서더 착용 사이즈가 이미지 2장으로 따로.",
    after: "접는 메뉴 안에 실측표 + 엠버서더 키 · 체중 · 착용 사이즈.",
  },
  {
    id: "shipping",
    label: "배송 및 반품",
    marketing: {
      who: "구매 직전에 배송비 · 반품을 확인하는 사람.",
      does: "마지막 망설임을 풀어 줍니다. 제목에서 바로 찾을 수 있게 접어 둡니다.",
      measure: "메뉴 열기 후 구매로 이어진 비율.",
    },
    before: "상세 맨 끝 18번 이미지에 글자로 박혀 있음.",
    after: "같은 문구를 글로 옮겨 접는 메뉴에.",
  },
  {
    id: "review",
    label: "리뷰",
    marketing: {
      who: "다른 사람의 평가로 확인하고 사려는 사람.",
      does: "별점 5.0을 제목에서 먼저 보여주고, 열면 포토 후기와 최신 구매평으로 확신을 줍니다.",
      ads: "구매평 원문은 그대로 광고 문구로 쓸 수 있습니다.",
      measure: "리뷰 열기 → 장바구니.",
    },
    before: "상세 아래 별도 구매평 탭. 상세 중간 '리얼 후기'는 이미지.",
    after: "접는 메뉴 제목에 ★5.0 · 48개. 열면 포토 후기와 최신 구매평.",
    ref: "나이키 리뷰 (11) 아코디언",
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
    after: "세탁 · 보관 · 리프팅 벨트 차이 · 사이즈 질문 4개.",
  },
  {
    id: "related",
    label: "함께 보면 좋은 상품",
    marketing: {
      who: "벨트 하나만 담은 사람.",
      does: "6만 원 이상 무료 배송이라 4.8만 원 벨트 하나면 배송비가 붙습니다. 함께 쓰는 장비를 보여줘 무료 배송까지 함께 담게 합니다(객단가).",
      measure: "추천 상품 클릭, 주문 한 건에 담긴 상품 수.",
    },
    before: "없음. 리프팅 벨트만 상세 중간 이미지 링크로.",
    after: "리프팅 벨트 · 니슬리브 · 그립 · 리스트 랩 등 6개를 옆으로 넘기는 줄로.",
    ref: "나이키 '추천 상품'",
  },
];
