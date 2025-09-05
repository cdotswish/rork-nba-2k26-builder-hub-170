import { Build, Review, BadgeRequirement, BadgeLevel, BadgeCategory, DetailedAttributes } from '@/types/build';

export const nba2k26BadgeRequirements: BadgeRequirement[] = [
  // FINISHING BADGES
  {
    name: 'Aerial Wizard',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ drivingDunk: 64 }, { standingDunk: 60 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ drivingDunk: 70 }, { standingDunk: 75 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ drivingDunk: 80 }, { standingDunk: 84 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ drivingDunk: 89 }, { standingDunk: 92 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ drivingDunk: 97 }, { standingDunk: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves ability to make spectacular dunks'
  },
  {
    name: 'Float Game',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ closeShot: 68 }, { drivingLayup: 65 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ closeShot: 78 }, { drivingLayup: 78 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ closeShot: 86 }, { drivingLayup: 88 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ closeShot: 92 }, { drivingLayup: 95 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ closeShot: 98 }, { drivingLayup: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves floater and runner shots in the paint'
  },
  {
    name: 'Hook Specialist',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ closeShot: 60, postControl: 61 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ closeShot: 75, postControl: 65 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ closeShot: 87, postControl: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ closeShot: 94, postControl: 90 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ closeShot: 99, postControl: 97 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves hook shot accuracy and effectiveness'
  },
  {
    name: 'Layup Mixmaster',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ drivingLayup: 75 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Silver: { attributes: [{ drivingLayup: 85 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Gold: { attributes: [{ drivingLayup: 93 }], heightRestriction: { min: "5'9", max: "6'11" } },
      'Hall of Fame': { attributes: [{ drivingLayup: 97 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Legend: { attributes: [{ drivingLayup: 99 }], heightRestriction: { min: "5'9", max: "6'11" } }
    },
    description: 'Improves variety and success of layup animations'
  },
  {
    name: 'Paint Prodigy',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ closeShot: 73 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Silver: { attributes: [{ closeShot: 84 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Gold: { attributes: [{ closeShot: 92 }], heightRestriction: { min: "6'3", max: "7'4" } },
      'Hall of Fame': { attributes: [{ closeShot: 96 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Legend: { attributes: [{ closeShot: 99 }], heightRestriction: { min: "6'3", max: "7'4" } }
    },
    description: 'Improves close-range shots for bigger players'
  },
  {
    name: 'Physical Finisher',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ strength: 60, drivingLayup: 70 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ strength: 67, drivingLayup: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ strength: 75, drivingLayup: 90 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ strength: 83, drivingLayup: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ strength: 97, drivingLayup: 97 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Increases success rate of contact layups and dunks'
  },
  {
    name: 'Post Fade Phenom',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ postControl: 60, midRangeShot: 61 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ postControl: 70, midRangeShot: 71 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ postControl: 79, midRangeShot: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ postControl: 84, midRangeShot: 90 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ postControl: 90, midRangeShot: 94 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves post fadeaway shots'
  },
  {
    name: 'Post Powerhouse',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ postControl: 64, strength: 70 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Silver: { attributes: [{ postControl: 75, strength: 79 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Gold: { attributes: [{ postControl: 85, strength: 86 }], heightRestriction: { min: "6'4", max: "7'4" } },
      'Hall of Fame': { attributes: [{ postControl: 93, strength: 95 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Legend: { attributes: [{ postControl: 98, strength: 96 }], heightRestriction: { min: "6'4", max: "7'4" } }
    },
    description: 'Improves post moves and power for big players'
  },
  {
    name: 'Post-Up Poet',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ postControl: 67 }], heightRestriction: { min: "6'0", max: "7'4" } },
      Silver: { attributes: [{ postControl: 77 }], heightRestriction: { min: "6'0", max: "7'4" } },
      Gold: { attributes: [{ postControl: 87 }], heightRestriction: { min: "6'0", max: "7'4" } },
      'Hall of Fame': { attributes: [{ postControl: 95 }], heightRestriction: { min: "6'0", max: "7'4" } },
      Legend: { attributes: [{ postControl: 99 }], heightRestriction: { min: "6'0", max: "7'4" } }
    },
    description: 'Improves post move variety and effectiveness'
  },
  {
    name: 'Posterizer',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ drivingDunk: 73, vertical: 65 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ drivingDunk: 87, vertical: 75 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ drivingDunk: 93, vertical: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ drivingDunk: 96, vertical: 85 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ drivingDunk: 99, vertical: 90 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Increases success rate of dunks on defenders'
  },
  {
    name: 'Rise Up',
    category: 'Finishing',
    requirements: {
      Bronze: { attributes: [{ standingDunk: 72, vertical: 60 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Silver: { attributes: [{ standingDunk: 81, vertical: 62 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Gold: { attributes: [{ standingDunk: 90, vertical: 66 }], heightRestriction: { min: "6'6", max: "7'4" } },
      'Hall of Fame': { attributes: [{ standingDunk: 95, vertical: 69 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Legend: { attributes: [{ standingDunk: 99, vertical: 71 }], heightRestriction: { min: "6'6", max: "7'4" } }
    },
    description: 'Improves standing dunk success for tall players'
  },

  // SHOOTING BADGES
  {
    name: 'Deadeye',
    category: 'Shooting',
    requirements: {
      Bronze: { attributes: [{ midRangeShot: 73, threePointShot: 73 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ midRangeShot: 85, threePointShot: 85 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ midRangeShot: 92, threePointShot: 92 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ midRangeShot: 95, threePointShot: 95 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ midRangeShot: 99, threePointShot: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Reduces the impact of a defender closing out'
  },
  {
    name: 'Limitless Range',
    category: 'Shooting',
    requirements: {
      Bronze: { attributes: [{ threePointShot: 83 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ threePointShot: 89 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ threePointShot: 93 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ threePointShot: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ threePointShot: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Extends shooting range and improves deep shot accuracy'
  },
  {
    name: 'Mini Marksman',
    category: 'Shooting',
    requirements: {
      Bronze: { attributes: [{ midRangeShot: 71, threePointShot: 71 }], heightRestriction: { min: "5'9", max: "6'3" } },
      Silver: { attributes: [{ midRangeShot: 82, threePointShot: 82 }], heightRestriction: { min: "5'9", max: "6'3" } },
      Gold: { attributes: [{ midRangeShot: 94, threePointShot: 94 }], heightRestriction: { min: "5'9", max: "6'3" } },
      'Hall of Fame': { attributes: [{ midRangeShot: 97, threePointShot: 97 }], heightRestriction: { min: "5'9", max: "6'3" } },
      Legend: { attributes: [{ midRangeShot: 99, threePointShot: 99 }], heightRestriction: { min: "5'9", max: "6'3" } }
    },
    description: 'Improves shooting for smaller players'
  },
  {
    name: 'Set Shot Specialist',
    category: 'Shooting',
    requirements: {
      Bronze: { attributes: [{ midRangeShot: 65, threePointShot: 65 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ midRangeShot: 78, threePointShot: 78 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ midRangeShot: 89, threePointShot: 89 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ midRangeShot: 93, threePointShot: 95 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ midRangeShot: 98, threePointShot: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves shots taken without dribbling'
  },
  {
    name: 'Shifty Shooter',
    category: 'Shooting',
    requirements: {
      Bronze: { attributes: [{ midRangeShot: 76, threePointShot: 76 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Silver: { attributes: [{ midRangeShot: 87, threePointShot: 87 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Gold: { attributes: [{ midRangeShot: 91, threePointShot: 91 }], heightRestriction: { min: "5'9", max: "6'11" } },
      'Hall of Fame': { attributes: [{ midRangeShot: 96, threePointShot: 96 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Legend: { attributes: [{ midRangeShot: 99, threePointShot: 99 }], heightRestriction: { min: "5'9", max: "6'11" } }
    },
    description: 'Improves shots off the dribble'
  },

  // PLAYMAKING BADGES
  {
    name: 'Ankle Assassin',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ ballHandle: 75 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Silver: { attributes: [{ ballHandle: 86 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Gold: { attributes: [{ ballHandle: 93 }], heightRestriction: { min: "5'9", max: "6'10" } },
      'Hall of Fame': { attributes: [{ ballHandle: 95 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Legend: { attributes: [{ ballHandle: 98 }], heightRestriction: { min: "5'9", max: "6'10" } }
    },
    description: 'Increases chance of breaking ankles with dribble moves'
  },
  {
    name: 'Bail Out',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ passAccuracy: 85 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ passAccuracy: 91 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ passAccuracy: 94 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ passAccuracy: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ passAccuracy: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves passing out of shots and bad situations'
  },
  {
    name: 'Break Starter',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ passAccuracy: 65 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ passAccuracy: 75 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ passAccuracy: 87 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ passAccuracy: 93 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ passAccuracy: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves outlet passes to start fast breaks'
  },
  {
    name: 'Dimer',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ passAccuracy: 55 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ passAccuracy: 71 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ passAccuracy: 82 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ passAccuracy: 92 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ passAccuracy: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Boosts teammates shooting after receiving a pass'
  },
  {
    name: 'Handles for Days',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ ballHandle: 71 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Silver: { attributes: [{ ballHandle: 81 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Gold: { attributes: [{ ballHandle: 90 }], heightRestriction: { min: "5'9", max: "7'0" } },
      'Hall of Fame': { attributes: [{ ballHandle: 94 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Legend: { attributes: [{ ballHandle: 97 }], heightRestriction: { min: "5'9", max: "7'0" } }
    },
    description: 'Reduces stamina loss when dribbling'
  },
  {
    name: 'Lightning Launch',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ speedWithBall: 68 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Silver: { attributes: [{ speedWithBall: 75 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Gold: { attributes: [{ speedWithBall: 86 }], heightRestriction: { min: "5'9", max: "6'11" } },
      'Hall of Fame': { attributes: [{ speedWithBall: 91 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Legend: { attributes: [{ speedWithBall: 94 }], heightRestriction: { min: "5'9", max: "6'11" } }
    },
    description: 'Improves first step speed with the ball'
  },
  {
    name: 'Strong Handle',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ ballHandle: 60, strength: 60 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Silver: { attributes: [{ ballHandle: 67, strength: 65 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Gold: { attributes: [{ ballHandle: 73, strength: 73 }], heightRestriction: { min: "5'9", max: "6'11" } },
      'Hall of Fame': { attributes: [{ ballHandle: 77, strength: 84 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Legend: { attributes: [{ ballHandle: 80, strength: 93 }], heightRestriction: { min: "5'9", max: "6'11" } }
    },
    description: 'Improves ball security against stronger defenders'
  },
  {
    name: 'Unpluckable',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ ballHandle: 70 }, { postControl: 75 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ ballHandle: 80 }, { postControl: 86 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ ballHandle: 92 }, { postControl: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ ballHandle: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ ballHandle: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Reduces chance of getting stripped'
  },
  {
    name: 'Versatile Visionary',
    category: 'Playmaking',
    requirements: {
      Bronze: { attributes: [{ passAccuracy: 70 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ passAccuracy: 76 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ passAccuracy: 84 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ passAccuracy: 95 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ passAccuracy: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves passing from various positions and angles'
  },

  // DEFENSE/REBOUNDING BADGES
  {
    name: 'Challenger',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ perimeterDefense: 71 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Silver: { attributes: [{ perimeterDefense: 82 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Gold: { attributes: [{ perimeterDefense: 92 }], heightRestriction: { min: "5'9", max: "6'11" } },
      'Hall of Fame': { attributes: [{ perimeterDefense: 95 }], heightRestriction: { min: "5'9", max: "6'11" } },
      Legend: { attributes: [{ perimeterDefense: 99 }], heightRestriction: { min: "5'9", max: "6'11" } }
    },
    description: 'Improves ability to contest shots effectively'
  },
  {
    name: 'Glove',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ steal: 67 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Silver: { attributes: [{ steal: 79 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Gold: { attributes: [{ steal: 91 }], heightRestriction: { min: "5'9", max: "7'0" } },
      'Hall of Fame': { attributes: [{ steal: 96 }], heightRestriction: { min: "5'9", max: "7'0" } },
      Legend: { attributes: [{ steal: 99 }], heightRestriction: { min: "5'9", max: "7'0" } }
    },
    description: 'Improves steal success rate and strip attempts'
  },
  {
    name: 'High-Flying Denier',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ block: 68, vertical: 60 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Silver: { attributes: [{ block: 78, vertical: 74 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Gold: { attributes: [{ block: 88, vertical: 80 }], heightRestriction: { min: "6'3", max: "7'4" } },
      'Hall of Fame': { attributes: [{ block: 92, vertical: 83 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Legend: { attributes: [{ block: 99, vertical: 85 }], heightRestriction: { min: "6'3", max: "7'4" } }
    },
    description: 'Improves shot blocking for athletic big men'
  },
  {
    name: 'Immovable Enforcer',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ perimeterDefense: 62, strength: 71 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ perimeterDefense: 72, strength: 82 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ perimeterDefense: 84, strength: 85 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ perimeterDefense: 89, strength: 91 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ perimeterDefense: 94, strength: 92 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves ability to absorb contact and maintain position'
  },
  {
    name: 'Interceptor',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ steal: 60 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ steal: 73 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ steal: 85 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ steal: 94 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ steal: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Increases steal success rate and pass deflections'
  },
  {
    name: 'Off-Ball Pest',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ interiorDefense: 69 }, { perimeterDefense: 58 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ interiorDefense: 76 }, { perimeterDefense: 68 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ interiorDefense: 85 }, { perimeterDefense: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ interiorDefense: 94 }, { perimeterDefense: 87 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ interiorDefense: 97 }, { perimeterDefense: 98 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Improves defense away from the ball'
  },
  {
    name: 'On-Ball Menace',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ perimeterDefense: 74, agility: 70 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Silver: { attributes: [{ perimeterDefense: 85, agility: 76 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Gold: { attributes: [{ perimeterDefense: 91, agility: 80 }], heightRestriction: { min: "5'9", max: "6'9" } },
      'Hall of Fame': { attributes: [{ perimeterDefense: 96, agility: 84 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Legend: { attributes: [{ perimeterDefense: 99, agility: 86 }], heightRestriction: { min: "5'9", max: "6'9" } }
    },
    description: 'Improves on-ball defense and staying in front of ball handler'
  },
  {
    name: 'Paint Patroller',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ interiorDefense: 60, block: 74 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Silver: { attributes: [{ interiorDefense: 70, block: 84 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Gold: { attributes: [{ interiorDefense: 77, block: 93 }], heightRestriction: { min: "6'6", max: "7'4" } },
      'Hall of Fame': { attributes: [{ interiorDefense: 84, block: 97 }], heightRestriction: { min: "6'6", max: "7'4" } },
      Legend: { attributes: [{ interiorDefense: 89, block: 99 }], heightRestriction: { min: "6'6", max: "7'4" } }
    },
    description: 'Improves paint defense and rim protection'
  },
  {
    name: 'Pick Dodger',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ perimeterDefense: 73, agility: 71 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Silver: { attributes: [{ perimeterDefense: 83, agility: 75 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Gold: { attributes: [{ perimeterDefense: 90, agility: 79 }], heightRestriction: { min: "5'9", max: "6'10" } },
      'Hall of Fame': { attributes: [{ perimeterDefense: 97, agility: 85 }], heightRestriction: { min: "5'9", max: "6'10" } },
      Legend: { attributes: [{ perimeterDefense: 99, agility: 92 }], heightRestriction: { min: "5'9", max: "6'10" } }
    },
    description: 'Improves ability to navigate through screens'
  },
  {
    name: 'Post Lockdown',
    category: 'Defense',
    requirements: {
      Bronze: { attributes: [{ interiorDefense: 74, strength: 70 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Silver: { attributes: [{ interiorDefense: 82, strength: 78 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Gold: { attributes: [{ interiorDefense: 88, strength: 84 }], heightRestriction: { min: "6'5", max: "7'4" } },
      'Hall of Fame': { attributes: [{ interiorDefense: 93, strength: 92 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Legend: { attributes: [{ interiorDefense: 99, strength: 97 }], heightRestriction: { min: "6'5", max: "7'4" } }
    },
    description: 'Improves post defense against bigger players'
  },

  // REBOUNDING BADGES
  {
    name: 'Boxout Beast',
    category: 'Rebounding',
    requirements: {
      Bronze: { attributes: [{ offensiveRebound: 55, defensiveRebound: 55 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Silver: { attributes: [{ offensiveRebound: 70, defensiveRebound: 70 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Gold: { attributes: [{ offensiveRebound: 85, defensiveRebound: 85 }], heightRestriction: { min: "6'3", max: "7'4" } },
      'Hall of Fame': { attributes: [{ offensiveRebound: 94, defensiveRebound: 94 }], heightRestriction: { min: "6'3", max: "7'4" } },
      Legend: { attributes: [{ offensiveRebound: 98, defensiveRebound: 98 }], heightRestriction: { min: "6'3", max: "7'4" } }
    },
    description: 'Improves ability to box out opponents and secure rebounds'
  },
  {
    name: 'Rebound Chaser',
    category: 'Rebounding',
    requirements: {
      Bronze: { attributes: [{ offensiveRebound: 60, defensiveRebound: 60 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Silver: { attributes: [{ offensiveRebound: 80, defensiveRebound: 80 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Gold: { attributes: [{ offensiveRebound: 92, defensiveRebound: 92 }], heightRestriction: { min: "5'9", max: "7'4" } },
      'Hall of Fame': { attributes: [{ offensiveRebound: 96, defensiveRebound: 96 }], heightRestriction: { min: "5'9", max: "7'4" } },
      Legend: { attributes: [{ offensiveRebound: 99, defensiveRebound: 99 }], heightRestriction: { min: "5'9", max: "7'4" } }
    },
    description: 'Increases hustle and pursuit of rebounds'
  },

  // ALL-AROUND BADGES
  {
    name: 'Brick Wall',
    category: 'All-Around',
    requirements: {
      Bronze: { attributes: [{ strength: 72 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Silver: { attributes: [{ strength: 83 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Gold: { attributes: [{ strength: 91 }], heightRestriction: { min: "6'5", max: "7'4" } },
      'Hall of Fame': { attributes: [{ strength: 95 }], heightRestriction: { min: "6'5", max: "7'4" } },
      Legend: { attributes: [{ strength: 99 }], heightRestriction: { min: "6'5", max: "7'4" } }
    },
    description: 'Improves ability to set solid screens and absorb contact'
  },
  {
    name: 'Slippery Off-Ball',
    category: 'All-Around',
    requirements: {
      Bronze: { attributes: [{ speed: 57, agility: 57 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Silver: { attributes: [{ speed: 73, agility: 65 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Gold: { attributes: [{ speed: 85, agility: 77 }], heightRestriction: { min: "5'9", max: "6'9" } },
      'Hall of Fame': { attributes: [{ speed: 92, agility: 88 }], heightRestriction: { min: "5'9", max: "6'9" } },
      Legend: { attributes: [{ speed: 99, agility: 96 }], heightRestriction: { min: "5'9", max: "6'9" } }
    },
    description: 'Improves movement and getting open without the ball'
  },
  {
    name: 'Pogo Stick',
    category: 'All-Around',
    requirements: {
      Bronze: { attributes: [{ vertical: 63 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Silver: { attributes: [{ vertical: 70 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Gold: { attributes: [{ vertical: 77 }], heightRestriction: { min: "6'4", max: "7'4" } },
      'Hall of Fame': { attributes: [{ vertical: 83 }], heightRestriction: { min: "6'4", max: "7'4" } },
      Legend: { attributes: [{ vertical: 88 }], heightRestriction: { min: "6'4", max: "7'4" } }
    },
    description: 'Improves ability to jump multiple times quickly'
  }
];


export const mockBuilds: Build[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'KobeForever24',
    name: 'Elite Playmaker',
    position: 'PG',
    height: "6'2\"",
    weight: 185,
    wingspan: "6'7\"",
    archetype: '3-Level Playmaker',
    badges: [
      { name: 'Ankle Breaker', level: 'Hall of Fame', category: 'Playmaking' },
      { name: 'Deadeye', level: 'Gold', category: 'Shooting' },
      { name: 'Quick First Step', level: 'Hall of Fame', category: 'Playmaking' },
      { name: 'Clamps', level: 'Silver', category: 'Defense' },
    ],
    attributes: {
      finishing: 78,
      shooting: 85,
      playmaking: 92,
      defense: 71,
      physicals: 84,
    },
    detailedAttributes: {
      // Finishing
      closeShot: 82,
      drivingLayup: 88,
      drivingDunk: 75,
      standingDunk: 65,
      postControl: 45,
      // Shooting
      midRangeShot: 85,
      threePointShot: 88,
      freeThrow: 82,
      // Playmaking
      passAccuracy: 95,
      ballHandle: 96,
      speedWithBall: 85,
      // Defense
      interiorDefense: 45,
      perimeterDefense: 82,
      steal: 78,
      block: 35,
      // Rebounding
      offensiveRebound: 25,
      defensiveRebound: 45,
      // Physicals
      speed: 88,
      agility: 92,
      strength: 65,
      vertical: 78,
      stamina: 95,
    },
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    rating: 4.8,
    reviewCount: 234,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'LeBronJames23',
    name: 'Paint Beast',
    position: 'C',
    height: "7'0\"",
    weight: 270,
    wingspan: "7'6\"",
    archetype: 'Interior Force',
    badges: [
      { name: 'Backdown Punisher', level: 'Hall of Fame', category: 'Finishing' },
      { name: 'Rim Protector', level: 'Hall of Fame', category: 'Defense' },
      { name: 'Rebound Chaser', level: 'Gold', category: 'Defense' },
      { name: 'Post Spin Technician', level: 'Gold', category: 'Finishing' },
    ],
    attributes: {
      finishing: 95,
      shooting: 45,
      playmaking: 62,
      defense: 93,
      physicals: 91,
    },
    detailedAttributes: {
      // Finishing
      closeShot: 95,
      drivingLayup: 88,
      drivingDunk: 99,
      standingDunk: 99,
      postControl: 92,
      // Shooting
      midRangeShot: 55,
      threePointShot: 25,
      freeThrow: 65,
      // Playmaking
      passAccuracy: 75,
      ballHandle: 35,
      speedWithBall: 25,
      // Defense
      interiorDefense: 99,
      perimeterDefense: 75,
      steal: 65,
      block: 99,
      // Rebounding
      offensiveRebound: 95,
      defensiveRebound: 99,
      // Physicals
      speed: 65,
      agility: 55,
      strength: 99,
      vertical: 85,
      stamina: 92,
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800',
    rating: 4.6,
    reviewCount: 189,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'CurryRange30',
    name: 'Sharpshooter God',
    position: 'SG',
    height: "6'5\"",
    weight: 195,
    wingspan: "6'9\"",
    archetype: 'Spot Up Precision',
    badges: [
      { name: 'Limitless Range', level: 'Hall of Fame', category: 'Shooting' },
      { name: 'Catch & Shoot', level: 'Hall of Fame', category: 'Shooting' },
      { name: 'Green Machine', level: 'Gold', category: 'Shooting' },
      { name: 'Deadeye', level: 'Hall of Fame', category: 'Shooting' },
    ],
    attributes: {
      finishing: 68,
      shooting: 96,
      playmaking: 75,
      defense: 65,
      physicals: 78,
    },
    detailedAttributes: {
      // Finishing
      closeShot: 78,
      drivingLayup: 72,
      drivingDunk: 65,
      standingDunk: 55,
      postControl: 35,
      // Shooting
      midRangeShot: 96,
      threePointShot: 99,
      freeThrow: 92,
      // Playmaking
      passAccuracy: 82,
      ballHandle: 75,
      speedWithBall: 68,
      // Defense
      interiorDefense: 35,
      perimeterDefense: 78,
      steal: 72,
      block: 25,
      // Rebounding
      offensiveRebound: 35,
      defensiveRebound: 55,
      // Physicals
      speed: 82,
      agility: 85,
      strength: 55,
      vertical: 72,
      stamina: 88,
    },
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800',
    rating: 4.9,
    reviewCount: 412,
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'GiannisFreak34',
    name: 'Two-Way Slasher',
    position: 'SF',
    height: "6'8\"",
    weight: 225,
    wingspan: "7'1\"",
    archetype: 'Slashing Playmaker',
    badges: [
      { name: 'Posterizer', level: 'Hall of Fame', category: 'Finishing' },
      { name: 'Slithery', level: 'Gold', category: 'Finishing' },
      { name: 'Clamps', level: 'Gold', category: 'Defense' },
      { name: 'Chase Down Artist', level: 'Gold', category: 'Defense' },
    ],
    attributes: {
      finishing: 88,
      shooting: 72,
      playmaking: 78,
      defense: 85,
      physicals: 89,
    },
    detailedAttributes: {
      // Finishing
      closeShot: 85,
      drivingLayup: 92,
      drivingDunk: 95,
      standingDunk: 88,
      postControl: 75,
      // Shooting
      midRangeShot: 78,
      threePointShot: 68,
      freeThrow: 72,
      // Playmaking
      passAccuracy: 82,
      ballHandle: 78,
      speedWithBall: 75,
      // Defense
      interiorDefense: 82,
      perimeterDefense: 88,
      steal: 85,
      block: 85,
      // Rebounding
      offensiveRebound: 75,
      defensiveRebound: 82,
      // Physicals
      speed: 88,
      agility: 92,
      strength: 85,
      vertical: 92,
      stamina: 89,
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800',
    rating: 4.7,
    reviewCount: 156,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'DuncanFundamentals',
    name: 'Stretch Four',
    position: 'PF',
    height: "6'10\"",
    weight: 240,
    wingspan: "7'3\"",
    archetype: 'Stretch Glass Cleaner',
    badges: [
      { name: 'Corner Specialist', level: 'Hall of Fame', category: 'Shooting' },
      { name: 'Box', level: 'Gold', category: 'Defense' },
      { name: 'Brick Wall', level: 'Gold', category: 'Defense' },
      { name: 'Pick & Popper', level: 'Gold', category: 'Shooting' },
    ],
    attributes: {
      finishing: 75,
      shooting: 88,
      playmaking: 68,
      defense: 82,
      physicals: 85,
    },
    detailedAttributes: {
      // Finishing
      closeShot: 82,
      drivingLayup: 68,
      drivingDunk: 75,
      standingDunk: 85,
      postControl: 88,
      // Shooting
      midRangeShot: 88,
      threePointShot: 85,
      freeThrow: 92,
      // Playmaking
      passAccuracy: 75,
      ballHandle: 45,
      speedWithBall: 35,
      // Defense
      interiorDefense: 88,
      perimeterDefense: 72,
      steal: 65,
      block: 92,
      // Rebounding
      offensiveRebound: 85,
      defensiveRebound: 92,
      // Physicals
      speed: 68,
      agility: 72,
      strength: 92,
      vertical: 78,
      stamina: 85,
    },
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800',
    rating: 4.5,
    reviewCount: 98,
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    buildId: '1',
    userId: 'user10',
    userName: 'HoopDreams',
    rating: 5,
    comment: 'Best PG build I\'ve used! The playmaking is insane and can still knock down shots.',
    createdAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'r2',
    buildId: '1',
    userId: 'user11',
    userName: 'ProPlayer2K',
    rating: 4,
    comment: 'Great build but struggles a bit on defense against bigger guards.',
    createdAt: '2024-01-16T11:00:00Z',
  },
  {
    id: 'r3',
    buildId: '3',
    userId: 'user12',
    userName: 'SniperElite',
    rating: 5,
    comment: 'If you can time your shots, this build is unstoppable from deep!',
    createdAt: '2024-01-15T10:00:00Z',
  },
];

// Badge Calculator Utility Functions
export const calculateAvailableBadges = (
  detailedAttributes: Partial<DetailedAttributes>,
  height: string
): { badge: BadgeRequirement; availableLevels: BadgeLevel[] }[] => {
  return nba2k26BadgeRequirements.map(badge => {
    const availableLevels: BadgeLevel[] = [];
    
    const levels: BadgeLevel[] = ['Bronze', 'Silver', 'Gold', 'Hall of Fame', 'Legend'];
    
    for (const level of levels) {
      const requirement = badge.requirements[level as keyof typeof badge.requirements];
      if (!requirement) continue;
      
      // Check height restrictions
      if (requirement.heightRestriction) {
        const playerHeightInches = convertHeightToInches(height);
        if (requirement.heightRestriction.min) {
          const minInches = convertHeightToInches(requirement.heightRestriction.min);
          if (playerHeightInches < minInches) continue;
        }
        if (requirement.heightRestriction.max) {
          const maxInches = convertHeightToInches(requirement.heightRestriction.max);
          if (playerHeightInches > maxInches) continue;
        }
      }
      
      // Check attribute requirements (OR logic between different attribute combinations)
      const meetsRequirements = requirement.attributes.some((attrCombo: { [key: string]: number }) => {
        return Object.entries(attrCombo).every(([attrName, requiredValue]) => {
          const playerValue = detailedAttributes[attrName as keyof DetailedAttributes] || 0;
          return playerValue >= (requiredValue as number);
        });
      });
      
      if (meetsRequirements) {
        availableLevels.push(level);
      }
    }
    
    return { badge, availableLevels };
  }).filter(result => result.availableLevels.length > 0);
};

const convertHeightToInches = (height: string): number => {
  const match = height.match(/(\d+)'(\d+)"?/);
  if (!match) return 0;
  const feet = parseInt(match[1]);
  const inches = parseInt(match[2]);
  return feet * 12 + inches;
};

export const getHighestBadgeLevel = (availableLevels: BadgeLevel[]): BadgeLevel | null => {
  const levelOrder: BadgeLevel[] = ['Bronze', 'Silver', 'Gold', 'Hall of Fame', 'Legend'];
  for (let i = levelOrder.length - 1; i >= 0; i--) {
    if (availableLevels.includes(levelOrder[i])) {
      return levelOrder[i];
    }
  }
  return null;
};

export const getBadgesByCategory = (category: BadgeCategory): BadgeRequirement[] => {
  return nba2k26BadgeRequirements.filter(badge => badge.category === category);
};

export const searchBadges = (query: string): BadgeRequirement[] => {
  const lowercaseQuery = query.toLowerCase();
  return nba2k26BadgeRequirements.filter(badge => 
    badge.name.toLowerCase().includes(lowercaseQuery) ||
    badge.description?.toLowerCase().includes(lowercaseQuery)
  );
};