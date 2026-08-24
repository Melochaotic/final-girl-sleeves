import assert from "node:assert/strict";
import test from "node:test";
import { stripVTControlCharacters } from "node:util";
import {
  formatPercentage,
  formatSleeveType,
  titleCase,
} from "./formatting.mts";

test("titleCase capitalizes each word", () => {
  assert.equal(titleCase("final girl sleeves"), "Final Girl Sleeves");
});

test("formatSleeveType uppercases the label", () => {
  const output = stripVTControlCharacters(formatSleeveType("ryker"));
  assert.equal(output, "RYKER");
});

test("formatPercentage rounds and pads values", () => {
  assert.equal(stripVTControlCharacters(formatPercentage(1, 3)), "    33%");
  assert.equal(stripVTControlCharacters(formatPercentage(10, 10)), "   100%");
});
