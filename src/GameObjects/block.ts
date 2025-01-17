import { Camera } from "../core/camera";
import { COLOR_WHITE } from "../colorPalette";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { RectangleGameObject } from "../core/rectangleGameObject";

export class Block extends RectangleGameObject {
  constructor(x: number, y: number) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);
  }

  clone(): Block {
    return new Block(this.pos.x, this.pos.y);
  }

  update(dt: number): void {}

  handleCollision(other: GameObject): void {
    // Nothing happens, the block is static
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.strokeStyle = COLOR_WHITE;
    ctx.strokeRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      BLOCK_SCREEN_WIDTH,
      BLOCK_SCREEN_HEIGHT,
    );
  }
}
