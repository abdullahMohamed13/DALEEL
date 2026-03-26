import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET كل الكاتيجوريز
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

// GET خدمات كاتيجوري معينة
router.get("/:id/services", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

export default router;
