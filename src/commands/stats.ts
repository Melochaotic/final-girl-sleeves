import { styleText } from "util";
import { SleeveType } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatPercentage, formatSleeveType } from "../utils/formatting.mts";

export const description = "Show current statistics of sleeving";

type CountByType = {
  [key in SleeveType]: number;
};

export default function () {
  let output = "";
  let total = 0;
  const { rows } = parseCsv();
  const countByType: CountByType = {
    Ryker: 0,
    Premium: 0,
    Standard: 0,
    No: 0,
  };

  // Count titles per sleeve type
  rows.forEach((row) => {
    const sleeveType: SleeveType = row[2];
    countByType[sleeveType]++;
    total++;
  });

  // calculate percentage of each type
  for (const sleeveType in countByType) {
    const count = countByType[sleeveType as SleeveType];
    output +=
      `${formatSleeveType(sleeveType.padEnd(8))}` +
      ` | ${String(count).padStart(5)}` +
      ` | ${formatPercentage(count, total)}\n`;
  }

  console.log(
    `Type     | Count | Percent\n` +
      `---------|-------|---------\n` +
      output +
      `---------|-------|---------\n` +
      `${styleText(["green"], "Total")}    | ${String(total).padStart(5)} |         \n`,
  );
}
