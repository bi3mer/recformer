export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export function pointClone(p: Point): Point {
  return new Point(p.x, p.y);
}

export function pointZeroOut(p: Point): void {
  p.x = 0;
  p.y = 0;
}

export function pointEquals(p1: Point, p2: Point): boolean {
  return p1.x == p2.x && p1.y == p2.y;
}

export function pointAdd(p1: Point, p2: Point): Point {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}

export function pointAddInPlace(p1: Point, p2: Point): void {
  p1.x += p2.x;
  p1.y += p2.y;
}

export function pointSubtract(p1: Point, p2: Point): Point {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}

export function pointSubtractInPlace(p1: Point, p2: Point): void {
  p1.x -= p2.x;
  p1.y -= p2.y;
}

export function pointAddScalarInPlace(p: Point, n: number): void {
  p.x += n;
  p.y += n;
}

export function pointSubtractScalarInPlace(p: Point, n: number): void {
  p.x -= n;
  p.y -= n;
}

export function pointMultiplyScalar(p: Point, scalar: number): Point {
  return new Point(p.x * scalar, p.y * scalar);
}

export function pointMultiplyScalarInPlace(p: Point, scalar: number): void {
  p.x *= scalar;
  p.y *= scalar;
}

export function pointDotProduct(p1: Point, p2: Point): number {
  return p1.x * p2.x + p1.y * p2.y;
}

export function pointSquareComponents(p: Point): number {
  return p.x * p.x + p.y * p.y;
}

export function pointMagnitude(p: Point): number {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

export function pointNormalizeInPlace(p: Point): void {
  const M = pointMagnitude(p);
  p.x /= M;
  p.y /= M;
}

export function pointSquareDistance(p1: Point, p2: Point): number {
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;
  return x * x + y * y;
}

export function pointEuclideanDistance(p1: Point, p2: Point): number {
  console.log(
    `(${pointStr(p1)}) -> ${pointStr(p2)} = ${Math.sqrt(pointSquareDistance(p1, p2))}`,
  );
  return Math.sqrt(pointSquareDistance(p1, p2));
}

export function pointAngle(p1: Point, p2: Point): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

export function pointStr(p: Point): string {
  return `${p.x},${p.y}`;
}
