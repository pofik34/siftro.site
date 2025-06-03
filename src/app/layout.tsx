import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Siftro - Otomatik Lead Toplama Aracı",
  description: "Siftro, küçük ve orta ölçekli girişimler için özel olarak geliştirilmiş veri kazıma ve potansiyel müşteri listesi oluşturma aracıdır.",
  keywords: "lead generation, veri kazıma, müşteri bulma, otomatik lead toplama, apify, n8n",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
