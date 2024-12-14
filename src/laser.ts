import { Camera } from "./camera";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
  LASER_LIFE_TIME,
  LASER_SCREEN_WIDTH,
  LASER_WIDTH,
  TILE_SIZE,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";

export class Laser extends GameObject {
  private vertical: boolean;
  private time: number = 0;

  constructor(x: number, y: number, vertical: boolean, extension: number) {
    super(
      x + (BLOCK_WIDTH - LASER_WIDTH) / 2,
      y,
      LASER_WIDTH,
      extension,
      TYPE_ENEMY,
    );

    this.vertical = vertical; // TODO: not supported... yet
    this.gravity.y = 0;
  }

  update(dt: number): void {
    this.time += dt;
    if (this.time >= LASER_LIFE_TIME) {
      this.dead = true;
    }
  }

  handleCollision(other: GameObject): void {
    // nothing to do
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y + 1),
      LASER_SCREEN_WIDTH,
      -this.size.y * TILE_SIZE,
    );
  }
}
