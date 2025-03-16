import { styleText } from "util";
import { SleeveType } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";

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
    const percent = Math.round((count / total) * 100);
    const percentColor =
      percent === 100 ? "green" : percent >= 50 ? "yellow" : "red";
    const formattedPercent = styleText(
      [percentColor, "bold"],
      String(percent + "%").padStart(7),
    );

    output +=
      `${formatSleeveType(sleeveType.padEnd(8))}` +
      ` | ${String(count).padStart(5)}` +
      ` | ${formattedPercent}\n`;
  }

  console.log(
    `Type     | Count | Percent\n` +
      `---------|-------|---------\n` +
      output +
      `---------|-------|---------\n` +
      `${styleText(["green"], "Total")}    | ${String(total).padStart(5)} |         \n`,
  );
}
