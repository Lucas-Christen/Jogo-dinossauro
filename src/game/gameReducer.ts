// src/game/gameReducer.ts
import type { GameState, GameAction } from './types';

export const initialState: GameState = {
  settings: null,
  players: [],
  activePlayerId: 0,
  drawPile: [],
  history: [],
  areCardsFlipped: false,
  message: 'Configurando o jogo...',
  selectedAttribute: null,
  isResolving: false,
  roundWinnerId: null,
  showNextRoundButton: false,
  gamePhase: 'menu',
  gameWinner: null,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gamePhase: 'playing',
        players: action.payload.players,
        settings: action.payload.settings,
        message: 'O jogo começou! Sua vez.',
      };

    case 'SELECT_ATTRIBUTE':
      return {
        ...state,
        isResolving: true,
        selectedAttribute: action.payload.attribute,
        areCardsFlipped: true,
      };

    case 'RESOLVE_ROUND':
      return {
        ...state,
        roundWinnerId: action.payload.winnerId,
        message: action.payload.message,
        history: [action.payload.historyMessage, ...state.history].slice(0, 5),
      };

    case 'SHOW_NEXT_ROUND_BUTTON':
      return {
        ...state,
        showNextRoundButton: true,
      };

    case 'ADVANCE_TO_NEXT_ROUND': {
      const { roundWinnerId, drawPile, players } = state;
      const activePlayers = players.filter(p => !p.isEliminated);
      if (activePlayers.length === 0) return state;

      const playedCards = activePlayers.map(p => p.deck[0]);

      let nextPlayers = players.map(p => 
        p.isEliminated ? p : { ...p, deck: p.deck.slice(1) }
      );
      let nextDrawPile = [...drawPile];

      if (roundWinnerId !== null && roundWinnerId !== 'draw') {
        const winnerIndex = nextPlayers.findIndex(p => p.id === roundWinnerId);
        if (winnerIndex !== -1) {
          nextPlayers[winnerIndex].deck.push(...nextDrawPile, ...playedCards);
          nextDrawPile = [];
        }
      } else {
        nextDrawPile.push(...playedCards);
      }
      
      let finalPlayers = nextPlayers.map(p => {
        if (!p.isEliminated && p.deck.length === 0) {
          return { ...p, isEliminated: true };
        }
        return p;
      });

      const remainingPlayers = finalPlayers.filter(p => !p.isEliminated);
      if (remainingPlayers.length <= 1) {
        return {
          ...state,
          players: finalPlayers,
          gamePhase: 'gameOver',
          gameWinner: remainingPlayers[0] || null,
          message: `Fim de Jogo! O vencedor é o Jogador ${remainingPlayers[0]?.id + 1}!`,
        };
      }

      let nextActivePlayerId = (state.activePlayerId + 1) % state.players.length;
      while(finalPlayers[nextActivePlayerId].isEliminated) {
        nextActivePlayerId = (nextActivePlayerId + 1) % state.players.length;
      }
      
      return {
        ...state,
        players: finalPlayers,
        drawPile: nextDrawPile,
        activePlayerId: nextActivePlayerId,
        isResolving: nextActivePlayerId !== 0,
        areCardsFlipped: false,
        selectedAttribute: null,
        roundWinnerId: null,
        showNextRoundButton: false,
        message: nextActivePlayerId === 0 ? 'Sua vez! Escolha um atributo.' : `Vez do Jogador ${nextActivePlayerId + 1}...`,
      };
    }
    default:
      return state;
  }
}