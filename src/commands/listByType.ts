import { argv } from "process";
import { styleText } from "util";
import type { SleeveType, TableRow } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";

export default function listByType() {
  const sleeveType = argv[3] as SleeveType;
  if (!sleeveType) throw new Error("NO SLEEVE TYPE GIVEN");

  const { rows } = parseCsv();

  const titleArr: string[] = [];
  for (const row of rows as TableRow[]) {
    if (row[2].toLowerCase() === sleeveType.toLowerCase()) {
      titleArr.push(row[1]); // title
    }
  }

  const formattedSleeveType = formatSleeveType(sleeveType);
  console.log(`${titleArr.length} games with ${formattedSleeveType} Sleeves`);
  console.log(`-----------------------------`);
  titleArr
    .sort()
    .forEach((title) => console.log(`* ${styleText(["yellow"], title)}`));
}
