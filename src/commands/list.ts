import { argv } from "process";
import { styleText } from "util";
import type { SleeveType, TableRow } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";

export default function () {
  const sleeveType = argv[3] as SleeveType;
  const { rows } = parseCsv();

  const titleArr: string[] = [];
  for (const row of rows as TableRow[]) {
    if (!sleeveType || row[2].toLowerCase() === sleeveType.toLowerCase()) {
      titleArr.push(row[1]); // title
    }
  }

  const sleeveTypeText = sleeveType
    ? ` with ${formatSleeveType(sleeveType)} sleeeves`
    : "";
  console.log(`${titleArr.length} game boxes${sleeveTypeText}:`);
  console.log(`-----------------------------`);
  titleArr
    .sort()
    .forEach((title) => console.log(`* ${styleText(["yellow"], title)}`));
}
