"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, AlertCircle, FileText, BookOpen, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  currentLanguage?: "en" | "hi";
}

export function BottomNav({ currentLanguage = "en" }: BottomNavProps) {
  const pathname = usePathname();

  const content = {
    en: {
      home: "Home",
      report: "Report",
      complaints: "Complaints",
      schemes: "Schemes",
      help: "Help",
    },
    hi: {
      home: "होम",
      report: "शिकायत",
      complaints: "स्थिति",
      schemes: "योजनाएं",
      help: "मदद",
    },
  };

  const t = content[currentLanguage];

  const navItems = [
    { href: "/", icon: Home, label: t.home },
    { href: "/report", icon: AlertCircle, label: t.report },
    { href: "/complaints", icon: FileText, label: t.complaints },
    { href: "/schemes", icon: BookOpen, label: t.schemes },
    { href: "/help", icon: HelpCircle, label: t.help },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 px-2 py-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
