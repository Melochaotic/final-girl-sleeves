import { styleText } from "util";
import type { TableRow } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";
import { promtSleeveType } from "../utils/promts.mts";

export const description =
  "List all game titles; optionally filtered by `sleeveType`";

export default async function () {
  const sleeveType = await promtSleeveType(["All"] as const);
  const { rows } = parseCsv();

  const titleArr: string[] = [];
  for (const row of rows as TableRow[]) {
    if (
      sleeveType === "All" ||
      row[2].toLowerCase() === sleeveType.toLowerCase()
    ) {
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
