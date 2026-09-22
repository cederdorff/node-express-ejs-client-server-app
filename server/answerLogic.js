export const topicStats = {
  hilsen: 0,
  navn: 0,
  bosted: 0,
  fritid: 0
};

function countMatches(keywords, normalizedQuestion) {
  const matches = keywords.filter((keyword) => normalizedQuestion.includes(keyword));

  return matches.length;
}

export function findBestAnswer(question, answers) {
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
