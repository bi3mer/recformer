import { Camera } from "../core/camera";
import { GameObject } from "../core/gameObject";
import { TYPE_BULLET } from "./gameObjectTypes";
import { Point } from "../core/point";
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_WIDTH,
  BULLET_SCREEN_WIDTH,
  BULLET_SCREEN_HEIGHT,
} from "../core/constants";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { COLOR_ORANGE } from "../colorPalette";

export class Bullet extends RectangleGameObject {
  constructor(x: number, y: number, target: Point) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT, TYPE_BULLET);
    this.gravity.y = 0;

    this.velocity = target.subtract(this.pos);
    this.velocity.normalize();
    this.velocity.scalarMultiplyInPlace(BULLET_SPEED);
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
