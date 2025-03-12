import { ButtonProps } from "./Button";
import buttonStyle from "./Button.module.css";

export const getButtonClasses = (
  variant: ButtonProps["variant"],
  danger: ButtonProps["danger"],
  disabled: ButtonProps["disabled"],
  size: ButtonProps["size"]
) => {
  let result = "";

  if (disabled) {
    result =
      variant === "link"
        ? buttonStyle["button-disabled-link"]
        : buttonStyle["button-disabled"];
  } else if (danger) {
    const dangerColorMapping = {
      text: buttonStyle["button-danger-text"],
      dashed: buttonStyle["button-danger-dashed"],
      link: buttonStyle["button-danger-link"],
      solid: buttonStyle["button-danger-solid"],
    };
    result =
      (variant && dangerColorMapping[variant]) ||
      buttonStyle["button-danger-solid"];
  } else {
    const colorMapping = {
      text: buttonStyle["button-text"],
      dashed: buttonStyle["button-dashed"],
      link: buttonStyle["button-link"],
      solid: buttonStyle["button-solid"],
    };
    result = (variant && colorMapping[variant]) || buttonStyle["button-solid"];
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
