import { useState } from "react";
import { API_BASE } from "@/config/api";
import { useStaticResponses } from "./useStaticResponses";

export interface DaleelServiceData {
  service: string;
  category: string;
  description?: string | null;
  steps: string[];
  documents: string[];
  channels?: string[];
  fees?: string | null;
  duration?: string | null;
  authority?: string | null;
  website?: string | null;
  online?: boolean;
  confidence?: number;
  language?: string;
}

interface ChatApiResponse {
  answer: string;
  confidence: number;
  matchedType: string;
  service: DaleelServiceData | null;
  reference?: {
    label?: string;
    number?: string | null;
    website?: string | null;
    text?: string;
  } | null;
  suggestions?: string[];
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  data?: DaleelServiceData;
}

export function useDaleelChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "أهلاً بك في دليل! 👋\nاسألني عن أي خدمة حكومية مصرية وسأساعدك بالمعلومات المتاحة من قاعدة البيانات.",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkStaticResponse } = useStaticResponses();

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    const staticReply = checkStaticResponse(userText);
    if (staticReply) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: staticReply,
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data: ChatApiResponse = await res.json();
      const replyText =
        data?.answer?.trim() ||
        "عذرًا، لم أستطع تكوين رد واضح من البيانات الحالية.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: replyText,
          timestamp: new Date(),
          data: data.service || undefined,
        },
      ]);
    } catch (err) {
      setError("تعذر الاتصال بخادم دليل. تحقق من تشغيل الباك أو إعداد رابط الـ API.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "⚠️ حدثت مشكلة أثناء الاتصال بخادم دليل. حاول مرة أخرى بعد التأكد من تشغيل الباك.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}
