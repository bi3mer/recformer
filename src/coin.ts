import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_SCREEN_HEIGHT, COIN_SCREEN_WIDTH, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_COIN, TYPE_PLAYER } from "./gameObjectTypes";

export class Coin extends GameObject {
  minY: number;
  maxY: number;
  yMod: number;

  constructor(x: number, y: number) {
    super(x + 0.25, y + 0.25, COIN_WIDTH, COIN_HEIGHT, TYPE_COIN);
    this.gravity.y = 0;
    this.yMod = Math.random() * 0.5;
    this.maxY = y + 0.3;
    this.minY = y + 0.15;
    this.velocity.y = this.yMod;
  }

  update(dt: number): void {
    if (this.pos.y >= this.maxY) {
      this.velocity.y = -this.yMod;
    } else if (this.pos.y <= this.minY) {
      this.velocity.y = this.yMod;
    }
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_PLAYER) {
      this.dead = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      COIN_SCREEN_WIDTH,
      COIN_SCREEN_HEIGHT
    );
  }
} 
