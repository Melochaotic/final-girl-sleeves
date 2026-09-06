import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  exit: vi.fn(),
}));

vi.mock("fs", () => ({
  readFileSync: mocks.readFileSync,
  writeFileSync: mocks.writeFileSync,
}));

vi.mock("process", () => ({
  exit: mocks.exit,
}));

import { parseCsv, saveAsCsv } from "../src/utils/csv.mts";

const HEADER =
  "Year,Title,Sleeves,Euro Count,Standard Count,70*121 Count,65*130 Count";

describe("parseCsv error handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("throws when there is no data after the header", () => {
    mocks.readFileSync.mockReturnValue("Year,Title,Sleeves");
    expect(() => parseCsv()).toThrow("No data found");
  });

  it("exits with code 2 when a title is invalid", () => {
    mocks.readFileSync.mockReturnValue(
      `${HEADER}\n2021,Not A Real Game,Ryker,0,23,,`,
    );
    parseCsv();
    expect(mocks.exit).toHaveBeenCalledWith(2);
    expect(console.error).toHaveBeenCalledWith(
      '⛔ "Not A Real Game" is not a valid title in CSV - please fix',
    );
  });

  it("exits with code 2 when a sleeve type is invalid", () => {
    mocks.readFileSync.mockReturnValue(`${HEADER}\n2021,Core,Cardboard,0,23,,`);
    parseCsv();
    expect(mocks.exit).toHaveBeenCalledWith(2);
    expect(console.error).toHaveBeenCalledWith(
      '⛔ "Cardboard" is not a valid sleeve type in CSV - please fix',
    );
  });
});

describe("saveAsCsv", () => {
  it("writes a padded, comma-space separated CSV", () => {
    mocks.writeFileSync.mockImplementation(() => {});

    saveAsCsv({
      colHeaders: ["Year", "Title"],
      rows: [[2021, "Core"]],
    });

    expect(mocks.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("FinalGirlSleeves.csv"),
      "Year, Title\n2021, Core ",
      "utf8",
    );
  });
});
