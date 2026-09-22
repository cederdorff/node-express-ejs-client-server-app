const API_URL = "http://localhost:3000";

const messagesContainer = document.querySelector("#messages");
const questionForm = document.querySelector("#question-form");
const questionInput = document.querySelector("#question");
const clearMessagesButton = document.querySelector("#clear-messages-button");

function displayMessage(message) {
  const html = `<article class="${message.type}"><p>${message.text}</p></article>`;
  console.log(html);
  messagesContainer.insertAdjacentHTML("beforeend", html);
}

function displayMessages(messages) {
  messagesContainer.innerHTML = "";
  messages.forEach(displayMessage);
}

async function getMessages() {
  const response = await fetch(`${API_URL}/messages`);
  const messages = await response.json();

  console.log(messages);
  return messages;
}
