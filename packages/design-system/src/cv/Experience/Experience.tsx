/** Not Found page */
import { Badge } from "../../components/Badge";

import dataEN from "./data.en.json";

export const Experience = (index: number) => {
  const xp = dataEN[3];

  const getBadgeColor = (tagType: string) => {
    switch (tagType) {
      case "database":
        return "green";
      case "backend":
        return "red";
      case "frontend":
        return "indigo";
      case "devops":
        return "blue";
      case "qa":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {xp.company}
        </h1>
        <h2>{xp.dates}</h2>
        <h3>{xp.description}</h3>
        <p className="mt-6 text-base leading-7 text-gray-600">
          <p className="mt-6 text-base leading-7 text-gray-600">
            {xp.tags.map((tag) => (
              <Badge
                size="small"
                label={tag.value}
                color={getBadgeColor(tag.type)}
              />
            ))}
          </p>
        </p>
      </div>
    </main>
  );
};
