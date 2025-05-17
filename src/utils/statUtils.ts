import { CharacterStats, Race, STAT_NAMES } from '../types/warhammer';

export type StatDetails = {
  base: number;
  dice1: number;
  dice2: number;
  raceBonus: number;
  baseWithBonus?: number;
  total: number;
};

// Funkcje pomocnicze
const rollD10 = (): number => Math.floor(Math.random() * 10) + 1;
const roll2D10 = (): number => rollD10() + rollD10();

const getWoundsByRace = (raceId?: string): number => {
  switch (raceId) {
    case 'human':
      return 10;
    case 'elf':
      return 9;
    case 'dwarf':
      return 11;
    case 'halfling':
      return 8;
    default:
      return 10;
  }
};

const getMovementByRace = (raceId?: string): number => {
  const baseMovement = 4;
  switch (raceId) {
    case 'elf':
      return baseMovement + 1;
    case 'dwarf':
      return baseMovement - 1;
    default:
      return baseMovement;
  }
};

// Podstawowa funkcja losująca (utrzymana dla kompatybilności)
export const rollCharacterStats = (race?: Race): CharacterStats => {
  const baseStats: CharacterStats = {
    weaponSkill: roll2D10() + 20,
    ballisticSkill: roll2D10() + 20,
    strength: roll2D10() + 20,
    toughness: roll2D10() + 20,
    agility: roll2D10() + 20,
    intelligence: roll2D10() + 20,
    willpower: roll2D10() + 20,
    fellowship: roll2D10() + 20,
    attacks: 1,
    fatePoints: 1,
    luckPoints: 1,
    wounds: getWoundsByRace(race?.id),
    movement: getMovementByRace(race?.id),
    magic: 0,
    insanityPoints: 0,
  };

  if (!race) return baseStats;

  return {
    ...baseStats,
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

// Rozszerzona funkcja z pełnym podziałem rzutów
export const rollDetailedCharacterStats = (
  race?: Race,
): Record<keyof CharacterStats, StatDetails> => {
  const result = {} as Record<keyof CharacterStats, StatDetails>;

  // Statystyki losowane (2D10 + 20 + bonus)
  const rollableStats: Array<keyof CharacterStats> = [
    'weaponSkill',
    'ballisticSkill',
    'strength',
    'toughness',
    'agility',
    'intelligence',
    'willpower',
    'fellowship',
  ];

  rollableStats.forEach((stat) => {
    const dice1 = rollD10();
    const dice2 = rollD10();
    const raceBonus = race?.statBonuses[stat] || 0;

    result[stat] = {
      base: 20,
      dice1,
      dice2,
      raceBonus,
      baseWithBonus: 20 + raceBonus,
      total: 20 + dice1 + dice2 + raceBonus,
    };
  });

  // Statystyki stałe
  const fixedStats = {
    attacks: { base: 1, dice1: 0, dice2: 0, raceBonus: 0, total: 1 },
    fatePoints: { base: 1, dice1: 0, dice2: 0, raceBonus: 0, total: 1 },
    luckPoints: { base: 1, dice1: 0, dice2: 0, raceBonus: 0, total: 1 },
    wounds: {
      base: 10,
      dice1: 0,
      dice2: 0,
      raceBonus: getWoundsByRace(race?.id) - 10,
      total: getWoundsByRace(race?.id),
    },
    movement: {
      base: 4,
      dice1: 0,
      dice2: 0,
      raceBonus: getMovementByRace(race?.id) - 4,
      total: getMovementByRace(race?.id),
    },
    magic: { base: 0, dice1: 0, dice2: 0, raceBonus: 0, total: 0 },
    insanityPoints: { base: 0, dice1: 0, dice2: 0, raceBonus: 0, total: 0 },
  };

  return { ...result, ...fixedStats };
};

// Funkcje formatujące
export const formatStatsForDisplay = (
  stats: CharacterStats,
  race?: Race,
): Array<{ label: string; value: number; bonus?: number }> => {
  return (Object.keys(STAT_NAMES) as Array<keyof CharacterStats>).map((key) => ({
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
      text: `${STAT_NAMES[stat]}: ${detail.total} = ${detail.base}${bonusText} + ${detail.dice1} + ${detail.dice2}`,
      details: detail,
    };
  });
};
