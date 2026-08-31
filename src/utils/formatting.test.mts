import { describe, expect, it } from "vitest";

import { stripVTControlCharacters } from "node:util";
import {
  formatPercentage,
  formatSleeveType,
  titleCase,
} from "./formatting.mts";

describe("titleCase", () => {
  it("capitalizes each word", () => {
    expect(titleCase("final girl sleeves")).toBe("Final Girl Sleeves");
  });
});

describe("formatSleeveType", () => {
  it("uppercases the label", () => {
    expect(stripVTControlCharacters(formatSleeveType("ryker"))).toBe("RYKER");
  });
});

describe("formatPercentage", () => {
  it("rounds and pads values", () => {
    expect(stripVTControlCharacters(formatPercentage(1, 3))).toBe("    33%");
    expect(stripVTControlCharacters(formatPercentage(10, 10))).toBe("   100%");
  });
});
