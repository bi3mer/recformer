import { audioCoin } from "../core/audio";
import { Camera } from "../core/camera";
import { COLOR_YELLOW } from "../colorPalette";
import {
  COIN_HEIGHT,
  COIN_SCREEN_HEIGHT,
  COIN_SCREEN_WIDTH,
  COIN_WIDTH,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_COIN, TYPE_PLAYER } from "./gameObjectTypes";
import { RectangleGameObject } from "../core/rectangleGameObject";

export class Coin extends RectangleGameObject {
  minY: number;
  maxY: number;
  yMod: number;

  constructor(
    x: number,
    y: number,
    yMod: number,
    maxY: number,
    minY: number,
    velocityY: number,
  ) {
    super(x, y, COIN_WIDTH, COIN_HEIGHT, TYPE_COIN);
    this.gravity.y = 0;
    this.yMod = yMod;
    this.maxY = maxY;
    this.minY = minY;
    this.velocity.y = velocityY;
  }

  static defaultConstructor(x: number, y: number): Coin {
    const yMod = Math.random() * 0.5;
    return new Coin(
      x + 0.25,
      y + 0.25,
      Math.random() * 0.5,
      y + 0.3,
      y + 0.15,
      yMod,
    );
  }

  clone(): GameObject {
    return new Coin(
      this.pos.x,
      this.pos.y,
      this.yMod,
      this.maxY,
      this.minY,
      this.velocity.y,
    );
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
      audioCoin();
      this.dead = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_YELLOW;
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      COIN_SCREEN_WIDTH,
      COIN_SCREEN_HEIGHT,
    );
  }
}
