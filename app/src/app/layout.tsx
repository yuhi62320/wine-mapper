import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Wine Mapper",
  description: "ワインを飲みながら世界を旅する",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#fafaf8] pb-20">
        <main className="max-w-lg mx-auto">{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
