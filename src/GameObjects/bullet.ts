import { Camera } from "../core/camera";
import { GameObject } from "../core/gameObject";
import { TYPE_BULLET } from "./gameObjectTypes";
import {
  Point,
  pointClone,
  pointMultiplyScalarInPlace,
  pointNormalizeInPlace,
  pointSubtract,
} from "../DataStructures/point";
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_WIDTH,
  BULLET_SCREEN_WIDTH,
  BULLET_SCREEN_HEIGHT,
  BULLET_SIZE,
} from "../core/constants";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { COLOR_ORANGE } from "../colorPalette";

export class Bullet extends RectangleGameObject {
  constructor(pos: Point, velocity: Point) {
    super(pos, BULLET_SIZE, TYPE_BULLET);
    this.gravity.y = 0;
    this.velocity = velocity;
  }

  static defaultConstructor(pos: Point, target: Point): Bullet {
    const velocity = pointSubtract(target, pos);
    pointNormalizeInPlace(velocity);
    pointMultiplyScalarInPlace(velocity, BULLET_SPEED);

    return new Bullet(pos, velocity);
  }

  clone(): GameObject {
    return new Bullet(pointClone(this.pos), pointClone(this.velocity));
  }

  update(dt: number): void {}

  handleCollision(other: GameObject): void {
    this.dead = true;
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      BULLET_SCREEN_WIDTH,
      BULLET_SCREEN_HEIGHT,
    );
  }
}
