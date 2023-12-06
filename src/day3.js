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
  for (const number of lineNumbers) {
    const area = getNumberArea(
      fileLines,
      Number(lineIndex),
      Number(number.index),
      number[0],
    );
    lineNumbersArea.push({ number: Number(number[0]), area });
  }

  const lineSum = lineNumbersArea.reduce((acc, { number, area }) => {
    if (area.match(/[*&\+\-#@$/=%]/g)) {
      return acc + number;
    }

    return acc;
  }, 0);

  partSum += lineSum;
}

console.log(`Sum of Part Numbers: ${partSum}`);
