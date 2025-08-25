import express from "express"; // Import express framework
const app = express(); // Create an instance of express

app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static("public")); // Gør public-mappen tilgængelig for CSS og assets

// Chatbeskeder
const messages = [];

// Svar-logik
const responses = [
  { keywords: ["hej", "hello", "hi"], answers: ["Hej med dig!", "Hello there!", "Hej! Hvordan går det?"] },
  { keywords: ["hvordan går det", "hvordan har du det"], answers: ["Jeg har det fint, tak!", "Det går godt med mig!"] },
  { keywords: ["farvel", "bye", "ses"], answers: ["Farvel!", "Vi ses!", "Tak for snakken!"] },
  { keywords: ["hjælp", "help"], answers: ["Jeg kan hjælpe dig med at chatte!", "Spørg mig om hvad som helst!"] }
];

// Input sanitering
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

// GET - render chat
app.get("/", (req, res) => {
  res.render("index", { messages, botReply: "", error: "" });
});

// POST - chat besked
app.post("/chat", (req, res) => {
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
    let foundResponse = false;
    for (let response of responses) {
      for (let keyword of response.keywords) {
        if (lowerMessage.includes(keyword)) {
          const randomIndex = Math.floor(Math.random() * response.answers.length);
          botReply = response.answers[randomIndex];
          foundResponse = true;
          break;
        }
      }
      if (foundResponse) break;
    }
    if (!foundResponse) {
      botReply = `Du skrev: "${userMessage}". Prøv at skrive "hej" eller "hjælp"!`;
    }
    if (!error) {
      messages.push({ sender: "Bruger", text: userMessage });
      messages.push({ sender: "Bot", text: botReply });
    }
  }
  res.render("index", { messages, botReply, error });
});

// Listen on port 3000
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
