"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./header";
import { BottomNav } from "./bottom-nav";
 
 
interface CivicLayoutProps {
  children: ReactNode;
}

export function CivicLayout({ children }: CivicLayoutProps) {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomNav currentLanguage={language} />
       
       
    </div>
  );
}
