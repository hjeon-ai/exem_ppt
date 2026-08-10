import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EXEM Canvas Editor",
  description: "Next.js 기반 EXEM 캔버스 템플릿 에디터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-[Pretendard,sans-serif]">{children}</body>
    </html>
  );
}
