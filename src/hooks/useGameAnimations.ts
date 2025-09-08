// src/hooks/useGameAnimations.ts
import { useState, useEffect, useCallback } from 'react';
import type { Dinosaur } from '../types/dinosaur';

export const useGameAnimations = () => {
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null);
  const [winnerForAnimation, setWinnerForAnimation] = useState<'player' | 'cpu' | null>(null);
  const [animatingCards, setAnimatingCards] = useState<{ card: Dinosaur; destination: 'player' | 'cpu' }[]>([]);
  const [startCardAnimation, setStartCardAnimation] = useState(false);

  useEffect(() => {
    if (animatingCards.length > 0) {
      const timer = setTimeout(() => setStartCardAnimation(true), 50);
      return () => clearTimeout(timer);
    }
  }, [animatingCards]);

  const runRoundEndSequence = useCallback((winner: 'player' | 'cpu', cardsToAnimate: { card: Dinosaur; destination: 'player' | 'cpu' }[]) => {
    if (winner === 'player') {
      setFlashColor('green');
    } else if (winner === 'cpu') {
      setFlashColor('red');
    }
    setWinnerForAnimation(winner);
    setAnimatingCards(cardsToAnimate);
  }, []);

  const clearAnimations = useCallback(() => {
    setAnimatingCards([]);
    setStartCardAnimation(false);
    setFlashColor(null);
    setWinnerForAnimation(null);
  }, []);

  return {
    flashColor,
    winnerForAnimation,
    animatingCards,
    startCardAnimation,
    runRoundEndSequence,
    clearAnimations,
  };
};