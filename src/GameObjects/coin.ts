import {
  Point,
  pointAddScalarInPlace,
  pointClone,
} from "../DataStructures/point";
import { COLOR_YELLOW } from "../colorPalette";
import { audioCoin } from "../core/audio";
import { Camera } from "../core/camera";
import {
  COIN_SCREEN_HEIGHT,
  COIN_SCREEN_WIDTH,
  COIN_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { TYPE_COIN, TYPE_PLAYER } from "./gameObjectTypes";

export class Coin extends RectangleGameObject {
  minY: number;
  maxY: number;
  yMod: number;

  constructor(
    pos: Point,
    yMod: number,
    maxY: number,
    minY: number,
    velocityY: number,
    dead: boolean = false,
  ) {
    super(pos, COIN_SIZE, TYPE_COIN);
    this.gravity.y = 0;
    this.yMod = yMod;
    this.maxY = maxY;
    this.minY = minY;
    this.velocity.y = velocityY;

    // coins are the only game object where a reference to them is kept even
    // after they have been removed from the game scene, since this is
    // relevan to the A* search
    this.dead = dead;
  }

  static defaultConstructor(pos: Point): Coin {
    const yMod = Math.random() * 0.5;
    pos.x += 0.25;
    pos.y -= 0.25;
    return new Coin(pos, Math.random() * 0.5, pos.y + 0.3, pos.y + 0.15, yMod);
  }

  clone(): GameObject {
    return new Coin(
      pointClone(this.pos),
      this.yMod,
      this.maxY,
      this.minY,
      this.velocity.y,
      this.dead,
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
