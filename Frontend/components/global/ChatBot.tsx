 "use client";

import { useState } from "react";
import { HeroInput } from "@/components/civic/hero-input";
import { X, MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBot() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= SEND MESSAGE ================= */

  const sendMessage = async (text: string) => {

    // USER MESSAGE ADD
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);

    try {

      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      const aiReply = data.reply || "AI error";

      /* ================= TYPING EFFECT ================= */

      // Add empty AI message first
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "" }
      ]);

      let currentText = "";
      const words = aiReply.split(" ");

      words.forEach((word: string, index: number) => {

        setTimeout(() => {

          currentText += word + " ";

          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "ai",
              text: currentText
            };
            return updated;
          });

          if (index === words.length - 1) {
            setLoading(false);
          }

        }, index * 50); // speed (change if needed)

      });

    } catch {

      setMessages(prev => [
        ...prev,
        { role: "ai", text: "Server not responding 😢" }
      ]);

      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= CHAT ICON ================= */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* ================= CHAT WINDOW ================= */}

      {open && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[540px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Civic AI Assistant</span>

            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* ================= MESSAGES ================= */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">

            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Hi 👋 Ask me about civic problems, schemes, complaints etc.
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow
                  ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-xs text-muted-foreground">
                AI typing...
              </p>
            )}

          </div>

          {/* ================= INPUT ================= */}

          <div className="border-t p-3">
            <HeroInput onSubmit={sendMessage} />
          </div>

        </div>
      )}
    </>
  );
}
