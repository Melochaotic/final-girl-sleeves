import { styleText } from "util";

export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSleeveType(sleeveType: string): string {
  const compSleeveType = titleCase(sleeveType.trim());

  const sleeveTypeColor =
    compSleeveType === "No" // Always wear protection
      ? "red"
      : compSleeveType === "Ryker" // Aim to sleeve all w/ Ryker
        ? "green"
        : "yellow"; // Better than nothing

  return styleText([sleeveTypeColor, "bold"], sleeveType.toUpperCase());
}
