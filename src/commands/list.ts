import { styleText } from "util";
import type {
  GameTitle,
  SleeveType,
  TableRow,
} from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType, sleeveTypeColor } from "../utils/formatting.mts";
import { promtSleeveType } from "../utils/promts.mts";

const statusOrder: SleeveType[] = ["Ryker", "Premium", "Standard", "No"];

export default async function () {
  const sleeveType = await promtSleeveType(["All"] as const);
  const { rows } = parseCsv();

  const titlesByStatus: Record<SleeveType, GameTitle[]> = {
    Ryker: [],
    Premium: [],
    Standard: [],
    No: [],
  };

  for (const row of rows as TableRow[]) {
    if (
      sleeveType === "All" ||
      row[2].toLowerCase() === sleeveType.toLowerCase()
    ) {
      titlesByStatus[row[2]].push(row[1]);
    }
  }

  const titleCount = Object.values(titlesByStatus).reduce(
    (total, titles) => total + titles.length,
    0,
  );

  const sleeveTypeText = sleeveType
    ? ` with ${formatSleeveType(sleeveType)} sleeeves`
    : "";
  console.log(`${titleCount} game boxes${sleeveTypeText}:`);
  console.log(`-----------------------------`);

  const logTitle = (title: string, status: SleeveType) =>
    console.log(`* ${styleText([sleeveTypeColor(status)], title)}`);

  if (sleeveType === "All") {
    for (const status of statusOrder) {
      const titles = titlesByStatus[status];
      if (!titles.length) continue;

      console.log(`${formatSleeveType(status)}:`);
      titles.sort().forEach((title) => logTitle(title, status));
    }
    return;
  }

  titlesByStatus[sleeveType]
    .sort()
    .forEach((title) => logTitle(title, sleeveType));
}
