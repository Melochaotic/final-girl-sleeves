import select from "@inquirer/select";
import { type SleeveType, sleeveTypeArr } from "../types/TableStructure.ts";

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
