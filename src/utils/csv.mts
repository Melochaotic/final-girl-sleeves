import { readFileSync } from "fs";
import { resolve } from "path";
import { TableRow } from "../types/TableStructure";

type ParsedCsv = {
  colTitles: string[];
  rows: TableRow[];
};

export function parseCsv(): ParsedCsv {
  const fileName = resolve("data/FinalGirlSleeves.csv");

  const data = readFileSync(fileName, "utf8");

  const rows = data
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));

  const colTitles = rows.shift();
  if (!colTitles) throw new Error("No column titles found");

  return {
    colTitles,
    // @ts-expect-error CSV should follow type 🤞
    rows,
  };
}
