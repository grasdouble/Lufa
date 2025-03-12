export interface AvatarImageProps {
  variant?: "circle" | "square";
  imgURL: string;
}
export interface AvatarNotificationProps {
  color: "none" | "green" | "orange" | "red" | "gray";
  position: "top" | "bottom";
}
export interface AvatarProps {
  avatar: AvatarImageProps;
  notification?: AvatarNotificationProps;
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
}

export const getAvatarClasses = (
  variant?: AvatarImageProps["variant"],
  size?: AvatarProps["size"]
) => {
  let result = "";

  // Get Variant Classes
  const variantMapping = {
    square: "avatar-square",
    circle: "avatar-circle",
  };
  result += (variant && variantMapping[variant]) || "";

  // Get Size Classes
  const sizeMapping = {
    xsmall: " h-8 w-8",
    small: " h-12 w-12",
    medium: " h-16 w-16",
    large: " h-20 w-20",
    xlarge: " h-24 w-24",
  };
  result += (size && sizeMapping[size]) || " h-16 w-16";

  return result;
};

export const getNotificationClasses = (
  size?: AvatarProps["size"],
  variant?: AvatarImageProps["variant"],
  color?: AvatarNotificationProps["color"],
  position?: AvatarNotificationProps["position"]
) => {
  let result = "notification";

  // Get Color Classes
  const notificationColorMapping = {
    green: " bg-green-400",
    orange: " bg-orange-400",
    red: " bg-red-400",
    gray: " bg-gray-400",
  };
  if (color === "none" || !color) return result;
  result += notificationColorMapping[color] || "";

  // Get Size Classes
  const notificationSizeMapping = {
    xsmall: " h-2 w-2",
    small: " h-3 w-3",
    medium: " h-4 w-4",
    large: " h-5 w-5",
    xlarge: " h-6 w-6",
  };
  result += (size && notificationSizeMapping[size]) || " h-4 w-4";

  //Get Position Classes
  const positionMapping = {
    top: " top-0",
    bottom: " bottom-0",
  };

  const variantMapping = {
    square: {
      top: " -translate-y-1/3 translate-x-1/3",
      bottom: " translate-y-1/2 translate-x-1/2",
    },
  };
  result += (position && positionMapping[position]) || " top-0";
  if (variant === "square") {
    result += (position && variantMapping.square[position]) || "";
  }

  return result;
};
