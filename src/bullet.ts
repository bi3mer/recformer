import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";
import { Point } from "./point";
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_WIDTH,
  BULLET_SCREEN_WIDTH,
  BULLET_SCREEN_HEIGHT,
} from "./constants";

export class Bullet extends GameObject {
  constructor(x: number, y: number, target: Point) {
    super(x, y, BULLET_WIDTH, BULLET_HEIGHT, TYPE_ENEMY);
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
    ctx.fillStyle = "red";
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      BULLET_SCREEN_WIDTH,
      BULLET_SCREEN_HEIGHT,
    );
  }
}
