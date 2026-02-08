//  import axios from "axios";

// export const getAIResponse = async (userText) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:11434/api/generate",
//       {
//         model: "openassistant",
//         prompt: `
// You are CivicSevaAI, an AI assistant helping Indian citizens.
// Your job is to guide users about:
// - Government complaints
// - Civic issues
// - Public services
// - Government schemes

// Reply in simple, clear language.

// User: ${userText}
// Assistant:
//         `,
//         stream: false
//       },
//       {
//         timeout: 60000 // important: first response is slow
//       }
//     );

//     return response.data.response.trim();
//   } catch (error) {
//     console.error("Ollama AI error:", error.message);
//     return "Sorry, I am facing a technical issue right now.";
//   }
// };

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (userText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast + cheap
      messages: [
        {
          role: "system",
          content:
            "You are Civic AI Assistant. Help users with civic complaints, government services, and public issues in India.",
        },
        {
          role: "user",
          content: userText,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    return "Sorry, I am having trouble responding right now.";
  }
};
