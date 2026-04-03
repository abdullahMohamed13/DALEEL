import { useState } from "react";
import { API_BASE } from "@/config/api";
import { useStaticResponses } from './useStaticResponses';

export interface DaleelServiceData {
  service: string;
  category: string;
  steps: string[];
  documents: string[];
  confidence?: number;
  language?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  data?: DaleelServiceData;
}

// Main hook
export function useDaleelChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "أهلاً بك في دليل! 👋\nاسألني عن أي خدمة حكومية مصرية وهساعدك.",
      timestamp: new Date()
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { checkStaticResponse } = useStaticResponses();

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    // 1. Add user message to chat
    const userMessage: Message = { id: Date.now(), sender: "user", text: userText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    // 2. Check for static/greeting responses first
    const staticReply = checkStaticResponse(userText);
    if (staticReply) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: staticReply, timestamp: new Date() },
        ]);
        setLoading(false);
      }, 500); // Simulate bot typing delay
      return;
    }

    // 3. Call the API
    try {
      const res = await fetch(
        `${API_BASE}/service?query=${encodeURIComponent(userText)}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // 4. Format the response
      let replyText;
      let serviceData: DaleelServiceData | undefined;
      if (!data) {
        replyText =
          "عذراً، مش لاقي معلومات عن الخدمة دي. 🤔\nحاول تسأل بطريقة تانية أو اذكر اسم الخدمة بشكل أوضح.\nمثال: \"عايز استخرج بطاقة رقم قومي\"";
      } else {
        serviceData = data;
        const steps = data.steps && Array.isArray(data.steps) ? data.steps.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n") : "";
        const docs = data.documents && Array.isArray(data.documents) ? data.documents.join("\n• ") : "";

        replyText = `✅ *${data.service}*`;
        if (data.category) replyText += `\n📂 القسم: ${data.category}\n`;
        if (steps) replyText += `\n📋 *الخطوات:*\n${steps}\n`;
        if (docs) replyText += `\n📄 *المستندات المطلوبة:*\n• ${docs}`;

        replyText = replyText.trim();
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: replyText, timestamp: new Date(), data: serviceData },
      ]);
    } catch (err) {
      setError("تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "⚠️ فيه مشكلة في الاتصال، حاول تاني كمان شوية.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}