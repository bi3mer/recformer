import { Camera } from "./camera";
import { Point } from "./point";
import { GameObject } from "./gameObject";
import { rectangleIntersect, rectangleIntersectCircle } from "./util";
import { CircleGameObject } from "./circleGameObject";

// ALl game objects are rectangles, sue me
export abstract class RectangleGameObject extends GameObject {
  public size: Point;

  constructor(x: number, y: number, w: number, h: number, type: number) {
    super(new Point(x, y), type);
    this.size = new Point(w, h);
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  abstract handleCollision(other: GameObject): void;

  collision(other: GameObject): void {
    if (other instanceof RectangleGameObject) {
      if (rectangleIntersect(this.pos, this.size, other.pos, other.size)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    } else if (other instanceof CircleGameObject) {
      if (rectangleIntersectCircle(this.pos, this.size, other.pos, other.r)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    }
  }
}
