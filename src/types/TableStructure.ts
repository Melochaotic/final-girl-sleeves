export type TableRow = [
  number, // year
  GameTitle, // title
  SleeveType, // sleeveType
  number, // countStandard
  number, // countEuro
  number, // count70x121
  number, // count65x130
];

export const sleeveTypeArr = ["No", "Standard", "Premium", "Ryker"] as const;
export type SleeveType = (typeof sleeveTypeArr)[number];

export const gameTitleArr = [
  "A Demon in the Shadows",
  "A Knock at the Door",
  "A Rotten Harvest",
  "Accessories Box",
  "Bad Times at Buddyland",
  "Box of Props",
  "Carnage at the Carnival",
  "Core",
  "Don't Make a Sound",
  "Frightmare on Maple Lane",
  "Guest Stars",
  "Hell to Pay",
  "Into the Void",
  "Madness in the Dark",
  "Once Upon a Full Moon",
  "Panic at Station 2891",
  "Series 3 Bonus Features",
  "Shriek",
  "Slaughter in the Groves",
  "Terror from Above",
  "Terror from Destiny",
  "Terror from the Grave",
  "The Falconwood Files",
  "The Green Terror",
  "The Happy Trails Horror",
  "The Haunting of Creech Manor",
  "The Killer from Tomorrow",
  "The Marrek Murders",
  "The North Pole Nightmare",
  "The Raptor Games",
] as const;
export type GameTitle = (typeof gameTitleArr)[number];
