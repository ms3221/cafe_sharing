// 리뉴얼 시안 4종이 공통으로 쓰는 재료
// 문구·수치는 현재 상세페이지 이미지에 적힌 내용만 옮겼다 (출처 주석 참고)

const CROP = "/assets/breeze-belt/crops";
const BASE = "/assets/breeze-belt";

export const photos = {
  heroPlate: `${CROP}/hero-plate.jpg`,
  beltDark: `${CROP}/belt-dark.jpg`,
  velcro: `${CROP}/velcro.jpg`,
  slim: `${CROP}/slim.jpg`,
  logoPatch: `${CROP}/logo-patch.jpg`,
  patchHand: `${CROP}/patch-hand.jpg`,
  athleteWod: `${CROP}/athlete-wod.jpg`,
  squatBack: `${CROP}/squat-back.jpg`,
  holdBelt: `${CROP}/hold-belt.jpg`,
  deadlift: `${CROP}/deadlift.jpg`,
  sizeDiagram: `${CROP}/size-diagram.jpg`,
  breezePair: `${CROP}/breeze-pair.jpg`,
  liftingPair: `${CROP}/lifting-pair.jpg`,
  stack: `${BASE}/gallery-01.jpg`,
};

// 상세 COLOR 섹션 기준. 옵션명과 실제 벨트 바탕색이 달라 칩은 바탕색 + 로고색 두 가지로 표시
export const colors = [
  { name: "핑크", en: "PINK", image: `${CROP}/color-pink.jpg`, base: "#e7a6c2", logo: "#e3283f", stage: "#f6dbe6" },
  { name: "오렌지", en: "ORANGE", image: `${CROP}/color-orange.jpg`, base: "#2c3556", logo: "#f26b1d", stage: "#ffe2cf" },
  { name: "블루", en: "BLUE", image: `${CROP}/color-blue.jpg`, base: "#2f5c56", logo: "#6fe6c9", stage: "#d6f3ea" },
];

export type BeltColor = (typeof colors)[number];

// POINT 1 · POINT 2 · DETAIL 01~04. x·y는 오렌지 정면컷 위 콜아웃 위치(%)
export const structure = [
  { no: 1, name: "폼 + 텍스타일 결합 구조", desc: "튼튼한 내구성으로 장기간 형태 변형 없이 사용", x: 14, y: 56 },
  { no: 2, name: "단일 압축 라인", desc: "몸에 딱 맞는 핏과 가동성. 운동 중 방해되지 않는 슬림 두께", x: 40, y: 17 },
  { no: 3, name: "프리미엄 벨크로 락", desc: "풀업 · 점프 · 하이풀에서도 흔들리지 않는 고정력", x: 93, y: 46 },
  { no: 4, name: "로고 패치", desc: "OUTDO만의 로고 디자인", x: 56, y: 50 },
];

export const materials = [
  { name: "외피 · 폼 결합", image: photos.slim, desc: "폼과 텍스타일 결합 구조. 오래 써도 형태가 무너지지 않습니다." },
  { name: "벨크로", image: photos.velcro, desc: "넓은 면적의 프리미엄 벨크로. 동작 중에도 풀리지 않습니다." },
  { name: "로고 패치", image: photos.patchHand, desc: "'I'M THE BEST' 패치. 어디서도 못 본 OUTDO만의 디테일." },
  { name: "버클 · 스트랩", image: photos.logoPatch, desc: "스트랩을 걸어 당긴 뒤 벨크로로 고정하는 구조." },
];

export const keyNumbers = [
  { value: "238", unit: "g", label: "XS 기준 무게", sub: "타사 벨트 약 381g" },
  { value: "6.9", unit: "mm", label: "두께", sub: "리프팅 벨트 9mm" },
  { value: "10", unit: "cm", label: "폭", sub: "SIZE INFO 실측" },
];

export const weight = { other: 381, breeze: 238, note: "XS 사이즈 기준으로 측정한 값입니다." };

// 타사(일반 벨트) 대비. 무게만 현재 상세 수치이고, 나머지 일반 벨트 값은 일반적인 가죽 리프팅 벨트 기준
export const versus = [
  { label: "무게", other: "약 381g", breeze: "238g" },
  { label: "두께", other: "10~13mm", breeze: "6.9mm" },
  { label: "고정", other: "버클 · 레버", breeze: "벨크로 락" },
  { label: "착용감", other: "단단하게 누름", breeze: "몸에 맞게 휘어짐" },
];

