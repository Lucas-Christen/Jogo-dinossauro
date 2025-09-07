// src/components/Card.tsx

import type { Dinosaur, DinosaurAttributes } from "../types/dinosaur";

interface CardProps {
  dinosaur: Dinosaur | null;
  isFlipped?: boolean;
  isPlayerCard?: boolean;
  onAttributeSelect?: (attribute: keyof DinosaurAttributes) => void;
}

// Mapeia as chaves dos atributos para os rótulos corretos
const ATTRIBUTE_LABELS: Record<keyof DinosaurAttributes, string> = {
  comprimento: 'Comprimento',
  peso: 'Peso',
  velocidade: 'Velocidade',
  inteligencia: 'Inteligência',
  forca_mordida: 'Força Mordida',
  periculosidade: 'Periculosidade',
};

// Define a ordem em que os atributos aparecerão
const ATTRIBUTE_KEYS: (keyof DinosaurAttributes)[] = ['comprimento', 'peso', 'forca_mordida', 'velocidade', 'inteligencia', 'periculosidade'];

export function Card({ dinosaur, isFlipped = false, isPlayerCard = false, onAttributeSelect }: CardProps) {

  const handleAttributeClick = (attribute: keyof DinosaurAttributes) => {
    if (isPlayerCard && onAttributeSelect) {
      onAttributeSelect(attribute);
    }
  };

  return (
    // Aumentamos a largura para acomodar o novo design
    <div className="w-[380px] h-[520px] [perspective:1500px] text-white font-sans">
      <div
        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Verso da Carta */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col justify-center items-center rounded-2xl shadow-2xl bg-card-bg border-4 border-card-border p-2">
          <div className="w-full h-full border-2 border-card-border/50 rounded-lg flex justify-center items-center">
            <h1 className="text-4xl font-bold text-card-border tracking-widest">JURASSIC TRUNFO</h1>
          </div>
        </div>

        {/* Frente da Carta (Novo Design) */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col rounded-2xl shadow-2xl bg-card-bg border-4 border-card-border overflow-hidden">
          {dinosaur ? (
            <div className="flex flex-col h-full p-2.5">
              <div className="text-center bg-card-header py-1 rounded-t-md">
                <h2 className="font-bold text-xl uppercase tracking-wider">{dinosaur.nome}</h2>
              </div>
              <img src={dinosaur.imagem} alt={dinosaur.nome} className="w-full h-52 object-cover" />
              
              {/* Container de Atributos com Grid */}
              <div className="flex-grow bg-card-header p-4 rounded-b-md">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3 h-full">
                  {ATTRIBUTE_KEYS.map((attrKey) => (
                    <li
                      key={attrKey}
                      onClick={() => handleAttributeClick(attrKey)}
                      className={`flex flex-col justify-between p-2 rounded-md bg-attr-bg transition-colors duration-200 
                        ${isPlayerCard ? 'cursor-pointer hover:bg-card-border/50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-attr-icon-green rounded-full flex-shrink-0"></div>
                        <span className="font-semibold uppercase text-xs tracking-wider">{ATTRIBUTE_LABELS[attrKey]}</span>
                      </div>
                      <div className="text-right font-bold text-2xl pr-2">{String(dinosaur[attrKey])}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center text-xs p-1 text-gray-400 mt-1">
                <span>UNIVERSAL</span>
                <span>CARTA 1A</span>
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