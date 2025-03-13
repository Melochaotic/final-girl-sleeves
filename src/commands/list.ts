import { styleText } from "util";
import type { TableRow } from "../types/TableStructure";
import { parseCsv } from "../utils/csv.mts";

export default function () {
  const { rows } = parseCsv();

  const titleArr: string[] = [];
  for (const row of rows as TableRow[]) {
    titleArr.push(row[1]); // title
  }

  titleArr
    .sort()
    .forEach((title) => console.log(`* ${styleText(["yellow"], title)}`));
}
