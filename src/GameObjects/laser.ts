import { audioLaser } from "../core/audio";
import { Camera } from "../core/camera";
import { COLOR_ORANGE } from "../colorPalette";
import {
  BLOCK_WIDTH,
  LASER_LIFE_TIME,
  LASER_SCREEN_WIDTH,
  LASER_WIDTH,
  TILE_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";
import { RectangleGameObject } from "../core/rectangleGameObject";

export class Laser extends RectangleGameObject {
  private time: number;

  constructor(x: number, y: number, height: number, time: number) {
    super(x, y, LASER_WIDTH, height, TYPE_ENEMY);

    this.gravity.y = 0;
    this.time = time;
  }

  static defaultConstructor(x: number, y: number, height: number): Laser {
    return new Laser(x + (BLOCK_WIDTH - LASER_WIDTH) / 2, y, height, 0);
  }

  clone(): GameObject {
    return new Laser(this.pos.x, this.pos.y, this.size.y, this.time);
  }

  update(dt: number): void {
    audioLaser();
    this.time += dt;
    this.dead = this.time >= LASER_LIFE_TIME;
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
