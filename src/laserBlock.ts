import { Camera } from "./camera";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
  LASER_CHARGE_TIME,
  LASER_LIFE_TIME,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";

export class LaserBlock extends GameObject {
  private spawnLaser: () => void;
  private vertical: boolean;
  private color: string;
  private time: number = 0;
  private state = 0; // 0 -> laser, 1 -> charging

  constructor(x: number, y: number, vertical: boolean, spawnLaser: () => void) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);

    this.spawnLaser = spawnLaser;
    this.vertical = vertical;
    this.color = "yellow";
    this.gravity.y = 0;
  }

  update(dt: number): void {
    this.time += dt;
    switch (this.state) {
      case 0: {
        // laser is active
        if (this.time >= LASER_LIFE_TIME) {
          this.time = 0;
          this.state = 1;
          this.color = "yellow";
        }
        break;
      }
      case 1: {
        // charge up the laser
        if (this.time >= LASER_CHARGE_TIME) {
          this.time = 0;
          this.state = 0;
          this.color = "red";
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

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, topY);
    ctx.stroke();
  }
}
