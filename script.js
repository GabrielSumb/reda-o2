// ================= Menu Hamburguer Mobile =================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
  }
});

// ================= Tema claro / escuro =================
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// ================= Contador Regressivo =================
function updateCountdown() {
  const graduationDate = new Date('2025-12-19T12:20:00').getTime();
  const now = new Date().getTime();
  const distance = graduationDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-size: 2rem; color: var(--accent);">🎉 A formatura chegou! 🎉</p>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ================= Sistema de Mensagens =================
const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');
const messages = [];

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  if (name && message) {
    messages.push({ name, message, date: new Date() });
    displayMessages();
    messageForm.reset();

    const btn = messageForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Mensagem enviada!';
    btn.style.background = '#10b981';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2000);
  }
});

function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function displayMessages() {
  messageList.innerHTML = messages
    .slice()
    .reverse()
    .map((msg) => `
      <div class="message-card">
        <p class="message-author">${sanitize(msg.name)}</p>
        <p>${sanitize(msg.message)}</p>
        <small style="color: var(--gray); margin-top: 0.5rem; display: block;">
          ${msg.date.toLocaleDateString('pt-BR')} às ${msg.date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </small>
      </div>
    `)
    .join('');
}

// Mensagens iniciais de exemplo
messages.push(
  { name: 'Will Smith', message: 'Foi um ano incrível! Parabéns a todos pela conclusão do Ensino Médio', date: new Date('2024-11-18T10:30:00') },
 );
displayMessages();

// ================= Mostrar Redações =================
const essaysBtn = document.getElementById('show-essays-btn');
const essaysSection = document.getElementById('essays-section');
const essaysList = document.getElementById('essays-list');

const essays = [
  { tema: "Tema 1", texto: "Texto da redação 1..." },
  { tema: "Tema 2", texto: "Texto da redação 2..." },
  { tema: "Tema 3", texto: "Texto da redação 3..." },
  { tema: "Tema 4", texto: "Texto da redação 4..." },
  { tema: "Tema 5", texto: "Texto da redação 5..." },
  { tema: "Tema 6", texto: "Texto da redação 6..." },
  { tema: "Tema 7", texto: "Texto da redação 7..." },
  { tema: "Tema 8", texto: "Texto da redação 8..." },
  { tema: "Tema 9", texto: "Texto da redação 9..." },
  { tema: "Tema 10", texto: "Texto da redação 10..." },
  { tema: "Tema 11", texto: "Texto da redação 11..." },
  { tema: "Tema 12", texto: "Texto da redação 12..." },
  { tema: "Tema 13", texto: "Texto da redação 13..." },
  { tema: "Tema 14", texto: "Texto da redação 14..." },
];

function renderEssays() {
  essaysList.innerHTML = essays
    .map((e, index) => `
      <div class="essay-item">
        <h3>Redação ${index + 1}: ${sanitize(e.tema)}</h3>
        <p>${sanitize(e.texto)}</p>
      </div>
    `)
    .join('');
}

essaysBtn.addEventListener('click', () => {
  if (essaysSection.style.display === 'none') {
    renderEssays();
    essaysSection.style.display = 'block';
    essaysBtn.textContent = '❌ Fechar Redações';
  } else {
    essaysSection.style.display = 'none';
    essaysBtn.textContent = '📚 Ver Redações';
  }
});

