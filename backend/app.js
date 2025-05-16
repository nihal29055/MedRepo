const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
import nlpRoutes from "./routes/nlpRoutes.js";
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/nlp", nlpRoutes);

module.exports = app;