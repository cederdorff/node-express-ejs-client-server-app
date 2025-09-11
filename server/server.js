// ========== Import dependencies ========== //
import cors from "cors";
import express from "express";

// ========== Setup Express App ========== //
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes - allow requests from any origin

// Chatbeskeder
let messages = [];

// Svar-logik
const responses = [
  { keywords: ["hej", "hello", "hi"], answers: ["Hej med dig!", "Hello there!", "Hej! Hvordan går det?"] },
  { keywords: ["hvordan går det", "hvordan har du det"], answers: ["Jeg har det fint, tak!", "Det går godt med mig!"] },
  { keywords: ["farvel", "bye", "ses"], answers: ["Farvel!", "Vi ses!", "Tak for snakken!"] },
  { keywords: ["hjælp", "help"], answers: ["Jeg kan hjælpe dig med at chatte!", "Spørg mig om hvad som helst!"] }
];

// Input sanitering
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

// GET

// Root endpoint
app.get("/", (req, res) => {
  res.send("Node.js Express Chatbot API 🎉");
});

// GET /messages - return all chat messages as JSON
app.get("/api/messages", (req, res) => {
  res.json({ messages });
});

// POST /chat - receive a message, return bot reply and chat log as JSON
app.post("/api/messages", (req, res) => {
  let userMessage = req.body.message;
  userMessage = sanitizeInput(userMessage);
  let botReply = "";
  let error = "";

  if (!userMessage || userMessage.trim() === "") {
    error = "Du skal skrive en besked!";
    botReply = "Skriv en besked for at chatte!";
  } else if (userMessage.length < 2) {
    error = "Beskeden skal være mindst 2 tegn lang!";
    botReply = "Din besked er for kort. Prøv igen!";
  } else if (userMessage.length > 500) {
    error = "Beskeden er for lang (max 500 tegn)!";
    botReply = "Din besked er for lang. Prøv at gøre den kortere!";
  } else {
    const lowerMessage = userMessage.toLowerCase();
    // Brug array methods for at finde svar
    const matchedResponse = responses.find(response =>
      response.keywords.some(keyword => lowerMessage.includes(keyword))
    );
    if (matchedResponse) {
      const randomIndex = Math.floor(Math.random() * matchedResponse.answers.length);
      botReply = matchedResponse.answers[randomIndex];
    } else {
      botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
    }
    if (!error) {
      messages.push({ sender: "Bruger", text: userMessage });
      messages.push({ sender: "Bot", text: botReply });
    }
  }
  res.status(201).json({ messages, botReply, error });
});

app.delete("/api/messages", (req, res) => {
  messages = []; // Clear the messages array
  res.json({ messages });
});

// ========== Start the server ========== //
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
