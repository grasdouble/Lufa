export interface DividerProps {
  label?: string;
  position?: "left" | "center" | "right";
}

/** Divider component */
export const Divider = ({ label, position = "center" }: DividerProps) => {
  const labelPositionMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const labelPaddingMap = {
    left: "pr-2",
    center: "px-2",
    right: "pl-2",
  };

  return (
    <div className="px-4 max-w-2xl mx-auto">
      <div className="relative">
        <div className="items-center flex inset-0 absolute" aria-hidden="true">
          <div className="border-t w-full border-gray-300 dark:border-gray-100"></div>
        </div>
        {label && (
          <div className={`${labelPositionMap[position]} flex relative`}>
            <span
              className={`${labelPaddingMap[position]} text-gray-500 text-sm dark:text-white bg-root-background-color-light dark:bg-root-background-color-dark`}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
