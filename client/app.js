const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const chatMessages = document.getElementById("chat-messages");
const errorDiv = document.getElementById("error");
const resetBtn = document.getElementById("reset-btn");

// Hent eksisterende beskeder ved load
window.addEventListener("DOMContentLoaded", getMessages);
form.addEventListener("submit", handleSubmitMessage);
resetBtn.addEventListener("click", handleResetChat);

async function getMessages() {
  try {
    const res = await fetch("http://localhost:3000/api/messages");
    const data = await res.json();
    renderMessages(data.messages);
  } catch (err) {
    chatMessages.innerHTML = "<div>Kunne ikke hente beskeder.</div>";
  }
}

function renderMessages(messages) {
  if (messages && messages.length) {
    let chatHTML = "";
    for (let message of messages) {
      chatHTML += /*html*/ `
      <div class="message ${message.sender ? message.sender.toLowerCase() : ""}">
        <strong>${message.sender}:</strong> ${message.text}
      </div>`;
    }

    chatMessages.innerHTML = chatHTML;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    chatMessages.innerHTML = "";
  }
}

async function handleSubmitMessage(e) {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  errorDiv.style.display = "none";
  try {
    const res = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    renderMessages(data.messages);
    if (data.error) {
      errorDiv.textContent = data.error;
      errorDiv.style.display = "block";
    }
    input.value = "";
  } catch {
    errorDiv.textContent = "Der opstod en fejl ved kontakt til serveren.";
    errorDiv.style.display = "block";
  }
}

async function handleResetChat() {
  errorDiv.style.display = "none";
  try {
    const res = await fetch("http://localhost:3000/api/messages", {
      method: "DELETE"
    });
    if (!res.ok) throw new Error();
    renderMessages([]);
  } catch {
    errorDiv.textContent = "Kunne ikke nulstille chatten.";
    errorDiv.style.display = "block";
  }
}
