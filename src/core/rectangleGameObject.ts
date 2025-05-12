import { rectangleIntersect, rectangleIntersectCircle } from "../core/util";
import { Camera } from "../core/camera";
import { Point } from "../DataStructures/point";
import { GameObject } from "./gameObject";
import { CircleGameObject } from "./circleGameObject";
import { GameModel } from "../gameModel";
import { TYPE_BLOCK, TYPE_COIN } from "../GameObjects/gameObjectTypes";

export abstract class RectangleGameObject extends GameObject {
  public size: Point;

  constructor(pos: Point, size: Point, type: number) {
    super(pos, type);
    this.size = size;

    this.leftX = this.pos.x;
    this.rightX = this.pos.x + size.x;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  abstract handleCollision(other: GameObject): void;

  updateLeftRight(): void {
    this.leftX = this.pos.x;
    this.rightX = this.pos.x + this.size.x;
  }

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
