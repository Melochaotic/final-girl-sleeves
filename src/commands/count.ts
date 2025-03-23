import { styleText } from "util";
import { parseCsv } from "../utils/csv.mts";
import { formatSleeveType } from "../utils/formatting.mts";
import { promtSleeveType } from "../utils/promts.mts";

export const description =
  "Show sleeve count totals; optionally filtered by `sleeveType`";

export default async function () {
  const sleeveType = await promtSleeveType(["All"] as const);
  const formattedSleeveType = formatSleeveType(sleeveType);
  let totalCountStandard = 0;
  let totalCountEuro = 0;
  let totalCount70x121 = 0;
  let totalCount65x130 = 0;

  const { rows } = parseCsv();

  for (const row of rows) {
    // remove count for target sleeveType
    if (sleeveType === row[2]) continue;
    totalCountStandard += Number(row[3]);
    totalCountEuro += Number(row[4]);
    totalCount70x121 += Number(row[5]);
    totalCount65x130 += Number(row[6]);
  }

  const totalCount =
    totalCountStandard + totalCountEuro + totalCount70x121 + totalCount65x130;

  console.log(
    `Total cards to fully ${formattedSleeveType} sleeve:\n\n` +
      `Type     | Count\n` +
      `---------|-------\n` +
      `${styleText(["yellow"], "Standard")} | ${Number(totalCountStandard) || "-"}\n` +
      `${styleText(["yellow"], "Euro")}     | ${Number(totalCountEuro) || "-"}\n` +
      `${styleText(["yellow"], "70*121")}   | ${Number(totalCount70x121) || "-"}\n` +
      `${styleText(["yellow"], "65*130")}   | ${Number(totalCount65x130) || "-"}\n` +
      `---------|-------\n` +
      `${styleText(["green"], "Total")}    | ${totalCount || "-"}`,
  );
}
