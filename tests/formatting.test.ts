import { describe, expect, it } from "vitest";
import {
  formatPercentage,
  formatSleeveType,
  titleCase,
} from "../src/utils/formatting.mts";

describe("titleCase", () => {
  it("capitalizes the first letter of each word", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("a knock at the door")).toBe("A Knock At The Door");
  });

  it("handles a single word", () => {
    expect(titleCase("ryker")).toBe("Ryker");
  });

  it("returns an empty string unchanged", () => {
    expect(titleCase("")).toBe("");
  });

  it("lowercases the remainder of each word", () => {
    expect(titleCase("HELLO WORLD")).toBe("Hello World");
  });
});

describe("formatSleeveType", () => {
  it("uppercases the sleeve type (plain text when not a TTY)", () => {
    expect(formatSleeveType("Ryker")).toBe("RYKER");
    expect(formatSleeveType("Premium")).toBe("PREMIUM");
    expect(formatSleeveType("Standard")).toBe("STANDARD");
    expect(formatSleeveType("No")).toBe("NO");
  });

  it("trims whitespace for color detection but uppercases original", () => {
    expect(formatSleeveType(" ryker ")).toBe(" RYKER ");
  });
});

describe("formatPercentage", () => {
  it("formats whole percentages padded to 7 characters", () => {
    expect(formatPercentage(50, 100)).toBe("    50%");
    expect(formatPercentage(100, 100)).toBe("   100%");
    expect(formatPercentage(0, 100)).toBe("     0%");
  });

  it("rounds to the nearest integer", () => {
    expect(formatPercentage(1, 3)).toBe("    33%");
    expect(formatPercentage(2, 3)).toBe("    67%");
  });
});
