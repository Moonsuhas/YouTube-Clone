import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

// Route files
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

/**
 * =================================================
 * Load environment variables
 * =================================================
 */
dotenv.config();

/**
 * =================================================
 * Connect to MongoDB
 * =================================================
 */
connectDB();

/**
 * =================================================
 * Initialize Express app
 * =================================================
 */
const app = express();

/**
 * ================================================
 * Global Middlewares
 * =================================================
 */
// Enable CORS for frontend requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Optional: Serve static files (if you use local uploads)
// app.use('/uploads', express.static('temp_uploads'));

/**
 * ======================================================
 * API Routes
 * ======================================================
 */
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

/**
 * =======================================================
 * Root Route
 * =======================================================
 */
app.get("/", (req, res) => {
  res.send("🚀 YouTube Clone Backend Running...");
});

/**
 * ======================================================
 * Start the server
 * ======================================================
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
