import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";

export class Coin extends GameObject {

  constructor(x: number, y: number) {
    super(x, y, COIN_WIDTH, COIN_HEIGHT);
  }

  update(dt: number): void {

  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {

  }
} 
