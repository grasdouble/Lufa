import type { BadgeProps } from "./Badge";

export const getBadgeClasses = (
  color?: BadgeProps["color"],
  size?: BadgeProps["size"],
) => {
  let result = "";

  // Get Color Classes
  const colorMapping = {
    red: "badge badge-red",
    yellow: "badge badge-yellow",
    green: "badge badge-green",
    blue: "badge badge-blue",
    indigo: "badge badge-indigo",
    purple: "badge badge-purple",
    pink: "badge badge-pink",
    gray: "badge badge-gray",
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
