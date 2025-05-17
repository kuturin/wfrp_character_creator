import { CharacterStats, Race, STAT_NAMES } from '../types/warhammer';

export type StatDetails = {
  base: number; // 20
  dice1: number; // pierwsza kostka D10 (1-10)
  dice2: number; // druga kostka D10 (1-10)
  raceBonus: number; // bonus/malus rasowy
  total: number; // suma: base + dice1 + dice2 + raceBonus
};

export const rollCharacterStats = (race?: Race): CharacterStats => {
  const roll2D10 = (): number =>
    Math.floor(Math.random() * 10 + 1) + Math.floor(Math.random() * 10 + 1);

  const baseStats = {
    weaponSkill: roll2D10() + 20,
    ballisticSkill: roll2D10() + 20,
    strength: roll2D10() + 20,
    toughness: roll2D10() + 20,
    agility: roll2D10() + 20,
    intelligence: roll2D10() + 20,
    willpower: roll2D10() + 20,
    fellowship: roll2D10() + 20,
  };

  if (!race) return baseStats;

  return {
    weaponSkill: baseStats.weaponSkill + (race.statBonuses.weaponSkill || 0),
    ballisticSkill: baseStats.ballisticSkill + (race.statBonuses.ballisticSkill || 0),
    strength: baseStats.strength + (race.statBonuses.strength || 0),
    toughness: baseStats.toughness + (race.statBonuses.toughness || 0),
    agility: baseStats.agility + (race.statBonuses.agility || 0),
    intelligence: baseStats.intelligence + (race.statBonuses.intelligence || 0),
    willpower: baseStats.willpower + (race.statBonuses.willpower || 0),
    fellowship: baseStats.fellowship + (race.statBonuses.fellowship || 0),
  };
};

export const rollDetailedCharacterStats = (
  race?: Race,
): Record<keyof CharacterStats, StatDetails> => {
  const rollD10 = (): number => Math.floor(Math.random() * 10) + 1;

  return (Object.keys(STAT_NAMES) as Array<keyof CharacterStats>).reduce(
    (acc, stat) => {
      const dice1 = rollD10();
      const dice2 = rollD10();
      const raceBonus = race?.statBonuses[stat] || 0;
      const base = 20;

      acc[stat] = {
        base,
        dice1,
        dice2,
        raceBonus,
        total: base + dice1 + dice2 + raceBonus,
      };
      return acc;
    },
    {} as Record<keyof CharacterStats, StatDetails>,
  );
};

export const formatStatsForDisplay = (
  stats: CharacterStats,
  race?: Race,
): Array<{ label: string; value: number; bonus?: number }> => {
  return (Object.keys(stats) as Array<keyof CharacterStats>).map((key) => ({
    label: STAT_NAMES[key],
    value: stats[key],
    bonus: race?.statBonuses[key],
  }));
};

export const formatDetailedStats = (
  stats: Record<keyof CharacterStats, StatDetails>,
): Array<{ label: string; text: string; details: StatDetails }> => {
  return (Object.keys(stats) as Array<keyof CharacterStats>).map((stat) => {
    const detail = stats[stat];
    const bonusText =
      detail.raceBonus !== 0 ? ` ${detail.raceBonus > 0 ? '+' : ''}${detail.raceBonus}` : '';

    return {
      label: STAT_NAMES[stat],
      text: `${STAT_NAMES[stat]}: ${detail.total} = ${detail.base} + ${detail.dice1} + ${detail.dice2}${bonusText}`,
      details: detail,
    };
  });
};

// Funkcja pomocnicza
export const getRollTotal = (details: StatDetails): number => {
  return details.base + details.dice1 + details.dice2 + details.raceBonus;
};
