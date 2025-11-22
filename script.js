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
  { tema: "O PAPEL DO ESPORTE COMO FERRAMENTA DE TRANSFORMAÇÃO SOCIAL", texto: "
    Uma pesquisa do Banco BV apontou que
88% dos brasileiros acreditam que o esporte promove inclusão,
cooperação e superação.
Do ponto de vista sociológico, Pierre Bourdieu oferece uma análise
poderosa: para ele, o esporte é um "campo" social onde se
manifestam diferentes formas de capital social, cultural, simbólico e
onde o habitus de cada indivíduo pode se transformar. A
participação esportiva permite construir redes (capital social) e
adquirir reconhecimento, o que pode abrir caminhos antes
inacessíveis.
 No âmbito cultural e midiático, a Rede Esporte pela Mudança
Social (REMS) representa bem esse potencial. A REMS mobiliza
instituições em todo o Brasil para levar atividades físicas a
comunidades vulneráveis, reforçando cidadania, saúde e desenvolvimento humano. Em 2023, suas organizações atenderam
diretamente 150.436 pessoas e impactaram indiretamente 451.308
segundo dados da própria rede.
 Para que esse poder transformador se concretize de forma mais
ampla, o Estado junto do Ministério do Esporte deve: investir em
políticas públicas que financiem projetos esportivos nas periferias e
favelas, em parceria com empresas e ONGs; incorporar o esporte
ao currículo escolar de forma constante, não só como competição,
mas como prática de convivência e cidadania; fortalecer redes
comunitárias esportivas, com lideranças locais e visibilidade para
jovens atletas, para que o esporte seja de fato um agente de
mudança social." },
  { tema: "CAMINHOS PARA A UNIVERSALIZAÇÃO DO SANEAMENTO BÁSICO NO BRASIL", texto: "O saneamento básico é um dos pilares fundamentais para garantir saúde e qualidade de vida à população. No
entanto, no Brasil, milhões de pessoas ainda vivem sem acesso à água potável e tratamento de esgoto, refletindo a.
desigualdade social e a ineficiência das políticas públicas. A universalização desse serviço é, portanto, um desafio
urgente que exige planejamento e compromisso coletivo.
 Em primeiro lugar, a falta de investimentos adequados em infraestrutura e manutenção agrava o problema. Segundo
dados do Instituto Trata Brasil, boa parte dos municípios carece de redes de esgoto eficientes e de gestão hídrica
sustentável. Essa carência resulta em doenças de veiculação hidrica e em prejuízos econômicos. Assim, é essencial
que o Estado amplie os repasses orçamentários e promova parcerias público-privadas que priorizem regiões mais
vulneráveis.
 Além disso, a falta de conscientização da população sobre o uso racional da água e a importância do saneamento
dificulta avanços. Muitas vezes, o desperdício e o descarte incorreto de resíduos comprometem o funcionamento dos
sistemas existentes. Por isso, campanhas educativas e programas escolares voltados à educação ambiental são
fundamentais para formar cidadãos conscientes e participativos nesse processo.
 Portanto, para garantir a universalização do saneamento básico no Brasil, o Governo Federal, em parceria com o
Ministério do Meio Ambiente e da Educação, deve ampliar investimentos em infraestrutura e criaewr projetos de
conscientização social, com oficinas e campanhas midiáticas sobre o uso responsável da água. Dessa forma, será
possível construir um país mais justo, saudável, coletivo e ambientalmente sustentável, assegurando dignidade a
todos os brasileiros." },
  { tema: "DESAFIOS PARA A VALORIZAÇÃO DA CULTURA POPULAR BRASILEIRA", texto: "O gênero musical Bossa Nova, conhecido por sest filmu calma e marcante, è mundialmente reconhecido como simbolo da cultura popular brasileira. No urttarito,
dentro do próprio pais, observa-so uma crescente desvalorização das manifestações culturais maconnia, causada pela supervalorização de referências-estrangeiras
e pela falta de incentivo à preservação dos costumes nativos entre as novas gerações. Essa realidade enfoquece o sentimento de identidade e pertencimento do
pavo com sua própria história.
 Em primeiro lugar, a exallação de culturas estrangeiras lem levado mátos brasileiros a subestimarem produções mtcionais. O filme O Auto da Compadecida, por
exemplo, mtrata de frama autêntica a cultura eins valores ntardestissus, mas ainda è tratado por parte da população com desdem, apenas por ser uma produção
brasileira. Esso comportamento reliete a (dein de que o que vem de fora e melhor, o que prejudica o toconhecimento das obras nacionais. Por isso, o fundamental
que o sistema educacional e os meios de comunicação promovam o consumo e o reconhecimento das produções culturais do país, com incentivos financeiros e
maior divulgação
Além disso, observa-se o npagamento da cultura nas novas gerações, causado pela falta de transmissão dos costumes polas gorações mais velhas, A esuntora
Clarice Lispector, icone da literatura nacional, é cada vez menos conhecida entre os jovens, resultado da redução do hábito de leitura e da ausência de estimulos à
valorização dus obres brasileiran. Incentivar a leitura de nutorna riacioonis a promover espaços de diálogo entre diferentes gerações pode fortalecer o vinculo com a
cultura local e preservne bratficiest importantet.
 Portanto, com o intuito de promover a valorização da cultura brasicea, o Estado, tim parceria com o Ministério da Educação, deve implementar programirs
escolares voltados à difusão de obras literárias, musicain a cinematográficas nacionam, além de campanhas públicas que ontallecom artistas e tradições regionais. " },
  { tema: "A IMPORTÂNCIA DA EDUCAÇÃO FINANCEIRA PARA OS JOVENS", texto: "A educação financeira para jovens destaca-se como pilar fundamental em uma sociedade marcada por rápidas transformações económicas e culturas. Por
coriseguinte, filósofos como /cistotelles já apontavam que a virtude reside no "meio-temio". e a gestão dos recursos pessoais pode ser vista como parte integrante
da vida etca. Nesse sentido, oferecer nos jovens conhecimentos soldoo sabco financia favorece não apuntes a autonomia individuni, mas também uma cidodianin
mais consciente e participtitiva.
 Diante disso, Pierre Bourdieu evidenciou que o capital economico, cultumi e social são intuiligados; assim, jovens que aprincem sobre finanças, adquirindo capital
financeiro, estão mais aplos a romper cidos de desigualdado. Ondos da Organização para a Cooperação e Desenvolvimento Económico (OCDE) mostrami que no
Brasil estudiantes de 15 anos obtiveram média de 416 pontos tina avaliação de letramento financeiro, isto é, 82 pontos abaixo da trédia. No entanto, observa se que
muitos jovens ainda não possuem n proficiência básico necessário para tomar decisões financeiras responsáveis.
 Por conseguintes, a intervenção deve vir por meio das escolas, familias o Estarfo, Por isso, é essencial que programs de educação finanmira sejam incluidos no
curriculo escolar desde os niveis hisicon, conforme preconiza a OCDE. Ainda ininis, os pais que dialogam com sous fihoe sobre dinheiro elevar o desempenho
desins am lacrocin financeira e a midin, fintechs podem complementar com oficinas e plataformas digitais voltados a jovens. Ademain, politicas publicas officazes
devem assegurar igualdade de acesso a esse conhecimento, sobretudo para as jovens de origem socioeconómica mais vulnerável
En conclusão, a educação firunceira para jovens emerge como estratégia imprescindível para promover autonomia, oquidade e participação social consciente, Par
isso, quando bem estruturada, ela correcta o conhecimento filosófico e sociológico no contexto mal de consumo e economia, capacitando indeeduos a tomarem
decisões responsáveis e contribuindo assim por uma sociedade main equilibrada e com futuro mais promissor." },
  { tema: "CAMINHOS PARA COMBATER O ETARISMO NAS RELAÇÕES SOCIAIS", texto: "O etarismo, ou seja, a discriminação baseada na idade, ainda é um problema nas relações sociais e precisa ser
enfrentado com mais seriedade. Nesse sentido, é necessário reconhecer como os estereótipos sobre a velhice são
construidos e buscar promover uma convivência mais respeitosa entre as gerações. Assim, defende-se que o
combate ao etarismo deve ocorrer tanto por meio da conscientização social quanto pelo incentivo a políticas e ações
que valorizem todas as idades.
Diante disso, pode-se citar que as produções culturais influenciam diretamente a forma como a sociedade enxerga o
envelhecimento. O filme Up - Altas Aventuras (2009), por exemplo, mostra uma amizade entre um idoso e uma
criança, ensinando que a troca de experiências entre gerações é enriquecedora. Além disso, a filósofa Simone de
Beauvoir, em A Velhice, explica que a sociedade costuma tratar o idoso como "o outro", reforçando preconceitos e
exclusões,
Outro ponto importante é que o etarismo também se manifesta em ambientes de trabalho e instituições, como
afirmam sociólogos como John Williamson. Para mudar isso, é essencial criar espaços que unam jovens e pessoas
mais velhas, por meio de projetos escolares e programas de mentoria. Essas ações fortalecem o respeito mútuo e
combatem visões negativas da idade.
 Portanto, cabe ao Estado, familias, empresas e escolas atuar juntos na construção de uma sociedade que valorize
todas as etapas da vida. A solução envolve campanhas educativas, inclusão de debates sobre envelhecimento nas
escolas e leis que incentivem a diversidade etària no trabalho. Assim, será possivel construir um futuro mais
igualitário e humano." },
  { tema: "ADULTIZAÇÃO INFANTIL – CONSEQUÊNCIAS DA PERDA IRREPARÁVEL DA INFÂNCIA", texto: " 'A infância tem suas maneiras de ver, pensar e sentir; nada há de mais insensato do que querer
substitui-las pelas nossas.' , afirmou o filósofo Jean-Jacques Roussean, ao defender que esta fase
da vida não deve ter uma intervenção, pois, é um momento da vida onde a pureza e a
singularidade são presentes. No entanto, na sociedade atual, esta fase tem como marca a
velocidade de informação e pelo consumo de vídeos e imagens, tem como uma certa
consequência a adultização infantil.
 Isto é o processo que crianças passam para assumir comportamentos de pessoas adultas,
responsabilidades e padrões estéticos, Segundo o sociólogo Guy Debord, em A Sociedade do
Espetáculo, vivemos em um mundo em que "tudo oque era vivido diretamente se afasta em uma
representação". Isso significa que a realidade é mediada por imagens, aparência e visibilidade.
Nesse contexto diversas crianças tem se tornado produtos de exibição nas redes sociais e na
publicidade, onde meninas e meninos são incentivados a agir e se vestir como adultos.
 No contexto da modernidade líquida, proposta por Zygmunt Bauman, que defende que a
modemidade é marcada por relações frágeis e imediatistas, as crianças aprendem cedo a
competir, a desejar e a buscar validação externa, oque provoca ansiedade, baixa autoestima e
perda da espontaneidade infantil. Desse modo, o fenómeno representa não apenas uma questão
cultural, mas também ético e social, que compromete o processo educativo e o desenvolvimento
humano integral.
  Diante disso, é indispensável que medidas sejam tomadas para proteger a infância e
promover uma cultura que valorize o tempo de crescer. O ministério da educação, em
parceria com o Ministério das Comunicações, deve criar campanhas educativas e políticas
de regulação midiática, que limitem a exposição infantil em conteúdos publicitários e
digitais, além de capacitar escolas e familias para orientar o uso responsável das redes. " },
  { tema: "A IMPORTÂNCIA DO TRABALHO VOLUNTÁRIO NO COMBATE ÀS DESIGUALDADES SOCIAIS", texto: "As desigualdades sociais existem desde o início da sociedade, fruto do capitalismo e de
seus ideais, é algo que é combatido a séculos. No entanto mesmo com todos estes anos
não chegamos nem perto do seu fim, com o Estado sempre se importando tão pouco
quem essas diferenças o próprio povo precisou ajudar voluntariamente, como no século
XVI, no Movimento das Santas Casas da Misericórdia.
 Além disso, o trabalho voluntário tem extrema importância na evolução histórica do
planeta, como campanhas de solidariedade na 2° Guerra Mundial, que abrigaram feridos e
refugiados. A desigualdade da segunda guerra com seu movimento antisemita era obra de
palco para objetivos desumanos, e pessoas que sentiam compaixão uma pelas outras
viram a necessidade de prestar socorro.
 Contudo, de acordo com o sociólogo Paulo Freire, a transformação social ocorre pelo
engajamento e pela conscientização dos indivíduos. O voluntariado pode ser um
instrumento de educação libertadora e de cidadania ativa. Isto mostra que a voluntariado
com destino de procurar ajudar, transforma e liberta conhecimento e progresso.
 Levando em conta a análise desses fatos, temos a conclusão de que o voluntarismo é
algo essencial para a construção da sociedade e na busca de um local melhor para a
convivência humana. E que em momentos importantes da sociedade ela esteve presente
e mudando e trazendo história para momentos melhores." },
  { tema: "FATORES E EFEITOS DA DEPENDÊNCIA EM JOGOS DE APOSTAS NA WEB", texto: "A democratização do acesso à internet paradoxalmente fomentou uma crise de saúde
pública: a dependência em jogos de apostas online. Esse fenômeno, amparado na ilusão
de mobilidade social, assume contornos epidémicos no Brasil, onde o Lenad III (2024)
registra 1,4 milhão de brasileiros com transtorno do jogo patológico. A análise desse
cenário exige interlocução com referenciais teóricos capazes de desvendar suas múltiplas
dimensões.
 Sob a ótica de Byung-Chul Han, a sociedade do cansaço transforma as apostas em falsos
atalhos para o sucesso, especialmente entre jovens periféricos. Esta busca por
reconhecimento rápido dialoga com a modernidade líquida de Bauman, onde relações
efémeras espelham a busca por ganhos imediatos. Psicologicamente, as plataformas
utilizam o reforço variável skinneriano, criando mecanismos de recompensa que
sequestram o sistema dopaminérgico cerebral. A combinação entre pressão social e
arquitetura comportamental manipulativa constitui o cerne do problema.
  Para enfrentar esta complexa teia, propõe-se uma intervenção tríplice. Primariamente, a
receita tributária do setor deve financiar Núcleos de Acolhimento Digital no SUS,
integrando psicólogos e assistentes sociais. Secundariamente, campanhas midiáticas
deverão ressignificar o conceito de sorte, associando-o ao investimento em educação. Por
fim, a Ancine poderia fomentar produções audiovisuais que desmontem a romantização do
risco, nos moldes do critico O Lobo de Wall Street.
 Em síntese, a dependência digital em apostas configura-se como sintoma de uma
sociedade que supervaloriza resultados imediatos. Superá-la exige uma reconstrução
cultural que substitua a sedução do acaso pela valorização de projetos de vida
substantivos, transformando a sociedade do cansaço em uma sociedade do cuidado." },
  { tema: "O CONSUMO DE ULTRAPROCESSADOS E SUAS CONSEQUÊNCIAS À SAÚDE", texto: "O ultraprocessamento de comidas, leva-se ao fato da realidade capitalista e exploração
do trabalho. Estes alimentos além de simples acesso, é rápido e prático de se fazer, traz
abundantes problemas de saúde, como obesidade, diabetes, e doenças cardiovasculares
de acordo com a Organização Mundial da Saúde (OMS).
 Sendo assim, o acessível caminho para tal alimentação, é resultado da industrialização e
a vida urbana acelerada iniciada no século XX, pois, os operários com curto tempo para
realizar a refeição, necessitavam de comidas rápidas para seu consumo, que são cheias
de conservantes e calorias. Diante disso, diversos problemas como intoxicações
alimentares, acúmulo de colesterol, pressão alta e etc., surgiram em abundância, levando
em conta a falta de nutrientes nas iguarias e seu alto nivel de conservação.
 Contudo, a lei da rotulagem de alimentos, já presente nos dias de hoje, ajuda pessoas a
identificarem alimentos que contém ingredientes excessivos e que se consumido em
desmando pode trazer riscos a saúde. Porém, o incentivo fiscal a alimentação saudável,
seria uma solução e pelo Ministério da Fazenda junto do Governo Federal aumentariam
impostos sobre esses alimentos ultraprocessados e a redução sobre frutas e legumes
levando a um menor consumo consequentemente.
  Sendo assim, os alimentos ultraprocessados que infelizmente diante de seu histórico ruim
ainda é muito consumido nos dias de hoje. Consequentemente levando a distúrbios
alimentares em maior abundância na atual sociedade. Mas com apoio do Estado e da
Conscientização política e educacional sobre saúde e segurança alimentar está realidade
pode mudar e tornar a vida algo mais saudável e natural.
" },
  { tema: "AS CONSEQUÊNCIAS DO DESCARTE DE LIXO ELETRÔNICO", texto: "Na era digital a evolução constante e o consumo abundante intensificam um problema
crítico: o descarte incorreto de lixo eletrônico. Esse resíduo pode causar diversos impactos
ambientais extremamente preocupantes na sociedade e no ecossistema, exigindo
intervenção urgente.
 Em vista disso, o sociólogo Zygmunt Bauman, em sua pesquisa sobre a Modernidade
Líquida diz que a busca incessante por inovações tecnológicas tornam produtos cada vez
mais descartáveis, e acaba resultando em um ciclo de consumo efémero, agravando o
acúmulo de lixo e seus efeitos perversos.
 Sendo assim, culturalmente, filmes como Wall-e da Pixar, preveem de forma ficcional, o
planeta Terra inabitável, denunciando a poluição no meio ambiente, no filme o planeta
Terra se torna inabitável aos seres vivos graças a quantidade de lixo e risco a saúde
agravado pelo mal descarte. Os componentes de objetos eletrônicos podem ter alto risco,
pois, líquidos tóxicos, riscos de incêndio e poluições hidricas são eventos que podem
ocorrer e afetar todo o ecossistema ao redor da população.
 Diante do exposto, é imperativo combater tais consequências. O Estado deveria fiscalizar
o cumprimento da logistica reversa , enquanto empresas precisam adotar a
estendida. Além disso, Campanhas e Obras midiáticas responsabilidade e educacionais,
inspiradas em obras como Wall-e podem promover o descarte consciente ao público e na
educação, podendo assim assegurar um futuro mais sustentável.
" },
  { tema: "AS MUDANÇAS CLIMÁTICAS NO BRASIL E SEUS DESAFIOS", texto: "Na obra cinematográfica "Interestelar", conseguimos identificar consequências futuras
sobre as mudanças climáticas, afetando não só a temperatura do planeta, mas as
condições de vida e ambientais da época. Tal visão sobre o mundo nos leva a refletir o
mundo de agora e oque será de nosso país caso esse futuro venha a se aproximar cada
vez mais.
 Uma pesquisa realizada pela CNN, Brasil, o maior exportador de comida do mundo teria
uma enorme escassez do plantio já que diversos tipos de planta não estariam mais aptas
a se desenvolver graças as impurezas do ar, aumento das temperaturas e as impurezas
do solo, causadas pela acidificação da água da chuva como exemplo. Atualmente, tal
cenário já è observado na mídia, causada por desastres naturais que não eram tão
comuns em nosso país, como enchentes, secas prolongadas, o calor intolerável que está
afetando até regiões que deveriam ser frias, principalmente ao inverno.
  De acordo com o sociólogo Karl Max, no seu manifesto, criticando ações capitalistas que
visam o aumento da riqueza, se encaixa perfeitamente na nossa realidade de hoje,
principalmente com o fato de que em nosso país, o agronegócio, que apesar de ser
grande parte da nossa economia, visa o lucro acima do que é necessário. Desmatamento
apenas para plantio de diversos tipos de mercadoria, tirando milhares de árvores de
florestas importantes, lares de animais, para priorização do lucro em detrimento da
preservação ambiental .
 Portanto, o governo federal, em parceria com órgãos ambientais , deve implementar
políticas públicas de incentivo a agricultura sustentável, por meio de subsídios e
fiscalização mais rigorosa, a fim de reduzir o desmatamento e preservar a biodiversidade
brasileira." },
  { tema: "PRINCIPAIS FATORES QUE INFLUENCIAM NA QUALIDADE DE VIDA E NO BEM-ESTAR DA POPULAÇÃO", texto: "A qualidade de vida é o bem-estar da população sempre foram temas centrais nas
reflexões filosóficas e sociológicas. Aristóteles, por exemplo, defendia que a felicidade
(eudaimonia) só seria alcançada quando o ser humano tivesse condições de desenvolver
plenamente suas capacidades. No entanto, ao longo da história, percebe-se que como
fatores de saúde, educação, segurança e justiça social nunca foram igualmente garantido
a todos. No Brasil, essa desigualdade se tornou visível desde o período colonial, quando a
concentração de riquezas nas mãos de poucos já comprometia o bem-estar coletivo.
 Um dos principais fatores que influenciam o bem-estar é a saúde. Revolução Industrial, no
século XIX, exemplifica como mas intenções de trabalho e moradia levaram a frases
epidemias e ao adoecimento das massas operárias, obrigando os Estados a criar sistemas
públicos de saneamento e saúde. No Brasil atual, embora exista o SUS, ainda há
problemas como a falta de infraestrutura hospitalar e a ausência de políticas efetivas para
a saúde mental, oque compromete a qualidade de vida, especialmente das câmaras mais
pobres da população.
  Portanto, compreender os fatores que influenciam a qualidade dr vida exige uma análise
histórica e filosófica, que revela como a desigualdade social comprometeo bem-estar
coletivo. Cabe ao estado investir em políticas públicas de saúde e educação, Max
também civil cobrare participar ativamente dessas mudanças. Assim será possível
concretizar o ideal aristotélico de uma vida plena e just, além de construir uma vida plena e
justa, além de construir uma nação mais equilibrada e capaz de promover o verdadeiro
bem-estar de seus cidadãos.
" },
  { tema: "ACESSIBILIDADE E INCLUSÃO DE PESSOAS COM DEFICIÊNCIA NO BRASIL", texto: "De acordo com o filme "A teoria de tudo" a deficiência é um desafio que não é enfrentado
apenas pela pessoa com a deficiência, consequentemente ela afeta os próprios cuidadores
desta pessoa. O impacto social e relevante que acessibilidade tem na sociedade é grande
demais, os desafio enfrentados pela falta de incluem diversos casos de perigo, riscos e
frustração.
 Além disso, a negligência com a acessibilidade também afeta diretamente o direito à
educação e ao trabalho. Escolas e universidades, muitas vezes, não possuem recursos
inclusivas como intérpretes de libras, materiais em baile ou softwares adaptados, dificultando
o aprendizado No mercado de trabalho, a ausência de adaptações nos espaços físicos e
tecnológicos restringe a inserção de profissionais com deficiência, alimentando o preconceito
e reduzindo oportunidades. Essa realidade perpétua com um ciclo de marginalização que
poderia ser evitado com políticas públicas eficazes.
 Portanto, a falta de acessibilidade é reflexo de uma sociedade que ainda não compreende a
importância da inclusão. É essencial que governos invistam em infraestrutura acessível,
fiscalização do cumprimento das leis e campanhas de conscientização social. Apenas com a
união de esforços entre poder público e população será possível garantir a equidade,
possibilitando que pessoas com deficiência exerçam plenamente sua cidadania e
participemativamente da vida comunitária." },
  { tema: "POR QUE OS PROCEDIMENTOS ESTÉTICOS ESTÃO AUMENTANDO ENTRE OS JOVENS?", texto: "De acordo com a psicóloga Ana Beatriz Chamat, a adultização de menores são
influenciados pelos próprios adultos e pela própria sociedade. O fato da idealização de
corpos já começa na infância com modelos realizando séries de adolescentes, a ditadura
da moda imposta pela mídia com a padronização de corpos. Especialmente entre a
comunidade feminina, este hábito de comparação é comum, como tamanho dos seios,
cintura fina e etc. Oque leva adolescentes a tentarem se tornar cada vez mais adultos com
procedimentos estéticos rígidos.
 Desde pequeno os pais vêem obrigando crianças a se tornar cada vez mais adultas,
forçando uma maturação desnecessária. As cirurgias estéticas em adolescentes vêem
cada vez se tornando mais assunto, principalmente na parte feminina que busca o "corpo
perfeito", já desde de pequeno pensando em cirurgias estéticas como silicones ou
lipoaspiração. Com o corpo ainda em formação e maturação isso pode ser totalmente
arriscado, com altas chances de deformações e até riscos de vida por uma experiência
que ela nem precisa ter ainda.
  Uma solução além de uma educação sexual melhor em escolas e sobre a verdadeira
natureza humana, pode ser a mudança no comportamento social com crianças, tratando
elas como crianças, e não exigindo que elas sejam maturas já no início da sua vida, e
principalmente impondo padrões que pode sem impossíveis para um corpo em formação.
A sexualização e a imposição do padrão estético na adolescência e na infância pode levar
infelizmente a esse caso de já realizar cirurgias que arriscam suas vidas para corpos de
adultos cada vez mais dentro de uma realidade que não é delas. A sociedade precisa
tratar crianças como crianças, e parar de explorar o sentimentalismo e a maturação dos
jovens. "O peso da responsabilidade adulta sobre os ombros de infância è um fardo
pesado demais para corações jovens."" },
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

