export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isSignature?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  image: string;
}

export const menuCategories = [
  { id: "signature", label: "대표메뉴" },
  { id: "dessert", label: "디저트" },
  { id: "coffee", label: "커피" },
  { id: "coldbrew", label: "콜드브루" },
  { id: "drink", label: "음료" },
  { id: "tea", label: "차" },
  { id: "ade", label: "에이드" },
  { id: "smoothie", label: "스무디" },
] as const;

// 실제 메뉴 사진 + Unsplash 임시 이미지 (없는 항목은 추후 교체)
const img = {
  bread: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fimagefarm.baemin.com%2Fsmartmenuimage%2Fupload%2Fimage%2F2023%2F7%2F17%2F6_X5e1Am84Dwk-oUKPTQ6GOc4HR4SZ8_GTv6qmjs-Oek4tiKWzKoJZHc8MqWtEX1.jpg",
  bread2: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fimagefarm.baemin.com%2Fsmartmenuimage%2Fupload%2Fimage%2F2025%2F6%2F6%2FuhDhNguSPm8NIDKOLC8pk1DeD6w_k38-pIjDygBy9lQIa-4twtGJBdDadZ27_NYoBIAoSH-dVVcwu3csvX_5sA%3D%3D.jpg",
  baguette: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fimagefarm.baemin.com%2Fsmartmenuimage%2Fupload%2Fimage%2F2024%2F7%2F5%2FQYdN_1hgjBGGsAaFcoxipEh_Job2WcF9WIRjLhBcxGJU6yE056STeorRYqqJOUv5ot29xfUuD60_opHlWBCscA%3D%3D.jpg",
  cheesecake: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fimagefarm.baemin.com%2Fsmartmenuimage%2Fupload%2Fimage%2F2024%2F4%2F25%2Fp6jyIsX1VGpn9mtkhWaKZRN8fUm2S9OjXiWHMEEK5AxOZRJMx4RVlVnQoNQHWAALJFcGTlrx21FeJN3cdfGC9A%3D%3D.jpg",
  sandwich: "/images/menu-sandwich.jpg",
  eggBread: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fimagefarm.baemin.com%2Fsmartmenuimage%2Fupload%2Fimage%2F2024%2F10%2F2%2FNIDtGKE49RZHrMdGLWo1F2kYBjlejPfiBtqO1luhaHdZfkf5vqNNEC-TN7qUDMkv6cUnPpS1L3yVUPnEQwEtnw%3D%3D.jpg",
  icecream: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=450&fit=crop",
  americano: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=450&fit=crop",
  latte: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=450&fit=crop",
  vanillaLatte: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=450&fit=crop",
  hazelnut: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&h=450&fit=crop",
  iceLatte: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&h=450&fit=crop",
  coldbrew: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=450&fit=crop&q=80",
  coldbrewLatte: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&h=450&fit=crop",
  choco: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&h=450&fit=crop",
  strawberry: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&h=450&fit=crop",
  iceTea: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=450&fit=crop",
  misugaru: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=450&fit=crop",
  matcha: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=450&fit=crop",
  herbTea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=450&fit=crop",
  sweetTea: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=450&fit=crop",
  grapeAde: "https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=600&h=450&fit=crop",
  lemonAde: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=450&fit=crop",
  blueAde: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=600&h=450&fit=crop",
  grapefruitAde: "https://images.unsplash.com/photo-1587015566802-6cc1bfa533b4?w=600&h=450&fit=crop",
  yujaAde: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&h=450&fit=crop",
  yogurt: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=450&fit=crop",
  deodeok: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=450&fit=crop",
  tomato: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=450&fit=crop",
};

