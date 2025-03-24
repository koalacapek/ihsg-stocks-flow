/**
 * Load and parse a pipe-separated text file.
 * @param {string} filePath - The path to the text file (e.g., '/data.txt' for public folder or imported file).
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the parsed data.
 */
export const loadAndParseTextFileAndFilter = async (filePath: string, code: string): Promise<Array<Record<string, string>>> => {
  try {
    // Fetch the text file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load text file: ${response.statusText}`);
    }
    // Get the text content
    const textContent = await response.text();

    // Split the text content into lines
    const lines = textContent.split('\n');

    // Extract headers (first line)
    const headers = lines[0].split('|').map((header) => header.trim());

    // Parse the data rows
    const data = lines.slice(1).map((line) => {
      const values = line.split('|').map((value) => value.trim());
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      return row;
    });

    return data.filter((row) => row.Code === code);
  } catch (error) {
    console.error('Error loading or parsing text file:', error);
    throw error;
  }
};