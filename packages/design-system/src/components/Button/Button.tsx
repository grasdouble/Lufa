// Define a component using Tailwind CSS
import { getButtonClasses } from "./ButtonHelpers";
export interface ButtonProps {
  label: string;
  variant?: "solid" | "text" | "link" | "dashed";
  danger?: boolean;
  disabled?: boolean;
  size?: "xsmall" | "small" | "medium" | "large";
}

/** Button component */
export const Button = ({
  label,
  variant = "solid",
  danger = false,
  disabled = false,
  size = "medium",
}: ButtonProps) => {
  const buttonClasses = getButtonClasses(variant, danger, disabled, size);

  return <button className={`${buttonClasses}`}>{label}</button>;
};
