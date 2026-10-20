export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge?: string;
  isActive: boolean;
}

export const events: EventItem[] = [
  {
    id: "1",
    title: "리뷰이벤트 : 아메리카노 2,000원",
    description:
      "아메리카노 2,000원! 1건당 한 잔만 주문 가능합니다. 추가 주문은 다른 메뉴에서 해주세요. 닉네임 기재 필수 / 사이즈업 불가",
    date: "상시 진행",
    badge: "진행중",
    isActive: true,
  },
  {
    id: "2",
    title: "신메뉴 크랙소금빵 출시",
    description:
      "바삭한 바게트 식감의 크랙소금빵이 새롭게 출시되었습니다! 기존 소금빵과는 또 다른 매력을 느껴보세요.",
    date: "NEW",
    badge: "NEW",
    isActive: true,
  },
  {
    id: "3",
    title: "소금빵 나오는 시간 안내",
    description:
      "버터 듬뿍 소금빵은 매일 오후 2~3시에 나옵니다. 한정 수량이니 서둘러 방문해 주세요!",
    date: "매일 오후 2~3시",
    badge: "안내",
    isActive: true,
  },
  {
    id: "4",
    title: "소금빵 샌드위치 출시",
    description:
      "야채 + 햄 + 양파 + 치즈 + 토마토가 들어간 든든한 소금빵 샌드위치가 출시되었습니다.",
    date: "NEW",
    badge: "NEW",
    isActive: true,
  },
];
