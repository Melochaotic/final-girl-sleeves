import { styleText } from "util";
import type {
  GameTitle,
  SleeveType,
  TableRow,
} from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType, sleeveTypeColor } from "../utils/formatting.mts";

const statusOrder: SleeveType[] = ["Ryker", "Premium", "Standard", "No"];

export default async function () {
  const { rows } = parseCsv();

  const titlesByStatus: Record<SleeveType, GameTitle[]> = {
    Ryker: [],
    Premium: [],
    Standard: [],
    No: [],
  };

  for (const row of rows as TableRow[]) {
    titlesByStatus[row[2]].push(row[1]);
  }

  const titleCount = Object.values(titlesByStatus).reduce(
    (total, titles) => total + titles.length,
    0,
  );

  console.log(`${titleCount} game boxes:`);
  console.log(`-----------------------------`);

  for (const status of statusOrder) {
    const titles = titlesByStatus[status];
    if (!titles.length) continue;

    console.log(`${formatSleeveType(status)}:`);
    titles
      .sort()
      .forEach((title) =>
        console.log(`* ${styleText([sleeveTypeColor(status)], title)}`),
      );
  }
}
