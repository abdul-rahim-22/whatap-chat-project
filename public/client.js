const joinForm = document.getElementById('join-form');
const chatPanel = document.getElementById('chat-panel');
const usernameInput = document.getElementById('username');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

let user = '';
let socket;

function renderMessage(message) {
  const li = document.createElement('li');
  const when = new Date(message.createdAt).toLocaleTimeString();
  li.textContent = `[${when}] ${message.user}: ${message.text}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  user = usernameInput.value.trim();

  if (!user) return;

  socket = io();

  socket.on('chat:history', (messages) => {
    messagesList.innerHTML = '';
    messages.forEach(renderMessage);
  });

  socket.on('chat:message', renderMessage);

  joinForm.classList.add('hidden');
  chatPanel.classList.remove('hidden');
  messageInput.focus();
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text || !user || !socket) return;

  socket.emit('chat:message', { user, text });
  messageInput.value = '';
});
