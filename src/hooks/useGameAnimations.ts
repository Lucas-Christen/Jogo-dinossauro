// src/hooks/useGameAnimations.ts
import { useState, useEffect, useCallback } from 'react';
import type { Dinosaur, Player } from '../game/types';

export const useGameAnimations = (onAnimationComplete: () => void) => {
  const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null);
  const [winnerForAnimation, setWinnerForAnimation] = useState<number | null>(null);
  const [animatingCards, setAnimatingCards] = useState<{ card: Dinosaur; destination: number }[]>([]);
  const [startCardAnimation, setStartCardAnimation] = useState(false);

  useEffect(() => {
    if (animatingCards.length > 0) {
      const timer = setTimeout(() => setStartCardAnimation(true), 50);
      return () => clearTimeout(timer);
    }
  }, [animatingCards]);

  const runRoundEndSequence = useCallback((winnerId: number | 'draw', cardsToAnimate: Dinosaur[]) => {
    if (winnerId === 'draw') {
      // Lógica para empate (se houver, como um flash neutro)
    } else {
      const isPlayerWinner = winnerId === 0;
      setFlashColor(isPlayerWinner ? 'green' : 'red');
      setWinnerForAnimation(winnerId);
      setAnimatingCards(cardsToAnimate.map(card => ({ card, destination: winnerId })));
    }

    const animationDuration = 1500;
    setTimeout(() => {
      setAnimatingCards([]);
      setStartCardAnimation(false);
      setFlashColor(null);
      setWinnerForAnimation(null);
      onAnimationComplete();
    }, animationDuration);
  }, [onAnimationComplete]);

  return {
    flashColor,
    winnerForAnimation,
    animatingCards,
    startCardAnimation,
    runRoundEndSequence,
  };
};
