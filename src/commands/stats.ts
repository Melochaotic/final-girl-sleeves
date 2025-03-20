import { styleText } from "util";
import type { SleeveType } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatPercentage, formatSleeveType } from "../utils/formatting.mts";

export const description = "Show current statistics of sleeving";

type CountByType = {
  [key in SleeveType]: number;
};

export default function () {
  let outputByType = "";
  let outputBySleeved = "";
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
    outputByType +=
      `${formatSleeveType(sleeveType.padEnd(9))}` +
      ` | ${formatPercentage(count, total)}` +
      ` | ${String(count).padStart(5)}\n`;
  }

  // calculate sleeved & unsleeved
  const sleevedCount = total - countByType["No"];
  outputBySleeved +=
    `${styleText(["green", "bold"], "SLEEVED".padEnd(9))}` +
    ` | ${formatPercentage(sleevedCount, total)}` +
    ` | ${String(sleevedCount).padStart(5)}\n` +
    `${styleText(["red", "bold"], "UNSLEEVED".padEnd(9))}` +
    ` | ${formatPercentage(countByType["No"], total)}` +
    ` | ${String(countByType["No"]).padStart(5)}\n`;

  console.log(
    `Type      | Percent | Count\n` +
      `----------|---------|-------\n` +
      outputBySleeved +
      `----------|---------|-------\n` +
      outputByType +
      `----------|---------|-------\n` +
      `${styleText(["green"], "Total")}     |         | ${String(total).padStart(5)}\n`,
  );
}
