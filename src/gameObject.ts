import { Camera } from "./camera";
import { Point } from "./point";

// ALl game objects are rectangles, sue me
export abstract class GameObject {
  public pos: Point;
  public size: Point;

  constructor(x: number, y: number, w: number, h: number) {
    this.pos = new Point(x, y);
    this.size = new Point(w, h);
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;

  collision(other: GameObject): boolean {
    const ax1 = this.pos.x;
    const ay1 = this.pos.y;
    const ax2 = ax1 + this.size.x;
    const ay2 = ay1 + this.size.y;

    const bx1 = other.pos.x;
    const by1 = other.pos.y;
    const bx2 = bx1 + other.size.x;
    const by2 = by1 + other.size.y;

    return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
  }
}
