export type CharacterStats = {
  weaponSkill: number;
  ballisticSkill: number;
  strength: number;
  toughness: number;
  agility: number;
  intelligence: number;
  willpower: number;
  fellowship: number;
};

export const STAT_NAMES: Record<keyof CharacterStats, string> = {
  weaponSkill: 'Walka Wręcz (WW)',
  ballisticSkill: 'Umiejętności Strzeleckie (US)',
  strength: 'Krzepa (K)',
  toughness: 'Odporność (Odp)',
  agility: 'Zręczność (Zr)',
  intelligence: 'Inteligencja (Int)',
  willpower: 'Siła Woli (SW)',
  fellowship: 'Ogłada (Ogd)',
} as const;

export type Race = {
  id: string;
  name: string;
  description: string;
  statBonuses: Partial<CharacterStats>;
  availableProfessions: string[];
};

export type Character = {
  race?: Race;
  stats: CharacterStats;
};
