"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroInputProps {
  onSubmit?: (value: string) => void;
  currentLanguage?: "en" | "hi";
}

export function HeroInput({ onSubmit, currentLanguage = "en" }: HeroInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const content = {
    en: {
      placeholder: "Type or speak your problem...",
    },
    hi: {
      placeholder: "अपनी समस्या टाइप करें या बोलें...",
    },
  };

  const t = content[currentLanguage];

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit?.(input);
      setInput("");
    }
  };

  const handleVoice = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      setInput(currentLanguage === "en" ? "There is a pothole on my street" : "मेरी सड़क पर गड्ढा है");
    }, 2000);
  };

  return (
    <div className="relative flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          className="h-14 rounded-2xl border-2 border-border bg-card pl-5 pr-24 text-base shadow-sm focus:border-primary"
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full",
              isListening && "bg-destructive text-destructive-foreground animate-pulse"
            )}
            onClick={handleVoice}
          >
            {isListening ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={handleSubmit}
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
