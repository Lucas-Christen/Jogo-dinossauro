// Selecionando elementos do DOM
const playerCardContainer = document.getElementById('carta-jogador');
const cpuCardContainer = document.getElementById('carta-cpu');
const playerScoreElement = document.getElementById('placar-jogador');
const cpuScoreElement = document.getElementById('placar-cpu');
const messageElement = document.getElementById('area-mensagens');
export const nextRoundButton = document.getElementById('btn-proxima-rodada');
const particulasContainer = document.getElementById('particulas');

let playRoundHandler = null;

// Ícones dos atributos
const icones = {
    comprimento: '📏',
    peso: '⚖️',
    velocidade: '⚡️',
    inteligencia: '🧠',
    agressividade: '🔥'
};

// Adiciona o listener de clique nos atributos
export function addAttributeClickListener(handler) {
    playRoundHandler = handler;
    playerCardContainer.addEventListener('click', (event) => {
        const target = event.target.closest('.atributo.selecionavel');
        if (target) {
            const attribute = target.dataset.attribute;
            // Adiciona efeito visual ao clicar
            target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                target.style.transform = '';
            }, 150);
            
            playRoundHandler(attribute);
        }
    });
}

// Renderiza a carta do jogador
export function renderPlayerCard(card, isTurn) {
    const selectableClass = isTurn ? 'selecionavel' : '';
    const cardHTML = createCardHTML(card, selectableClass);
    
    playerCardContainer.innerHTML = `
        <div class="carta">
            ${cardHTML}
        </div>
    `;
    
    // Adiciona efeito de entrada suave
    const carta = playerCardContainer.querySelector('.carta');
    carta.style.opacity = '0';
    carta.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        carta.style.transition = 'all 0.5s ease-out';
        carta.style.opacity = '1';
        carta.style.transform = 'scale(1)';
    }, 100);
}

// Renderiza a carta da CPU (frente ou verso) e controla a animação
export function renderCPUCard(card, reveal) {
    // Se a carta da CPU ainda não foi criada, cria a estrutura completa
    if (cpuCardContainer.innerHTML === '') {
        const backHTML = '<div class="carta-face carta-verso"><div class="logo-verso">JURASSIC<br>TRUNFO</div></div>';
        const frontHTML = '<div class="carta-face carta-frente"></div>';
        cpuCardContainer.innerHTML = `<div class="carta">${backHTML}${frontHTML}</div>`;
    }

    const cardElement = cpuCardContainer.querySelector('.carta');
    
    // Verifica se o elemento existe antes de tentar acessá-lo
    if (!cardElement) {
        console.error('Elemento da carta da CPU não encontrado');
        return;
    }
    
    // Atualiza os dados da face da frente, mesmo que esteja virada
    if (card) {
        const frontFace = cardElement.querySelector('.carta-frente');
        if (frontFace) {
           frontFace.innerHTML = createCardContentHTML(card);
        }
    }
    
    // Controla a classe que ativa a animação de virar
    if (reveal && cardElement) {
        cardElement.classList.add('is-flipped');
        // Efeito sonoro visual
        setTimeout(() => {
            if (cardElement) {
                cardElement.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    if (cardElement) {
                        cardElement.style.filter = '';
                    }
                }, 200);
            }
        }, 400);
    } else if (cardElement) {
        cardElement.classList.remove('is-flipped');
    }
}

// Atualiza a contagem de cartas
export function updateScore(playerCount, cpuCount) {
    playerScoreElement.textContent = `👤 Jogador: ${playerCount}`;
    cpuScoreElement.textContent = `🤖 CPU: ${cpuCount}`;
    
    // Adiciona efeito de pulso quando a pontuação muda
    [playerScoreElement, cpuScoreElement].forEach(element => {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    });
}

// Exibe uma mensagem para o jogador
export function displayMessage(message) {
    messageElement.style.opacity = '0';
    setTimeout(() => {
        messageElement.textContent = message;
        messageElement.style.opacity = '1';
    }, 200);
}

// Mostra ou esconde o botão de próxima rodada
export function toggleNextRoundButton(show) {
    if (show) {
        nextRoundButton.classList.remove('hidden');
        nextRoundButton.style.transform = 'scale(0.8)';
        nextRoundButton.style.opacity = '0';
        setTimeout(() => {
            nextRoundButton.style.transition = 'all 0.3s ease-out';
            nextRoundButton.style.transform = 'scale(1)';
            nextRoundButton.style.opacity = '1';
        }, 100);
    } else {
        nextRoundButton.classList.add('hidden');
    }
}

