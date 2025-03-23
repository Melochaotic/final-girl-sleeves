import search from "@inquirer/search";
import select from "@inquirer/select";
import {
  type GameTitle,
  gameTitleArr,
  type SleeveType,
  sleeveTypeArr,
} from "../types/TableStructure.ts";
import { parseCsv } from "./csv.mts";

/**
 * @param additionalOptions for adding special options like "All" or "None"
 */
export async function promtSleeveType<T extends string[]>(
  additionalOptions: T,
): Promise<T[number] | SleeveType> {
  const choices = [...(additionalOptions ?? []), ...sleeveTypeArr] as const;

  return select<T[number] | SleeveType>({
    message: "Select a sleeve type",
    choices,
  });
}

function getGameTitleOptions() {
  const { rows } = parseCsv();
  const csvGameTitleArr = rows.map((row) => row[1]);

  return gameTitleArr.map((value) => {
    return {
      value,
      disabled: csvGameTitleArr.includes(value) ? false : "(not in csv)",
    };
  });
}

export async function promtGameTitle(): Promise<GameTitle> {
  const ignoreTitlePrefixArr = ["the", "a"];

  return search<GameTitle>({
    message: "Select a game title",
    source: async (input) => {
      const options = getGameTitleOptions();
      if (!input) return options;

      return options.filter(({ value }) => {
        const compInput = input.toLowerCase();
        let compValue = value.toLowerCase();

        for (const prefix of ignoreTitlePrefixArr) {
          if (compInput.startsWith(prefix)) break;
          if (compValue.startsWith(prefix)) {
            compValue = compValue.slice(prefix.length).trimStart();
          }
        }

        return compValue.startsWith(compInput);
      });
    },
  });
}
