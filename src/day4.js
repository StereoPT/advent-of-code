import fs from 'node:fs/promises';

// ***** Functions ***** //
const calculateScore = (score) => {
  if (score === 0) return 0;
  if (score === 1) return 1;

  return Math.pow(2, score - 1 < 0 ? 0 : score - 1);
};

const countWinningNumbers = (winningNumbers, myNumbers) => {
  let count = 0;
  for (const winningNumber of winningNumbers) {
    for (const myNumber of myNumbers) {
      if (Number(myNumber) === Number(winningNumber)) {
        count++;
        break;
      }
    }
  }
  return count;
};

const getNumbersArray = (numbers) => numbers.match(/(\d+)/g);

const extractScratchcardNumbers = (line) => {
  const [id, game] = line.split(':');
  return game.split(' | ');
};

console.log('AdventOfCode - Day 4: Scratchcards');

const file = await fs.readFile('./resources/day4_input.txt', 'utf-8');
const fileLines = file.split('\n');

let score = 0;
for (const line of fileLines) {
  if (!line) continue;

  const [winningNumbers, myNumbers] = extractScratchcardNumbers(line);

  const winningNumbersArray = getNumbersArray(winningNumbers);
  const myNumbersArray = getNumbersArray(myNumbers);

  const scratchcardWin = countWinningNumbers(
    winningNumbersArray,
    myNumbersArray,
  );

  score += calculateScore(scratchcardWin);
}

console.log(`Scratchcards Score: ${score}`);