// Destaca os atributos comparados
export function highlightAttributes(attribute, winner) {
    const playerAttribute = playerCardContainer.querySelector(`[data-attribute="${attribute}"]`);
    const cpuAttribute = cpuCardContainer.querySelector(`[data-attribute="${attribute}"]`);

    const playerClass = winner === 'player' ? 'vitoria' : winner === 'cpu' ? 'derrota' : 'empate';
    const cpuClass = winner === 'player' ? 'derrota' : winner === 'cpu' ? 'vitoria' : 'empate';
    
    if (playerAttribute) {
        playerAttribute.classList.add(playerClass);
    }
    
    if (cpuAttribute) {
        cpuAttribute.classList.add(cpuClass);
    }
}

// Remove destaques dos atributos
export function clearHighlights() {
    const allAttributes = document.querySelectorAll('.atributo');
    allAttributes.forEach(attr => {
        attr.classList.remove('vitoria', 'derrota', 'empate');
    });
}

// Adiciona animações às cartas
export function addCardAnimation(animationType) {
    const playerCard = playerCardContainer.querySelector('.carta');
    const cpuCard = cpuCardContainer.querySelector('.carta');
    
    [playerCard, cpuCard].forEach(card => {
        if (card) {
            card.classList.add(animationType);
            
            // Remove a classe após a animação
            setTimeout(() => {
                card.classList.remove(animationType);
            }, animationType === 'voando' ? 1000 : 500);
        }
    });
}

// Remove todas as animações das cartas
export function removeCardAnimations() {
    const allCards = document.querySelectorAll('.carta');
    allCards.forEach(card => {
        card.classList.remove('voando', 'shake');
    });
}

// Cria efeitos de partículas
export function createParticleEffect(type) {
    if (!particulasContainer) return;
    
    const particleCount = type === 'victory' ? 30 : 15;
    const colors = type === 'victory' ? ['#DAA520', '#FFD700', '#32CD32'] : ['#DAA520', '#C0C0C0'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particula = document.createElement('div');
            particula.className = 'particula';
            
            // Posição aleatória
            particula.style.left = Math.random() * 100 + '%';
            particula.style.top = '100%';
            
            // Cor aleatória do array
            particula.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Tamanho aleatório
            const size = Math.random() * 6 + 3;
            particula.style.width = size + 'px';
            particula.style.height = size + 'px';
            
            particulasContainer.appendChild(particula);
            
            // Remove a partícula após a animação
            setTimeout(() => {
                particula.remove();
            }, 2000);
        }, i * 50);
    }
}

// Função auxiliar para criar o conteúdo interno de uma carta
function createCardContentHTML(card, selectableClass = '') {
    return `
        <div class="carta-header">
            <div class="nome-dinossauro">${card.nome}</div>
        </div>
        <div class="imagem-container">
            <img src="${card.imagem}" alt="${card.nome}" class="imagem-dinossauro" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
            <div class="placeholder-imagem" style="display:none;">🦕</div>
        </div>
        <div class="atributos-container">
            <div class="atributo ${selectableClass}" data-attribute="comprimento">
                <span class="atributo-icone">${icones.comprimento}</span>
                <span class="atributo-nome">Comprimento</span>
                <span class="atributo-valor">${card.comprimento} m</span>
            </div>
            <div class="atributo ${selectableClass}" data-attribute="peso">
                <span class="atributo-icone">${icones.peso}</span>
                <span class="atributo-nome">Peso</span>
                <span class="atributo-valor">${card.peso} T</span>
            </div>
            <div class="atributo ${selectableClass}" data-attribute="velocidade">
                <span class="atributo-icone">${icones.velocidade}</span>
                <span class="atributo-nome">Velocidade</span>
                <span class="atributo-valor">${card.velocidade} km/h</span>
            </div>
            <div class="atributo ${selectableClass}" data-attribute="inteligencia">
                <span class="atributo-icone">${icones.inteligencia}</span>
                <span class="atributo-nome">Inteligência</span>
                <span class="atributo-valor">${card.inteligencia}</span>
            </div>
            <div class="atributo ${selectableClass}" data-attribute="agressividade">
                <span class="atributo-icone">${icones.agressividade}</span>
                <span class="atributo-nome">Agressividade</span>
                <span class="atributo-valor">${card.agressividade}</span>
            </div>
        </div>
    `;
}

// Função para criar uma carta completa
function createCardHTML(card, selectableClass = '') {
    return `<div class="carta-face carta-frente">${createCardContentHTML(card, selectableClass)}</div>`;
}