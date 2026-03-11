import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Serve static assets
app.use(express.static(path.join(__dirname, "..", "server", "public")));

// Health check endpoint
app.get("/status", (_req, res) => {
  res.json({ status: "ok" });
});

// Serve Worti mascot
app.get("/worti.png", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "images", "worti.png"));
});

// Serve card images
app.use("/card-images", express.static(path.join(__dirname, "..", "server", "public", "card-images")));

// Fallback for static build (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "static-build")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "static-build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
