import express from "express";
import fs from "node:fs/promises";

const app = express();
const port = 3000;

app.use(express.json());

// ========== Data handling functions ========== //

async function loadMessages() {
  const data = await fs.readFile("./data/messages.json", "utf8");
  return JSON.parse(data);
}

async function saveMessages(messages) {
  const json = JSON.stringify(messages, null, 2);
  await fs.writeFile("./data/messages.json", json);
}

// ========== Question handling functions ========== //

let answers = [
  {
    category: "hilsen",
    keywords: ["hej", "hallo", "hello", "hey"],
    answer: "Hej! Hvad vil du gerne vide om mig?"
  },
  {
    category: "navn",
    keywords: ["navn", "hedder", "hvem er du"],
    answer: "Jeg hedder RACE. Hvad vil du ellers vide om mig?"
  },
  {
    category: "bosted",
    keywords: ["bor", "by", "fra"],
    answer: "Jeg bor i Aarhus. Nej vent, jeg er flyttet til Holstebro."
  },
  {
    category: "fritid",
    keywords: ["fritid", "hobby", "kan lide"],
    answer: "I min fritid kan jeg godt lide at nørde JavaScript og lave små projekter."
  }
];

const topicStats = {
  hilsen: 0,
  navn: 0,
  bosted: 0,
  fritid: 0
};

function countMatches(keywords, normalizedQuestion) {
  const matches = keywords.filter((keyword) => normalizedQuestion.includes(keyword));

  return matches.length;
}

function findBestAnswer(question) {
  const normalizedQuestion = question.toLowerCase();
  let bestScore = 0;
  let bestAnswer = "Det kender jeg ikke svaret på endnu.";
  let bestCategory = "";

  for (const answerGroup of answers) {
    const score = countMatches(answerGroup.keywords, normalizedQuestion);

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = answerGroup.answer;
      bestCategory = answerGroup.category;
    }
  }

  return {
    answer: bestAnswer,
    category: bestCategory
  };
}

function sanitizeQuestion(input) {
  return Array.from(input)
    .filter((char) => char.codePointAt(0) > 31 && char.codePointAt(0) !== 127)
    .join("");
}

// ========== /messages routes ========== //

app.get("/messages", async (request, response) => {
  const messages = await loadMessages();

  response.json(messages);
});

app.post("/messages", async (request, response) => {
  const messages = await loadMessages();
  const question = sanitizeQuestion(request.body.question).trim();

  if (!question) {
    response.json({ error: "Skriv et spørgsmål, før du sender." });
    return;
  }

  const message = { type: "question", text: question, createdAt: new Date().toISOString() };
  messages.push(message);

  const result = findBestAnswer(question);
  const answerMessage = { type: "answer", text: result.answer, createdAt: new Date().toISOString() };
  messages.push(answerMessage);

  if (result.category) {
    topicStats[result.category] = topicStats[result.category] + 1;
  }

  await saveMessages(messages);

  response.json({ question: message, answer: answerMessage });
});

app.delete("/messages", async (request, response) => {
  await saveMessages([]);

  response.send();
});

// ========== /answers routes ========== //

app.get("/answers", (request, response) => {
  response.json(answers);
});

app.get("/answers/:category", (request, response) => {
  const answerRule = answers.find((a) => a.category === request.params.category);

  response.json(answerRule);
});

app.post("/answers", (request, response) => {
  const newAnswerRule = {
    category: request.body.category,
    keywords: request.body.keywords,
    answer: request.body.answer
  };

  answers.push(newAnswerRule);

  response.json(newAnswerRule);
});

app.put("/answers/:category", (request, response) => {
  const answerRule = answers.find((a) => a.category === request.params.category);

  answerRule.keywords = request.body.keywords;
  answerRule.answer = request.body.answer;

  response.json(answerRule);
});

app.delete("/answers/:category", (request, response) => {
  answers = answers.filter((a) => a.category !== request.params.category);

  response.send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
