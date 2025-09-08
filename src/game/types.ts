// src/game/types.ts
export type { Dinosaur, DinosaurAttributes } from '../types/dinosaur'; 

export type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible';

export interface GameSettings {
  playerCount: number;
  difficulty: Difficulty;
}

export interface Player {
  id: number;
  deck: import('../types/dinosaur').Dinosaur[];
  isEliminated: boolean;
}

export interface GameState {
  settings: GameSettings | null;
  players: Player[];
  activePlayerId: number;
  drawPile: import('../types/dinosaur').Dinosaur[];
  history: string[];
  areCardsFlipped: boolean;
  message: string;
  selectedAttribute: keyof import('../types/dinosaur').DinosaurAttributes | null; // Corrigido
  isResolving: boolean;
  roundWinnerId: number | 'draw' | null;
  showNextRoundButton: boolean;
  gamePhase: 'menu' | 'playing' | 'gameOver';
  gameWinner: Player | null;
}

export type GameAction =
  | { type: 'START_GAME'; payload: { players: Player[]; settings: GameSettings } }
  | { type: 'SELECT_ATTRIBUTE'; payload: { attribute: keyof import('../types/dinosaur').DinosaurAttributes } }
  | { type: 'RESOLVE_ROUND'; payload: { winnerId: number | 'draw'; message: string; historyMessage: string } }
  | { type: 'ADVANCE_TO_NEXT_ROUND' }
  | { type: 'SHOW_NEXT_ROUND_BUTTON' };

