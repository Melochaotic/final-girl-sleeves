import { readFile } from "fs";
import { resolve } from "path";
import { argv } from "process";
import { styleText } from "util";
import type { SleeveType, TableStructure } from "../types/TableStructure";

export default function listByType() {
  const sleeveType = argv[3] as SleeveType;
  if (!sleeveType) throw new Error("NO SLEEVE TYPE GIVEN");

  const fileName = resolve("data/FinalGirlSleeves.csv");
  readFile(fileName, "utf8", (err, data) => {
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

    const sleeveTypeColor =
      sleeveType === "No" // Always wear protection
        ? "red"
        : sleeveType === "Ryker" // Aim to sleeve all w/ Ryker
          ? "green"
          : "yellow"; // Better than nothing

    const sleeveTypeText = styleText(
      [sleeveTypeColor, "bold"],
      sleeveType.toUpperCase(),
    );

    console.log(`${titleArr.length} games with ${sleeveTypeText} Sleeves`);
    console.log(`-----------------------------`);
    titleArr
      .sort()
      .forEach((title) => console.log(`* ${styleText(["yellow"], title)}`));
  });
}
