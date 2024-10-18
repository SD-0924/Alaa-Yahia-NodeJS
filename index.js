import { readFile } from "fs/promises";

async function readConfig(configPath) {
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

async function countWords(filePath) {
  try {
    const data = await readFile(filePath);
    let validWords = data.toString().split(/\s+/);
    validWords = validWords.filter((word) => /^[a-zA-Z]+$/.test(word));
    const count = validWords.length;
    return { filePath, count };
  } catch (error) {
    console.error(
      `Got an error trying to read the file ${filePath}: ${error.message}`
    );
  }
}

async function readFiles(configPath) {
  try {
    const files = await readConfig(configPath);
    const promises = files.map((filePath) => countWords("./" + filePath));
    const results = await Promise.all(promises);

    results.forEach(({ filePath, count }) => {
      console.log(`${filePath}: ${count} words`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

await readFiles("./config.json");
