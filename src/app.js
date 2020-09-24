import express from "express";
import morgan from "morgan";
import path from "path";

import indexRoutes from "./routes/index.routes";

// Initialize
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware
app.use(morgan("dev"));

// Routes
app.use(indexRoutes);

export default app;
