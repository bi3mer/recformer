import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_SCREEN_HEIGHT, COIN_SCREEN_WIDTH, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_COIN } from "./gameObjectTypes";

export class Coin extends GameObject {
  constructor(x: number, y: number) {
    super(x + 0.25, y + 0.25, COIN_WIDTH, COIN_HEIGHT, TYPE_COIN);
  }

  update(dt: number): void {

  }

  handleCollision(otherType: number): void {
    console.log("Coin collision, I need to remove myself!");
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
