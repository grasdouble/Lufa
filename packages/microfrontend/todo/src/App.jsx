import MarkdownRenderer from "./components/MarkdownRenderer";
import genListOfLicense from "../../../../docs/todos/generate-list-of-license-of-dependencies.md";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className='markdown'>
        <MarkdownRenderer markdown={JSON.stringify(genListOfLicense)} />
        <MarkdownRenderer markdown={JSON.stringify(genListOfLicense)} />
      </div>
    </div>
  );
}

export default App;
