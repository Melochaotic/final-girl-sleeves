import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  promtSleeveType: vi.fn(),
  parseCsv: vi.fn(),
}));

vi.mock("../../src/utils/promts.mts", () => ({
  promtSleeveType: mocks.promtSleeveType,
}));
vi.mock("../../src/utils/csv.mts", () => ({ parseCsv: mocks.parseCsv }));

import list from "../../src/commands/list.ts";
import type { TableRow } from "../../src/types/TableStructure.ts";

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

  it("lists every title sorted when 'All' is selected", async () => {
    mocks.promtSleeveType.mockResolvedValue("All");

    await list();

    expect(logged()).toEqual([
      "4 game boxes with ALL sleeeves:",
      "-----------------------------",
      "* Carnage at the Carnival",
      "* Core",
      "* Guest Stars",
      "* Slaughter in the Groves",
    ]);
  });

  it("filters titles by sleeve type", async () => {
    mocks.promtSleeveType.mockResolvedValue("Premium");

    await list();

    expect(logged()).toEqual([
      "2 game boxes with PREMIUM sleeeves:",
      "-----------------------------",
      "* Carnage at the Carnival",
      "* Slaughter in the Groves",
    ]);
  });
});
