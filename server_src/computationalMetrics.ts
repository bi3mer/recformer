export function density(level: string[]): number {
  const solidCount = 0;
  const size = level.length;

  console.log("density function incomplete");
  return 1 - solidCount / (size * 100);
}

function contains(level: string[], type: string): number {
  let i = 0;
  const size = level.length;
  for (; i < size; ++i) {
    if (level[i].indexOf(type) > -1) return 1.0;
  }

  return 0.0;
}

export function constainsHorizontalEnemy(level: string[]): number {
  return contains(level, "H");
}

export function constainsVerticalEnemy(level: string[]): number {
  return contains(level, "V");
}

export function constainsCircleEnemy(level: string[]): number {
  return contains(level, "C");
}

export function containsLaser(level: string[]): number {
  return contains(level, "^");
}

export function constainsTurret(level: string[]): number {
  return contains(level, "V");
}
