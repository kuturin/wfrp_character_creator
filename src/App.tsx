import { useState } from 'react';
import { RACES } from './data/races';
import RaceSelector from './components/RaceSelector';
import { rollDetailedCharacterStats, formatDetailedStats, StatDetails } from './utils/statUtils';

function App() {
  const [selectedRaceId, setSelectedRaceId] = useState<string>();
  const [stats, setStats] = useState<Record<string, StatDetails>>();

  const selectedRace = RACES.find((r) => r.id === selectedRaceId);

  const handleRollStats = () => {
    const newStats = rollDetailedCharacterStats(selectedRace);
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
            <ul className="space-y-3">
              {formatDetailedStats(stats).map((stat, index) => (
                <li key={index} className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="font-medium">{stat.label}</span>
                    <span className="font-bold">{stat.details.total}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    = {stat.details.base}
                    {stat.details.raceBonus !== 0 && (
                      <span
                        className={stat.details.raceBonus > 0 ? 'text-green-600' : 'text-red-600'}
                      >
                        {stat.details.raceBonus > 0
                          ? ` +${stat.details.raceBonus}`
                          : ` ${stat.details.raceBonus}`}
                      </span>
                    )}
                    {` (${stat.details.baseWithBonus})`} + {stat.details.dice1} +{' '}
                    {stat.details.dice2}
                  </div>
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
