"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wine, Map, PlusCircle, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: Wine, label: "ワイン" },
  { href: "/map", icon: Map, label: "マップ" },
  { href: "/wines/new", icon: PlusCircle, label: "記録" },
  { href: "/profile", icon: User, label: "プロフィール" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-lg mx-auto flex justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 text-xs transition-colors ${
                isActive
                  ? "text-[#722f37]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
