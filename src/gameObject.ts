export abstract class GameObject {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
