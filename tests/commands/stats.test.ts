import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ parseCsv: vi.fn() }));

vi.mock("../../src/utils/csv.mts", () => ({ parseCsv: mocks.parseCsv }));

import stats from "../../src/commands/stats.ts";
import type { TableRow } from "../../src/types/TableStructure.ts";

const rows: TableRow[] = [
  [2021, "Core", "Ryker", 1, 2, 3, 4],
  [2021, "Carnage at the Carnival", "Premium", 5, 5, 0, 0],
  [2025, "Guest Stars", "No", 1, 1, 1, 1],
];

describe("stats", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows });
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("counts individual cards by default", () => {
    stats({});

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toBe(
      "Type      | Percent | Count\n" +
        "----------|---------|-------\n" +
        "SLEEVED   |     83% |    20\n" +
        "UNSLEEVED |     17% |     4\n" +
        "----------|---------|-------\n" +
        "RYKER     |     42% |    10\n" +
        "PREMIUM   |     42% |    10\n" +
        "STANDARD  |      0% |     0\n" +
        "NO        |     17% |     4\n" +
        "----------|---------|-------\n" +
        "Total     |         |    24\n",
    );
  });

  it("counts boxes when box is enabled", () => {
    stats({ box: true });

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toBe(
      "Type      | Percent | Count\n" +
        "----------|---------|-------\n" +
        "SLEEVED   |     67% |     2\n" +
        "UNSLEEVED |     33% |     1\n" +
        "----------|---------|-------\n" +
        "RYKER     |     33% |     1\n" +
        "PREMIUM   |     33% |     1\n" +
        "STANDARD  |      0% |     0\n" +
        "NO        |     33% |     1\n" +
        "----------|---------|-------\n" +
        "Total     |         |     3\n",
    );
  });
});
