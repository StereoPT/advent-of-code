import fs from 'node:fs/promises';

// ***** Constrants ***** //
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

// ***** Functions ***** //
const extractNumber = (string, color) =>
  string ? Number(string.replace(color, '').trim()) : 0;

const isRoundValid = (round) => {
  const red = extractNumber(round.match(/\d+ red/g)?.[0], 'red');
  const green = extractNumber(round.match(/\d+ green/g)?.[0], 'green');
  const blue = extractNumber(round.match(/\d+ blue/g)?.[0], 'blue');

  return red <= maxRed && green <= maxGreen && blue <= maxBlue;
};

const cubeExtractor = (line) => {
  const [id, game] = line.split(':');
  const gameID = Number(id.split('Game ')[1]);

  const rounds = game.split(';');
  const gameValid = rounds.every(isRoundValid);

  return [gameValid, gameID];
};

console.log('AdventOfCode - Day 2: Cube Conundrum');

const file = await fs.readFile('./resources/day2_input.txt', 'utf-8');
const fileLines = file.split('\n');

let sumValidGames = 0;
for (const line of fileLines) {
  if (!line) continue;

  const [gameValid, gameID] = cubeExtractor(line);
  if (gameValid) sumValidGames += gameID;
}

console.log(`Total Valid Games: ${sumValidGames}`);
