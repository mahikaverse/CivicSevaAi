 import axios from "axios";

export const getAIResponse = async (userText) => {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "openassistant",
        prompt: `
You are CivicSevaAI, an AI assistant helping Indian citizens.
Your job is to guide users about:
- Government complaints
- Civic issues
- Public services
- Government schemes

Reply in simple, clear language.

User: ${userText}
Assistant:
        `,
        stream: false
      },
      {
        timeout: 60000 // important: first response is slow
      }
    );

    return response.data.response.trim();
  } catch (error) {
    console.error("Ollama AI error:", error.message);
    return "Sorry, I am facing a technical issue right now.";
  }
};
