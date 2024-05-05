
import { Camera } from "./camera";
import { BLOCK_HEIGHT, BLOCK_SCREEN_HEIGHT, BLOCK_SCREEN_WIDTH, BLOCK_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";

export class Laser extends GameObject {
  private vertical: boolean;
  private time: number = 0;

  constructor(x: number, y: number, vertical: boolean) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_ENEMY);
    this.vertical = vertical;
    this.gravity.y = 0;

    // TODO: need a way to raycast the engine to find how far up the laser can go
  }

  update(dt: number): void {
    this.time += dt;
    if (Math.ceil(this.time) % 3 === 0) {
      this.dead = true;
    }
  }

  handleCollision(other: GameObject): void {
    // nothing to do
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
  }
} 
