import { useState } from 'react';
import { RACES } from './data/races';
import RaceSelector from './components/RaceSelector';
import { rollDetailedCharacterStats, StatDetails } from './utils/statUtils';
import { CharacterStats, STAT_NAMES } from './types/warhammer';
import StatDisplay from './components/StatDisplay';

// Stałe z listami statystyk
const BASE_STATS: Array<keyof CharacterStats> = [
  'weaponSkill',
  'ballisticSkill',
  'strength',
  'toughness',
  'agility',
  'intelligence',
  'willpower',
  'fellowship',
];

const SECONDARY_STATS: Array<keyof CharacterStats> = [
  'attacks',
  'fatePoints',
  'luckPoints',
  'wounds',
  'movement',
  'magic',
  'insanityPoints',
];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Podstawowe statystyki */}
              <div>
                <h4 className="font-medium mb-2">Podstawowe:</h4>
                <ul className="space-y-2">
                  {BASE_STATS.map((stat) => (
                    <StatDisplay key={stat} stat={stats[stat]} name={STAT_NAMES[stat]} />
                  ))}
                </ul>
              </div>

              {/* Nowe statystyki */}
              <div>
                <h4 className="font-medium mb-2">Dodatkowe:</h4>
                <ul className="space-y-2">
                  {SECONDARY_STATS.map((stat) => (
                    <StatDisplay
                      key={stat}
                      stat={stats[stat]}
                      name={STAT_NAMES[stat]}
                      isSpecialStat={true}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
