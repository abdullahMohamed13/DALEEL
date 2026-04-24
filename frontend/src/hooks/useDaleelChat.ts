import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "@/config/api";

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
  provider?: "groq" | "local_fallback";
  statusMessage?: string;
  service: DaleelServiceData | null;
  reference?: {
    label?: string;
    number?: string | null;
    website?: string | null;
    text?: string;
  } | null;
  suggestions?: string[];
  sessionId?: string | null;
}

interface ChatHistoryRow {
  id: string;
  sender: "user" | "bot";
  content: string;
  created_at: string;
}

interface ChatHistoryResponse {
  sessionId?: string | null;
  messages: ChatHistoryRow[];
}

export interface Message {
  id: number | string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  data?: DaleelServiceData;
  suggestions?: string[];
}

const SESSION_STORAGE_KEY = "daleel_chat_session_id";

const createSessionId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getOrCreateSessionId = () => {
  const existing = localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const newId = createSessionId();
  localStorage.setItem(SESSION_STORAGE_KEY, newId);

  return newId;
};

const WELCOME_MESSAGE =
  "أهلًا بك في دليل! 👋\nاسألني عن أي خدمة حكومية مصرية وسأساعدك بالمعلومات المتاحة من قاعدة البيانات.";
const FALLBACK_REPLY =
  "عذرًا، لم أستطع تكوين رد واضح من البيانات الحالية.";
const CONNECTION_ERROR =
  "تعذر الاتصال بخادم دليل. تحقق من تشغيل الباك أو إعداد رابط الـ API.";
const CONNECTION_ERROR_REPLY =
  "⚠️ حدثت مشكلة أثناء الاتصال بخادم دليل. حاول مرة أخرى بعد التأكد من تشغيل الباك.";

export function useDaleelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const sessionId = useMemo(() => getOrCreateSessionId(), []);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/chat?sessionId=${encodeURIComponent(sessionId)}`,
        );

        if (!res.ok) throw new Error("Failed to load chat history");

        const data: ChatHistoryResponse = await res.json();

        if (data?.sessionId && data.sessionId !== sessionId) {
          localStorage.setItem(SESSION_STORAGE_KEY, data.sessionId);
        }

        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(
            data.messages.map((item) => ({
              id: item.id,
              sender: item.sender,
              text: item.content,
              timestamp: new Date(item.created_at),
            })),
          );
        } else {
          setMessages([
            {
              id: 1,
              sender: "bot",
              text: WELCOME_MESSAGE,
              timestamp: new Date(),
            },
          ]);
        }
      } catch (err) {
        setMessages([
          {
            id: 1,
            sender: "bot",
            text: WELCOME_MESSAGE,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setHistoryLoaded(true);
      }
    };

    loadHistory();
  }, [sessionId]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || !historyLoaded) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText, sessionId }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data: ChatApiResponse = await res.json();
      const replyText = data?.answer?.trim() || FALLBACK_REPLY;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: replyText,
          timestamp: new Date(),
          data: data.service || undefined,
          suggestions: Array.isArray(data.suggestions)
            ? data.suggestions.filter(Boolean).slice(0, 4)
            : undefined,
        },
      ]);
    } catch (err) {
      setError(CONNECTION_ERROR);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: CONNECTION_ERROR_REPLY,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}
