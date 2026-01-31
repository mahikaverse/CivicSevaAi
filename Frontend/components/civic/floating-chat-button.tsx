"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingChatButtonProps {
  onClick?: () => void;
  isOpen?: boolean;
  currentLanguage?: "en" | "hi";
}

export function FloatingChatButton({
  onClick,
  isOpen = false,
  currentLanguage = "en",
}: FloatingChatButtonProps) {
  const content = {
    en: {
      label: "Chat with AI Assistant",
    },
    hi: {
      label: "AI सहायक से बात करें",
    },
  };

  const t = content[currentLanguage];

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 md:bottom-6",
        "bg-primary hover:bg-primary/90 hover:scale-105",
        isOpen && "rotate-90"
      )}
      size="icon"
      aria-label={t.label}
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
    </Button>
  );
}
