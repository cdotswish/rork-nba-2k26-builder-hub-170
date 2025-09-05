export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export interface Build {
  id: string;
  userId: string;
  userName: string;
  name: string;
  position: Position;
  height: string; // e.g., "6'3"
  weight: number; // in lbs
  wingspan: string; // e.g., "6'8"
  archetype: string; // e.g., "3-Level Scorer"
  badges: Badge[];
  attributes: Attributes;
  detailedAttributes: DetailedAttributes;
  videoUrl?: string;
  thumbnailUrl?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type BadgeLevel = 'Bronze' | 'Silver' | 'Gold' | 'Hall of Fame' | 'Legend';
export type BadgeCategory = 'Finishing' | 'Shooting' | 'Playmaking' | 'Defense' | 'Rebounding' | 'All-Around';

export interface Badge {
  name: string;
  level: BadgeLevel;
  category: BadgeCategory;
}

export interface BadgeRequirement {
  name: string;
  category: BadgeCategory;
  requirements: {
    [key in BadgeLevel]?: {
      attributes: { [key: string]: number }[];
      heightRestriction?: {
        min?: string;
        max?: string;
      };
    };
  };
  description?: string;
}

export interface DetailedAttributes {
  // Finishing
  closeShot: number;
  drivingLayup: number;
  drivingDunk: number;
  standingDunk: number;
  postControl: number;
  
  // Shooting
  midRangeShot: number;
  threePointShot: number;
  freeThrow: number;
  
  // Playmaking
  passAccuracy: number;
  ballHandle: number;
  speedWithBall: number;
  
  // Defense
  interiorDefense: number;
  perimeterDefense: number;
  steal: number;
  block: number;
  
  // Rebounding
  offensiveRebound: number;
  defensiveRebound: number;
  
  // Physicals
  speed: number;
  agility: number;
  strength: number;
  vertical: number;
  stamina: number;
}

export type AttributeCategory = 'finishing' | 'shooting' | 'playmaking' | 'defense' | 'rebounding' | 'physicals';

export interface AttributeGroup {
  name: string;
  attributes: (keyof DetailedAttributes)[];
}

export const ATTRIBUTE_GROUPS: Record<AttributeCategory, AttributeGroup> = {
  finishing: {
    name: 'Finishing',
    attributes: ['closeShot', 'drivingLayup', 'drivingDunk', 'standingDunk', 'postControl']
  },
  shooting: {
    name: 'Shooting',
    attributes: ['midRangeShot', 'threePointShot', 'freeThrow']
  },
  playmaking: {
    name: 'Playmaking',
    attributes: ['passAccuracy', 'ballHandle', 'speedWithBall']
  },
  defense: {
    name: 'Defense',
    attributes: ['interiorDefense', 'perimeterDefense', 'steal', 'block']
  },
  rebounding: {
    name: 'Rebounding',
    attributes: ['offensiveRebound', 'defensiveRebound']
  },
  physicals: {
    name: 'Physicals',
    attributes: ['speed', 'agility', 'strength', 'vertical', 'stamina']
  }
};

export const DEFAULT_DETAILED_ATTRIBUTES: DetailedAttributes = {
  // Finishing
  closeShot: 0,
  drivingLayup: 0,
  drivingDunk: 0,
  standingDunk: 0,
  postControl: 0,
  
  // Shooting
  midRangeShot: 0,
  threePointShot: 0,
  freeThrow: 0,
  
  // Playmaking
  passAccuracy: 0,
  ballHandle: 0,
  speedWithBall: 0,
  
  // Defense
  interiorDefense: 0,
  perimeterDefense: 0,
  steal: 0,
  block: 0,
  
  // Rebounding
  offensiveRebound: 0,
  defensiveRebound: 0,
  
  // Physicals
  speed: 0,
  agility: 0,
  strength: 0,
  vertical: 0,
  stamina: 99,
};

export interface Attributes {
  finishing: number;
  shooting: number;
  playmaking: number;
  defense: number;
  physicals: number;
}

export interface BuildWithDetailedAttributes extends Omit<Build, 'attributes'> {
  attributes: Attributes;
  detailedAttributes?: DetailedAttributes;
}

export interface Review {
  id: string;
  buildId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  builds: string[]; // build IDs
}