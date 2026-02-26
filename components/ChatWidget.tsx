"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content:
        "Oi! Eu sou o Foquinha 🦭, assistente virtual da Foca Marketing! Como posso te ajudar hoje?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: makeId(),
      role: "user",
      content: inputValue.trim(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    const modelMsgId = makeId();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.reply || "API error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (firstChunk) {
          firstChunk = false;
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            { id: modelMsgId, role: "model", content: chunk },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === modelMsgId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "model",
          content:
            "Ops, tive um problema técnico. Tente novamente ou fale com a gente pelo WhatsApp!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Painel do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass-card border-0 rounded-2xl w-80 md:w-96 h-[500px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between rounded-t-2xl flex-shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-accent" />
                <span className="font-semibold">Foquinha</span>
                <span className="text-xs text-primary-foreground/60">
                  · Foca Marketing
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fechar painel do chat"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Área de mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                        msg.role === "user"
                          ? "bg-accent text-accent-foreground rounded-br-sm"
                          : "bg-secondary text-secondary-foreground rounded-bl-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                      ...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Botão falar com atendente */}
            <div className="px-4 pb-2 flex-shrink-0">
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/5521994176751?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20atendente%20da%20Foca%20Marketing!",
                    "_blank"
                  )
                }
                className="text-xs text-accent hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                Falar com atendente humano
              </button>
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && sendMessage()
                }
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1 text-sm bg-background border border-input rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
              />
              <Button
                size="icon"
                variant="accent"
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão toggle + label */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="help-label"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(true)}
              className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"
            >
              Precisa de ajuda?
            </motion.button>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
          className="w-14 h-14 rounded-full bg-accent shadow-accent flex items-center justify-center text-accent-foreground hover:scale-105 transition-transform"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
