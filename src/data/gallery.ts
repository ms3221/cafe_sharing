export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=675&fit=crop",
    alt: "버터 듬뿍 소금빵",
    caption: "매일 오후 갓 구워내는 버터 듬뿍 소금빵",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=675&fit=crop",
    alt: "카페 쉐어링 내부",
    caption: "편안한 분위기의 카페 공간",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1200&h=675&fit=crop",
    alt: "바스크 치즈케이크",
    caption: "NO밀가루, 생크림과 치즈가 가득한 바스크 치즈케이크",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=675&fit=crop",
    alt: "프리미엄 블렌딩 커피",
    caption: "깊이 있는 바디감의 프리미엄 커피",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=675&fit=crop",
    alt: "카페 쉐어링 외관",
    caption: "광주 동구 남문로, 카페 쉐어링",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200&h=675&fit=crop",
    alt: "크랙소금빵",
    caption: "바삭한 바게트 식감의 크랙소금빵",
  },
];

export const instagramPosts = [
  {
    id: "1",
    url: "https://www.instagram.com/p/DUw_GkpDwbO/",
    thumbnail: "/images/insta-1.jpg",
    caption: "",
  },
  {
    id: "2",
    url: "https://www.instagram.com/p/Ctsyp41vdeP/",
    thumbnail: "/images/insta-2.jpg",
    caption: "",
  },
  {
    id: "3",
    url: "https://www.instagram.com/p/DRqyvMske1o/",
    thumbnail: "/images/insta-3.jpg",
    caption: "",
  },
  {
    id: "4",
    url: "https://www.instagram.com/p/DNag_rAhah4/",
    thumbnail: "/images/insta-4.jpg",
    caption: "",
  },
];
