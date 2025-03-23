import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { exit } from "process";
import {
  type GameTitle,
  gameTitleArr,
  type SleeveType,
  sleeveTypeArr,
  type TableRow,
} from "../types/TableStructure.ts";

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
    rows: validateRows(rows),
  };
}

function validateRows(rows: string[][]): TableRow[] {
  const errors: string[] = [];
  const validatedRows: TableRow[] = rows.map(
    ([
      year,
      title,
      sleeveType,
      countEuro,
      countStandard,
      count70x121,
      count65x130,
    ]) => {
      if (!gameTitleArr.includes(title as GameTitle)) {
        errors.push(`"${title}" is not a valid title`);
      }
      if (!sleeveTypeArr.includes(sleeveType as SleeveType)) {
        errors.push(`"${sleeveType}" is not a valid sleeve type`);
      }

      return [
        Number(year),
        title as GameTitle,
        sleeveType as SleeveType,
        Number(countEuro),
        Number(countStandard),
        Number(count70x121),
        Number(count65x130),
      ];
    },
  );

  if (errors.length) {
    errors.forEach((error) => console.error(`⛔ ${error} in CSV - please fix`));
    exit(2);
  }

  return validatedRows;
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
      const cellLength = String(cell).length;
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
