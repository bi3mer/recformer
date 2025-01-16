import { Camera } from "../core/camera";
import { CircleGameObject } from "../core/circleGameObject";
import { COLOR_ORANGE } from "../colorPalette";
import {
  CIRCLE_MOVE_RADIUS,
  CIRCLE_RADIUS,
  CIRCLE_SCREEN_RADIUS,
  TWO_PI,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_BULLET, TYPE_ENEMY } from "./gameObjectTypes";
import { Point } from "../DataStructures/point";

export class CircleEnemy extends CircleGameObject {
  angle: number = 0;
  start: Point;

  constructor(x: number, y: number) {
    super(x, y, CIRCLE_RADIUS, TYPE_ENEMY);
    this.start = new Point(x, y);
    this.gravity.y = 0;
  }

  update(dt: number): void {
    this.angle += dt;
    this.velocity.x = 2 * CIRCLE_MOVE_RADIUS * Math.cos(this.angle);
    this.velocity.y = CIRCLE_MOVE_RADIUS * Math.sin(this.angle);
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_BULLET) {
      this.dead = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // COLOR_STILETTO
    ctx.fillStyle = COLOR_ORANGE;
    ctx.beginPath();
    ctx.arc(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      CIRCLE_SCREEN_RADIUS,
      0,
      TWO_PI,
    );
    ctx.fill();
  }
}
