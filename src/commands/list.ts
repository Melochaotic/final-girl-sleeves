import * as fs from "fs";
import * as path from "path";
import type { TableStructure } from "../types/TableStructure";

export default function list() {
  const fileName = path.resolve("data/FinalGirlSleeves.csv");

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) throw err;

    const rows = data
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));

    const colTitles = rows.shift();
    if (!colTitles) throw new Error("No column titles found");

    const titleArr: string[] = [];
    for (const row of rows as TableStructure[]) {
      titleArr.push(row[1]); // title
    }

    titleArr.sort().forEach((title) => console.log(title));
  });
}
