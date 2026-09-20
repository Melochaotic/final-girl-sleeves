import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  parseCsv: vi.fn(),
}));

vi.mock("../utils/csv.mts", () => ({ parseCsv: mocks.parseCsv }));

import list from "./list.ts";
import type { TableRow } from "../types/TableStructure.ts";

const rows: TableRow[] = [
  [2021, "Core", "Ryker", 0, 0, 0, 0],
  [2021, "Carnage at the Carnival", "Premium", 0, 0, 0, 0],
  [2021, "Slaughter in the Groves", "Premium", 0, 0, 0, 0],
  [2025, "Guest Stars", "No", 0, 0, 0, 0],
];

describe("list", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows });
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  function logged() {
    return logSpy.mock.calls.map((call) => call[0]);
  }

  it("groups every title by status", async () => {
    await list();

    expect(logged()).toEqual([
      "4 game boxes:",
      "-----------------------------",
      "RYKER: (1)",
      "* Core",
      "PREMIUM: (2)",
      "* Carnage at the Carnival",
      "* Slaughter in the Groves",
      "NO: (1)",
      "* Guest Stars",
    ]);
  });

  it("omits empty status groups", async () => {
    mocks.parseCsv.mockReturnValue({
      colHeaders: [],
      rows: [
        [2021, "Core", "Ryker", 0, 0, 0, 0],
        [2025, "Guest Stars", "No", 0, 0, 0, 0],
      ] satisfies TableRow[],
    });

    await list();

    expect(logged()).toEqual([
      "2 game boxes:",
      "-----------------------------",
      "RYKER: (1)",
      "* Core",
      "NO: (1)",
      "* Guest Stars",
    ]);
  });
});
