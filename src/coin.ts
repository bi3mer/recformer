import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_COIN } from "./gameObjectTypes";

export class Coin extends GameObject {

  constructor(x: number, y: number) {
    super(x, y, COIN_WIDTH, COIN_HEIGHT, TYPE_COIN);
  }

  update(dt: number): void {

  }

  handleCollision(otherType: number): void {

  }
  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      this.size.x,
      this.size.y
    );
  }
} 
