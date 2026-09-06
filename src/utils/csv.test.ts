import { describe, expect, it } from "vitest";
import { gameTitleArr, sleeveTypeArr } from "../types/TableStructure.ts";
import { parseCsv } from "./csv.mts";

describe("parseCsv", () => {
  const { colHeaders, rows } = parseCsv();

  it("returns the expected column headers", () => {
    expect(colHeaders).toEqual([
      "Year",
      "Title",
      "Sleeves",
      "Euro Count",
      "Standard Count",
      "70*121 Count",
      "65*130 Count",
    ]);
  });

  it("parses every data row in the CSV", () => {
    expect(rows).toHaveLength(22);
  });

  it("converts numeric columns to numbers", () => {
    for (const row of rows) {
      expect(typeof row[0]).toBe("number"); // year
      expect(typeof row[3]).toBe("number"); // euro count
      expect(typeof row[4]).toBe("number"); // standard count
      expect(typeof row[5]).toBe("number"); // 70*121 count
      expect(typeof row[6]).toBe("number"); // 65*130 count
    }
  });

  it("only contains valid game titles and sleeve types", () => {
    for (const row of rows) {
      expect(gameTitleArr).toContain(row[1]);
      expect(sleeveTypeArr).toContain(row[2]);
    }
  });

  it("parses the first row with the expected column order", () => {
    expect(rows[0]).toEqual([2021, "Core", "Ryker", 0, 23, 0, 0]);
  });

  it("parses empty cells as zero", () => {
    const core = rows.find((row) => row[1] === "Core");
    expect(core?.[5]).toBe(0);
    expect(core?.[6]).toBe(0);
  });
});
