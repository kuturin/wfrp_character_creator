export type CharacterStats = {
  // Podstawowe statystyki
  weaponSkill: number;
  ballisticSkill: number;
  strength: number;
  toughness: number;
  agility: number;
  intelligence: number;
  willpower: number;
  fellowship: number;

  attacks: number; // Zawsze 1 (nie podlega losowaniu)
  fatePoints: number; // Zawsze 1
  luckPoints: number; // Równe punktom przeznaczenia
  wounds: number; // Stała wartość zależna od rasy
  movement: number; // 4 + modyfikator rasowy
  magic: number; // Zawsze 0
  insanityPoints: number; // Zawsze 0
};

export const STAT_NAMES = {
  weaponSkill: 'Walka Wręcz (WW)',
  ballisticSkill: 'Umiejętności Strzeleckie (US)',
  strength: 'Krzepa (K)',
  toughness: 'Odporność (Odp)',
  agility: 'Zręczność (Zr)',
  intelligence: 'Inteligencja (Int)',
  willpower: 'Siła Woli (SW)',
  fellowship: 'Ogłada (Ogd)',
  attacks: 'Liczba Ataków (A)',
  fatePoints: 'Punkty Przeznaczenia (PP)',
  luckPoints: 'Punkty Szczęścia (PS)',
  wounds: 'Żywotność (W)',
  movement: 'Szybkość (Sz)',
  magic: 'Magia (Mag)',
  insanityPoints: 'Punkty Obłedu (PO)',
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
