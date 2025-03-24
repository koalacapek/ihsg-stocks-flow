// utils/textHelper.js

/**
 * Load and process a text document.
 * @param {string} filePath - The path to the text file (e.g., '/data.txt' for public folder or imported file).
 * @returns {Promise<string>} - A promise that resolves to the text content of the file.
 */
export const loadTextFile = async (filePath: string) => {
  try {
    // Fetch the text file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load text file: ${response.statusText}`);
    }
    // Get the text content
    const textContent = await response.text();
    console.log(response.body)
    return textContent;
  } catch (error) {
    console.error('Error loading text file:', error);
    throw error;
  }
};