// 아웃두 벨트 한눈에 비교하기. 원본 이미지에는 너비가 mm로 적혀 있어 확인 필요
export const compare = {
  rows: ["두께", "너비", "특징", "추천"],
  lifting: {
    name: "리프팅 벨트",
    image: photos.liftingPair,
    href: "https://www.outdothebest.com/shop_view/?idx=29",
    values: ["9mm", "11cm", "고강도 역도 · 파워리프팅 전용 설계, 압도적인 복압 지지", "고중량 스쿼트 · 데드리프트 등 리프팅 전용"],
  },
  breeze: {
    name: "브리즈 벨트",
    image: photos.breezePair,
    values: ["6.9mm", "10cm", "경량 설계. WOD 중 빠른 움직임에 최적화", "짧은 세트 간 빠른 전환이 필요한 경우"],
  },
};

export const gauges = [
  { label: "가벼움", breeze: 5, lifting: 2 },
  { label: "움직임 편함", breeze: 5, lifting: 2 },
  { label: "복압 지지", breeze: 4, lifting: 5 },
  { label: "고중량 전용성", breeze: 3, lifting: 5 },
];

export const sizes = [
  { size: "XS", cm: "68~83", inch: "27 이하" },
  { size: "S", cm: "73~88", inch: "28~31" },
  { size: "M", cm: "80~93", inch: "32~35" },
  { size: "L", cm: "83~98", inch: "36 이상" },
];

export const ambassadors = [
  { name: "유양우", gender: "M", height: 169, weight: "84kg", waist: "32inch", lifting: "M", breeze: "M" },
  { name: "소중한", gender: "M", height: 181, weight: "95kg", waist: "32inch", lifting: "M", breeze: "M" },
  { name: "서현", gender: "F", height: 163, weight: "58kg", waist: "24inch", lifting: "S", breeze: "XS" },
  { name: "윤세련", gender: "F", height: 160, weight: "54~55kg", waist: "23inch", lifting: "S", breeze: "XS" },
];

export const faq = [
  {
    q: "세탁은 어떻게 해야 하나요?",
    a: "세탁을 권장하는 제품은 아닙니다. 찝찝하거나 냄새가 날 경우 탈취제를 뿌려 햇빛에 말려주시는 것이 가장 오래 쓰는 방법입니다.",
  },
  {
    q: "구부려서 보관해도 되나요?",
    a: "가볍고 얇은 만큼 변형이 생길 수 있습니다. 장시간 구부린 채로 두지 마시고, 함께 보내드린 벨트 백에 말아서 보관해주세요.",
  },
  {
    q: "리프팅 벨트와 뭐가 다른가요?",
    a: "리프팅 벨트(9mm)는 고중량 리프팅 전용, 브리즈 벨트(6.9mm)는 WOD 중 빠른 움직임과 세트 간 전환에 맞춘 경량 벨트입니다.",
  },
  {
    q: "사이즈는 어떻게 고르나요?",
    a: "허리 부분 실측 사이즈가 범위 안에 들어오도록 선택해주세요. 두 사이즈에 걸치면 엠버서더 착용 사이즈를 참고해주세요.",
  },
];

// 구매평 원문 (src/data/samples/breeze-belt.ts) 에서 발췌
export const quotes = {
  pr: "얘만 차면 자꾸 PR해요",
  pressure: "숨을 들이마셨을 때 복압이 꽉 차는 느낌이 확실하게 듭니다.",
  light: "가볍고 짱짱하고 복압도 잘 잡아주네요!! 걸리적 거리는 느낌이 없어서 더 좋아요",
  velcro: "벨크로 부착력이 강하고 고중량 데드리프트를 할 때도 단단하게 유지돼서 믿고 운동 가능합니다.",
  leather: "가죽 벨트가 골반과 갈비뼈를 눌러 멍이 들었는데, 브리즈벨트로 바꾸고 나서는 그런 통증이 싹 사라졌네요.",
  pink: "핑크색 벨트라니 너무 좋아용",
  both: "핑크랑 네이비 중에 고민하다가 둘 다 사버렸어요",
  design: "디자인도 예쁜데 성능도 우수합니다",
};

export const reviewPhotos = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `${BASE}/review-0${n}.jpg`);
