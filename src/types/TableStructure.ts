export const sleeveTypeArr = ["No", "Standard", "Premium", "Ryker"] as const;
export type SleeveType = (typeof sleeveTypeArr)[number];

export type TableRow = [
  string, // year
  string, // title
  SleeveType, // sleeveType
  string, // countStandard
  string, // countEuro
  string, // count70x121
  string, // count65x130
];
