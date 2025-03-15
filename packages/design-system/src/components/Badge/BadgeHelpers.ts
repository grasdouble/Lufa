import type { BadgeProps } from "./Badge";

export const getBadgeClasses = (
  color?: BadgeProps["color"],
  size?: BadgeProps["size"]
) => {
  let result = "";

  // Get Color Classes
  const colorMapping = {
    red: "badge-red",
    yellow: "badge-yellow",
    green: "badge-green",
    blue: "badge-blue",
    indigo: "badge-indigo",
    purple: "badge-purple",
    pink: "badge-pink",
    gray: "badge-gray",
  };
  result += (color && colorMapping[color]) || "badge-gray";

  // Get Size Classes
  const sizeMapping = {
    small: " text-xs font-medium",
    medium: " text-sm font-medium",
    large: " text-base font-medium",
  };
  result += (size && sizeMapping[size]) || " text-sm font-medium";

  return result;
};
