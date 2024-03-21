import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_SCREEN_HEIGHT, COIN_SCREEN_WIDTH, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_COIN, TYPE_PLAYER } from "./gameObjectTypes";

export class Coin extends GameObject {
  constructor(x: number, y: number) {
    super(x + 0.25, y + 0.25, COIN_WIDTH, COIN_HEIGHT, TYPE_COIN);
    this.gravity.y = 0;
  }

  update(dt: number): void {

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
