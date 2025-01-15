import { audioLaser } from "./audio";
import { Camera } from "./camera";
import { COLOR_ORANGE } from "./colorPalette";
import {
  BLOCK_WIDTH,
  LASER_LIFE_TIME,
  LASER_SCREEN_WIDTH,
  LASER_WIDTH,
  TILE_SIZE,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";
import { RectangleGameObject } from "./rectangleGameObject";

export class Laser extends RectangleGameObject {
  private time: number = 0;

  constructor(x: number, y: number, extension: number) {
    super(
      x + (BLOCK_WIDTH - LASER_WIDTH) / 2,
      y,
      LASER_WIDTH,
      extension,
      TYPE_ENEMY,
    );

    this.gravity.y = 0;
  }

  update(dt: number): void {
    audioLaser();
    this.time += dt;
    if (this.time >= LASER_LIFE_TIME) {
      this.dead = true;
    }
  }

  handleCollision(other: GameObject): void {
    // nothing to do
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      LASER_SCREEN_WIDTH,
      this.size.y * TILE_SIZE,
    );
  }
}
