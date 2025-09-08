// src/components/Menu.tsx
import { useState } from 'react';
import type { GameSettings, Difficulty } from '../game/types';

interface MenuProps {
  onStartGame: (settings: GameSettings) => void;
}

const playerCountOptions = [2, 3, 4];
const difficultyOptions: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Fácil' },
  { id: 'medium', label: 'Médio' },
  { id: 'hard', label: 'Difícil' },
  { id: 'impossible', label: 'Impossível' },
];

export function Menu({ onStartGame }: MenuProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleStartClick = () => {
    onStartGame({ playerCount, difficulty });
  };

  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <div className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-2 border-amber-600/50 text-white">
        <h2 className="text-3xl font-bold text-center text-amber-400 drop-shadow-lg mb-8">
          CONFIGURAR BATALHA
        </h2>

        {/* Seleção de Jogadores */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-3 text-amber-200">
            Número de Jogadores
          </label>
          <div className="grid grid-cols-3 gap-4">
            {playerCountOptions.map((count) => (
              <button
                key={count}
                onClick={() => setPlayerCount(count)}
                className={`px-4 py-3 font-bold rounded-lg transition-all duration-200 text-lg border-2
                  ${playerCount === count
                    ? 'bg-amber-500 border-amber-400 text-black scale-105 shadow-lg'
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Seleção de Dificuldade */}
        <div className="mb-10">
          <label className="block text-lg font-semibold mb-3 text-amber-200">
            Dificuldade da CPU
          </label>
          <div className="grid grid-cols-2 gap-4">
            {difficultyOptions.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setDifficulty(id)}
                className={`px-4 py-3 font-bold rounded-lg transition-all duration-200 text-sm md:text-base border-2
                  ${difficulty === id
                    ? 'bg-amber-500 border-amber-400 text-black scale-105 shadow-lg'
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Botão de Iniciar */}
        <button
          onClick={handleStartClick}
          className="w-full py-4 text-xl font-bold bg-green-600 hover:bg-green-500 rounded-lg shadow-lg transition-transform transform hover:scale-105 border-2 border-green-400"
        >
          Iniciar Batalha
        </button>
      </div>
    </div>
  );
}