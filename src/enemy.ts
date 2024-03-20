
import { Camera } from "./camera";
import { COIN_HEIGHT, COIN_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_ENEMY } from "./gameObjectTypes";

export class Enemy extends GameObject {

  constructor(x: number, y: number) {
    super(x, y, COIN_WIDTH, COIN_HEIGHT, TYPE_ENEMY);
  }

  update(dt: number): void {

  }

  handleCollision(other: GameObject): void {

  }
  render(ctx: CanvasRenderingContext2D, camera: Camera): void {

  }
} 
