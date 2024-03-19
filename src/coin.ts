import { Camera } from "./camera";
import { GameObject } from "./gameObject";

export class Coin extends GameObject {

  constructor(x: number, y: number) {
    super(x, y);
  }

  update(dt: number): void {

  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {

  }
} 
