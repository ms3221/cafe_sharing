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
}

// 첫 장만 선택한 컬러로 바뀐다. 컬러별 착용컷이 없어 2번부터는 공통
export const galleryFor = (color: BeltColor): Shot[] => [
  { src: color.image, alt: `브리즈 벨트 ${color.name}`, fit: "contain" },
  { src: "/assets/breeze-belt/gallery-01.jpg", alt: "브리즈 벨트 3컬러", fit: "contain" },
  { src: photos.holdBelt, alt: "브리즈 벨트 착용컷", fit: "cover" },
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
  { title: "프리미엄 벨크로 락", body: "넓은 면적의 벨크로가 풀업 · 점프 · 하이풀에서도 풀리지 않습니다.", image: photos.velcro },
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
    before: "아임웹 기본 영역: 사진 2장, 상품명 · 가격 아래에 옵션 드롭다운 2개.",
    after: "사진 11장 갤러리 + 상품명 · 가격 · 컬러 사진 칩 · 사이즈 버튼 · 구매 버튼.",
    why: "나이키 상세는 첫 화면에서 '고르고 담기'가 끝납니다. 드롭다운은 눌러봐야 옵션이 보이지만, 칩과 버튼은 보는 순간 고를 수 있습니다. 착용컷이 상단 갤러리로 올라와 긴 상세를 내리지 않아도 됩니다.",
    ref: "나이키 스킴스 리프트 새틴 상단",
  },
  {
    id: "color",
    label: "컬러 사진 칩",
    before: "'색상' 드롭다운에 오렌지 / 블루 / 핑크 글자만.",
    after: "벨트 사진 칩 3개. 누르면 갤러리 첫 장과 '현재 컬러'가 바뀜.",
    why: "옵션명(오렌지)과 실제 바탕색(네이비)이 달라 글자만으로는 헷갈립니다. 사진으로 고르면 잘못 주문이 줄어듭니다. 컬러별 착용컷을 찍으면 갤러리 전체를 컬러별로 바꿀 수 있습니다.",
    ref: "나이키 컬러웨이 썸네일",
  },
  {
    id: "size",
    label: "사이즈 버튼",
    before: "'사이즈' 드롭다운. 실측은 상세 16번 이미지까지 내려가야 보임.",
    after: "XS~L 버튼에 허리 실측(cm)을 같이 적음. 옆에 사이즈 가이드 바로가기.",
    why: "사이즈 변경 교환은 왕복 배송비가 고객 부담입니다(현재 배송 안내). 고르는 자리에서 실측을 바로 보여줘 잘못 고르는 일을 줄입니다. 사이즈를 안 고르고 담으면 나이키처럼 바로 안내합니다.",
  },
  {
    id: "desc",
    label: "짧은 설명 + 핵심 수치",
    before: "통이미지 18장 (모바일 기준 약 10,000px, 화면 13개 분량).",
    after: "설명 한 문단 + 현재 컬러 · 무게 · 두께 · 원산지 네 줄.",
    why: "나이키는 상세를 '읽을 사람만 여는' 구조로 둡니다. 대부분은 사진과 한 문단으로 결정하고, 더 알고 싶은 사람만 아래를 엽니다. 이미지가 아닌 글이라 검색 · 번역 · 수정이 됩니다.",
    ref: "나이키 상품 설명 + 스타일 번호",
  },
  {
    id: "more",
    label: "상품 상세 정보 보기",
    before: "POINT 1 · 2, DETAIL 01~04, 리프팅 벨트 비교가 이미지 9장에 나뉘어 있음.",
    after: "팝업 하나에 특징 4개 · 제품 사양 · 리프팅 벨트 비교.",
    why: "원본의 설득 내용은 버리지 않고 한곳에 모았습니다. 원하는 사람만 열어 보니 페이지는 짧아지고, 내용은 그대로 남습니다.",
    ref: "나이키 '상품 상세 정보 보기' 팝업",
  },
  {
    id: "size-tip",
    label: "사이즈 & 팁",
    before: "SIZE INFO와 엠버서더 착용 사이즈가 이미지 2장으로 따로.",
    after: "접는 메뉴 안에 실측표 + 엠버서더 키 · 체중 · 착용 사이즈.",
    why: "'나랑 비슷한 사람이 뭘 입었나'가 가장 확실한 사이즈 기준입니다. 표가 글이라 휴대폰에서도 확대 없이 읽힙니다.",
  },
  {
    id: "shipping",
    label: "배송 및 반품",
    before: "상세 맨 끝 18번 이미지에 글자로 박혀 있음.",
    after: "같은 문구를 글로 옮겨 접는 메뉴에.",
    why: "구매 직전 가장 많이 찾는 정보입니다. 접어 두되 제목에서 바로 찾을 수 있게 했습니다. 아임웹 상세에서도 <details> 태그로 그대로 구현할 수 있는 구조입니다.",
  },
  {
    id: "review",
    label: "리뷰",
    before: "상세 아래 별도 구매평 탭. 상세 중간 '리얼 후기'는 이미지.",
    after: "접는 메뉴 제목에 ★5.0 · 48개. 열면 포토 후기와 최신 구매평.",
    why: "나이키처럼 별점은 제목에서 먼저 보여줍니다. 5.0이라는 숫자 자체가 가장 강한 설득입니다.",
    ref: "나이키 리뷰 (11) 아코디언",
  },
  {
    id: "faq",
    label: "자주 묻는 질문",
    before: "18번 이미지 상단 Q&A.",
    after: "세탁 · 보관 · 리프팅 벨트 차이 · 사이즈 질문 4개.",
    why: "나이키에는 없는 메뉴지만, 원본 상세에 있던 Q&A를 살렸습니다. 같은 질문이 문의 게시판에 반복되는 걸 줄입니다.",
  },
  {
    id: "related",
    label: "함께 보면 좋은 상품",
    before: "없음. 리프팅 벨트만 상세 중간 이미지 링크로.",
    after: "리프팅 벨트 · 니슬리브 · 그립 · 리스트 랩 등 6개를 옆으로 넘기는 줄로.",
    why: "6만 원 이상 무료 배송이라 4.8만 원 벨트 하나만 사면 배송비가 붙습니다. 함께 쓰는 장비를 바로 보여주면 객단가가 올라갑니다.",
    ref: "나이키 '추천 상품'",
  },
];
