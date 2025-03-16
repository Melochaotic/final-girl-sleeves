import { styleText } from "util";
import { SleeveType } from "../types/TableStructure";
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
      ` | ${String(count).padStart(5)}` +
      ` | ${formatPercentage(count, total)}\n`;
  }

  // calculate sleeved & unsleeved
  const sleevedCount = total - countByType["No"];
  outputBySleeved +=
    `${styleText(["green", "bold"], "SLEEVED".padEnd(9))}` +
    ` | ${String(sleevedCount).padStart(5)}` +
    ` | ${formatPercentage(sleevedCount, total)}\n` +
    `${styleText(["red", "bold"], "UNSLEEVED".padEnd(9))}` +
    ` | ${String(countByType["No"]).padStart(5)}` +
    ` | ${formatPercentage(countByType["No"], total)}\n`;

  console.log(
    `Type      | Count | Percent\n` +
      `----------|-------|---------\n` +
      outputByType +
      `----------|-------|---------\n` +
      outputBySleeved +
      `----------|-------|---------\n` +
      `${styleText(["green"], "Total")}     | ${String(total).padStart(5)} |         \n`,
  );
}
