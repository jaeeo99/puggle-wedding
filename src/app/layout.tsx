import type { Metadata } from "next";
import { Geist, Geist_Mono, Rozha_One, Gowun_Batang } from "next/font/google";
import "./globals.css";
import ClientScripts from "@/components/ClientScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rozhaOne = Rozha_One({
  variable: "--rozha-one",
  weight: "400", // 허용된 값
  subsets: ["latin"], // 허용된 값
});

const gowunBatang = Gowun_Batang({
  variable: "--gowun-batang",
  weight: ["400", "700"], // 배열로 여러 두께 설정 가능
  subsets: ["latin"], // 허용된 값
});

export const metadata: Metadata = {
  title: "박진철 ❤️ 임지혜",
  description: "박진철 & 임지혜의 결혼식에 초대합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rozhaOne.variable} ${gowunBatang.variable} antialiased`}
      >
        <ClientScripts />
        {children}
      </body>
    </html>
  );
}
