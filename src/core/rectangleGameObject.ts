import { rectangleIntersect, rectangleIntersectCircle } from "../core/util";
import { Camera } from "../core/camera";
import { Point, pointAdd, pointMultiplyScalar, pointSubtract } from "../DataStructures/point";
import { GameObject } from "./gameObject";
import { CircleGameObject } from "./circleGameObject";

export abstract class RectangleGameObject extends GameObject {
  public size: Point;

  constructor(pos: Point, size: Point, type: number) {
    super(pos, type);
    this.size = size;
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
  
  rectangleCollisionResolution(other: RectangleGameObject): void { 
    const d = pointSubtract(
      pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)),
      pointAdd(other.pos, pointMultiplyScalar(other.size, 0.5)),
    );

    const averageSize = pointAdd(this.size, other.size);
    pointMultiplyScalar(averageSize, 0.5);

    if (Math.abs(d.x / this.size.x) < Math.abs(d.y / this.size.y)) {
      this.velocity.y *= -1;
      if (d.y > 0) {
        this.pos.y = other.pos.y + other.size.y;
      } else {
        this.pos.y = other.pos.y - this.size.y;
      }
    }
    
  }
}
