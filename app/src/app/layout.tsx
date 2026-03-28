import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { AuthProvider } from "@/components/auth-provider";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface text-on-surface pb-24">
        <AuthProvider>
          <main className="max-w-2xl mx-auto">{children}</main>
          <Navigation />
        </AuthProvider>
      </body>
    </html>
  );
}
