export function density(level: string[]): number {
  const solidCount = 0;
  const size = level.length;

  console.log("density function incomplete");
  return 1 - solidCount / (size * 100);
}

function countOccurrences(level: string[], typeChar: string): number {
  let i = 0;
  let jj = 0;
  let c = 0;
  const size = level.length;
  const rowLength = level[0].length;
  for (; i < size; ++i) {
    const row = level[i];

    for (jj = 0; jj < rowLength; ++jj) {
      // @ts-ignore
      c += row[jj] === typeChar;
    }
  }

  return c;
}

export function horizontalEnemies(level: string[]): number {
  return countOccurrences(level, "H");
}

export function verticalEnemies(level: string[]): number {
  return countOccurrences(level, "V");
}

export function cirleEnemies(level: string[]): number {
  return countOccurrences(level, "C");
}

export function lasers(level: string[]): number {
  return countOccurrences(level, "^");
}

export function turrets(level: string[]): number {
  return countOccurrences(level, "T");
}

export function coins(level: string[]): number {
  return countOccurrences(level, "o");
}

export function blueBlocks(level: string[]): number {
  return countOccurrences(level, "b");
}

export function gaps(level: string[]): number {
  const lastRow = level[level.length - 1];
  let c = 0;
  for (let i = 0; i < lastRow.length; ++i) {
    c += lastRow[i] === "-";
  }

  return c;
}

export function ucurveDensity(level: string[]): number {
  let i = 0;
  let jj = 0;
  let c = 0;
  const size = level.length;
  const rowLength = level[0].length;
  for (; i < size; ++i) {
    const row = level[i];

    for (jj = 0; jj < rowLength; ++jj) {
      const char = row[jj];
      c += char === "X" || char === "^";
    }
  }

  const H = (size * rowLength) / 2;
  return Math.pow(c - H, 2) / (H * H);
}

export function inverseDensity(level: string[]): number {
  let i = 0;
  let jj = 0;
  let c = 0;

  const size = level.length;
  const rowLength = level[0].length;

  for (; i < size; ++i) {
    const row = level[i];

    for (jj = 0; jj < rowLength; ++jj) {
      const char = row[jj];
      c += char === "X" || char === "^";
    }
  }

  const area = size * rowLength;
  return 1 - c / area;
}
