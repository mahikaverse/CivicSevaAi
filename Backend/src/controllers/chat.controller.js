import { speechToText, textToSpeech } from "../services/deepgram.service.js";
import { getAIResponse } from "../services/ai.service.js";

export const voiceChat = async (req, res) => {
  try {
    const audioFile = req.file.buffer;

    // 1️⃣ Speech → Text
    const userText = await speechToText(audioFile);

    // 2️⃣ AI Thinking
    const aiReply = await getAIResponse(userText);

    // 3️⃣ Text → Speech
    const audioReply = await textToSpeech(aiReply);

    res.set("Content-Type", "audio/mpeg");
    res.send(audioReply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Voice chat failed" });
  }
};
