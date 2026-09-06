import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  select: vi.fn(),
  search: vi.fn(),
}));

vi.mock("@inquirer/select", () => ({ default: mocks.select }));
vi.mock("@inquirer/search", () => ({ default: mocks.search }));

import { gameTitleArr, sleeveTypeArr } from "../src/types/TableStructure.ts";
import { promtGameTitle, promtSleeveType } from "../src/utils/promts.mts";

type Option = { value: string; disabled: string | false };
type SearchConfig = {
  message: string;
  source: (input?: string) => Promise<Option[]>;
};

describe("promtSleeveType", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("offers all sleeve types and returns the selection", async () => {
    mocks.select.mockResolvedValue("Ryker");

    const result = await promtSleeveType([]);

    expect(result).toBe("Ryker");
    expect(mocks.select).toHaveBeenCalledWith({
      message: "Select a sleeve type",
      choices: [...sleeveTypeArr],
    });
  });

  it("prepends additional options before the sleeve types", async () => {
    mocks.select.mockResolvedValue("All");

    const result = await promtSleeveType(["All"]);

    expect(result).toBe("All");
    expect(mocks.select).toHaveBeenCalledWith({
      message: "Select a sleeve type",
      choices: ["All", ...sleeveTypeArr],
    });
  });
});

describe("promtGameTitle", () => {
  let capturedConfig: SearchConfig | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedConfig = undefined;
    mocks.search.mockImplementation(async (config: SearchConfig) => {
      capturedConfig = config;
      return "Core";
    });
  });

  async function getSource() {
    await promtGameTitle();
    return capturedConfig!.source;
  }

  it("returns the selected title and uses the right message", async () => {
    const result = await promtGameTitle();

    expect(result).toBe("Core");
    expect(capturedConfig?.message).toBe("Select a game title");
  });

  it("returns every title for an empty input", async () => {
    const source = await getSource();
    const options = await source("");

    expect(options).toHaveLength(gameTitleArr.length);
  });

  it("filters titles ignoring a leading 'the' prefix", async () => {
    const source = await getSource();
    const options = await source("the happy");

    expect(options.map((option) => option.value)).toEqual([
      "The Happy Trails Horror",
    ]);
  });

  it("filters titles ignoring a leading 'a' prefix", async () => {
    const source = await getSource();
    const options = await source("knock");

    expect(options.map((option) => option.value)).toEqual([
      "A Knock at the Door",
    ]);
  });

  it("marks titles missing from the CSV as disabled", async () => {
    const source = await getSource();
    const options = await source("");

    const missing = options.find(
      (option) => option.value === "A Demon in the Shadows",
    );
    const present = options.find((option) => option.value === "Core");

    expect(missing?.disabled).toBe("(not in csv)");
    expect(present?.disabled).toBe(false);
  });
});
