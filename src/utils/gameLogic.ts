// src/utils/gameLogic.ts

import type { Dinosaur, DinosaurAttributes } from '../types/dinosaur';

export const shuffleDeck = (deck: Dinosaur[]): Dinosaur[] => {
  return [...deck].sort(() => Math.random() - 0.5);
};

export const getCpuChoice = (card: Dinosaur, cpuDeckSize: number, totalCards: number): keyof DinosaurAttributes => {
  const attributes: (keyof DinosaurAttributes)[] = ['comprimento', 'peso', 'velocidade', 'inteligencia', 'forca_mordida', 'defesa', 'anos'];
  const cpuDeckPercentage = cpuDeckSize / totalCards;
  let bestAttribute: keyof DinosaurAttributes = 'comprimento';
  let maxValue = -Infinity;

  if (cpuDeckPercentage < 0.25) { // Modo Desesperado
    for (const attr of attributes) {
      if (attr === 'anos') continue;
      if (card[attr] > maxValue) {
        maxValue = card[attr];
        bestAttribute = attr;
      }
    }
    return bestAttribute;
  }

  // Modo Normal
  for (const attr of attributes) {
    const value = card[attr];
    if (attr === 'anos') {
      if (value < 65 && maxValue < 80) {
        bestAttribute = attr;
        maxValue = 90;
      }
    } else {
      if (value > maxValue) {
        maxValue = value;
        bestAttribute = attr;
      }
    }
  }
  return bestAttribute;
};