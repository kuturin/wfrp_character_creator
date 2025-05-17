/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Race } from '../types/warhammer';

export const RACES: Race[] = [
  {
    id: 'human',
    name: 'Człowiek',
    description: 'Wszechstronna rasa ze Starego Świata, ambitna i przedsiębiorcza',
    statBonuses: {},
    availableProfessions: ['Żołnierz', 'Łowca', 'Uczony', 'Rzemieślnik'],
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Wysocy i szlachetni mistrzowie łuku i magii',
    statBonuses: {
      ballisticSkill: +10, // +10 do Umiejętności Strzeleckich
      agility: +10, // +10 do Zręczności
    },
    availableProfessions: ['Łucznik', 'Mag', 'Zwiadowca', 'Artysta'],
  },
  {
    id: 'dwarf',
    name: 'Krasnolud',
    description: 'Niski i krzepki, mistrzowie walki wręcz i rzemiosła',
    statBonuses: {
      weaponSkill: +10, // +10 do Walki Wręcz
      toughness: +10, // +10 do Odporności
      agility: -10, // -10 do Zręczności
      fellowship: -10, // -10 do Ogłady
    },
    availableProfessions: ['Górnik', 'Kowal', 'Inżynier', 'Strażnik'],
  },
  {
    id: 'halfling',
    name: 'Niziołek',
    description: 'Niscy i zwinny ludek o niezwykłych talentach kulinarnych',
    statBonuses: {
      weaponSkill: -10, // -10 do Walki Wręcz
      ballisticSkill: +10, // +10 do Umiejętności Strzeleckich
      strength: -10, // -10 do Krzepy
      toughness: -10, // -10 do Siły Woli
      agility: +10, // +20 do Zręczności
      fellowship: +10, // +10 do Ogłady
    },
    availableProfessions: ['Kucharz', 'Zwiadowca', 'Łotrzyk', 'Handlarz'],
  },
];
