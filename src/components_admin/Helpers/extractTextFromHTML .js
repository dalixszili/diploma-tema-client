export const extractTextFromHTML = (htmlString) => {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, "text/html");
  const text = parsedDocument.body.textContent;
  return text;
};
