import fs from 'node:fs/promises';

// ***** Functions ***** //
const joinNumbers = (numbers) => numbers[0] + numbers[1];

const numberExtractor = (line) => {
  const matches = line.match(/\d/g);
  const firstDigit = matches.at(0);
  const lastDigit = matches.at(-1) || firstDigit;

  return [firstDigit, lastDigit];
};

console.log('AdventOfCode - Day 1: Trebuchet?!');

const file = await fs.readFile('./resources/day1_input.txt', 'utf-8');
const fileLines = file.split('\n');

let totalSum = 0;
for (const line of fileLines) {
  if (!line) continue;

  const numbers = numberExtractor(line);
  const numberSum = joinNumbers(numbers);

  totalSum += parseInt(numberSum);
}

console.log(`Total Sum: ${totalSum}`);
