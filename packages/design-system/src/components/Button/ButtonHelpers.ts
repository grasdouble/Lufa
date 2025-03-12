import { ButtonProps } from "./Button";

export const getButtonClasses = (
  variant: ButtonProps["variant"],
  danger: ButtonProps["danger"],
  disabled: ButtonProps["disabled"],
  size: ButtonProps["size"]
) => {
  let result = "";

  if (disabled) {
    result = variant === "link" ? "button-disabled-link" : "button-disabled";
  } else if (danger) {
    const dangerColorMapping = {
      text: "button-danger-text",
      dashed: "button-danger-dashed",
      link: "button-danger-link",
      solid: "button-danger-solid",
    };
    result = (variant && dangerColorMapping[variant]) || "button-danger-solid";
  } else {
    const colorMapping = {
      text: "button-text",
      dashed: "button-dashed",
      link: "button-link",
      solid: "button-solid",
    };
    result = (variant && colorMapping[variant]) || "button-solid";
  }

  const sizeMapping = {
    xsmall: " px-2 py-1 text-xs",
    small: " px-3 py-2 text-sm",
    medium: " px-4 py-2 text-sm",
    large: " px-6 py-3 text-base",
  };
  result += (size && sizeMapping[size]) || " px-4 py-2 text-sm";

  return result;
};
