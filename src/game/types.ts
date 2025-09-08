// src/game/types.ts
import type { Dinosaur, DinosaurAttributes } from '../types/dinosaur';

// Define o estado completo do nosso jogo
export interface GameState {
  playerDeck: Dinosaur[];
  cpuDeck: Dinosaur[];
  drawPile: Dinosaur[];
  history: string[];
  playerCard: Dinosaur | null;
  cpuCard: Dinosaur | null;
  isCpuCardFlipped: boolean;
  message: string;
  isPlayerTurn: boolean;
  selectedAttribute: keyof DinosaurAttributes | null;
  isResolving: boolean;
  roundWinner: 'player' | 'cpu' | 'draw' | null;
  showNextRoundButton: boolean;
}

// Define todas as ações possíveis que podem alterar o estado do jogo
export type GameAction =
  | { type: 'INITIALIZE_DECKS'; payload: { playerDeck: Dinosaur[]; cpuDeck: Dinosaur[] } }
  | { type: 'START_ROUND_RESOLUTION'; payload: { attribute: keyof DinosaurAttributes } }
  | { type: 'RESOLVE_ROUND'; payload: { winner: 'player' | 'cpu' | 'draw'; message: string; historyMessage: string } }
  | { type: 'START_NEXT_ROUND' }
  | { type: 'AWAIT_NEXT_ROUND' };