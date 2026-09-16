require('dotenv').config();
const { generateText } = require('ai');
const { google } = require('@ai-sdk/google');
async function run() {
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: "Say hello",
    });
    console.log("Success:", text);
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