export const menuItems: MenuItem[] = [
  // ── 대표메뉴 ──
  {
    id: "salt-bread",
    name: "버터 듬뿍 소금빵",
    description: "오후 2~3시에 나옵니다, 포크제공(x)",
    price: 3500,
    category: "signature",
    isSignature: true,
    image: img.bread,
  },
  {
    id: "crack-salt-bread",
    name: "크랙소금빵 (바게트맛)",
    description: "바삭한 바게트 식감입니다",
    price: 3500,
    category: "signature",
    isSignature: true,
    isNew: true,
    image: img.baguette,
  },
  {
    id: "basque-cheesecake",
    name: "바스크 치즈케이크",
    description:
      "(NO밀가루, 전분) 생크림과 치즈가 가득 들어가 단단하지 않습니다. 얼려드시면 더 맛있게 드실 수 있습니다",
    price: 6000,
    category: "signature",
    isSignature: true,
    image: img.cheesecake,
  },

  // ── 디저트 ──
  {
    id: "salt-bread-dessert",
    name: "버터 듬뿍 소금빵",
    description: "오후 2~3시에 나옵니다, 포크제공(x)",
    price: 3500,
    category: "dessert",
    isSignature: true,
    image: img.bread,
  },
  {
    id: "crack-salt-bread-dessert",
    name: "크랙소금빵 (바게트맛)",
    description: "바삭한 바게트 식감입니다",
    price: 3500,
    category: "dessert",
    isNew: true,
    image: img.baguette,
  },
  {
    id: "salt-bread-sandwich",
    name: "소금빵 샌드위치",
    description: "야채 + 햄 + 양파 + 치즈 + 토마토",
    price: 7200,
    category: "dessert",
    isNew: true,
    image: img.sandwich,
  },
  {
    id: "egg-potato-salt-bread",
    name: "에그 포테이토 소금빵",
    description: "계란+마요네즈+감자+콘으로 구성된 식사용으로 좋은 소금빵",
    price: 6000,
    category: "dessert",
    image: img.eggBread,
  },
  {
    id: "myungran-potato-salt-bread",
    name: "명란 포테이토 소금빵",
    description: "명란과 포테이토가 조화를 이루는 소금빵",
    price: 6000,
    category: "dessert",
    image: img.bread2,
  },
  {
    id: "marble-icecream",
    name: "구슬아이스크림",
    description:
      "-40도에서 보관하는 구슬아이스크림. 꺼내는 즉시 녹기 시작하니 빨리 드세요!",
    price: 13000,
    category: "dessert",
    image: img.icecream,
  },
  {
    id: "basque-cheesecake-dessert",
    name: "바스크 치즈케이크",
    description:
      "(NO밀가루, 전분) 생크림과 치즈가 가득. 얼려드시면 더 맛있어요",
    price: 6000,
    category: "dessert",
    isSignature: true,
    image: img.cheesecake,
  },

  // ── 커피 ──
  {
    id: "event-americano",
    name: "아메리카노 (리뷰이벤트)",
    description:
      "1잔만 주문 가능 / 닉네임 기재 필수 / 사이즈업 불가",
    price: 2000,
    category: "coffee",
    isNew: true,
    image: img.americano,
  },
  {
    id: "premium-americano",
    name: "아메리카노 (프리미엄 블렌딩)",
    description: "프랜차이즈 대비 2~3배 비싼 원두입니다, 맛 보장해요",
    price: 3500,
    category: "coffee",
    image: img.americano,
  },
  {
    id: "cafe-latte",
    name: "카페라떼",
    description: "고소한 서울우유를 사용합니다",
    price: 4000,
    category: "coffee",
    image: img.latte,
  },
  {
    id: "vanilla-latte",
    name: "바닐라라떼",
    description: "매출 1위 메뉴 (시럽사용X)",
    price: 4500,
    category: "coffee",
    isRecommended: true,
    image: img.vanillaLatte,
  },
  {
    id: "hazelnut-latte",
    name: "헤이즐넛라떼",
    description: "고소한 헤이즐넛 향의 라떼",
    price: 4500,
    category: "coffee",
    image: img.hazelnut,
  },
  {
    id: "excellent-latte",
    name: "엑셀런트라떼 (ICE)",
    description: "크림베이스 + 액셀런트아이스크림 (only ice)",
    price: 5500,
    category: "coffee",
    image: img.iceLatte,
  },

  // ── 콜드브루 ──
  {
    id: "coldbrew",
    name: "콜드브루",
    description: "깊고 부드러운 콜드브루",
    price: 4200,
    category: "coldbrew",
    image: img.coldbrew,
  },
  {
    id: "coldbrew-latte",
    name: "콜드브루라떼",
    description: "콜드브루와 우유의 조합",
    price: 4700,
    category: "coldbrew",
    image: img.coldbrewLatte,
  },
  {
    id: "coldbrew-vanilla-latte",
    name: "콜드브루 바닐라라떼",
    description: "콜드브루에 바닐라 풍미를 더해",
    price: 5000,
    category: "coldbrew",
    image: img.vanillaLatte,
  },
  {
    id: "coldbrew-dolce-latte",
    name: "콜드브루 돌체라떼",
    description: "달콤한 돌체 콜드브루 라떼",
    price: 5000,
    category: "coldbrew",
    image: img.latte,
  },

  // ── 음료 ──
  {
    id: "choco-latte",
    name: "초코라떼",
    description: "진한 초콜릿의 달콤함",
    price: 4500,
    category: "drink",
    image: img.choco,
  },
  {
    id: "strawberry-latte",
    name: "딸기라떼 (ICE)",
    description: "달콤한 딸기라떼",
    price: 5500,
    category: "drink",
    image: img.strawberry,
  },
  {
    id: "ice-tea",
    name: "아이스티",
    description: "아샷추는 아이스티에 샷 추가하시면 됩니다",
    price: 3500,
    category: "drink",
    image: img.iceTea,
  },
  {
    id: "misugaru-latte",
    name: "미숫가루라떼",
    description: "미숫가루 + 우유 + 얼음 + 토종꿀",
    price: 5000,
    category: "drink",
    image: img.misugaru,
  },
  {
    id: "matcha-latte",
    name: "제주말차라떼",
    description: "제주산 말차를 사용한 라떼",
    price: 4500,
    category: "drink",
    image: img.matcha,
  },

  // ── 차 ──
  {
    id: "herb-tea",
    name: "허브티 (크리스틴다트너)",
    description:
      "프랑스에서 수입하는 허브차. 다양한 맛이 섞여있어 향과 맛이 풍부합니다",
    price: 4500,
    category: "tea",
    image: img.herbTea,
  },
  {
    id: "sweet-tea",
    name: "달달한 차",
    description: "자몽 / 레몬 / 생강 / 배도라지대추차 중 선택. 따뜻하게 제공",
    price: 5000,
    category: "tea",
    image: img.sweetTea,
  },

  // ── 에이드 ──
  {
    id: "green-grape-apple-ade",
    name: "청포도사과에이드",
    description: "청포도와 사과 알갱이가 씹혀서 먹는 재미가 있어요",
    price: 5000,
    category: "ade",
    image: img.grapeAde,
  },
  {
    id: "lemon-ade",
    name: "레몬에이드",
    description: "상큼한 레몬에이드",
    price: 5000,
    category: "ade",
    image: img.lemonAde,
  },
  {
    id: "blue-lemon-ade",
    name: "블루레몬에이드",
    description: "시원한 블루레몬에이드",
    price: 5000,
    category: "ade",
    image: img.blueAde,
  },
  {
    id: "grapefruit-ade",
    name: "자몽에이드",
    description: "새콤달콤 자몽에이드",
    price: 5000,
    category: "ade",
    image: img.grapefruitAde,
  },
  {
    id: "apple-yuzu-ade",
    name: "애플유자에이드",
    description: "애플티 + 유자청. 추천 메뉴!",
    price: 5500,
    category: "ade",
    isRecommended: true,
    image: img.yujaAde,
  },

  // ── 스무디 ──
  {
    id: "yogurt-smoothie",
    name: "요거트스무디",
    description: "상큼한 요거트 스무디",
    price: 6000,
    category: "smoothie",
    image: img.yogurt,
  },
  {
    id: "deodeok-juice",
    name: "더덕주스",
    description:
      "더덕청+우유를 갈아 만든 스무디. 젊은 분들에게 생소하지만 다시 꼭 찾으시는 메뉴",
    price: 7000,
    category: "smoothie",
    isRecommended: true,
    image: img.deodeok,
  },
  {
    id: "tomato-juice",
    name: "토마토주스",
    description: "시럽이 아닌 천연 꿀을 넣어 건강함을 추구합니다",
    price: 6000,
    category: "smoothie",
    image: img.tomato,
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}
