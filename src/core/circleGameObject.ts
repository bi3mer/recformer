import { rectangleIntersectCircle } from "../core/util";
import { Camera } from "../core/camera";
import { Point } from "../core/point";
import { GameObject } from "./gameObject";
import { RectangleGameObject } from "./rectangleGameObject";

// ALl game objects are rectangles, sue me
export abstract class CircleGameObject extends GameObject {
  public r: number;

  constructor(x: number, y: number, radius: number, type: number) {
    super(new Point(x, y), type);
    this.r = radius;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  abstract handleCollision(other: GameObject): void;

  collision(other: GameObject): void {
    if (other instanceof RectangleGameObject) {
      if (rectangleIntersectCircle(other.pos, other.size, this.pos, this.r)) {
        this.handleCollision(other);
        other.handleCollision(this);
      }
    }
    // @NOTE: Circles Colliding with Circles
    // Technically, a circle could colide with a circle, but there is no behavior
    // in the game where that matters. Therefore, circles colliding with circles
    // is not currently implemented.
  }
}
