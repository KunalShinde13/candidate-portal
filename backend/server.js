import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import candidateRoutes from "./routes/candidateRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "200mb" })); // video base64 require high limit

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/video", videoRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
