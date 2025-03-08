import { styleText } from "util";

export function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSleeveType(sleeveType: string): string {
  sleeveType = titleCase(sleeveType);

  const sleeveTypeColor =
    sleeveType === "No" // Always wear protection
      ? "red"
      : sleeveType === "Ryker" // Aim to sleeve all w/ Ryker
        ? "green"
        : "yellow"; // Better than nothing

  return styleText([sleeveTypeColor, "bold"], sleeveType.toUpperCase());
}
