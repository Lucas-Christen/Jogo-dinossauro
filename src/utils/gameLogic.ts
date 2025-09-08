// src/utils/gameLogic.ts
import type { Dinosaur, DinosaurAttributes } from '../types/dinosaur';
import type { Difficulty } from '../game/types';

export const shuffleDeck = (deck: Dinosaur[]): Dinosaur[] => {
  return [...deck].sort(() => Math.random() - 0.5);
};

// IA da CPU atualizada para lidar com diferentes dificuldades
export const getCpuChoice = (
  card: Dinosaur,
  playerCard: Dinosaur | null,
  difficulty: Difficulty
): keyof DinosaurAttributes => {
  const attributes: (keyof DinosaurAttributes)[] = ['comprimento', 'peso', 'velocidade', 'inteligencia', 'forca_mordida', 'defesa', 'anos'];

  // Nível Impossível: A CPU "vê" sua carta e joga para ganhar
  if (difficulty === 'impossible' && playerCard) {
    for (const attr of attributes) {
      const cpuValue = card[attr];
      const playerValue = playerCard[attr];
      if (attr === 'anos' ? cpuValue < playerValue : cpuValue > playerValue) {
        return attr; // Encontra a primeira jogada vencedora
      }
    }
  }

  // Nível Difícil: Sempre escolhe o melhor atributo
  if (difficulty === 'hard' || difficulty === 'impossible') { // 'impossible' usa isso como fallback
    let bestAttribute: keyof DinosaurAttributes = 'comprimento';
    let maxValue = -Infinity;
    for (const attr of attributes) {
      if (attr === 'anos') continue; // Evita a aposta arriscada de 'anos'
      if (card[attr] > maxValue) {
        maxValue = card[attr];
        bestAttribute = attr;
      }
    }
    return bestAttribute;
  }

  // Nível Médio: Escolhe entre os 2 melhores atributos
  if (difficulty === 'medium') {
    const sortedAttrs = [...attributes]
      .filter(attr => attr !== 'anos')
      .sort((a, b) => card[b] - card[a]);
    return sortedAttrs[Math.floor(Math.random() * 2)]; // Escolhe o melhor ou o segundo melhor
  }

  // Nível Fácil: Escolhe qualquer atributo aleatoriamente
  return attributes[Math.floor(Math.random() * attributes.length)];
};