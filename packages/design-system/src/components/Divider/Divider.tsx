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
    <div className="mx-auto max-w-2xl px-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-100"></div>
        </div>
        {label && (
          <div className={`${labelPositionMap[position]} relative flex`}>
            <span
              className={`${labelPaddingMap[position]} bg-root-background-color-light dark:bg-root-background-color-dark text-sm text-gray-500 dark:text-white`}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
