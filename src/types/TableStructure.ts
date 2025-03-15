const sleeveTypeArr = ["No", "Standard", "Premium", "Ryker"] as const;

export type SleeveType = (typeof sleeveTypeArr)[number];
export const confirmedSleeveType = (value: string): SleeveType => {
  if (sleeveTypeArr.includes(value as SleeveType)) {
    return value as SleeveType;
  } else {
    throw Error("SLEEVE TYPE INVALID");
  }
};

export type TableRow = [
  string, // year
  string, // title
  SleeveType, // sleeveType
  string, // countStandard
  string, // countEuro
  string, // count70x121
  string, // count65x130
];
