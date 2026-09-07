import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  parseCsv: vi.fn(),
  celebrate: vi.fn(),
}));

vi.mock("../utils/csv.mts", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../utils/csv.mts")>();
  return { ...actual, parseCsv: mocks.parseCsv };
});
vi.mock("../utils/confetti.mts", () => ({ celebrate: mocks.celebrate }));

import stats from "./stats.ts";
import type { TableRow } from "../types/TableStructure.ts";

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
    mocks.celebrate.mockResolvedValue(undefined);
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("counts individual cards by default", async () => {
    await stats({});

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

  it("counts boxes when box is enabled", async () => {
    await stats({ box: true });

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
    expect(mocks.celebrate).not.toHaveBeenCalled();
  });

  it("does not celebrate when only some boxes are Ryker sleeved", async () => {
    await stats({});

    expect(mocks.celebrate).not.toHaveBeenCalled();
  });

  it("celebrates when every box is fully Ryker sleeved", async () => {
    const fullRykerRows: TableRow[] = [
      [2021, "Core", "Ryker", 1, 2, 3, 4],
      [2021, "Carnage at the Carnival", "Ryker", 5, 5, 0, 0],
    ];
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows: fullRykerRows });

    await stats({});

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toBe(
      "Type      | Percent | Count\n" +
        "----------|---------|-------\n" +
        "SLEEVED   |    100% |    20\n" +
        "UNSLEEVED |      0% |     0\n" +
        "----------|---------|-------\n" +
        "RYKER     |    100% |    20\n" +
        "PREMIUM   |      0% |     0\n" +
        "STANDARD  |      0% |     0\n" +
        "NO        |      0% |     0\n" +
        "----------|---------|-------\n" +
        "Total     |         |    20\n",
    );
    expect(mocks.celebrate).toHaveBeenCalledWith(
      "Every box is now Ryker sleeved!",
    );
  });
});
