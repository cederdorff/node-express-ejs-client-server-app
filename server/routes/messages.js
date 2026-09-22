import express from "express";
import { loadMessages, saveMessages } from "../data/messages.js";
import { loadAnswers } from "../data/answers.js";
import { findBestAnswer, topicStats } from "../answerLogic.js";

const router = express.Router();

function sanitizeQuestion(input) {
  return Array.from(input)
    .filter((char) => char.codePointAt(0) > 31 && char.codePointAt(0) !== 127)
    .join("");
}

router.get("/", async (request, response) => {
  const messages = await loadMessages();

  response.json(messages);
});

router.post("/", async (request, response) => {
  const messages = await loadMessages();
  const question = sanitizeQuestion(request.body.question).trim();

  if (!question) {
    response.json({ error: "Skriv et spørgsmål, før du sender." });
    return;
  }

  const message = { type: "question", text: question, createdAt: new Date().toISOString() };
  messages.push(message);

  const answers = await loadAnswers();
  const result = findBestAnswer(question, answers);
  const answerMessage = { type: "answer", text: result.answer, createdAt: new Date().toISOString() };
  messages.push(answerMessage);

  if (result.category) {
    topicStats[result.category] = topicStats[result.category] + 1;
  }

  await saveMessages(messages);

  response.json({ question: message, answer: answerMessage });
});

router.delete("/", async (request, response) => {
  await saveMessages([]);

  response.send();
});

export default router;
