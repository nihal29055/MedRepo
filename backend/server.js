import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import connectDB from './config/db.js';


dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});