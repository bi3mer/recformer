import { Camera } from "../core/camera";
import {
  COIN_SCREEN_HEIGHT,
  COIN_SCREEN_WIDTH,
  COIN_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_PLAYER, TYPE_JUMP_RESET } from "./gameObjectTypes";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { COLOR_LIGHT_BLUE } from "../colorPalette";
import {
  Point,
  pointAddScalarInPlace,
  pointClone,
} from "../DataStructures/point";
import { GameModel } from "../gameModel";

const OFF_SCREEN_POS_Y = 1000;
const TIME_OFF_SCREEN = 2; // seconds

export class BlueBlock extends RectangleGameObject {
  minY: number;
  maxY: number;
  yMod: number;
  timeGone: number;

  constructor(
    pos: Point,
    yMod: number,
    minY: number,
    maxY: number,
    velocityY: number,
    timeGone: number,
  ) {
    super(pos, COIN_SIZE, TYPE_JUMP_RESET);
    this.gravity.y = 0;
    this.yMod = yMod;
    this.minY = minY;
    this.maxY = maxY;
    this.velocity.y = velocityY;
    this.timeGone = timeGone;
  }

  static defaultConstructor(pos: Point): BlueBlock {
    const yMod = Math.random() * 0.5;
    pointAddScalarInPlace(pos, 0.25);
    return new BlueBlock(pos, yMod, pos.y + 0.15, pos.y + 0.3, yMod, 0);
  }

  clone(): GameObject {
    return new BlueBlock(
      pointClone(this.pos),
      this.yMod,
      this.minY,
      this.maxY,
      this.velocity.y,
      this.timeGone,
    );
  }

  update(dt: number): void {
    if (this.pos.y > 100) {
      this.timeGone += dt;
      if (this.timeGone >= TIME_OFF_SCREEN) {
        this.pos.y = this.maxY;
        this.velocity.y = -this.yMod;
      }
    } else {
      if (this.pos.y >= this.maxY) {
        this.velocity.y = -this.yMod;
      } else if (this.pos.y <= this.minY) {
        this.velocity.y = this.yMod;
      }
    }
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_PLAYER) {
      this.pos.y = OFF_SCREEN_POS_Y;
      this.timeGone = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_LIGHT_BLUE;
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      COIN_SCREEN_WIDTH,
      COIN_SCREEN_HEIGHT,
    );
  }
}
