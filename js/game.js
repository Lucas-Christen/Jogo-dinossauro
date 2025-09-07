import * as UI from './ui.js';

// Estado do Jogo
let allCards = [];
let playerDeck = [];
let cpuDeck = [];
let playerCurrentCard = null;
let cpuCurrentCard = null;
let isPlayerTurn = true;
let cardsOnTable = []; // Para lidar com empates

// Inicia o Jogo
export async function startGame() {
    UI.displayMessage("Procurando dinossauros...");
    
    const response = await fetch('assets/data/dinosaurs.json');
    allCards = await response.json();
    
    shuffleDeck(allCards);
    dealCards();
    
    UI.updateScore(playerDeck.length, cpuDeck.length);
    startNewTurn();
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    playerDeck = allCards.slice(0, allCards.length / 2);
    cpuDeck = allCards.slice(allCards.length / 2);
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
    UI.displayMessage("Sua vez! Escolha um atributo.");
    UI.toggleNextRoundButton(false);
}

// Executa uma rodada
export function playRound(selectedAttribute) {
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
    processRoundResult(roundWinner);
}

function processRoundResult(winner) {
    // Adiciona as cartas da rodada atual à mesa
    cardsOnTable.push(playerDeck.shift(), cpuDeck.shift());

    if (winner === 'player') {
        playerDeck.push(...cardsOnTable);
        UI.displayMessage(`Você ganhou a rodada! O ${playerCurrentCard.nome} venceu.`);
        cardsOnTable = []; // Limpa a mesa
    } else if (winner === 'cpu') {
        cpuDeck.push(...cardsOnTable);
        UI.displayMessage(`Você perdeu a rodada! O ${cpuCurrentCard.nome} era mais forte.`);
        cardsOnTable = []; // Limpa a mesa
    } else { // Empate
        UI.displayMessage("Empate! As cartas foram para a mesa. O vencedor da próxima rodada leva tudo!");
    }

    UI.updateScore(playerDeck.length, cpuDeck.length);
    UI.renderPlayerCard(playerCurrentCard, false); // Desabilita cliques após a jogada
    UI.toggleNextRoundButton(true);
}

// Prepara para a próxima rodada
export function nextRound() {
    if (playerDeck.length === 0 || cpuDeck.length === 0) {
        endGame();
    } else {
        startNewTurn();
    }
}

function endGame() {
    const message = playerDeck.length > 0 ? "VITÓRIA! Você capturou todos os dinossauros!" : "DERROTA! Seus dinossauros foram capturados.";
    UI.displayMessage(message);
    UI.toggleNextRoundButton(false);
}