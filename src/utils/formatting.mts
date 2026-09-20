import { styleText } from "util";

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function sleeveTypeColor(
  sleeveType: string,
): "red" | "green" | "yellow" {
  const compSleeveType = titleCase(sleeveType.trim());

  return compSleeveType === "No" // Always wear protection
    ? "red"
    : compSleeveType === "Ryker" // Aim to sleeve all w/ Ryker
      ? "green"
      : "yellow"; // Better than nothing
}

export function formatSleeveType(sleeveType: string): string {
  return styleText(
    [sleeveTypeColor(sleeveType), "bold"],
    sleeveType.toUpperCase(),
  );
}

export function formatPercentage(count: number, total: number): string {
  const percent = Math.round((count / total) * 100);
  const percentColor =
    percent === 100 ? "green" : percent >= 50 ? "yellow" : "red";

  return styleText([percentColor, "bold"], String(percent + "%").padStart(7));
}
