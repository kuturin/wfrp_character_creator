/* eslint-disable */
import { useState } from 'react';
import { RACES } from './data/races';
import RaceSelector from './components/RaceSelector';
import { rollCharacterStats, formatStatsForDisplay } from './utils/statUtils';
import { CharacterStats, Race } from './types/warhammer';

function App() {
  const [selectedRaceId, setSelectedRaceId] = useState<string>();
  const [stats, setStats] = useState<CharacterStats>();

  const selectedRace = RACES.find((r) => r.id === selectedRaceId);

  const handleRollStats = () => {
    const newStats = rollCharacterStats(selectedRace);
    setStats(newStats);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Generator postaci WFRP 2ed</h1>

      <RaceSelector selectedRace={selectedRaceId} onSelect={setSelectedRaceId} />

      <div className="mt-8">
        <button
          onClick={handleRollStats}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Losuj statystyki
        </button>

        {stats && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Statystyki:</h3>
            <ul className="space-y-2">
              {formatStatsForDisplay(stats, selectedRace).map((statLine, index) => (
                <li key={index} className="flex justify-between">
                  <span>{statLine.label}</span>
                  <span className="font-medium">
                    {statLine.value}
                    {statLine.bonus && (
                      <span className={statLine.bonus > 0 ? 'text-green-600' : 'text-red-600'}>
                        {statLine.bonus > 0 ? ` (+${statLine.bonus})` : ` (${statLine.bonus})`}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
