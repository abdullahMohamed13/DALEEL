import express from "express";
import { generateChatReply } from "../lib/chatService.js";

const router = express.Router();

const extractMessage = (req) =>
  req.body?.message || req.body?.query || req.query?.message || req.query?.query;

router.post("/", async (req, res) => {
  const message = extractMessage(req);

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = await generateChatReply(String(message));

  res.json(reply);
});

router.get("/", async (req, res) => {
  const message = extractMessage(req);

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  const reply = await generateChatReply(String(message));

  res.json(reply);
});

export default router;
