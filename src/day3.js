import fs from 'node:fs/promises';

// ***** Functions ***** //
const getNumberArea = (fileLines, lineIndex, numberIndex, number) => {
  const startLine = lineIndex - 1 < 0 ? 0 : lineIndex - 1;
  const endLine =
    lineIndex + 1 >= fileLines.length ? fileLines.length : lineIndex + 1;

  let area = '';
  for (let y = startLine; y <= endLine; y++) {
    const currentLine = fileLines[y];
    if (!currentLine) continue;

    const startCol = Number(numberIndex - 1 < 0 ? 0 : numberIndex - 1);
    const endCol = Number(
      numberIndex + number.length + 1 >= currentLine.length
        ? currentLine.length
        : numberIndex + number.length + 1,
    );

    const currentArea = currentLine.substring(startCol, endCol);
    area += currentArea;
  }

  return area;
};

const extractNumbers = (line) => line.matchAll(/(\d+)/g);

console.log('AdventOfCode - Day 3: Gear Ratios');

const file = await fs.readFile('./resources/day3_input.txt', 'utf-8');
const fileLines = file.split('\n');

let partSum = 0;
for (const lineIndex in fileLines) {
  const line = fileLines[lineIndex];
  if (!line) continue;

  const lineNumbers = [...extractNumbers(line)];

  let lineNumbersArea = [];
  for (const lineNumber of lineNumbers) {
    const number = lineNumber[0];

    const area = getNumberArea(
      fileLines,
      Number(lineIndex),
      Number(lineNumber.index),
      number,
    );

    lineNumbersArea.push({ number: Number(number), area });
  }

  partSum += lineNumbersArea.reduce((acc, { number, area }) => {
    return area.match(/[^\d\.]/g) ? acc + number : acc;
  }, 0);
}

console.log(`Sum of Part Numbers: ${partSum}`);
