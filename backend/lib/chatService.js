import { CHAT_DATASET, CHAT_ENTRIES } from "./chatDataset.js";

const ARABIC_DIACRITICS = /[\u064B-\u065F\u0670]/g;
const CONTACT_HINTS = [
  "رقم",
  "تليفون",
  "هاتف",
  "خط",
  "الخط",
  "ساخن",
  "طوارئ",
  "نجدة",
  "النجدة",
  "اسعاف",
  "مطافئ",
  "شرطة",
  "شكاوى",
  "شكوى",
];
const SERVICE_HINTS = [
  "بطاقه",
  "بطاقة",
  "رقم قومي",
  "شهاده",
  "شهادة",
  "جواز",
  "رخصه",
  "رخصة",
  "تجديد",
  "استخراج",
  "بدل",
  "فاقد",
];
const STOP_WORDS = new Set([
  "عايز",
  "اريد",
  "ابغى",
  "محتاج",
  "لو",
  "سمحت",
  "من",
  "على",
  "في",
  "عن",
  "ما",
  "ماذا",
  "ايه",
  "اي",
  "الى",
  "او",
]);

const canonicalizeToken = (token) => {
  if (!token) return token;

  if (token.startsWith("ال") && token.length > 3) {
    return token.slice(2);
  }

  return token;
};

export const normalizeArabic = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(ARABIC_DIACRITICS, "")
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value) =>
  normalizeArabic(value)
    .split(" ")
    .map((token) => canonicalizeToken(token))
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

const entryTokenCache = new Map();

const getEntryTokens = (entry) => {
  if (!entryTokenCache.has(entry.id)) {
    entryTokenCache.set(entry.id, tokenize(entry.searchText));
  }

  return entryTokenCache.get(entry.id);
};

const isContactLikeQuery = (normalizedQuery, queryTokens) =>
  CONTACT_HINTS.some(
    (hint) => normalizedQuery.includes(hint) || queryTokens.includes(hint),
  );

const isServiceLikeQuery = (normalizedQuery) =>
  SERVICE_HINTS.some((hint) => normalizedQuery.includes(normalizeArabic(hint)));

const scoreEntry = (query, entry) => {
  const normalizedQuery = normalizeArabic(query);
  const queryTokens = [...new Set(tokenize(query))];
  const entryTokens = getEntryTokens(entry);
  const entryText = normalizeArabic(entry.searchText);
  const primaryLabel = normalizeArabic(
    entry.service || entry.label || entry.text || "",
  );
  const labelTokens = tokenize(primaryLabel);
  const contactLikeQuery = isContactLikeQuery(normalizedQuery, queryTokens);
  const serviceLikeQuery = isServiceLikeQuery(normalizedQuery);

  if (!normalizedQuery) return 0;

  let score = 0;

  if (primaryLabel === normalizedQuery) {
    score += 140;
  }

  if (primaryLabel && normalizedQuery.includes(primaryLabel)) {
    score += 90;
  }

  if (primaryLabel && primaryLabel.includes(normalizedQuery)) {
    score += 110;
  }

  if (entryText.includes(normalizedQuery)) {
    score += 70;
  }

  let matchedTokens = 0;

  for (const token of queryTokens) {
    if (entryTokens.includes(token)) {
      matchedTokens += 1;
      score += token.length >= 4 ? 18 : 8;

      if (labelTokens.includes(token)) {
        score += token.length >= 4 ? 16 : 7;
      }
    }
  }

  if (queryTokens.length > 0) {
    score += Math.round((matchedTokens / queryTokens.length) * 60);
  }

  if (queryTokens.length > 1 && queryTokens.every((token) => entryTokens.includes(token))) {
    score += 60;
  }

  if (
    labelTokens.length > 0 &&
    queryTokens.length > 0 &&
    queryTokens.every((token) => labelTokens.includes(token))
  ) {
    score += 80;
  }

  if (contactLikeQuery && !serviceLikeQuery) {
    if (entry.type === "contact" || entry.type === "platform") {
      score += 50;
    }

    if (entry.type === "service") {
      score -= 15;
    }
  } else if (entry.type === "service") {
    score += 12;

    if (serviceLikeQuery) {
      score += 35;
    }
  }

  return score;
};

