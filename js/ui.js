// Selecionando elementos do DOM
const playerCardContainer = document.getElementById('carta-jogador');
const cpuCardContainer = document.getElementById('carta-cpu');
const playerScoreElement = document.getElementById('placar-jogador');
const cpuScoreElement = document.getElementById('placar-cpu');
const messageElement = document.getElementById('area-mensagens');
export const nextRoundButton = document.getElementById('btn-proxima-rodada');

let playRoundHandler = null;

// Adiciona o listener de clique nos atributos
export function addAttributeClickListener(handler) {
    playRoundHandler = handler;
    playerCardContainer.addEventListener('click', (event) => {
        const target = event.target.closest('.atributo.selecionavel');
        if (target) {
            const attribute = target.dataset.attribute;
            playRoundHandler(attribute);
        }
    });
}

// Renderiza a carta do jogador
export function renderPlayerCard(card, isTurn) {
    const selectableClass = isTurn ? 'selecionavel' : '';
    const cardHTML = createCardFaceHTML('frente', card, selectableClass);
    
    playerCardContainer.innerHTML = `
        <div class="carta">
            ${cardHTML}
        </div>
    `;
}

// Renderiza a carta da CPU (frente ou verso) e controla a animação
export function renderCPUCard(card, reveal) {
    // Se a carta da CPU ainda não foi criada, cria a estrutura completa
    if (cpuCardContainer.innerHTML === '') {
        const frontHTML = createCardFaceHTML('frente', card);
        const backHTML = createCardFaceHTML('verso');
        cpuCardContainer.innerHTML = `<div class="carta">${backHTML}${frontHTML}</div>`;
    }

    const cardElement = cpuCardContainer.querySelector('.carta');
    
    // Atualiza os dados da face da frente, mesmo que esteja virada
    if (card) {
        const frontFace = cardElement.querySelector('.carta-frente');
        if (frontFace) {
           frontFace.innerHTML = createCardContentHTML(card);
        }
    }
    
    // Controla a classe que ativa a animação de virar
    if (reveal) {
        cardElement.classList.add('is-flipped');
    } else {
        cardElement.classList.remove('is-flipped');
    }
}

// Atualiza a contagem de cartas
export function updateScore(playerCount, cpuCount) {
    playerScoreElement.textContent = `👤 Jogador: ${playerCount}`;
    cpuScoreElement.textContent = `🤖 CPU: ${cpuCount}`;
}

// Exibe uma mensagem para o jogador
export function displayMessage(message) {
    messageElement.textContent = message;
}

// Mostra ou esconde o botão de próxima rodada
export function toggleNextRoundButton(show) {
    nextRoundButton.classList.toggle('hidden', !show);
}

// Destaca os atributos comparados
export function highlightAttributes(attribute, winner) {
    const playerAttribute = playerCardContainer.querySelector(`[data-attribute="${attribute}"]`);
    const cpuAttribute = cpuCardContainer.querySelector(`[data-attribute="${attribute}"]`);

    const highlightClass = winner === 'player' ? 'destaque-vitoria' : winner === 'cpu' ? 'destaque-derrota' : 'destaque-empate';
    const oppositeClass = winner === 'player' ? 'destaque-derrota' : winner === 'cpu' ? 'destaque-vitoria' : 'destaque-empate';
    
    playerAttribute?.classList.add(highlightClass);
    cpuAttribute?.classList.add(oppositeClass);
}

// Função auxiliar para criar o conteúdo interno de uma carta
function createCardContentHTML(card, selectableClass = '') {
    // Placeholders para ícones, você pode trocar por <img> ou <i>
    const icons = {
        comprimento: '📏',
        peso: '⚖️',
        velocidade: '⚡️',
        inteligencia: '🧠',
        agressividade: '🔥'
    };

    return `
        <h2>${card.nome}</h2>
        <img src="${card.imagem}" alt="${card.nome}" onerror="this.style.display='none'">
        <ul>
            <li class="atributo ${selectableClass}" data-attribute="comprimento">${icons.comprimento} Comprimento <span class="valor">${card.comprimento} m</span></li>
            <li class="atributo ${selectableClass}" data-attribute="peso">${icons.peso} Peso <span class="valor">${card.peso} T</span></li>
            <li class="atributo ${selectableClass}" data-attribute="velocidade">${icons.velocidade} Velocidade <span class="valor">${card.velocidade} km/h</span></li>
            <li class="atributo ${selectableClass}" data-attribute="inteligencia">${icons.inteligencia} Inteligência <span class="valor">${card.inteligencia}</span></li>
            <li class="atributo ${selectableClass}" data-attribute="agressividade">${icons.agressividade} Agressividade <span class="valor">${card.agressividade}</span></li>
        </ul>
    `;
}

// Função para criar uma face da carta (frente ou verso)
function createCardFaceHTML(faceType, card = null, selectableClass = '') {
    if (faceType === 'verso') {
        return '<div class="carta-face carta-verso"></div>';
    } else {
        const content = card ? createCardContentHTML(card, selectableClass) : '';
        return `<div class="carta-face carta-frente">${content}</div>`;
    }
}