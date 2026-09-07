import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  promtGameTitle: vi.fn(),
  promtSleeveType: vi.fn(),
  parseCsv: vi.fn(),
  saveAsCsv: vi.fn(),
  celebrate: vi.fn(),
}));

vi.mock("../utils/promts.mts", () => ({
  promtGameTitle: mocks.promtGameTitle,
  promtSleeveType: mocks.promtSleeveType,
}));
vi.mock("../utils/csv.mts", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../utils/csv.mts")>();
  return { ...actual, parseCsv: mocks.parseCsv, saveAsCsv: mocks.saveAsCsv };
});
vi.mock("../utils/confetti.mts", () => ({ celebrate: mocks.celebrate }));

import update from "./update.ts";
import type { TableRow } from "../types/TableStructure.ts";

describe("update", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.celebrate.mockResolvedValue(undefined);
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
    expect(mocks.celebrate).toHaveBeenCalledWith(
      "You Ryker-sleeved the whole collection!",
    );
  });

  it("celebrates only when the collection becomes fully Ryker sleeved", async () => {
    mocks.promtGameTitle.mockResolvedValue("Carnage at the Carnival");
    mocks.promtSleeveType.mockResolvedValue("Premium");
    const rows: TableRow[] = [
      [2021, "Core", "Ryker", 0, 23, 0, 0],
      [2021, "Carnage at the Carnival", "Ryker", 5, 5, 0, 0],
    ];
    mocks.parseCsv.mockReturnValue({ colHeaders: ["Year"], rows });

    await update();

    expect(mocks.saveAsCsv).toHaveBeenCalled();
    expect(mocks.celebrate).not.toHaveBeenCalled();
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
    expect(mocks.celebrate).not.toHaveBeenCalled();
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
