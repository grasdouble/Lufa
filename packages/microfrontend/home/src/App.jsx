import imgUrl from "./assets/Lufa_Logo_original.png";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <img src={imgUrl} alt="Centered Logo" className="centered-image" />
        <h1 className="centered-message">
          Lufa Workspace (WIP) <br /> by Sebastien LE MOUILLOUR
        </h1>
        <div className="links">
          <a
            href="./storybook"
            target="_blank"
            rel="noopener noreferrer"
            className="link storybook"
          >
            Storybook (WIP)
          </a>
          <a
            href="https://github.com/grasdouble/Lufa"
            target="_blank"
            rel="noopener noreferrer"
            className="link github"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/sebastienlemouillour/"
            target="_blank"
            rel="noopener noreferrer"
            className="link linkedin"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