const retrieveMatches = (query, limit = 5) =>
  CHAT_ENTRIES.map((entry) => ({
    entry,
    score: scoreEntry(query, entry),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

const getFallbackSuggestions = (matches) =>
  matches
    .map(({ entry }) => entry.service || entry.label || entry.text)
    .filter(Boolean)
    .slice(1, 4);

const buildServicePayload = (entry, confidence) => ({
  name: entry.service,
  service: entry.service,
  category: entry.category,
  description: entry.description,
  steps:
    entry.steps?.length > 0
      ? entry.steps
      : entry.channels?.map((channel) => `التقديم عبر: ${channel}`) || [],
  documents: entry.documents || [],
  channels: entry.channels || [],
  fees: entry.fees,
  duration: entry.duration,
  authority: entry.authority,
  website: entry.website || entry.authorityWebsite,
  online: entry.online,
  confidence,
});

const buildDeterministicAnswer = (entry, confidence) => {
  if (!entry) {
    return {
      answer:
        "لم أجد تطابقًا واضحًا في البيانات الحالية. حاول كتابة اسم الخدمة أو الجهة بشكل أوضح، مثل: استخراج بطاقة رقم قومي أو تجديد جواز سفر.",
      matchedType: "unknown",
      confidence,
      service: null,
      reference: null,
      suggestions: CHAT_DATASET.services
        .slice(0, 4)
        .map((item) => item.service),
    };
  }

  if (entry.type === "service") {
    const servicePayload = buildServicePayload(entry, confidence);
    const lines = [
      `الخدمة الأقرب لطلبك هي: ${entry.service}.`,
      entry.description ? `الوصف: ${entry.description}` : null,
      entry.category ? `التصنيف: ${entry.category}` : null,
      entry.authority ? `الجهة المسؤولة: ${entry.authority}` : null,
      entry.fees ? `الرسوم: ${entry.fees}` : null,
      entry.duration ? `المدة المتوقعة: ${entry.duration}` : null,
      entry.online
        ? "الخدمة متاحة إلكترونيًا أو جزئيًا عبر القنوات المذكورة."
        : "الخدمة غالبًا تحتاج تقديمًا حضوريًا أو عبر الجهة المختصة.",
    ].filter(Boolean);

    return {
      answer: lines.join("\n"),
      matchedType: "service",
      confidence,
      service: servicePayload,
      reference: null,
      suggestions: [],
    };
  }

  if (entry.type === "contact") {
    const parts = [
      `أفضل جهة مطابقة هي: ${entry.label}.`,
      entry.number ? `رقم التواصل: ${entry.number}` : null,
      entry.website ? `الموقع: ${entry.website}` : null,
    ].filter(Boolean);

    return {
      answer: parts.join("\n"),
      matchedType: "contact",
      confidence,
      service: null,
      reference: {
        label: entry.label,
        number: entry.number || null,
        website: entry.website || null,
        kind: entry.kind,
      },
      suggestions: [],
    };
  }

  if (entry.type === "platform") {
    const parts = [
      `المنصة الأقرب لطلبك هي: ${entry.label}.`,
      entry.website ? `الموقع: ${entry.website}` : null,
      entry.hotline ? `الخط الساخن: ${entry.hotline}` : null,
      entry.email ? `البريد الإلكتروني: ${entry.email}` : null,
    ].filter(Boolean);

    return {
      answer: parts.join("\n"),
      matchedType: "platform",
      confidence,
      service: null,
      reference: {
        label: entry.label,
        website: entry.website || null,
        hotline: entry.hotline || null,
        email: entry.email || null,
      },
      suggestions: [],
    };
  }

  return {
    answer: entry.text,
    matchedType: "note",
    confidence,
    service: null,
    reference: { text: entry.text },
    suggestions: [],
  };
};

const buildGroqPrompt = (message, matches, deterministic) => {
  const context = matches.map(({ entry, score }) => ({
    score,
    type: entry.type,
    service: entry.service || null,
    category: entry.category || null,
    description: entry.description || null,
    documents: entry.documents || [],
    steps: entry.steps || [],
    channels: entry.channels || [],
    fees: entry.fees || null,
    duration: entry.duration || null,
    label: entry.label || null,
    number: entry.number || null,
    website: entry.website || entry.authorityWebsite || null,
    authority: entry.authority || null,
    text: entry.text || null,
  }));

  return {
    system: `
You are Daleel, an assistant for Egyptian government services.
Use only the provided context.
Do not invent facts.
Respond in Arabic unless the user message is clearly English.
Return a valid JSON object with this exact schema:
{
  "answer": "string",
  "suggestions": ["string", "string"]
}
Keep the answer concise, factual, and tied to the dataset.
    `.trim(),
    user: JSON.stringify(
      {
        user_message: message,
        deterministic_answer: deterministic.answer,
        context,
      },
      null,
      2,
    ),
  };
};

const requestGroqJson = async (message, matches, deterministic) => {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  const prompt = buildGroqPrompt(message, matches, deterministic);
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL || "llama3-70b-8192",
      temperature: Number(process.env.CHAT_TEMPERATURE || 0.1),
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    return null;
  }

  const parsed = JSON.parse(content);

  return {
    answer:
      typeof parsed.answer === "string" && parsed.answer.trim()
        ? parsed.answer.trim()
        : null,
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item) => typeof item === "string")
      : [],
  };
};

export const generateChatReply = async (message) => {
  const matches = retrieveMatches(message);
  const topMatch = matches[0] || null;
  const confidence = topMatch
    ? Number(Math.min(0.99, topMatch.score / 220).toFixed(2))
    : 0;

  const deterministic = buildDeterministicAnswer(
    topMatch?.entry || null,
    confidence,
  );

  deterministic.suggestions =
    deterministic.suggestions.length > 0
      ? deterministic.suggestions
      : getFallbackSuggestions(matches);

  try {
    const groqJson = await requestGroqJson(message, matches, deterministic);

    if (groqJson?.answer) {
      return {
        ...deterministic,
        answer: groqJson.answer,
        suggestions:
          groqJson.suggestions?.length > 0
            ? groqJson.suggestions
            : deterministic.suggestions,
        usedGroq: true,
      };
    }
  } catch (error) {
    return {
      ...deterministic,
      usedGroq: false,
      debug: error.message,
    };
  }

  return {
    ...deterministic,
    usedGroq: false,
  };
};
