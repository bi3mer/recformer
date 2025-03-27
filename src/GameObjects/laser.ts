import { Point } from "../DataStructures/point";
import { COLOR_ORANGE } from "../colorPalette";
import { audioLaser } from "../core/audio";
import { Camera } from "../core/camera";
import {
  BLOCK_WIDTH,
  LASER_LIFE_TIME,
  LASER_SCREEN_WIDTH,
  LASER_WIDTH,
  TILE_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { Logger } from "../logger";
import { TYPE_ENEMY, TYPE_PLAYER } from "./gameObjectTypes";

export class Laser extends RectangleGameObject {
  private time: number;

  constructor(pos: Point, size: Point, time: number) {
    super(pos, size, TYPE_ENEMY);

    this.gravity.y = 0;
    this.time = time;
  }

  static defaultConstructor(pos: Point, height: number): Laser {
    pos.x += (BLOCK_WIDTH - LASER_WIDTH) / 2; // shift towards middle of the block
    return new Laser(pos, new Point(LASER_WIDTH, height), 0);
  }

  clone(): GameObject {
    // Lasers do not move so we don't need to clone the position
    return new Laser(this.pos, this.size, this.time);
  }

  update(dt: number): void {
    audioLaser();
    this.time += dt;
    this.dead = this.time >= LASER_LIFE_TIME;
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_PLAYER) {
      Logger.result = "lost - laser";
    }
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
