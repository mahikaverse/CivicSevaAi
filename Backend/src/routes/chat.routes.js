 import express from "express";
import multer from "multer";
import { handleVoiceChat, handleTextChat } from "../controllers/chat.controller.js";

const router = express.Router();
const upload = multer();

router.post("/voice", upload.single("audio"), handleVoiceChat);
router.post("/text", handleTextChat); // 👈 ADD THIS

export default router;
