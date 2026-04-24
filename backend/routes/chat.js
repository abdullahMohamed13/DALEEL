import express from "express";
import { generateChatReply } from "../lib/chatService.js";
import {
  cleanupOldChatMessages,
  getRecentChatHistory,
  saveChatExchange,
} from "../lib/chatHistoryStore.js";

const router = express.Router();
const DEFAULT_HISTORY_LIMIT = 12;

const extractMessage = (req) =>
  req.body?.message || req.body?.query || req.query?.message || req.query?.query;
const extractSessionId = (req) =>
  req.body?.sessionId ||
  req.query?.sessionId ||
  req.headers["x-chat-session-id"] ||
  null;

router.post("/", async (req, res) => {
  const message = extractMessage(req);
  const sessionId = extractSessionId(req);

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const safeMessage = String(message).trim();

  await cleanupOldChatMessages();
  const historyRows = await getRecentChatHistory(sessionId, DEFAULT_HISTORY_LIMIT);
  const history = historyRows.map((item) => ({
    role: item.sender === "user" ? "user" : "assistant",
    content: item.content,
    timestamp: item.created_at,
    matchedType: item.matched_type || null,
  }));

  const reply = await generateChatReply(safeMessage, { history });
  await saveChatExchange({
    sessionId,
    userMessage: safeMessage,
    botMessage: reply,
    provider: reply.provider,
    matchedType: reply.matchedType,
  });

  res.json({
    ...reply,
    sessionId,
  });
});

router.get("/", async (req, res) => {
  const message = extractMessage(req);
  const sessionId = extractSessionId(req);

  if (!message || !String(message).trim()) {
    await cleanupOldChatMessages();
    const historyRows = await getRecentChatHistory(sessionId, DEFAULT_HISTORY_LIMIT * 2);
    return res.json({
      sessionId,
      messages: historyRows,
    });
  }

  const safeMessage = String(message).trim();
  await cleanupOldChatMessages();
  const historyRows = await getRecentChatHistory(sessionId, DEFAULT_HISTORY_LIMIT);
  const history = historyRows.map((item) => ({
    role: item.sender === "user" ? "user" : "assistant",
    content: item.content,
    timestamp: item.created_at,
    matchedType: item.matched_type || null,
  }));
  const reply = await generateChatReply(safeMessage, { history });
  await saveChatExchange({
    sessionId,
    userMessage: safeMessage,
    botMessage: reply,
    provider: reply.provider,
    matchedType: reply.matchedType,
  });

  res.json({
    ...reply,
    sessionId,
  });
});

export default router;
