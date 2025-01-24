import { Camera } from "../core/camera";
import { COLOR_WHITE } from "../colorPalette";
import {
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { Point } from "../DataStructures/point";
import { GameModel } from "../gameModel";

export class Block extends RectangleGameObject {
  constructor(pos: Point) {
    super(pos, BLOCK_SIZE, TYPE_BLOCK);
  }

  clone(): Block {
    // blocks don't move so we don't need to clone the position
    return new Block(this.pos);
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
