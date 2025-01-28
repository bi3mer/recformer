import { Point } from "../DataStructures/point";
import { COLOR_WHITE } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";

export class Block extends RectangleGameObject {
  constructor(pos: Point) {
    super(pos, BLOCK_SIZE, TYPE_BLOCK);
  }

  clone(): Block {
    // blocks don't move so we don't need to clone the position
    throw new Error("Block.clone should not have been called!");
  }

  update(dt: number): void {}
  handleCollision(other: GameObject): void {}

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = COLOR_WHITE;
    ctx.strokeRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      BLOCK_SCREEN_WIDTH,
      BLOCK_SCREEN_HEIGHT,
    );
  }
}
