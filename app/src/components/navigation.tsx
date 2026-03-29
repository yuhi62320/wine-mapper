"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

const NAV_ITEMS = [
  { href: "/", icon: "home", label: "ホーム" },
  { href: "/map", icon: "map", label: "マップ" },
  { href: "/wines/new", icon: "add", label: "記録", isCenter: true },
  { href: "/wines", icon: "wine_bar", label: "一覧" },
  { href: "/profile", icon: "person", label: "マイページ" },
];

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Hide nav on login page
  if (pathname === "/login") return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-[#fcf9f3]/80 backdrop-blur-xl border-t border-[#722f37]/5 shadow-[0_-4px_20px_rgba(86,25,34,0.04)] rounded-t-[2rem]">
      {NAV_ITEMS.map((item) => {
        // Show login link instead of profile when not authenticated
        const href =
          item.href === "/profile" && !user ? "/login" : item.href;
        const label =
          item.href === "/profile" && !user ? "ログイン" : item.label;
        const icon =
          item.href === "/profile" && !user ? "login" : item.icon;

        const isActive =
          href === "/"
            ? pathname === "/"
            : href === "/wines"
            ? pathname === "/wines" || (pathname.startsWith("/wines/") && !pathname.startsWith("/wines/new"))
            : pathname.startsWith(href);

        if (item.isCenter) {
          return (
            <Link
              key={item.href}
              href={href}
              className="flex flex-col items-center justify-center text-stone-400 hover:text-[#c9a84c] transition-colors"
            >
              <div className="w-12 h-12 -mt-10 bg-primary shadow-xl rounded-full flex items-center justify-center text-white border-4 border-surface">
                <span className="material-symbols-outlined text-2xl">
                  {icon}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium mt-1">
                {label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={href}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isActive
                ? "text-[#722f37] scale-110"
                : "text-stone-400 hover:text-[#c9a84c]"
            }`}
          >
            <span
              className="material-symbols-outlined mb-1"
              style={
                isActive
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {icon}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
