import express from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data || []);
});

router.get("/my-services", requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data || []);
});

router.post("/", requireAuth, async (req, res) => {
  const { title, description, price, location } = req.body;
  const normalizedTitle = typeof title === "string" ? title.trim() : "";

  if (!normalizedTitle || price === undefined || price === null) {
    return res.status(400).json({ error: "Title and price are required" });
  }

  const { data, error } = await supabase
    .from("services")
    .insert([
      {
        user_id: req.user.id,
        title: normalizedTitle,
        description,
        price,
        location,
      },
    ])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location } = req.body;
  const updates = {};

  if (title !== undefined) {
    const normalizedTitle = typeof title === "string" ? title.trim() : "";

    if (!normalizedTitle) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    updates.title = normalizedTitle;
  }

  if (description !== undefined) updates.description = description;
  if (price !== undefined) updates.price = price;
  if (location !== undefined) updates.location = location;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  const { data, error } = await supabase
    .from("services")
    .update(updates)
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data?.length) {
    return res.status(404).json({ error: "Service not found" });
  }

  res.json({ message: "Service updated successfully", updated: data[0] });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("services")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select("id");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data?.length) {
    return res.status(404).json({ error: "Service not found" });
  }

  res.json({ message: "Service deleted successfully" });
});

export default router;
