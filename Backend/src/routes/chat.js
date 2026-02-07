 const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await axios.post(
      "http://127.0.0.1:11434/api/generate",
      {
        model: "mistral",
        prompt: `
 You are CivicSeva AI.

VERY STRICT RULES:

LANGUAGE:
- Always reply in Hinglish (Roman Hindi + English mix)
- Simple daily language only

REPLY STYLE:
- Max 2 lines only
- No emojis
- No greetings like Hey / Hello
- No repeated sentences
- No extra talk
- No storytelling
- No asking unnecessary questions

TONE:
- Practical civic helper
- Straight to solution
- Like government help desk assistant

CIVIC RULE:
If issue problem → Suggest complaint action
If scheme → Explain simply
If doubt → Give short practical answer

GOOD Reply Example:
"Ye water supply issue lag raha hai. Aap municipal complaint register karo ya local water department se contact karo."

BAD Reply Example:
"Hey there 😊 I totally understand..."

User Message:
${message}

Reply (Max 2 lines Hinglish only):
        `,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
    });

  } catch (error) {
    console.log("OLLAMA ERROR:", error.message);
    res.status(500).json({
      error: "Ollama failed",
      details: error.message
    });
  }
});

module.exports = router;
