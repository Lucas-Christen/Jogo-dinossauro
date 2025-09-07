import * as UI from './ui.js';

// Estado do Jogo
let allCards = [];
let playerDeck = [];
let cpuDeck = [];
let playerCurrentCard = null;
let cpuCurrentCard = null;
let isPlayerTurn = true;
let cardsOnTable = []; // Para lidar com empates

// Dados dos dinossauros - movidos para cá para evitar problemas de carregamento
const dinossaurosData = [
    {
        "id": 1,
        "nome": "Tiranossauro Rex",
        "imagem": "assets/images/t-rex.png",
        "comprimento": 13,
        "peso": 9,
        "velocidade": 27,
        "inteligencia": 7,
        "agressividade": 10
    },
    {
        "id": 2,
        "nome": "Velociraptor",
        "imagem": "assets/images/velociraptor.png",
        "comprimento": 3,
        "peso": 0.15,
        "velocidade": 60,
        "inteligencia": 10,
        "agressividade": 9
    },
    {
        "id": 3,
        "nome": "Tricerátops",
        "imagem": "assets/images/triceratops.png",
        "comprimento": 9,
        "peso": 10,
        "velocidade": 30,
        "inteligencia": 4,
        "agressividade": 7
    },
    {
        "id": 4,
        "nome": "Braquiossauro",
        "imagem": "assets/images/brachiosaurus.png",
        "comprimento": 26,
        "peso": 50,
        "velocidade": 10,
        "inteligencia": 3,
        "agressividade": 2
    },
    {
        "id": 5,
        "nome": "Espinossauro",
        "imagem": "assets/images/spinosaurus.png",
        "comprimento": 18,
        "peso": 8,
        "velocidade": 25,
        "inteligencia": 8,
        "agressividade": 9
    },
    {
        "id": 6,
        "nome": "Pteranodonte",
        "imagem": "assets/images/pteranodon.png",
        "comprimento": 6,
        "peso": 0.05,
        "velocidade": 80,
        "inteligencia": 6,
        "agressividade": 5
    },
    {
        "id": 7,
        "nome": "Anquilossauro",
        "imagem": "assets/images/ankylosaurus.png",
        "comprimento": 8,
        "peso": 7,
        "velocidade": 12,
        "inteligencia": 3,
        "agressividade": 6
    },
    {
        "id": 8,
        "nome": "Indominus Rex",
        "imagem": "assets/images/indominus.png",
        "comprimento": 15,
        "peso": 10,
        "velocidade": 50,
        "inteligencia": 9,
        "agressividade": 10
    }
];

// Inicia o Jogo
export async function startGame() {
    UI.displayMessage("Procurando dinossauros na selva...");
    
    try {
        // Tenta carregar do arquivo JSON primeiro, se falhar usa os dados internos
        try {
            const response = await fetch('assets/data/dinosaurs.json');
            if (response.ok) {
                allCards = await response.json();
            } else {
                throw new Error('Arquivo não encontrado');
            }
        } catch (fetchError) {
            console.log('Usando dados internos dos dinossauros');
            allCards = [...dinossaurosData];
        }
        
        shuffleDeck(allCards);
        dealCards();
        
        UI.updateScore(playerDeck.length, cpuDeck.length);
        startNewTurn();
    } catch (error) {
        console.error('Erro ao carregar dados dos dinossauros:', error);
        UI.displayMessage("Erro ao carregar dinossauros. Verifique os arquivos.");
    }
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    const halfDeck = Math.floor(allCards.length / 2);
    playerDeck = allCards.slice(0, halfDeck);
    cpuDeck = allCards.slice(halfDeck);
}

function startNewTurn() {
    if (playerDeck.length === 0 || cpuDeck.length === 0) {
        endGame();
        return;
    }
    
    playerCurrentCard = playerDeck[0];
    cpuCurrentCard = cpuDeck[0];
    
    UI.renderPlayerCard(playerCurrentCard, true);
    UI.renderCPUCard(null, false); // Mostra o verso da carta da CPU
    UI.displayMessage("🎯 Sua vez! Escolha um atributo para a batalha.");
    UI.toggleNextRoundButton(false);
    
    // Remove classes de animação anteriores
    UI.removeCardAnimations();
}

// Executa uma rodada
export function playRound(selectedAttribute) {
    // Adiciona animação de voo às cartas
    UI.addCardAnimation('voando');
    
    setTimeout(() => {
        UI.renderCPUCard(cpuCurrentCard, true); // Revela a carta da CPU
        
        const playerValue = playerCurrentCard[selectedAttribute];
        const cpuValue = cpuCurrentCard[selectedAttribute];
        
        let roundWinner = null;
        
        if (playerValue > cpuValue) {
            roundWinner = 'player';
        } else if (cpuValue > playerValue) {
            roundWinner = 'cpu';
        } else {
            roundWinner = 'draw';
        }
        
        UI.highlightAttributes(selectedAttribute, roundWinner);
        
        setTimeout(() => {
            processRoundResult(roundWinner);
        }, 1000);
        
    }, 500);
}

function processRoundResult(winner) {
    // Adiciona as cartas da rodada atual à mesa
    cardsOnTable.push(playerDeck.shift(), cpuDeck.shift());
    
    let message = "";
    
    if (winner === 'player') {
        playerDeck.push(...cardsOnTable);
        message = `🏆 Você ganhou a rodada! O ${playerCurrentCard.nome} dominou a batalha!`;
        cardsOnTable = []; // Limpa a mesa
        UI.addCardAnimation('shake'); // Efeito de impacto
        UI.createParticleEffect('victory'); // Efeito de partículas
    } else if (winner === 'cpu') {
        cpuDeck.push(...cardsOnTable);
        message = `💀 Você perdeu a rodada! O ${cpuCurrentCard.nome} foi mais forte desta vez.`;
        cardsOnTable = []; // Limpa a mesa
        UI.addCardAnimation('shake'); // Efeito de impacto
    } else { // Empate
        message = `⚖️ Empate épico! As cartas ficam na mesa. A próxima batalha levará tudo!`;
    }
    
    UI.displayMessage(message);
    UI.updateScore(playerDeck.length, cpuDeck.length);
    UI.renderPlayerCard(playerCurrentCard, false); // Desabilita cliques após a jogada
    UI.toggleNextRoundButton(true);
}

// Prepara para a próxima rodada
export function nextRound() {
    if (playerDeck.length === 0 || cpuDeck.length === 0) {
        endGame();
    } else {
        // Limpa os efeitos visuais da rodada anterior
        UI.clearHighlights();
        startNewTurn();
    }
}

function endGame() {
    let message = "";
    
    if (playerDeck.length > 0) {
        message = "🎉 VITÓRIA ÉPICA! Você dominou todos os dinossauros da selva!";
        UI.createParticleEffect('victory');
    } else {
        message = "💀 DERROTA! Seus dinossauros foram capturados pelos predadores.";
    }
    
    UI.displayMessage(message);
    UI.toggleNextRoundButton(false);
    
    // Efeito especial no final do jogo
    setTimeout(() => {
        UI.addCardAnimation('shake');
    }, 1000);
}