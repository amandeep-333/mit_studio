import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/", healthRoutes);
app.use("/api", uploadRoutes);
app.use("/api/auth", authRoutes);

export default app;
