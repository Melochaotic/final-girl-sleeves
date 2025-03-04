export type SleeveType = "No" | "Standard" | "Premium" | "Ryker";

export type TableStructure = [
  number, // year
  string, // title
  SleeveType, // sleeveType
  number?, // countStandard
  number?, // countEuro
  number?, // count70x121
  number?, // count65x130
];
