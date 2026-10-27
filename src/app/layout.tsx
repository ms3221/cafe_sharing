import type { Metadata } from "next";
import "./globals.css";
import { SampleGate } from "@/components/renewal/SampleGate";

export const metadata: Metadata = {
  title: "상세페이지 리뉴얼 샘플",
  description: "원본 상세페이지 클론과 리뉴얼 제안 샘플 모음",
  robots: {
    index: false,
    follow: false,
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
        <SampleGate>{children}</SampleGate>
      </body>
    </html>
  );
}
