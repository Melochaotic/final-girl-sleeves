export type SleeveType = "No" | "Standard" | "Premium" | "Ryker";

export type TableStructure = [
  string, // year
  string, // title
  SleeveType, // sleeveType
  string?, // countStandard
  string?, // countEuro
  string?, // count70x121
  string?, // count65x130
];
