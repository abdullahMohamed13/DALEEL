import { useState, useRef, useEffect, useCallback } from "react";
import { BotMessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const BOT_PLACEHOLDER_REPLY = "هذا الشات بوت قيد التطوير حالياً. سيتم تفعيله قريباً لمساعدتك في استفساراتك! 🚀";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "أهلاً بك في دليل! 👋 كيف يمكنني مساعدتك اليوم؟",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
      });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Click outside to close
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      chatWindowRef.current &&
      !chatWindowRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: BOT_PLACEHOLDER_REPLY,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-[999]"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 bg-primary hover:bg-secondary text-white"
            >
              <BotMessageSquare className="!w-8 !h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999]
                       w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] sm:h-[520px] max-h-[85vh]
                       bg-white rounded-2xl shadow-2xl border border-gray-100
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b border-gray-100"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-white/30">
                  <AvatarImage src="/main-logo.svg" alt="Daleel Bot" />
                  <AvatarFallback className="bg-white/20 text-white font-bold text-sm">
                    د
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <p className="font-bold text-base leading-tight">مساعد دليل</p>
                  <p className="text-xs text-white/70">متصل الآن</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full w-9 h-9"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4"
            >
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row" : "flex-row-reverse"}`}>
                      {msg.sender === "bot" && (
                        <Avatar className="w-7 h-7 mt-1 shrink-0">
                          <AvatarImage src="/main-logo.svg" alt="Bot" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-primary text-white rounded-bl-sm"
                              : "bg-gray-100 text-foreground rounded-br-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === "user" ? "text-left" : "text-right"}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7 shrink-0">
                        <AvatarImage src="/main-logo.svg" alt="Bot" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-br-sm flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب رسالتك..."
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                             placeholder:text-muted-foreground/60 font-sans transition-shadow"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-secondary text-white shrink-0
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                مُدار بواسطة فريق دليل
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
