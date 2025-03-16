import { argv } from "process";
import { styleText } from "util";
import {
  confirmedSleeveType,
  type SleeveType,
} from "../types/TableStructure.ts";
import { parseCsv, saveAsCsv } from "../utils/csv.mts";
import { formatSleeveType, titleCase } from "../utils/formatting.mts";

export default function () {
  let hasChanged = false;
  const title: string = titleCase(argv[3]);
  const sleeveType: SleeveType = confirmedSleeveType(argv[4]);
  if (!title) throw new Error("NO TITLE GIVEN");

  const { colHeaders, rows } = parseCsv();

  rows.map((row) => {
    if (row[1] === titleCase(title) && row[2] !== titleCase(sleeveType)) {
      hasChanged = true;
      row[2] = sleeveType;
    }
    return row;
  });

  if (hasChanged) {
    saveAsCsv({ colHeaders, rows });
    console.log(
      styleText(["green"], "UPDATED:"),
      `"${title}" now has ${formatSleeveType(sleeveType)} sleeves`,
    );
  } else {
    console.log(
      styleText(["yellow"], "NO CHANGE:"),
      `"${title}" still has ${formatSleeveType(sleeveType)} sleeves`,
    );
  }
}
