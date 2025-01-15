import { Camera } from "./camera";
import {
  COIN_HEIGHT,
  COIN_SCREEN_HEIGHT,
  COIN_SCREEN_WIDTH,
  COIN_WIDTH,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_PLAYER, TYPE_JUMP_RESET } from "./gameObjectTypes";
import { RectangleGameObject } from "./rectangleGameObject";
import { COLOR_LIGHT_BLUE } from "./colorPalette";

const OFF_SCREEN_POS_Y = 1000;
const TIME_OFF_SCREEN = 2; // seconds

export class BlueBlock extends RectangleGameObject {
  minY: number;
  maxY: number;
  yMod: number;
  timeGone: number;

  constructor(x: number, y: number) {
    super(x + 0.25, y + 0.25, COIN_WIDTH, COIN_HEIGHT, TYPE_JUMP_RESET);
    this.gravity.y = 0;
    this.yMod = Math.random() * 0.5;
    this.maxY = y + 0.3;
    this.minY = y + 0.15;
    this.pos.y = this.minY;
    this.velocity.y = this.yMod;
    this.timeGone = 0;
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
