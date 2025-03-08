import { readFile } from "fs";
import { resolve } from "path";
import { argv, exit } from "process";
import { styleText } from "util";
import type { TableStructure } from "../types/TableStructure";
import { formatSleeveType } from "../utils/formatting.mts";

export default function detail() {
  const searchTitle = argv[3];
  if (!searchTitle) throw new Error("NO SEARCH TERM GIVEN");

  const fileName = resolve("data/FinalGirlSleeves.csv");

  readFile(fileName, "utf8", (err, data) => {
    if (err) throw err;

    const rows = data
      .split("\n")
      .map((row) => row.split(",").map((cell) => cell.trim()));

    const colTitles = rows.shift();
    if (!colTitles) throw new Error("No column titles found");

    for (const [
      year,
      title,
      sleeveType,
      countStandard,
      countEuro,
      count70x121,
      count65x130,
    ] of rows as TableStructure[]) {
      if (title.toLowerCase() === searchTitle.toLowerCase()) {
        const formattedSleeveType = formatSleeveType(sleeveType);
        console.log(
          `The "${title}" box was released in ${year}.\nIt currently has ${formattedSleeveType} sleeves.\n\n` +
            `Type     | Count\n` +
            `---------|-------\n` +
            `${styleText(["yellow"], "Standard")} | ${Number(countStandard) || "-"}\n` +
            `${styleText(["yellow"], "Euro")}     | ${Number(countEuro) || "-"}\n` +
            `${styleText(["yellow"], "70*121")}   | ${Number(count70x121) || "-"}\n` +
            `${styleText(["yellow"], "65*130")}   | ${Number(count65x130) || "-"}`,
        );
        exit();
      }
    }

    throw new Error(`No record found for title: "${searchTitle}"`);
  });
}
