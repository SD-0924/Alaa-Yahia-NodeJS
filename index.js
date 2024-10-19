import { readFile } from "fs/promises";

/**
 * Counts the number of words in a string that consist only of alphabetic characters.
 * @param {string} strData - The input string to be processed.
 * @returns {number} - The count of words that contain only alphabetic characters.
 */
function countAlphaWords(strData) {
  let validWords = strData.split(/\s+/);
  validWords = validWords.filter((word) => /^[a-zA-Z]+$/.test(word));
  return validWords.length;
}

/**
 * Reads a single file and counts the number of alphabetic words in it.
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<{filePath: string, count: number}>} - A promise that resolves with an object containing the file path and the word count.
 */
async function getWordsCountFromFile(filePath) {
  try {
    const data = await readFile(filePath);
    const count = countAlphaWords(data.toString());
    return { filePath, count };
  } catch (error) {
    if (error.code == "ENOENT") {
      console.error(filePath + ": File not found.");
      return { filePath, count: -1 };
    }
    console.error(
      `Got an error trying to read the file ${filePath}: ${error.message}`
    );
  }
}

/**
 * Reads a configuration file and extracts an array of file paths.
 * @param {string} configPath - The path to the configuration JSON file.
 * @returns {Promise<string[]>} - A promise that resolves with an array of file paths.
 */
async function getPathsFromConfigFile(configPath) {
  try {
    const data = await readFile(configPath);
    const config = JSON.parse(data);
    return config.files;
  } catch (error) {
    console.error(
      `Got an error trying to read the file${configPath}: ${error.message}`
    );
  }
}

/**
 * Reads the configuration file, processes each file path, and counts alphabetic words in each file.
 * @param {string} configPath - The path to the configuration JSON file containing file paths.
 * @returns {Promise<void>} - A promise that resolves when all word counts have been displayed.
 */
async function countAlphaWordsInFiles(configPath) {
  try {
    const files = await getPathsFromConfigFile(configPath);
    const promises = files.map((filePath) =>
      getWordsCountFromFile("./" + filePath)
    );
    const results = await Promise.all(promises);

    results.forEach(({ filePath, count }) => {
      if (count >= 0) {
        console.log(`${filePath}: ${count} words`);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Start the program by calling the main function
await countAlphaWordsInFiles("./config.json");
