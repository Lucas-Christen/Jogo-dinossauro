// src/components/Game.tsx
import { Card } from './Card';
import { HistoryLog } from './HistoryLog';
import { useGameEngine } from '../hooks/useGameEngine';
import type { GameSettings } from '../game/types'; // Importa o tipo

// O componente agora recebe as configurações do jogo
interface GameProps {
  settings: GameSettings;
}

export function Game({ settings }: GameProps) {
  // O hook ainda não usa as 'settings', mas o componente já está preparado
  const {
    playerDeck, cpuDeck, drawPile, history, playerCard, cpuCard, message, isResolving,
    isCpuCardFlipped, selectedAttribute, showNextRoundButton,
    flashColor, winnerForAnimation, animatingCards, startCardAnimation, isPlayerTurn,
    handleAttributeSelect, advanceToNextRound,
  } = useGameEngine();

  // O JSX abaixo permanece exatamente o mesmo
  return (
    // ... todo o seu JSX existente ...
    <div className="w-full h-full grid grid-rows-[1fr_auto] p-2 md:p-4 relative">
      {/* Cartas em animação */}
      {animatingCards.map(({ card, destination }, index) => (
        <div 
          key={card.id + '-' + index} 
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ease-in-out
            ${startCardAnimation && destination === 'player' ? 'lg:-translate-x-[250%] opacity-0' : ''}
            ${startCardAnimation && destination === 'cpu' ? 'lg:translate-x-[250%] opacity-0' : ''}
            ${startCardAnimation ? (destination === 'player' ? '-translate-y-[200%] opacity-0' : 'translate-y-[200%] opacity-0') : ''}
          `}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <Card dinosaur={card} isFlipped={true} />
        </div>
      ))}
      
      {/* Área principal do jogo que pode rolar se necessário */}
      <main className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center p-2 w-40 bg-black/50 backdrop-blur-sm rounded-lg border border-amber-600/50">
            👤 Jogador: {playerDeck.length}
          </div>
          <Card
            dinosaur={playerCard}
            isFlipped={!!playerCard && animatingCards.length === 0}
            isPlayerCard={!isResolving && isPlayerTurn}
            onAttributeSelect={handleAttributeSelect}
            selectedAttribute={selectedAttribute}
            isWinner={winnerForAnimation === 'player'}
          />
        </div>
        <div className="flex flex-col items-center gap-4 lg:order-none order-first">
          <div className="text-center p-2 w-40 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-400/50">
            ⚪️ Monte: {drawPile.length}
          </div>
          <HistoryLog entries={history} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center p-2 w-40 bg-black/50 backdrop-blur-sm rounded-lg border border-amber-600/50">
            🤖 CPU: {cpuDeck.length}
          </div>
          <Card
            dinosaur={cpuCard}
            isFlipped={isCpuCardFlipped && animatingCards.length === 0}
            selectedAttribute={selectedAttribute}
            isWinner={winnerForAnimation === 'cpu'}
          />
        </div>
      </main>
      
      {/* Efeito de flash na tela */}
      {flashColor && (
        <div
          className={`fixed inset-0 pointer-events-none animate-pulse-once
            ${flashColor === 'green' ? 'bg-green-500/30' : 'bg-red-500/30'}`}
        />
      )}

      {/* Rodapé fixo na parte inferior */}
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