import { readFile } from "fs/promises";

function countAlphaWords(strData) {
  let validWords = strData.split(/\s+/);
  validWords = validWords.filter((word) => /^[a-zA-Z]+$/.test(word));
  return validWords.length;
}

async function getWordsCountFromFile(filePath) {
  try {
    const data = await readFile(filePath);
    const count = countAlphaWords(data.toString());
    return { filePath, count };
  } catch (error) {
    if (error.code == "ENOENT") {
      return { filePath, count: 0 };
    }
    console.error(
      `Got an error trying to read the file ${filePath}: ${error.message}`
    );
  }
}

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

async function countAlphaWordsInFiles(configPath) {
  try {
    const files = await getPathsFromConfigFile(configPath);
    const promises = files.map((filePath) =>
      getWordsCountFromFile("./" + filePath)
    );
    const results = await Promise.all(promises);

    results.forEach(({ filePath, count }) => {
      console.log(`${filePath}: ${count} words`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

await countAlphaWordsInFiles("./config.json");
