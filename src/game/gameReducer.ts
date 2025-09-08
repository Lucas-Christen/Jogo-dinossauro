// src/game/gameReducer.ts
import type { GameState, GameAction } from './types';

export const initialState: GameState = {
  playerDeck: [],
  cpuDeck: [],
  drawPile: [],
  history: [],
  playerCard: null,
  cpuCard: null,
  isCpuCardFlipped: false,
  message: 'O jogo vai começar!',
  isPlayerTurn: true,
  selectedAttribute: null,
  isResolving: false,
  roundWinner: null,
  showNextRoundButton: false,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_DECKS':
      return {
        ...state,
        playerDeck: action.payload.playerDeck,
        cpuDeck: action.payload.cpuDeck,
        playerCard: action.payload.playerDeck[0] || null,
        cpuCard: action.payload.cpuDeck[0] || null,
        message: 'Sua vez! Escolha um atributo.',
      };

    case 'START_ROUND_RESOLUTION':
      return {
        ...state,
        isResolving: true,
        isCpuCardFlipped: true,
        selectedAttribute: action.payload.attribute,
      };

    case 'RESOLVE_ROUND': {
      const { winner, message, historyMessage } = action.payload;
      return {
        ...state,
        roundWinner: winner,
        message,
        history: [historyMessage, ...state.history].slice(0, 5),
      };
    }
    
    case 'AWAIT_NEXT_ROUND':
      return {
        ...state,
        showNextRoundButton: true,
      };

    case 'START_NEXT_ROUND': {
      const { roundWinner, drawPile, playerDeck, cpuDeck } = state;
      const playedPlayerCard = playerDeck[0];
      const playedCpuCard = cpuDeck[0];

      if (!playedPlayerCard || !playedCpuCard) return state;

      const cardsToTransfer = [...drawPile, playedPlayerCard, playedCpuCard];
      
      let nextPlayerDeck = playerDeck.slice(1);
      let nextCpuDeck = cpuDeck.slice(1);
      let nextTurnIsPlayer = state.isPlayerTurn;

      if (roundWinner === 'player') {
        nextPlayerDeck.push(...cardsToTransfer);
        nextTurnIsPlayer = true;
      } else if (roundWinner === 'cpu') {
        nextCpuDeck.push(...cardsToTransfer);
        nextTurnIsPlayer = false;
      } else { // Empate
        nextTurnIsPlayer = state.isPlayerTurn; // Mantém o turno
      }

      const isGameOver = nextPlayerDeck.length === 0 || nextCpuDeck.length === 0;

      return {
        ...state,
        playerDeck: nextPlayerDeck,
        cpuDeck: nextCpuDeck,
        drawPile: roundWinner === 'draw' ? cardsToTransfer : [],
        playerCard: nextPlayerDeck[0] || null,
        cpuCard: nextCpuDeck[0] || null,
        isPlayerTurn: nextTurnIsPlayer,
        message: isGameOver 
          ? (nextPlayerDeck.length === 0 ? 'Você perdeu o jogo!' : 'Você ganhou o jogo!')
          : (nextTurnIsPlayer ? 'Sua vez! Escolha um atributo.' : 'Vez da CPU...'),
        isCpuCardFlipped: false,
        selectedAttribute: null,
        roundWinner: null,
        isResolving: !nextTurnIsPlayer && !isGameOver, // Fica resolvendo se for a vez da CPU
        showNextRoundButton: false,
      };
    }

    default:
      return state;
  }
}