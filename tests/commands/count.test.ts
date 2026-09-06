import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  promtSleeveType: vi.fn(),
  parseCsv: vi.fn(),
}));

vi.mock("../../src/utils/promts.mts", () => ({
  promtSleeveType: mocks.promtSleeveType,
}));
vi.mock("../../src/utils/csv.mts", () => ({ parseCsv: mocks.parseCsv }));

import count from "../../src/commands/count.ts";
import type { TableRow } from "../../src/types/TableStructure.ts";

const rows: TableRow[] = [
  [2021, "Core", "Ryker", 10, 20, 30, 40],
  [2021, "Carnage at the Carnival", "Premium", 1, 2, 3, 4],
  [2025, "Guest Stars", "No", 5, 6, 7, 8],
];

describe("count", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows });
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("sums cards excluding the selected sleeve type", async () => {
    mocks.promtSleeveType.mockResolvedValue("Ryker");

    await count();

    expect(logSpy.mock.calls[0][0]).toBe(
      "Total cards to fully RYKER sleeve:\n\n" +
        "Type     | Count\n" +
        "---------|-------\n" +
        "Standard | 6\n" +
        "Euro     | 8\n" +
        "70*121   | 10\n" +
        "65*130   | 12\n" +
        "---------|-------\n" +
        "Total    | 36",
    );
  });

  it("sums all cards when 'All' is selected", async () => {
    mocks.promtSleeveType.mockResolvedValue("All");

    await count();

    expect(logSpy.mock.calls[0][0]).toBe(
      "Total cards to fully ALL sleeve:\n\n" +
        "Type     | Count\n" +
        "---------|-------\n" +
        "Standard | 16\n" +
        "Euro     | 28\n" +
        "70*121   | 40\n" +
        "65*130   | 52\n" +
        "---------|-------\n" +
        "Total    | 136",
    );
  });

  it("renders dashes for zero counts", async () => {
    mocks.parseCsv.mockReturnValue({
      colHeaders: [],
      rows: [[2021, "Core", "Ryker", 0, 0, 0, 0]],
    });
    mocks.promtSleeveType.mockResolvedValue("Ryker");

    await count();

    expect(logSpy.mock.calls[0][0]).toBe(
      "Total cards to fully RYKER sleeve:\n\n" +
        "Type     | Count\n" +
        "---------|-------\n" +
        "Standard | -\n" +
        "Euro     | -\n" +
        "70*121   | -\n" +
        "65*130   | -\n" +
        "---------|-------\n" +
        "Total    | -",
    );
  });
});
