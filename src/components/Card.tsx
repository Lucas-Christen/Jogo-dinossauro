// src/components/Card.tsx

import type { Dinosaur, DinosaurAttributes } from "../types/dinosaur";
import { useCountUp } from '../hooks/useCountUp'; // Importa o hook

interface CardProps {
  dinosaur: Dinosaur | null;
  isFlipped?: boolean;
  isPlayerCard?: boolean;
  onAttributeSelect?: (attribute: keyof DinosaurAttributes) => void;
  selectedAttribute?: keyof DinosaurAttributes | null;
  isWinner?: boolean;
}

// Componente interno para animar o número
const AnimatedStat = ({ value, isFlipped }: { value: number, isFlipped: boolean }) => {
    // Se a carta está virada, anima até o valor. Se não, o valor é 0.
    const animatedValue = useCountUp(isFlipped ? value : 0, 800);
    return <>{String(animatedValue)}</>;
};

const ATTRIBUTE_LABELS: Record<keyof DinosaurAttributes, string> = {
  comprimento: 'Comprimento (m)',
  peso: 'Peso (t)',
  velocidade: 'Velocidade (km/h)',
  inteligencia: 'Inteligência',
  forca_mordida: 'Força Mordida',
  defesa: 'Defesa',
  anos: 'Anos (Milhões)',
};

const ATTRIBUTE_KEYS: (keyof DinosaurAttributes)[] = ['comprimento', 'peso', 'forca_mordida', 'velocidade', 'inteligencia', 'defesa', 'anos'];

export function Card({ dinosaur, isFlipped = false, isPlayerCard = false, onAttributeSelect, selectedAttribute, isWinner }: CardProps) {

  const handleAttributeClick = (attribute: keyof DinosaurAttributes) => {
    if (isPlayerCard && onAttributeSelect) {
      onAttributeSelect(attribute);
    }
  };

  const winnerBorderColor = dinosaur && dinosaur.id > 15 && dinosaur.id < 22 ? 'ring-purple-500' : 'ring-green-500';

  return (
    <div className={`w-[90vw] max-w-[380px] h-[520px] [perspective:1500px] text-white font-sans transition-transform duration-500 ${isWinner ? 'scale-105' : ''}`}>
      <div
        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        <div className={`absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-center items-center rounded-2xl shadow-2xl bg-card-bg border-4 p-2 transition-all duration-500 ${isWinner ? winnerBorderColor : 'border-card-border'}`}>
          <div className="w-full h-full border-2 border-card-border/50 rounded-lg flex justify-center items-center">
            <h1 className="text-4xl font-bold text-card-border tracking-widest">JURASSIC TRUNFO</h1>
          </div>
        </div>
        <div className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col rounded-2xl shadow-2xl bg-card-bg overflow-hidden transition-all duration-500 ${isWinner ? `ring-4 ${winnerBorderColor}`: 'border-4 border-card-border'}`}>
          {dinosaur ? (
            <div className="flex flex-col h-full p-2.5">
              <div className="text-center bg-card-header py-1 rounded-t-md">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider">{dinosaur.nome}</h2>
              </div>
              <img src={dinosaur.imagem} alt={dinosaur.nome} className="w-full h-52 object-cover" />
              <div className="flex-grow bg-card-header p-2 md:p-4 rounded-b-md">
                <ul className="grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-3 h-full">
                  {ATTRIBUTE_KEYS.map((attrKey) => (
                    <li
                      key={attrKey}
                      onClick={() => handleAttributeClick(attrKey)}
                      className={`flex flex-col justify-between p-2 rounded-md bg-attr-bg transition-all duration-300 
                        ${isPlayerCard ? 'cursor-pointer hover:bg-card-border/50' : ''}
                        ${selectedAttribute === attrKey ? 'ring-2 ring-yellow-400 scale-105' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 ${attrKey === 'anos' ? 'bg-yellow-400' : 'bg-attr-icon-green'} rounded-full flex-shrink-0`}></div>
                        <span className="font-semibold uppercase text-xs tracking-wider">{ATTRIBUTE_LABELS[attrKey]}</span>
                      </div>
                      <div className="text-right font-bold text-xl md:text-2xl pr-2">
                        {/* A carta do jogador mostra o valor direto, a da CPU anima */}
                        {isPlayerCard ? String(dinosaur[attrKey]) : <AnimatedStat value={Number(dinosaur[attrKey])} isFlipped={!!isFlipped} />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center text-xs p-1 text-gray-400 mt-1">
                <span>UNIVERSAL</span>
                <span>CARTA {dinosaur.id}A</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">Carregando...</div>
          )}
        </div>
      </div>
    </div>
  );
}