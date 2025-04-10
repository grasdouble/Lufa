import React from "react";

import styles from "./App.module.css";
import clsx from "clsx";
import { getImageUrl } from "./getImageUrl";
import { Placeholder } from "@grasdouble/lufa_design-system";

function App() {
  return (
    <div className={clsx(styles["lufa-home"])} id="lufa-home">
      <div className="content">
        <Placeholder />
        <img
          src={getImageUrl("Lufa_Logo_original")}
          alt="Centered Logo"
          className={clsx(styles["centered-image"])}
        />
        <h1 className={clsx(styles["centered-message"])}>
          Lufa Workspace (WIP) <br /> by Sebastien LE MOUILLOUR
        </h1>
        <div className={clsx(styles["links"])}>
          <a
            href="./storybook"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles["link"], styles["storybook"])}
          >
            Storybook (WIP)
          </a>
          <a
            href="https://github.com/grasdouble/Lufa"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles["link"], styles["github"])}
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/sebastienlemouillour/"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles["link"], styles["linkedin"])}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
