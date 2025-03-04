export function rowsToColumns(lvl: string[]): string[] {
  let newLevel: string[] = [];
  if (lvl.length !== 15) {
    console.log(`Invalid number of rows: ${lvl.length}`);

    process.exit();
  }

  for (let i = 0; i < lvl[0].length; ++i) {
    newLevel.push("");
  }

  for (let y = 0; y < 15; ++y) {
    const row = lvl[y];
    for (let x = 0; x < row.length; ++x) {
      const char = row[x];
      newLevel[x] = `${char}${newLevel[x]}`;
    }
  }

  return newLevel;
}

export function columnsToRows(lvl: string[]): string[] {
  let newLevel: string[] = [];
  let y: number, x: number;
  for (y = 0; y < 15; ++y) {
    newLevel.push("");
  }

  let oldLevelLength = lvl.length;
  for (x = 0; x < oldLevelLength; ++x) {
    if (lvl[x].length !== 15) {
      console.log(`Invalid number of rows: ${lvl[x].length}`);
      process.exit();
    }

    for (y = 0; y < 15; ++y) {
      newLevel[y] = `${newLevel[y]}${lvl[x][14 - y]}`;
    }
  }

  return newLevel;
}
