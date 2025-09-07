// src/components/Game.tsx

import { useState, useEffect } from 'react';
import { DINOSAURS_DATA } from '../data/dinosaurs';
import type { Dinosaur, DinosaurAttributes } from '../types/dinosaur';
import { Card } from './Card';

const shuffleDeck = (deck: Dinosaur[]): Dinosaur[] => {
  return [...deck].sort(() => Math.random() - 0.5);
};

// --- FUNÇÃO ATUALIZADA: Lógica da CPU com os novos atributos ---
const getCpuChoice = (card: Dinosaur): keyof DinosaurAttributes => {
  let bestAttribute: keyof DinosaurAttributes = 'comprimento';
  let maxValue = 0;

  // Usa a lista de chaves de atributos que definimos no Card
  const attributes: (keyof DinosaurAttributes)[] = ['comprimento', 'peso', 'velocidade', 'inteligencia', 'forca_mordida', 'periculosidade'];
  
  for (const attr of attributes) {
    if (card[attr] > maxValue) {
      maxValue = card[attr];
      bestAttribute = attr;
    }
  }
  return bestAttribute;
};
// -----------------------------------------------------------

export function Game() {
  // O RESTANTE DO CÓDIGO DESTE ARQUIVO CONTINUA EXATAMENTE O MESMO
  // ... (toda a lógica com useState, useEffect, handleAttributeSelect)
  // ... (todo o JSX do return)
  const [playerDeck, setPlayerDeck] = useState<Dinosaur[]>([]);
  const [cpuDeck, setCpuDeck] = useState<Dinosaur[]>([]);
  const [playerCard, setPlayerCard] = useState<Dinosaur | null>(null);
  const [cpuCard, setCpuCard] = useState<Dinosaur | null>(null);
  const [isCpuCardFlipped, setIsCpuCardFlipped] = useState(false);
  const [message, setMessage] = useState('O jogo vai começar!');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [selectedAttribute, setSelectedAttribute] = useState<keyof DinosaurAttributes | null>(null);

  useEffect(() => {
    const shuffled = shuffleDeck(DINOSAURS_DATA);
    const half = Math.ceil(shuffled.length / 2);
    setPlayerDeck(shuffled.slice(0, half));
    setCpuDeck(shuffled.slice(half));
    setMessage('Sua vez! Escolha um atributo.');
  }, []);

  useEffect(() => {
    if (playerDeck.length === 0 || cpuDeck.length === 0) return;
    setPlayerCard(playerDeck[0]);
    setCpuCard(cpuDeck[0]);
    if (!isPlayerTurn && cpuDeck.length > 0) {
      setMessage('Vez da CPU...');
      setTimeout(() => {
        const cpuChoice = getCpuChoice(cpuDeck[0]);
        handleAttributeSelect(cpuChoice);
      }, 2000);
    }
  }, [isPlayerTurn, playerDeck, cpuDeck]);

  const handleAttributeSelect = (attribute: keyof DinosaurAttributes) => {
    if (!playerCard || !cpuCard) return;
    if (!isPlayerTurn && selectedAttribute) return;
    setSelectedAttribute(attribute);
    setIsPlayerTurn(false);
    setIsCpuCardFlipped(true);
    const playerValue = playerCard[attribute];
    const cpuValue = cpuCard[attribute];
    const newPlayerDeck = [...playerDeck];
    const newCpuDeck = [...cpuDeck];
    const playedPlayerCard = newPlayerDeck.shift()!;
    const playedCpuCard = newCpuDeck.shift()!;
    let roundWinner: 'player' | 'cpu' | 'draw';
    if (playerValue > cpuValue) {
      newPlayerDeck.push(playedPlayerCard, playedCpuCard);
      setMessage('Você ganhou a rodada!');
      roundWinner = 'player';
    } else if (cpuValue > playerValue) {
      newCpuDeck.push(playedPlayerCard, playedCpuCard);
      setMessage('A CPU ganhou a rodada!');
      roundWinner = 'cpu';
    } else {
      newPlayerDeck.push(playedPlayerCard);
      newCpuDeck.push(playedCpuCard);
      setMessage('Empate!');
      roundWinner = 'draw';
    }
    setTimeout(() => {
      setPlayerDeck(newPlayerDeck);
      setCpuDeck(newCpuDeck);
      setSelectedAttribute(null);
      if (newPlayerDeck.length === 0) {
        setMessage('Você perdeu o jogo!');
        return;
      }
      if (newCpuDeck.length === 0) {
        setMessage('Você ganhou o jogo!');
        return;
      }
      setIsCpuCardFlipped(false);
      if (roundWinner === 'player' || roundWinner === 'draw') {
        setIsPlayerTurn(true);
        setMessage('Sua vez! Escolha um atributo.');
      } else {
        setIsPlayerTurn(false);
      }
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-center items-start gap-8 md:gap-16 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center p-2 w-40 bg-black/50 backdrop-blur-sm rounded-lg border border-amber-600/50">
            👤 Jogador: {playerDeck.length}
          </div>
          <Card 
            dinosaur={playerCard} 
            isFlipped={true} 
            isPlayerCard={isPlayerTurn}
            onAttributeSelect={handleAttributeSelect}
            //selectedAttribute={selectedAttribute} 
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="text-center p-2 w-40 bg-black/50 backdrop-blur-sm rounded-lg border border-amber-600/50">
            🤖 CPU: {cpuDeck.length}
          </div>
          <Card 
            dinosaur={cpuCard} 
            isFlipped={isCpuCardFlipped} 
            //selectedAttribute={selectedAttribute} 
          />
        </div>
      </div>
      
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center bg-black/60 backdrop-blur-sm border-t border-amber-600/30">
        <p className="text-xl font-bold text-amber-300 drop-shadow-md">{message}</p>
      </footer>
    </>
  );
}