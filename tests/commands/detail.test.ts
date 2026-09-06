import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  promtGameTitle: vi.fn(),
  parseCsv: vi.fn(),
  exit: vi.fn(),
}));

vi.mock("../../src/utils/promts.mts", () => ({
  promtGameTitle: mocks.promtGameTitle,
}));
vi.mock("../../src/utils/csv.mts", () => ({ parseCsv: mocks.parseCsv }));
vi.mock("process", () => ({ exit: mocks.exit }));

import detail from "../../src/commands/detail.ts";
import type { TableRow } from "../../src/types/TableStructure.ts";

describe("detail", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.exit.mockImplementation(() => {});
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("prints details and exits for a matching title (case-insensitive)", async () => {
    mocks.promtGameTitle.mockResolvedValue("core");
    const rows: TableRow[] = [[2021, "Core", "Ryker", 0, 23, 0, 0]];
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows });
    mocks.exit.mockImplementation(() => {
      throw new Error("EXIT");
    });

    await expect(detail()).rejects.toThrow("EXIT");

    expect(logSpy.mock.calls[0][0]).toBe(
      'The "Core" box was released in 2021.\n' +
        "It currently has RYKER sleeves.\n\n" +
        "Type     | Count\n" +
        "---------|-------\n" +
        "Standard | 23\n" +
        "Euro     | -\n" +
        "70*121   | -\n" +
        "65*130   | -",
    );
  });

  it("throws when no title matches", async () => {
    mocks.promtGameTitle.mockResolvedValue("Nope");
    const rows: TableRow[] = [[2021, "Core", "Ryker", 0, 23, 0, 0]];
    mocks.parseCsv.mockReturnValue({ colHeaders: [], rows });

    await expect(detail()).rejects.toThrow('No record found for title: "Nope"');
    expect(mocks.exit).not.toHaveBeenCalled();
  });
});
