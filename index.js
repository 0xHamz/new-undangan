import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ==========================
// Basic config
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// MongoDB
// ==========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ==========================
// Schema
// ==========================
const GuestSchema = new mongoose.Schema({
  name: String,
  slug: String,
  createdAt: { type: Date, default: Date.now },
});

const Guest = mongoose.model("Guest", GuestSchema);

// ==========================
// API
// ==========================
app.get("/api/guest", async (req, res) => {
  const guests = await Guest.find().sort({ createdAt: -1 });
  res.json(guests);
});

app.get("/api/guest/:slug", async (req, res) => {
  const guest = await Guest.findOne({ slug: req.params.slug });
  res.json(guest);
});

app.post("/api/guest", async (req, res) => {
  const { name } = req.body;
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const guest = await Guest.create({ name, slug });
  res.json(guest);
});

app.delete("/api/guest/:id", async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ==========================
// Serve React
// ==========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
