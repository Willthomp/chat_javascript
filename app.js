const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";

// function to add a message to the chat log
function addMessageToChat(username, message, isBot) {
  const className = isBot ? "bot-message" : "user-message";
  const iconSrc = isBot ? "./icons/chatbot.png" : "./icons/user.png";
  messages.innerHTML += `
    <div class="message ${className}">
      <img src="${iconSrc}" alt="${isBot ? 'bot' : 'user'} icon">
      <span><strong>${username}: </strong>${message}</span>
    </div>
  `;
}

// event listener for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // get the username from the input field
  const username = document.getElementById("username-input").value;

  // get the message from the input field
  const message = input.value;
  input.value = "";

  // add the user's message to the chat log
  addMessageToChat(username, message, false);

  // use axios library to make a POST request to the OpenAI API
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  
  // get the chatbot's response from the API response
  const chatbotResponse = response.data.choices[0].text;

  // add the chatbot's response to the chat log
  addMessageToChat("Chatbot", chatbotResponse, true);
});
