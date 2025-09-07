import { startGame, playRound, nextRound } from './game.js';
import { addAttributeClickListener, nextRoundButton } from './ui.js';

// Função que roda quando a página carrega
function init() {
    console.log("Jogo Jurassic Trunfo Iniciado!");
    
    // Passa a função playRound para o módulo UI, para que ele possa chamá-la quando um atributo for clicado
    addAttributeClickListener(playRound);

    // Adiciona o listener para o botão de próxima rodada
    nextRoundButton.addEventListener('click', () => {
        nextRound();
    });

    // Inicia o jogo
    startGame();
}

// Garante que o DOM está carregado antes de iniciar
document.addEventListener('DOMContentLoaded', init);