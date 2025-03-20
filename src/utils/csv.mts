import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import type { TableRow } from "../types/TableStructure";

const fileName = resolve("data/FinalGirlSleeves.csv");

type ParsedCsv = {
  colHeaders: string[];
  rows: TableRow[];
};

export function parseCsv(): ParsedCsv {
  const data = readFileSync(fileName, "utf8");

  const rows = data
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));

  const colHeaders = rows.shift();
  if (!colHeaders) throw new Error("No column headers found");
  if (!rows.length) throw new Error("No data found");

  return {
    colHeaders,
    // @ts-expect-error CSV should follow type 🤞
    rows,
  };
}

export function saveAsCsv({ colHeaders, rows }: ParsedCsv) {
  const titledRows = padColumns([colHeaders, ...rows]);
  const csv = titledRows.map((row) => row.join(", ")).join("\n");
  writeFileSync(fileName, csv, "utf8");
}

/**
 * formats CSV with whitespace so it looks pretty
 */
function padColumns(data: (string[] | TableRow)[]): (string[] | TableRow)[] {
  const colPadding: number[] = [];

  // Figure out max cell width per column
  data.forEach((rows) => {
    rows.forEach((cell, colIndex) => {
      colPadding[colIndex] ??= 0;
      const cellLength = Number(cell?.length);
      if (cellLength > colPadding[colIndex]) {
        colPadding[colIndex] = cellLength;
      }
    });
  });

  // Pad cells with whitespace for column
  return data.map((rows) =>
    rows.map((cell, colIndex) => String(cell).padEnd(colPadding[colIndex])),
  );
}
