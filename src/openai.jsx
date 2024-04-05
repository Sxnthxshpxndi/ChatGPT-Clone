const axios = require("axios");

const apiKey = "AIzaSyDQ5u2py_6mNkhsNoZPq6B-O9xAHpNQ0No";
//const apiSecret = "your_gemini_api_secret";

async function generateGeminiResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.gemini.com/v2/order/new",
      {
        // Adjust the request body according to your Gemini API usage
        // For this example, I'll simply send the prompt as a message
        message: prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-GEMINI-APIKEY": apiKey,
          "X-GEMINI-PAYLOAD": "your_payload",
          "X-GEMINI-SIGNATURE": "your_signature",
        },
      }
    );

    console.log(response.data);
    // Assuming Gemini API responds with some data, return it
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Example usage:
async function chatGPTClone(prompt) {
  try {
    const geminiResponse = await generateGeminiResponse(prompt);
    // Process geminiResponse and format it as needed
    // For simplicity, just returning the response as is
    return geminiResponse;
  } catch (error) {
    console.error("Error:", error.message);
    return "Sorry, I couldn't process your request.";
  }
}

// Example usage:
const userPrompt = "What's the price of Bitcoin?";
chatGPTClone(userPrompt)
  .then((response) => console.log("Gemini's response:", response))
  .catch((error) => console.error("Error:", error.message));
