/* eslint-disable */

import { CharacterStats, Race, STAT_NAMES } from '../types/warhammer';

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

  // Zastosuj bonusy rasowe (uwzględniając ujemne wartości)
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
