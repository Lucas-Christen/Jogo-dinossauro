import { startGame, playRound, nextRound } from './game.js';
import { addAttributeClickListener, nextRoundButton } from './ui.js';

// Função que roda quando a página carrega
function init() {
    console.log("🦕 Jogo Jurassic Trunfo Iniciado!");
    console.log("🎮 Redesign Cinematográfico Ativado!");
    
    // Passa a função playRound para o módulo UI, para que ele possa chamá-la quando um atributo for clicado
    addAttributeClickListener(playRound);

    // Adiciona o listener para o botão de próxima rodada
    nextRoundButton.addEventListener('click', () => {
        nextRound();
    });

    // Adiciona efeitos visuais de entrada
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Inicia o jogo
    startGame();
}

// Garante que o DOM está carregado antes de iniciar
document.addEventListener('DOMContentLoaded', init);

// Adiciona efeitos de teclado para melhor experiência
document.addEventListener('keydown', (event) => {
    // Permite usar Enter para próxima rodada
    if (event.code === 'Enter' || event.code === 'Space') {
        const nextButton = document.getElementById('btn-proxima-rodada');
        if (nextButton && !nextButton.classList.contains('hidden')) {
            nextButton.click();
            event.preventDefault();
        }
    }
    
    // Números 1-5 para selecionar atributos rapidamente
    const numKeys = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'];
    const attributes = ['comprimento', 'peso', 'velocidade', 'inteligencia', 'agressividade'];
    
    const keyIndex = numKeys.indexOf(event.code);
    if (keyIndex !== -1) {
        const playerCard = document.querySelector('#carta-jogador');
        if (playerCard) {
            const attributeElements = playerCard.querySelectorAll('.atributo.selecionavel');
            if (attributeElements[keyIndex]) {
                attributeElements[keyIndex].click();
                event.preventDefault();
            }
        }
    }
});