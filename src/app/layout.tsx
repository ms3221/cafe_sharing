import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "쉐어링 | 광주 동구 소금빵 & 커피 전문 카페",
  description:
    "광주 동구 소태역 근처 카페 쉐어링. 매일 오후 갓 구워내는 버터 듬뿍 소금빵, 프리미엄 블렌딩 커피, 바스크 치즈케이크를 만나보세요.",
  keywords: [
    "쉐어링",
    "광주 카페",
    "소금빵",
    "광주 동구 카페",
    "소태역 카페",
    "바스크 치즈케이크",
    "광주 베이커리",
  ],
  openGraph: {
    title: "쉐어링 | 광주 동구 소금빵 & 커피 전문 카페",
    description:
      "광주 동구 소태역 근처 카페 쉐어링. 매일 오후 갓 구워내는 버터 듬뿍 소금빵, 프리미엄 블렌딩 커피, 바스크 치즈케이크를 만나보세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "쉐어링",
  },
  twitter: {
    card: "summary_large_image",
    title: "쉐어링",
    description: "매일 오후, 갓 구운 소금빵의 향기",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
