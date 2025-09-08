// src/hooks/useGameEngine.ts
import { useEffect, useReducer, useCallback } from 'react';
import { DINOSAURS_DATA } from '../data/dinosaurs';
import type { DinosaurAttributes, GameSettings, Player } from '../game/types';
import { shuffleDeck, getCpuChoice } from '../utils/gameLogic';
import { useGameAnimations } from './useGameAnimations';
import { gameReducer, initialState } from '../game/gameReducer';

export const useGameEngine = (settings: GameSettings) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { players, activePlayerId, isResolving, drawPile } = state;

  const advanceToNextRound = useCallback(() => {
    dispatch({ type: 'ADVANCE_TO_NEXT_ROUND' });
  }, []);

  const { runRoundEndSequence, ...animationProps } = useGameAnimations(advanceToNextRound);

  useEffect(() => {
    const allCards = shuffleDeck(DINOSAURS_DATA);
    const cardsPerPlayer = Math.floor(allCards.length / settings.playerCount);
    const newPlayers: Player[] = Array.from({ length: settings.playerCount }, (_, i) => ({
      id: i,
      deck: allCards.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer),
      isEliminated: false,
    }));
    dispatch({ type: 'START_GAME', payload: { players: newPlayers, settings } });
  }, [settings]);

  useEffect(() => {
    const activePlayer = players[activePlayerId];
    if (activePlayer && activePlayer.id !== 0 && isResolving) {
      const timer = setTimeout(() => {
        const cpuCard = activePlayer.deck[0];
        const playerCard = players.find(p => p.id === 0)?.deck[0] || null;
        const cpuChoice = getCpuChoice(cpuCard, playerCard, state.settings!.difficulty);
        handleAttributeSelect(cpuChoice);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activePlayerId, isResolving, players]);

  const handleAttributeSelect = useCallback((attribute: keyof DinosaurAttributes) => {
    const activePlayer = players[activePlayerId];
    if (isResolving || !activePlayer || activePlayer.deck.length === 0) return;

    dispatch({ type: 'SELECT_ATTRIBUTE', payload: { attribute } });

    setTimeout(() => {
      const activePlayers = players.filter(p => !p.isEliminated);
      const scores = activePlayers.map(p => ({
        id: p.id,
        value: p.deck[0][attribute],
      }));

      const isYears = attribute === 'anos';
      const bestScore = isYears ? Math.min(...scores.map(s => s.value)) : Math.max(...scores.map(s => s.value));
      const winners = scores.filter(s => s.value === bestScore);
      
      const winnerId = winners.length === 1 ? winners[0].id : 'draw';
      const message = winnerId !== 'draw' ? `Jogador ${winnerId + 1} venceu a rodada!` : 'Empate!';
      const historyMessage = `${String(attribute)}: ${scores.map(s => `J${s.id + 1}: ${s.value}`).join(' | ')}`;

      dispatch({ type: 'RESOLVE_ROUND', payload: { winnerId, message, historyMessage } });
      
      const cardsInPlay = activePlayers.map(p => p.deck[0]);
      runRoundEndSequence(winnerId, [...drawPile, ...cardsInPlay]);

    }, 1500);
  }, [isResolving, players, activePlayerId, drawPile, runRoundEndSequence]);

  return {
    ...state,
    ...animationProps,
    handleAttributeSelect,
    advanceToNextRound,
  };
};
