import { getBadgeClasses } from "./BadgeHelpers";

import "./Badge.css";

export interface BadgeProps {
  size?: "small" | "medium" | "large";
  label: string;
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
}

/** Badge component */
export const Badge = ({
  size = "medium",
  label,
  color = "gray",
  ...props
}: BadgeProps) => {
  const badgeClasses = getBadgeClasses(color, size);

  return <span className={`${badgeClasses}`}>{label}</span>;
};
