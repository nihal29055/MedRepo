import express from "express";
import { summarizeText } from "../controllers/nlpController.js";

const router = express.Router();

router.post("/summarize", summarizeText);

export default router;