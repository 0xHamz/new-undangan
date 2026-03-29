import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// ⬇️ frontend akses backend
app.use(cors());

// ⬇️ Biar bisa baca JSON dari React
app.use(express.json());

// ⬇️ Koneksi MongoDB
mongoose.connect(
  "mongodb+srv://undangan_db_user:gzrRTXR2LPmdbMsm@cluster0.yzydhbe.mongodb.net/undangan_db?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ⬇️ Schema Tamu
const GuestSchema = new mongoose.Schema({
  name: String,
  slug: String,
  createdAt: { type: Date, default: Date.now },
});

const Guest = mongoose.model("Guest", GuestSchema);

// ==========================
// API DELETE TAMU
// ==========================
app.delete("/api/guest/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGuest = await Guest.findByIdAndDelete(id);

    if (!deletedGuest) {
      return res.status(404).json({ message: "Tamu tidak ditemukan" });
    }

    res.json({
      message: "Tamu berhasil dihapus",
      deletedGuest,
    });
  } catch (err) {
    console.error("Gagal hapus tamu:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// API GET SEMUA TAMU
// ==========================
app.get("/api/guest", async (req, res) => {
  const guests = await Guest.find().sort({ createdAt: -1 });
  res.json(guests);
});

// ==========================
// API GET TAMU
// ==========================
app.get("/api/guest/:slug", async (req, res) => {
  const guest = await Guest.findOne({ slug: req.params.slug });
  res.json(guest);
});

// ==========================
// API TAMBAH TAMU
// ==========================
app.post("/api/guest", async (req, res) => {
  const { name } = req.body;

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const guest = await Guest.create({ name, slug });

  res.json(guest);
});

// ==========================
app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
