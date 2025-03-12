import {
  getAvatarClasses,
  getNotificationClasses,
  AvatarProps,
} from "./AvatarHelpers";

import "./Avatar.css";

/** Avatar component */
export const Avatar = ({
  avatar,
  notification = { color: "none", position: "top" },
  size = "medium",
}: AvatarProps) => {
  const { variant, imgURL } = avatar;
  console.log("Avatar");
  const { color, position } = notification;
  return (
    <span className="relative inline-block">
      <img
        className={`${getAvatarClasses(variant, size)}`}
        src={imgURL}
        alt=""
      />
      {color && color !== "none" && (
        <span
          className={`${getNotificationClasses(
            size,
            variant,
            color,
            position
          )}`}
        />
      )}
    </span>
  );
};
