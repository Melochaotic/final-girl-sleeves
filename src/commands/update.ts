import { styleText } from "util";
import { type SleeveType } from "../types/TableStructure.ts";
import { celebrate } from "../utils/confetti.mts";
import { isFullyRyker, parseCsv, saveAsCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";
import { promtGameTitle, promtSleeveType } from "../utils/promts.mts";

export default async function () {
  let hasChanged = false;
  const title = await promtGameTitle();
  const sleeveType: SleeveType = await promtSleeveType([]);

  const { colHeaders, rows } = parseCsv();

  rows.map((row) => {
    if (
      row[1].toLowerCase() === title.toLowerCase() &&
      row[2].toLowerCase() !== sleeveType.toLowerCase()
    ) {
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

    if (isFullyRyker(rows)) {
      await celebrate("You Ryker-sleeved the whole collection!");
    }
  } else {
    console.log(
      styleText(["yellow"], "NO CHANGE:"),
      `"${title}" still has ${formatSleeveType(sleeveType)} sleeves`,
    );
  }
}
