import { Camera } from "./camera";
import {
  BULLET_SPEED,
  COIN_HEIGHT,
  COIN_SCREEN_HEIGHT,
  COIN_SCREEN_WIDTH,
  COIN_WIDTH,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";
import { Point } from "./point";

export class Bullet extends GameObject {
  constructor(x: number, y: number, target: Point) {
    super(x, y + 1.25, COIN_WIDTH, COIN_HEIGHT, TYPE_ENEMY);
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
      COIN_SCREEN_WIDTH,
      COIN_SCREEN_HEIGHT,
    );
  }
}
