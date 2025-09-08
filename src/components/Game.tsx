// src/components/Game.tsx
import { Card } from './Card';
import { HistoryLog } from './HistoryLog';
import { useGameEngine } from '../hooks/useGameEngine';
import type { GameSettings } from '../game/types';

interface GameProps {
  settings: GameSettings;
}

export function Game({ settings }: GameProps) {
  const {
    players,
    activePlayerId,
    drawPile,
    history,
    message,
    isResolving,
    areCardsFlipped,
    selectedAttribute,
    showNextRoundButton,
    handleAttributeSelect,
    advanceToNextRound,
    roundWinnerId,
  } = useGameEngine(settings);

  const humanPlayer = players.find(p => p.id === 0);
  const opponents = players.filter(p => p.id !== 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-2 relative">
      {/* Oponentes */}
      <div className="w-full flex justify-around">
        {opponents.map(opponent => (
          <div key={opponent.id} className="flex flex-col items-center gap-2">
            <p className={`p-2 rounded-lg ${activePlayerId === opponent.id ? 'bg-amber-500 text-black' : 'bg-black/50'}`}>
              J{opponent.id + 1}: {opponent.isEliminated ? 'X' : opponent.deck.length}
            </p>
            <Card 
              dinosaur={opponent.deck[0]} 
              isFlipped={!areCardsFlipped}
              isWinner={roundWinnerId === opponent.id}
              selectedAttribute={selectedAttribute}
            />
          </div>
        ))}
      </div>

      {/* Área Central */}
      <div className="my-4">
        <HistoryLog entries={history} />
        <p>Monte: {drawPile.length}</p>
      </div>

      {/* Jogador Humano */}
      {humanPlayer && (
        <div className="flex flex-col items-center gap-2">
           <p className={`p-2 rounded-lg ${activePlayerId === 0 ? 'bg-amber-500 text-black' : 'bg-black/50'}`}>
              Você: {humanPlayer.isEliminated ? 'X' : humanPlayer.deck.length}
            </p>
          <Card
            dinosaur={humanPlayer.deck[0]}
            isFlipped={false}
            isPlayerCard={activePlayerId === 0 && !isResolving}
            onAttributeSelect={handleAttributeSelect}
            selectedAttribute={selectedAttribute}
            isWinner={roundWinnerId === 0}
          />
        </div>
      )}

      {/* Rodapé */}
      <footer className="w-full py-4 text-center bg-black/60 backdrop-blur-sm border-t border-amber-600/30">
        <div className="flex flex-col items-center justify-center gap-4 h-20">
          <p className="text-xl font-bold text-amber-300 drop-shadow-md h-8">{message}</p>
          {showNextRoundButton && (
            <button
              onClick={advanceToNextRound}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-pulse"
            >
              Próxima Rodada
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}