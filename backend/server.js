import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import categoriesRoutes from "./routes/categories.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/services", servicesRoutes);
app.use("/categories", categoriesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

