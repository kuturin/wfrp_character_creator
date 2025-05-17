import { RACES } from '../data/races';

type Props = {
  selectedRace?: string;
  onSelect: (raceId: string) => void;
};

const RaceSelector = ({ selectedRace, onSelect }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Wybierz rasę:</h2>
      <div className="grid grid-cols-2 gap-4">
        {RACES.map((race) => (
          <button
            key={race.id}
            onClick={() => onSelect(race.id)}
            className={`p-4 border rounded-lg transition-all ${
              selectedRace === race.id
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <h3 className="font-bold text-lg">{race.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{race.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RaceSelector;
