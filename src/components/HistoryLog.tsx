// src/components/HistoryLog.tsx

interface HistoryLogProps {
  entries: string[];
}

export function HistoryLog({ entries }: HistoryLogProps) {
  if (entries.length === 0) {
    return null;
  }

  // Oculto em telas extra pequenas, visível a partir de 'md'
  return (
    <div className="hidden md:block w-64 bg-black/60 backdrop-blur-md p-4 rounded-lg border border-amber-600/30 shadow-lg">
      <h3 className="text-center font-bold text-amber-400 mb-2 border-b border-amber-600/50 pb-2">
        ÚLTIMAS JOGADAS
      </h3>
      <ul className="space-y-2 text-sm text-gray-300">
        {entries.map((entry, index) => (
          <li key={index} className="opacity-80 hover:opacity-100 transition-opacity">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}