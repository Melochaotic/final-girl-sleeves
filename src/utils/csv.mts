import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { TableRow } from "../types/TableStructure";

const fileName = resolve("data/FinalGirlSleeves.csv");

type ParsedCsv = {
  colTitles: string[];
  rows: TableRow[];
};

export function parseCsv(): ParsedCsv {
  const data = readFileSync(fileName, "utf8");

  const rows = data
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));

  const colTitles = rows.shift();
  if (!colTitles) throw new Error("No column titles found");
  if (!rows.length) throw new Error("No data found");

  return {
    colTitles,
    // @ts-expect-error CSV should follow type 🤞
    rows,
  };
}

export function saveAsCsv({ colTitles, rows }: ParsedCsv) {
  const titledRows = [colTitles, ...rows];
  const csv = titledRows.map((row) => row.join(", ")).join("\n");
  writeFileSync(fileName, csv, "utf8");
}
