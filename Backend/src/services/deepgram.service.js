import { createClient } from "@deepgram/sdk";
import fs from "fs";

// Lazy load deepgram client to avoid errors at startup if API key is missing
let deepgram = null;

const getDeepgramClient = () => {
  if (!deepgram && process.env.DEEPGRAM_API_KEY) {
    deepgram = createClient(process.env.DEEPGRAM_API_KEY);
  }
  return deepgram;
};

// 🎤 Speech → Text
export const speechToText = async (audioBuffer) => {
  const client = getDeepgramClient();
  if (!client) {
    throw new Error("Deepgram API key not configured");
  }
  
  const response = await client.listen.prerecorded.transcribeFile(
    audioBuffer,
    {
      model: "nova-2",
      language: "en",
    }
  );

  return response.result.channels[0].alternatives[0].transcript;
};

// 🔊 Text → Speech
export const textToSpeech = async (text) => {
  const client = getDeepgramClient();
  if (!client) {
    throw new Error("Deepgram API key not configured");
  }
  
  const response = await client.speak.request(
    { text },
    { model: "aura-asteria-en" }
  );

  return Buffer.from(await response.arrayBuffer());
};
