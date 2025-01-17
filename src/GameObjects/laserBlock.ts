import { Camera } from "../core/camera";
import { COLOR_ORANGE, COLOR_WHITE, COLOR_YELLOW } from "../colorPalette";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
  LASER_CHARGE_TIME,
  LASER_LIFE_TIME,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { Point } from "../DataStructures/point";
import { RectangleGameObject } from "../core/rectangleGameObject";

export class LaserBlock extends RectangleGameObject {
  private spawnLaser: () => void;
  private color: string;
  private playerPos: Point;
  private time: number = 0;
  private state = 0; // 0 -> laser, 1 -> charging

  constructor(
    x: number,
    y: number,
    playerPos: Point,
    spawnLaser: () => void,
    state: number = 0,
    time: number = 0,
  ) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);

    this.playerPos = playerPos;
    this.spawnLaser = spawnLaser;
    this.color = COLOR_YELLOW;
    this.gravity.y = 0;
    this.state = state;
    this.time = time;
  }

  // A more complete version would also pass the color, but clone is used in a
  // context where the game state is not rendered, so we don't care about the
  // color.
  clone(): GameObject {
    return new LaserBlock(
      this.pos.x,
      this.pos.y,
      this.playerPos,
      this.spawnLaser,
      this.state,
      this.time,
    );
  }

  update(dt: number): void {
    if (this.pos.squareDistance(this.playerPos) > 150) {
      this.state = 0;
    }

    this.time += dt;
    switch (this.state) {
      case 0: {
        // laser is active
        if (this.time >= LASER_LIFE_TIME) {
          this.time = 0;
          this.state = 1;
          this.color = COLOR_YELLOW;
        }
        break;
      }
      case 1: {
        // charge up the laser
        if (this.time >= LASER_CHARGE_TIME) {
          this.time = 0;
          this.state = 0;
          this.color = COLOR_ORANGE;
          this.spawnLaser();
        }
        break;
      }
      default: {
        console.error(`Should not be able to enter state ${this.state}`);
        this.state = 0; // no need to break on this behavior
        break;
      }
    }
  }

  handleCollision(other: GameObject): void {
    // Nothing happens, the block is static
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.strokeStyle = this.color;
    const x = camera.columnToScreen(this.pos.x);
    const topY = camera.rowToScreen(this.pos.y);
    const botY = topY + BLOCK_SCREEN_HEIGHT;

    ctx.beginPath();
    ctx.moveTo(x, botY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH / 2, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, botY);
    ctx.lineTo(x, botY);
    ctx.stroke();

    ctx.strokeStyle = COLOR_WHITE;
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, topY);
    ctx.stroke();
  }
}
