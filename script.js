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
  },
  {
    tema: "DESAFIOS PARA A VALORIZAÇÃO DA CULTURA POPULAR BRASILEIRA",
    texto: `O gênero musical Bossa Nova, conhecido por seu ritmo calmo e marcante, é mundialmente reconhecido como símbolo da cultura popular brasileira. No entanto, dentro do próprio país, observa-se uma crescente desvalorização das manifestações culturais nacionais, causada pela supervalorização de referências estrangeiras e pela falta de incentivo à preservação dos costumes nativos entre as novas gerações. Essa realidade enfraquece o sentimento de identidade e pertencimento do povo com sua própria história.  
Em primeiro lugar, a exaltação de culturas estrangeiras tem levado muitos brasileiros a subestimarem produções nacionais. O filme “O Auto da Compadecida”, por exemplo, retrata uma trama autêntica da cultura nordestina, mas ainda é tratado por parte da população com desdém, apenas por ser uma produção brasileira. Esse comportamento reflete a ideia de que o que vem de fora é melhor, o que prejudica o reconhecimento das obras nacionais. Por isso, é fundamental que o sistema educacional e os meios de comunicação promovam o consumo e o reconhecimento das produções culturais do país, com incentivos financeiros e maior divulgação.  
Além disso, observa-se o apagamento da cultura nas novas gerações, causado pela falta de transmissão dos costumes pelas gerações mais velhas. A escritora Clarice Lispector, ícone da literatura nacional, é cada vez menos conhecida entre os jovens, resultado da redução do hábito de leitura e da ausência de estímulos à valorização das obras brasileiras. Incentivar a leitura de obras nacionais e promover espaços de diálogo entre diferentes gerações pode fortalecer o vínculo com a cultura local e preservar tradições importantes.  
Portanto, com o intuito de promover a valorização da cultura brasileira, o Estado, em parceria com o Ministério da Educação, deve implementar programas escolares voltados à difusão de obras literárias, musicais e cinematográficas nacionais, além de campanhas públicas que envolvam artistas e tradições regionais.`
  },
  {
    tema: "A IMPORTÂNCIA DA EDUCAÇÃO FINANCEIRA PARA OS JOVENS",
    texto: `A educação financeira para jovens destaca-se como pilar fundamental em uma sociedade marcada por rápidas transformações econômicas e culturais. Por conseguinte, filósofos como Aristóteles já apontavam que a virtude reside no "meio-termo", e a gestão dos recursos pessoais pode ser vista como parte integrante da vida ética. Nesse sentido, oferecer aos jovens conhecimentos sólidos sobre finanças favorece não apenas a autonomia individual, mas também uma cidadania mais consciente e participativa.  
Diante disso, Pierre Bourdieu evidenciou que o capital econômico, cultural e social são interligados; assim, jovens que aprendem sobre finanças, adquirindo capital financeiro, estão mais aptos a romper ciclos de desigualdade. Dados da Organização para a Cooperação e Desenvolvimento Econômico (OCDE) mostram que no Brasil estudantes de 15 anos obtiveram média de 416 pontos na avaliação de letramento financeiro, ou seja, 82 pontos abaixo da média. No entanto, observa-se que muitos jovens ainda não possuem a proficiência básica necessária para tomar decisões financeiras responsáveis.  
Por conseguinte, a intervenção deve vir por meio das escolas, famílias e do Estado. Por isso, é essencial que programas de educação financeira sejam incluídos no currículo escolar desde os níveis básicos, conforme preconiza a OCDE. Além disso, os pais que dialogam com seus filhos sobre dinheiro elevam o desempenho desses em letramento financeiro, e fintechs podem complementar com oficinas e plataformas digitais voltadas a jovens. Ademais, políticas públicas eficazes devem assegurar igualdade de acesso a esse conhecimento, sobretudo para os jovens de origem socioeconômica mais vulnerável.  
Em conclusão, a educação financeira para jovens emerge como estratégia imprescindível para promover autonomia, equidade e participação social consciente. Portanto, quando bem estruturada, ela conecta o conhecimento filosófico e sociológico no contexto da economia, capacitando indivíduos a tomarem decisões responsáveis e contribuindo assim por uma sociedade mais equilibrada e com futuro promissor.`
  },
  {
    tema: "CAMINHOS PARA COMBATER O ETARISMO NAS RELAÇÕES SOCIAIS",
    texto: `O etarismo, ou seja, a discriminação baseada na idade, ainda é um problema nas relações sociais e precisa ser enfrentado com mais seriedade. Nesse sentido, é necessário reconhecer como os estereótipos sobre a velhice são construídos e buscar promover uma convivência mais respeitosa entre as gerações. Assim, defende-se que o combate ao etarismo deve ocorrer tanto por meio da conscientização social quanto pelo incentivo a políticas e ações que valorizem todas as idades.  
Diante disso, pode-se citar que as produções culturais influenciam diretamente a forma como a sociedade enxerga o envelhecimento. O filme “Up – Altas Aventuras” (2009), por exemplo, mostra uma amizade entre um idoso e uma criança, ensinando que a troca de experiências entre gerações é enriquecedora. Além disso, a filósofa Simone de Beauvoir, em “A Velhice”, explica que a sociedade costuma tratar o idoso como “o outro”, reforçando preconceitos e exclusões.  
Outro ponto importante é que o etarismo também se manifesta em ambientes de trabalho e instituições, como afirmam sociólogos contemporâneos. Para mudar isso, é essencial criar espaços que unam jovens e pessoas mais velhas, por meio de projetos escolares e programas de mentoria. Essas ações fortalecem o respeito mútuo e combatem visões negativas da idade.  
Portanto, cabe ao Estado, famílias, empresas e escolas atuar juntos na construção de uma sociedade que valorize todas as etapas da vida. A solução envolve campanhas educativas, inclusão de debates sobre envelhecimento nas escolas e leis que incentivem a diversidade etária no trabalho. Assim, será possível construir um futuro mais igualitário e humano.`
  },
  {
    tema: "ADULTIZAÇÃO INFANTIL – CONSEQUÊNCIAS DA PERDA IRREPARÁVEL DA INFÂNCIA",
    texto: `“A infância tem suas maneiras de ver, pensar e sentir; nada há de mais insensato do que querer substituí-las pelas nossas.”, afirmou o filósofo Jean-Jacques Rousseau, ao defender que essa fase da vida não deve ter uma intervenção exagerada, pois é um momento onde a pureza e a singularidade são presentes. No entanto, na sociedade atual, esta fase tem como marca a velocidade de informação e, pelo consumo de vídeos e imagens, acentua-se a adultização infantil.  
Isto é, crianças passam a assumir comportamentos de adultos, responsabilidades e padrões estéticos. Segundo o sociólogo Guy Debord, em “A Sociedade do Espetáculo”, vivemos num mundo em que “tudo o que era vivido diretamente se afasta em uma representação”. Isso significa que a realidade é mediada por imagens, aparência e visibilidade. Nesse contexto, diversas crianças têm se tornado produtos de exibição nas redes sociais e na publicidade, onde são incentivadas a agir e se vestir como adultas.  
No contexto da modernidade líquida, proposta por Zygmunt Bauman, que afirma que a modernidade é marcada por relações frágeis e imediatistas, as crianças aprendem cedo a competir, a desejar e a buscar validação externa, o que provoca ansiedade, baixa autoestima e perda da espontaneidade infantil. Assim, esse fenômeno representa não apenas uma questão cultural, mas também ética e social, comprometendo o processo educativo e o desenvolvimento humano integral.  
Diante disso, é indispensável que medidas sejam tomadas para proteger a infância e promover uma cultura que valorize o tempo de crescer. O Ministério da Educação, em parceria com o Ministério das Comunicações, deve criar campanhas educativas e políticas de regulação midiática que limitem a exposição infantil em conteúdos publicitários e digitais, além de capacitar escolas e famílias para orientar o uso responsável das redes.`
  },
  {
    tema: "A IMPORTÂNCIA DO TRABALHO VOLUNTÁRIO NO COMBATE ÀS DESIGUALDADES SOCIAIS",
    texto: `As desigualdades sociais existem desde o início da sociedade, fruto do capitalismo e de seus ideais, e mesmo com todos os anos de luta ainda persistem. Com a ausência de ações efetivas do Estado, a própria população organizou-se para ajudar por meio do voluntariado, como ocorreu no movimento das Santas Casas da Misericórdia no século XVI.  
Além disso, o trabalho voluntário tem extrema importância na evolução social e histórica. Em campanhas de solidariedade na Segunda Guerra Mundial, por exemplo, pessoas se mobilizaram para abrigar feridos e refugiados, mostrando que a empatia pode transformar realidades. Segundo Paulo Freire, a transformação social ocorre pela conscientização dos indivíduos: o voluntariado é um instrumento de educação libertadora e cidadania ativa.  
Levando em conta essas reflexões, chegamos à conclusão de que o voluntarismo é essencial para a construção de uma sociedade mais justa. Ele promove a empatia, o engajamento comunitário e a participação cidadã — ingredientes fundamentais para enfrentar desigualdades estruturais. Em momentos críticos, como crises sociais ou econômicas, o voluntariado se mostra um agente real de mudança e de solidariedade coletiva.`
  },
  {
    tema: "FATORES E EFEITOS DA DEPENDÊNCIA EM JOGOS DE APOSTAS NA WEB",
    texto: `A democratização do acesso à internet paradoxalmente fomentou uma crise de saúde pública: a dependência em jogos de apostas online. Esse fenômeno, amparado na ilusão de mobilidade social, assume contornos epidêmicos no Brasil, onde milhões de pessoas enfrentam transtorno de jogo patológico.  
Sob a ótica do filósofo Byung-Chul Han, a "sociedade do cansaço" transforma as apostas em falsos atalhos para o sucesso, especialmente entre jovens periféricos. Essa busca por reconhecimento rápido dialoga com a modernidade líquida de Bauman, onde relações efêmeras espelham a busca por ganhos imediatos. Psicologicamente, as plataformas usam reforço variável, criando mecanismos de recompensa que sequestram o sistema dopaminérgico cerebral. A combinação entre pressão social e arquitetura comportamental manipulativa constitui o cerne do problema.  
Para enfrentar essa teia complexa, propõe-se uma intervenção tríplice: primeiro, criar Núcleos de Acolhimento Digital no SUS, integrando psicólogos e assistentes sociais; segundo, fazer campanhas midiáticas que resignifiquem o conceito de sorte, associando-o à educação; por fim, a Ancine poderia fomentar produções audiovisuais que desmontem a romantização do risco, como no filme “O Lobo de Wall Street”.  
Em síntese, a dependência digital em apostas configura-se como sintoma de uma sociedade que supervaloriza resultados imediatos. Superá-la exige reconstrução cultural que substitua a sedução do acaso pela valorização de projetos de vida substanciais, transformando a “sociedade do cansaço” em uma sociedade do cuidado.`
  },
  {
    tema: "O CONSUMO DE ULTRAPROCESSADOS E SUAS CONSEQUÊNCIAS À SAÚDE",
    texto: `O ultraprocessamento de alimentos reflete aspectos da realidade capitalista e da exploração do trabalho. Esses alimentos, além de acessíveis e práticos, trazem graves problemas de saúde, como obesidade, diabetes e doenças cardiovasculares, segundo a Organização Mundial da Saúde (OMS).  
Essa escolha alimentar decorre da industrialização e da vida urbana acelerada, que privilegia comidas rápidas e baratas. A falta de tempo e de alternativas saudáveis levou milhões a dependerem de ultraprocessados, que têm alta densidade calórica e conservantes.  
Para combater isso, políticas públicas devem atuar com urgência: aumentar impostos sobre esses alimentos, reduzir tributos de frutas, legumes e itens frescos, além de investir em educação nutricional nas escolas. Com conscientização política e educacional, podemos mudar hábitos e tornar a alimentação mais natural, promovendo saúde e justiça social.`
  },
  {
    tema: "AS CONSEQUÊNCIAS DO DESCARTE DE LIXO ELETRÔNICO",
    texto: `Na era digital, o descarte incorreto de lixo eletrônico representa uma ameaça ambiental séria. Componentes tóxicos, como metais pesados e substâncias inflamáveis, poluem solos e águas, causando danos à saúde e ao ecossistema.  
Segundo a lógica da modernidade líquida, proposta por Zygmunt Bauman, a obsolescência tecnológica reforça o consumo efêmero: gadgets são descartados tão rapidamente quanto surgem. Filmes como “Wall-E” simbolizam esse problema, mostrando um planeta dominado por resíduos resultantes de um consumismo desenfreado.  
Para mitigar esse impacto, é urgente fortalecer a logística reversa e responsabilizar empresas pela reciclagem de seus produtos. Além disso, campanhas educativas e de sensibilização podem fomentar uma cultura de descarte consciente e sustentável, garantindo um futuro ambientalmente mais seguro.`
  },
  {
    tema: "AS MUDANÇAS CLIMÁTICAS NO BRASIL E SEUS DESAFIOS",
    texto: `Na obra cinematográfica “Interestelar”, somos levados a refletir sobre as consequências futuras das mudanças climáticas: o planeta se torna inóspito, e a vida se move para novos limites. Isso nos leva a pensar no Brasil de hoje e no que pode vir pela frente se não agirmos.  
O agronegócio, com foco no lucro, pressiona por desmatamento e uso intensivo da terra, impactando florestas e biodiversidade. A lógica capitalista, conforme criticada por Karl Marx, revela-se cruel: a natureza torna-se mercadoria, e o meio ambiente, vítima.  
Nesse cenário, é urgente que o governo implemente políticas públicas de agricultura sustentável, oferecendo subsídios para produção verde e sancionando práticas predatórias. A educação ambiental, a fiscalização rigorosa e incentivos para a economia verde são caminhos indispensáveis para um Brasil mais justo e ecológico.`
  },
  {
    tema: "PRINCIPAIS FATORES QUE INFLUENCIAM NA QUALIDADE DE VIDA E NO BEM-ESTAR DA POPULAÇÃO",
    texto: `Felicidade, saúde e justiça social são temas centrais nas reflexões filosóficas. Aristóteles já defendia a eudaimonia — a ideia de que a vida plena só existe quando podemos desenvolver nossas capacidades. No entanto, a desigualdade social compromete esse ideal.  
A saúde pública, a educação de qualidade, a segurança e o acesso à justiça são pilares fundamentais para o bem-estar coletivo. No Brasil, embora exista o SUS, persistem desigualdades no atendimento e na infraestrutura, o que afeta especialmente comunidades vulneráveis.  
Assim, para elevar a qualidade de vida geral, é essencial que o Estado invista em políticas estruturadas que garantam equidade. Educação, saúde mental e justiça social devem caminhar juntos para promover uma vida digna para todos, resgatando um ideal aristotélico de realização pessoal e coletiva.`
  },
  {
    tema: "ACESSIBILIDADE E INCLUSÃO DE PESSOAS COM DEFICIÊNCIA NO BRASIL",
    texto: `A deficiência não afeta apenas a pessoa, mas toda a comunidade à sua volta. No Brasil, a falta de acessibilidade nas escolas, universidades e nos espaços de trabalho reforça o preconceito e limita oportunidades.  
Muitas instituições ainda não têm intérpretes de Libras, materiais acessíveis ou softwares adaptados, o que dificulta a participação plena das pessoas com deficiência. A ausência dessas adaptações perpetua a desigualdade e a marginalização.  
Portanto, é fundamental que o Estado invista em infraestrutura acessível, fiscalize o cumprimento das leis e promova campanhas de conscientização. A inclusão deve ser real, não simbólica — para que todos possam exercer sua cidadania de forma plena.`
  },
  {
    tema: "POR QUE OS PROCEDIMENTOS ESTÉTICOS ESTÃO AUMENTANDO ENTRE OS JOVENS?",
    texto: `A idealização de corpos já começa na infância, moldada pelos adultos e pela mídia. A pressão estética impõe padrões absurdos, influenciando jovens a buscarem cirurgias plásticas desnecessárias ainda em desenvolvimento corporal.  
Procedimentos como silicone ou lipoaspiração em adolescentes são arriscados: o corpo ainda está em formação, e intervenções precipitadas podem prejudicar a saúde física e emocional. A busca por um “corpo perfeito” é alimentada por comparações constantes e pela ditadura das redes sociais.  
Uma solução eficaz é repensar a educação: escolas devem ensinar sobre autoestima, corpo e mídia. Além disso, a sociedade precisa desacelerar essa acelerada adultização estética, tratando os jovens como jovens — não como adultos em formação.`
  }
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


