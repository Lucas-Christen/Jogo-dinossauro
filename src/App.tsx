// src/App.tsx

import { Game } from './components/Game';

function App() {
  return (
    // Adicionado overflow-hidden para conter as animações das cartas
    <div className="relative min-h-screen bg-cover bg-center bg-fixed text-white font-['Chakra_Petch',_sans-serif] overflow-hidden" 
         style={{ backgroundImage: "url('/assets/images/jungle-background.jpg')" }}>
      
      <div className="absolute inset-0 bg-green-950 bg-opacity-80" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
            JURASSIC TRUNFO
          </h1>
          <p className="text-yellow-600">BATALHA DOS DINOSSAUROS</p>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <Game />
        </main>
      </div>
    </div>
  );
}

export default App;