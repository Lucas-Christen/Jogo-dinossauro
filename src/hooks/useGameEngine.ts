// src/hooks/useGameEngine.ts
import { useEffect, useReducer, useCallback } from 'react';
import { DINOSAURS_DATA } from '../data/dinosaurs';
import type { Dinosaur, DinosaurAttributes } from '../types/dinosaur';
import { shuffleDeck, getCpuChoice } from '../utils/gameLogic';
import { useGameAnimations } from './useGameAnimations';
import { gameReducer, initialState } from '../game/gameReducer';

export const useGameEngine = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { playerDeck, cpuDeck, playerCard, cpuCard, isPlayerTurn, isResolving, drawPile, roundWinner } = state;

  const { runRoundEndSequence, clearAnimations, ...animationProps } = useGameAnimations();

  // Inicia o jogo
  useEffect(() => {
    const allCards = shuffleDeck(DINOSAURS_DATA);
    dispatch({
      type: 'INITIALIZE_DECKS',
      payload: { playerDeck: allCards.slice(0, 16), cpuDeck: allCards.slice(16, 32) },
    });
  }, []);
  
  // Controla a jogada da CPU
  useEffect(() => {
    if (!isPlayerTurn && isResolving && playerCard && cpuCard) {
      const timer = setTimeout(() => {
        const cpuChoice = getCpuChoice(cpuCard, cpuDeck.length, playerDeck.length + cpuDeck.length);
        handleAttributeSelect(cpuChoice);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, isResolving, playerCard, cpuCard]);


  // Função para avançar para a próxima rodada
  const advanceToNextRound = useCallback(() => {
    if (!playerCard || !cpuCard) return;

    // 1. Inicia as animações
    let cardsToAnimate: { card: Dinosaur; destination: 'player' | 'cpu' }[] = [];
    if (roundWinner && roundWinner !== 'draw') {
      cardsToAnimate = [...drawPile, playerCard, cpuCard].map(card => ({ card, destination: roundWinner }));
      runRoundEndSequence(roundWinner, cardsToAnimate);
    }
    
    // 2. Despacha a ação para atualizar o estado lógico do jogo
    dispatch({ type: 'START_NEXT_ROUND' });
    
    // 3. Limpa as animações após a sua duração
    setTimeout(() => {
      clearAnimations();
    }, 1500);

  }, [playerCard, cpuCard, drawPile, roundWinner, runRoundEndSequence, clearAnimations]);

  // Função para o jogador selecionar um atributo
  const handleAttributeSelect = useCallback((attribute: keyof DinosaurAttributes) => {
    if (isResolving || !playerCard || !cpuCard) return;

    dispatch({ type: 'START_ROUND_RESOLUTION', payload: { attribute } });
    
    const playerValue = playerCard[attribute];
    const cpuValue = cpuCard[attribute];
    const playerWins = (attribute === 'anos') ? playerValue < cpuValue : playerValue > cpuValue;
    const cpuWins = (attribute === 'anos') ? cpuValue < playerValue : cpuValue > playerValue;
    
    const winner = playerWins ? 'player' : cpuWins ? 'cpu' : 'draw';

    // Atraso para permitir que a carta da CPU vire antes de mostrar o resultado
    setTimeout(() => {
      const historyMessage = winner === 'player' ? `Você venceu com ${attribute}: ${playerValue} vs ${cpuValue}`
        : winner === 'cpu' ? `CPU venceu com ${attribute}: ${cpuValue} vs ${playerValue}`
        : `Empate em ${attribute}: ${playerValue} vs ${cpuValue}`;
      
      const message = winner === 'player' ? 'Você ganhou a rodada!' 
        : winner === 'cpu' ? 'A CPU ganhou a rodada!' 
        : 'Empate! As cartas irão para o monte.';
      
      dispatch({ type: 'RESOLVE_ROUND', payload: { winner, message, historyMessage } });
      dispatch({ type: 'AWAIT_NEXT_ROUND' }); // Mostra o botão "Próxima Rodada"
    }, 1000);
  }, [isResolving, playerCard, cpuCard]);

  return {
    ...state,
    ...animationProps,
    handleAttributeSelect,
    advanceToNextRound,
  };
};