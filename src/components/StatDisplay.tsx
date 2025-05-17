import { StatDetails } from '../utils/statUtils';

interface StatDisplayProps {
  stat: StatDetails;
  name: string;
  isSpecialStat?: boolean;
}

const StatDisplay = ({ stat, name, isSpecialStat = false }: StatDisplayProps) => {
  const getSpecialStatDescription = () => {
    switch (name.split(' ')[0]) {
      case 'Liczba ataków':
        return 'Ilość ataków w turze (na początku 1)';
      case 'Punkty szczęścia':
        return `Maksymalna liczba punktów szczęścia zawsze równa liczbie punktów przeznaczenia`;

      case 'Żywotność':
        return `Wartość zdrowia postaci (zależy od rasy)`;
      case 'Szybkość':
        return `Baza: 4 ${
          stat.total !== 4
            ? `(modyfikator rasowy: ${stat.total > 4 ? '+' : ''}${stat.total - 4})`
            : ''
        }`;
      case 'Magia':
      case 'Punkty':
        break;
      default:
        return '';
    }
  };

  return (
    <li className="flex flex-col">
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="font-bold">{stat.total}</span>
      </div>
      <div className="text-sm text-gray-600">
        {isSpecialStat ? (
          getSpecialStatDescription()
        ) : (
          <>
            = {stat.base}
            {stat.raceBonus !== 0 && (
              <span className={stat.raceBonus > 0 ? 'text-green-600' : 'text-red-600'}>
                {stat.raceBonus > 0 ? ` +${stat.raceBonus}` : ` ${stat.raceBonus}`}
              </span>
            )}
            {` (${stat.base + stat.raceBonus})`} + {stat.dice1} + {stat.dice2}
          </>
        )}
      </div>
    </li>
  );
};

export default StatDisplay;
