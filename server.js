import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const messages = [];

const answers = [
  {
    keywords: ["hej", "hallo", "hello", "hey"],
    answer: "Hej! Hvad vil du gerne vide om mig?"
  },
  {
    keywords: ["navn", "hedder", "hvem er du"],
    answer: "Jeg hedder RACE. Hvad vil du ellers vide om mig?"
  },
  {
    keywords: ["bor", "by", "fra"],
    answer: "Jeg bor i Aarhus. Nej vent, jeg er flyttet til Holstebro."
  },
  {
    keywords: ["fritid", "hobby", "kan lide"],
    answer: "I min fritid kan jeg godt lide at nørde JavaScript og lave små projekter."
  }
];

function findAnswer(question) {
  const normalizedQuestion = question.toLowerCase();

  for (const answerGroup of answers) {
    const hasMatch = answerGroup.keywords.some((keyword) => normalizedQuestion.includes(keyword));

    if (hasMatch) {
      return answerGroup.answer;
    }
  }

  return "Det kender jeg ikke svaret på endnu.";
}

function sanitizeQuestion(input) {
  return Array.from(input)
    .filter((char) => char.codePointAt(0) > 31 && char.codePointAt(0) !== 127)
    .join("");
}

app.get("/", (request, response) => {
  response.render("index", { messages, error: "" });
});

app.post("/ask", (request, response) => {
  const rawQuestion = request.body.question;
  const question = sanitizeQuestion(rawQuestion).trim();
  let error = "";

  if (!question) {
    error = "Skriv et spørgsmål, før du sender.";
  } else {
    messages.push({ type: "question", text: question });
    const answer = findAnswer(question);
    messages.push({ type: "answer", text: answer });
  }

  response.render("index", { messages, error });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
