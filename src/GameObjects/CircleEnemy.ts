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
import { TYPE_BULLET, TYPE_ENEMY, TYPE_PLAYER } from "./gameObjectTypes";
import { Point, pointClone } from "../DataStructures/point";
import { Logger } from "../logger";

export class CircleEnemy extends CircleGameObject {
  angle: number;
  start: Point;

  constructor(pos: Point, angle: number, startPos: Point, velocity: Point) {
    super(pos, CIRCLE_RADIUS, TYPE_ENEMY);
    this.gravity.y = 0;
    this.angle = angle;
    this.start = startPos;
    this.velocity = velocity;
  }

  static defaultConstructor(pos: Point) {
    return new CircleEnemy(pos, 0, pointClone(pos), new Point(0, 0));
  }

  clone(): GameObject {
    return new CircleEnemy(
      pointClone(this.pos),
      this.angle,
      this.start, // this will never change, so we can avoid a clone
      pointClone(this.velocity),
    );
  }

  update(dt: number): void {
    this.angle += dt;
    this.velocity.x = 2 * CIRCLE_MOVE_RADIUS * Math.cos(this.angle);
    this.velocity.y = CIRCLE_MOVE_RADIUS * Math.sin(this.angle);
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - circle enemy";
    } else {
      this.dead = other.type === TYPE_BULLET;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
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
