// Helper function to extract plain text from the body of an HTML string
export const parseBodyContentToText = (htmlString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};
