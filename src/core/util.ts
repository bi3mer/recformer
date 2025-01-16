import { Point } from "./point";

export function lerp(a: number, b: number, percent: number) {
  return (1 - percent) * a + percent * b;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min + 1) + min;
}

// randomly return -1 or 1
export function randomSign(): number {
  return Math.sign(Math.random() - 0.5);
}

export function randomBool(): boolean {
  return Math.random() < 0.5;
}

// Clamp num between min and max. This function does not check to see if min
// is less than max.
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function rectangleIntersectCircle(
  rec: Point,
  dimensions: Point,
  circle: Point,
  radius: number,
): boolean {
  const closest = new Point(
    clamp(circle.x, rec.x, rec.x + dimensions.x),
    clamp(circle.y, rec.y, rec.y + dimensions.y),
  );
  const dist = circle.subtract(closest);
  return dist.squareComponents() < radius * radius;
}

export function rectangleIntersect(
  a: Point,
  sizeA: Point,
  b: Point,
  sizeB: Point,
): boolean {
  const ax1 = a.x;
  const ay1 = a.y;
  const ax2 = ax1 + sizeA.x;
  const ay2 = ay1 + sizeA.y;

  const bx1 = b.x;
  const by1 = b.y;
  const bx2 = bx1 + sizeB.x;
  const by2 = by1 + sizeB.y;

  return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
}

export function randomKey(d: { [key: string]: any }): any {
  const keys = Object.keys(d);
  return keys[Math.floor(Math.random() * keys.length)];
}
