import { SleeveType, TableStructure } from "@/types/TableStructure";
import * as fs from "fs";
import * as path from "path";
import { argv } from "process";

export default function listByType() {
  const sleeveType = argv[3] as SleeveType;
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
      if (row[2].toLowerCase() === sleeveType.toLowerCase()) {
        titleArr.push(row[1]); // title
      }
    }

    console.log(`${titleArr.length} games with ${sleeveType} Sleeves`);
    console.log(`-----------------------------`);
    titleArr.sort().forEach((title) => console.log(`* ${title}`));
  });
}
