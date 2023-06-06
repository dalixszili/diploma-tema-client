import React from "react";

function TruncateText({ text, limit }) {
  if (text.length > limit) {
    const truncatedText = text.slice(0, limit);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");
    const lastQuoteIndex = truncatedText.lastIndexOf('"');
    const endIndex = Math.max(lastSpaceIndex, lastQuoteIndex, 0);
    const finalText = truncatedText.slice(0, endIndex).trim();

    return (
      <span>
        {finalText}
        {endIndex < text.length && "..."}
      </span>
    );
  }
  return <span>{text}</span>;
}

export default TruncateText;
