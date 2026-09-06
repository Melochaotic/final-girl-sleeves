import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  promtGameTitle: vi.fn(),
  promtSleeveType: vi.fn(),
  parseCsv: vi.fn(),
  saveAsCsv: vi.fn(),
}));

vi.mock("../../src/utils/promts.mts", () => ({
  promtGameTitle: mocks.promtGameTitle,
  promtSleeveType: mocks.promtSleeveType,
}));
vi.mock("../../src/utils/csv.mts", () => ({
  parseCsv: mocks.parseCsv,
  saveAsCsv: mocks.saveAsCsv,
}));

import update from "../../src/commands/update.ts";
import type { TableRow } from "../../src/types/TableStructure.ts";

describe("update", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("saves and reports a change when the sleeve type differs", async () => {
    mocks.promtGameTitle.mockResolvedValue("core");
    mocks.promtSleeveType.mockResolvedValue("Ryker");
    const rows: TableRow[] = [[2021, "Core", "No", 0, 23, 0, 0]];
    mocks.parseCsv.mockReturnValue({ colHeaders: ["Year"], rows });

    await update();

    expect(mocks.saveAsCsv).toHaveBeenCalledWith({
      colHeaders: ["Year"],
      rows: [[2021, "Core", "Ryker", 0, 23, 0, 0]],
    });
    expect(logSpy).toHaveBeenCalledWith(
      "UPDATED:",
      '"core" now has RYKER sleeves',
    );
  });

  it("does not save and reports no change when the type matches", async () => {
    mocks.promtGameTitle.mockResolvedValue("Core");
    mocks.promtSleeveType.mockResolvedValue("Ryker");
    const rows: TableRow[] = [[2021, "Core", "Ryker", 0, 23, 0, 0]];
    mocks.parseCsv.mockReturnValue({ colHeaders: ["Year"], rows });

    await update();

    expect(mocks.saveAsCsv).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "NO CHANGE:",
      '"Core" still has RYKER sleeves',
    );
  });

  it("reports no change when the title is not found", async () => {
    mocks.promtGameTitle.mockResolvedValue("Nope");
    mocks.promtSleeveType.mockResolvedValue("Ryker");
    const rows: TableRow[] = [[2021, "Core", "No", 0, 23, 0, 0]];
    mocks.parseCsv.mockReturnValue({ colHeaders: ["Year"], rows });

    await update();

    expect(mocks.saveAsCsv).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "NO CHANGE:",
      '"Nope" still has RYKER sleeves',
    );
  });
});
