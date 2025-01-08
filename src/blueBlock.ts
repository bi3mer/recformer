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

const goneFor = 2000; // if captured, go away for `goneFor` milliseconds.

export class BlueBlock extends RectangleGameObject {
  minY: number;
  maxY: number;
  yMod: number;

  constructor(x: number, y: number) {
    super(x + 0.25, y + 0.25, COIN_WIDTH, COIN_HEIGHT, TYPE_JUMP_RESET);
    this.gravity.y = 0;
    this.yMod = Math.random() * 0.5;
    this.maxY = y + 0.3;
    this.minY = y + 0.15;
    this.velocity.y = this.yMod;
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
      const temp = this.pos.y;
      this.pos.y = 100; // place off the screen

      // This is bad, but serviceable so long as nothing more
      // complicated occurs with blue blocks in later development
      setTimeout(() => {
        this.pos.y = temp;
      }, goneFor);
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
