const API_URL = "http://localhost:3000";

const messagesContainer = document.querySelector("#messages");
const questionForm = document.querySelector("#question-form");
const questionInput = document.querySelector("#question");
const clearMessagesButton = document.querySelector("#clear-messages-button");

function displayMessage(message) {
  const html = /*html*/ `
    <article class="${message.type}">
        <p>${message.text}</p>
    </article>`;

  console.log(html);
  messagesContainer.insertAdjacentHTML("beforeend", html);
}

async function getMessages() {
  const response = await fetch(`${API_URL}/messages`);
  const messages = await response.json();

  console.log(messages);

  for (const message of messages) {
    displayMessage(message);
  }
  return messages;
}

getMessages();

questionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = questionInput.value;

  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const message = await response.json();
  displayMessage(message);

  questionInput.value = "";
});

clearMessagesButton.addEventListener("click", async () => {
  await fetch(`${API_URL}/messages`, {
    method: "DELETE"
  });

  messagesContainer.innerHTML = "";
});
