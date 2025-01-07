export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(): Point {
    return new Point(this.x, this.y);
  }

  zero(): void {
    this.x = 0;
    this.y = 0;
  }

  equals(other: Point): boolean {
    return this.x == other.x && this.y == other.y;
  }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  addInPlace(other: Point): void {
    this.x += other.x;
    this.y += other.y;
  }

  subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  subtractInPlace(other: Point): void {
    this.x -= other.x;
    this.y -= other.y;
  }

  scalarAdd(n: number): void {
    this.x += n;
    this.y += n;
  }

  scalarSubtract(n: number): void {
    this.x -= n;
    this.y -= n;
  }

  scalarMultiply(scalar: number): Point {
    return new Point(this.x * scalar, this.y * scalar);
  }

  scalarMultiplyInPlace(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  dot(other: Point): number {
    return this.x * other.x + this.y * other.y;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): void {
    const M = this.magnitude();
    this.x /= M;
    this.y /= M;
  }

  squareDistance(other: Point): number {
    return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
  }
}
