const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `
You are CivicSeva AI.

RULES:
- Reply only in Hinglish
- Max 2 lines
- No emojis
- No greetings
- Practical civic help only

User message:
${message}
                `,
              },
            ],
          },
        ],
      },
      {
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Abhi response nahi mil pa raha, thoda baad try karo.";

    res.json({ reply });
  } catch (error) {
    console.error(
      "GEMINI REST ERROR:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Gemini failed" });
  }
});

module.exports = router;
