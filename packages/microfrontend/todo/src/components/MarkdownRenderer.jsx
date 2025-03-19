import { marked } from "marked";
import PropTypes from "prop-types";

const MarkdownRenderer = ({ markdown }) => {
  const isBase64WithPrefix = (str) =>
    str.startsWith('"data:text/markdown;base64,');

  const decodedMarkdown = isBase64WithPrefix(markdown)
    ? atob(markdown.replace('"data:text/markdown;base64,', "").replace('"', ""))
    : markdown;

  const htmlContent = marked(decodedMarkdown);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

MarkdownRenderer.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
