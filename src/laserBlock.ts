
import { Camera } from "./camera";
import { BLOCK_HEIGHT, BLOCK_SCREEN_HEIGHT, BLOCK_SCREEN_WIDTH, BLOCK_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { Point } from "./point";

export class LaserBlock extends GameObject {
  private vertical: boolean;
  private color: string;
  private time: number = 0;

  constructor(x: number, y: number, vertical: boolean) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);
    this.vertical = vertical;
    this.color = 'yellow';
    this.gravity.y = 0;
  }

  update(dt: number): void {
    this.time += dt;
    if (Math.ceil(this.time) % 3 === 0) {
      this.color = 'red';
      // TODO: need a way to spawn the laser now
    } else {
      this.color = 'yellow';
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

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x + BLOCK_SCREEN_WIDTH, topY);
    ctx.stroke();
  }
} 
