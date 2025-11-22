// ================= Menu Hamburguer Mobile =================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que o clique “vaze” pro document
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
}

// ================= Tema claro / escuro =================
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
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
}

// ================= Contador Regressivo =================
function updateCountdown() {
  const graduationDate = new Date('2025-12-19T12:20:00').getTime();
  const now = new Date().getTime();
  const distance = graduationDate - now;

  if (distance < 0) {
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.innerHTML =
        '<p style="font-size: 2rem; color: var(--accent);">🎉 A formatura chegou! 🎉</p>';
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ================= Sistema de Mensagens =================
const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');
const messages = [];

if (messageForm && messageList) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && message) {
      messages.push({ name, message, date: new Date() });
      displayMessages();
      messageForm.reset();

      const btn = messageForm.querySelector('.btn');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Mensagem enviada!';
        btn.style.background = '#10b981';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2000);
      }
    }
  });
}

function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function displayMessages() {
  if (!messageList) return;
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
  { name: 'Will Smith', message: 'Foi um ano incrível! Parabéns a todos pela conclusão do Ensino Médio', date: new Date('2024-11-18T10:30:00') }
);
displayMessages();

// ================= Mostrar Redações =================
const essaysBtn = document.getElementById('show-essays-btn');
const essaysSection = document.getElementById('essays-section');
const essaysList = document.getElementById('essays-list');

const essays = [
  {
    tema: "O PAPEL DO ESPORTE COMO FERRAMENTA DE TRANSFORMAÇÃO SOCIAL",
    texto: `Uma pesquisa do Banco BV apontou que 88% dos brasileiros acreditam que o esporte promove inclusão, cooperação e superação.
    Do ponto de vista sociológico, Pierre Bourdieu oferece uma análise poderosa: para ele, o esporte é um "campo" social onde se manifestam diferentes formas de capital social, cultural, simbólico e onde o habitus de cada indivíduo pode se transformar. A participação esportiva permite construir redes (capital social) e adquirir reconhecimento, o que pode abrir caminhos antes inacessíveis.
    No âmbito cultural e midiático, a Rede Esporte pela Mudança Social (REMS) representa bem esse potencial. A REMS mobiliza instituições em todo o Brasil para levar atividades físicas a comunidades vulneráveis, reforçando cidadania, saúde e desenvolvimento humano. Em 2023, suas organizações atenderam diretamente 150.436 pessoas e impactaram indiretamente 451.308 segundo dados da própria rede.
    Para que esse poder transformador se concretize de forma mais ampla, o Estado junto do Ministério do Esporte deve: investir em políticas públicas que financiem projetos esportivos nas periferias e favelas, em parceria com empresas e ONGs; incorporar o esporte ao currículo escolar de forma constante, não só como competição, mas como prática de convivência e cidadania; fortalecer redes comunitárias esportivas, com lideranças locais e visibilidade para jovens atletas, para que o esporte seja de fato um agente de mudança social.`
  },
  {
    tema: "CAMINHOS PARA A UNIVERSALIZAÇÃO DO SANEAMENTO BÁSICO NO BRASIL",
    texto: `O saneamento básico é um dos pilares fundamentais para garantir saúde e qualidade de vida à população. No entanto, no Brasil, milhões de pessoas ainda vivem sem acesso à água potável e tratamento de esgoto, refletindo a desigualdade social e a ineficiência das políticas públicas. A universalização desse serviço é, portanto, um desafio urgente que exige planejamento e compromisso coletivo.
    Em primeiro lugar, a falta de investimentos adequados em infraestrutura e manutenção agrava o problema. Segundo dados do Instituto Trata Brasil, boa parte dos municípios carece de redes de esgoto eficientes e de gestão hídrica sustentável. Essa carência resulta em doenças de veiculação hídrica e em prejuízos econômicos. Assim, é essencial que o Estado amplie os repasses orçamentários e promova parcerias público-privadas que priorizem regiões mais vulneráveis.
    Além disso, a falta de conscientização da população sobre o uso racional da água e a importância do saneamento dificulta avanços. Muitas vezes, o desperdício e o descarte incorreto de resíduos comprometem o funcionamento dos sistemas existentes. Por isso, campanhas educativas e programas escolares voltados à educação ambiental são fundamentais para formar cidadãos conscientes e participativos nesse processo.
    Portanto, para garantir a universalização do saneamento básico no Brasil, o Governo Federal, em parceria com o Ministério do Meio Ambiente e da Educação, deve ampliar investimentos em infraestrutura e criar projetos de conscientização social, com oficinas e campanhas midiáticas sobre o uso responsável da água. Dessa forma, será possível construir um país mais justo, saudável, coletivo e ambientalmente sustentável, assegurando dignidade a todos os brasileiros.`
  }
  // ... você pode continuar com os outros itens da mesma forma
];

function renderEssays() {
  if (!essaysList) return;
  essaysList.innerHTML = essays
    .map((e, index) => `
      <div class="essay-item">
        <h3>Redação ${index + 1}: ${sanitize(e.tema)}</h3>
        <p>${sanitize(e.texto)}</p>
      </div>
    `)
    .join('');
}

if (essaysBtn && essaysSection && essaysList) {
  essaysBtn.addEventListener('click', () => {
    if (essaysSection.style.display === 'block') {
      essaysSection.style.display = 'none';
      essaysBtn.textContent = '📚 Ver Redações';
    } else {
      renderEssays();
      essaysSection.style.display = 'block';
      essaysBtn.textContent = '❌ Fechar Redações';
    }
  });
}


