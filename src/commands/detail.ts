import { exit } from "process";
import { styleText } from "util";
import type { TableRow } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";
import { promtGameTitle } from "../utils/promts.mts";

export const description = "Show details for given title";

export default async function () {
  const searchTitle = await promtGameTitle();

  const { rows } = parseCsv();

  for (const [
    year,
    title,
    sleeveType,
    countEuro,
    countStandard,
    count70x121,
    count65x130,
  ] of rows as TableRow[]) {
    if (title.toLowerCase() === searchTitle.toLowerCase()) {
      const formattedSleeveType = formatSleeveType(sleeveType);
      console.log(
        `The "${title}" box was released in ${year}.\nIt currently has ${formattedSleeveType} sleeves.\n\n` +
          `Type     | Count\n` +
          `---------|-------\n` +
          `${styleText(["yellow"], "Standard")} | ${countStandard || "-"}\n` +
          `${styleText(["yellow"], "Euro")}     | ${countEuro || "-"}\n` +
          `${styleText(["yellow"], "70*121")}   | ${count70x121 || "-"}\n` +
          `${styleText(["yellow"], "65*130")}   | ${count65x130 || "-"}`,
      );
      exit();
    }
  }

  throw new Error(`No record found for title: "${searchTitle}"`);
}
