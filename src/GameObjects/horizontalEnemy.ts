import {
  Point,
  pointAdd,
  pointAddScalarInPlace,
  pointClone,
  pointMultiplyScalar,
  pointSubtract,
} from "../DataStructures/point";
import { COLOR_ORANGE } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  ENEMY_SCREEN_HEIGHT,
  ENEMY_SCREEN_WIDTH,
  HORIZONTAL_ENEMY_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { boolToSign } from "../core/util";
import { TYPE_BLOCK, TYPE_BULLET, TYPE_ENEMY } from "./gameObjectTypes";

export class HorizontalEnemy extends RectangleGameObject {
  private maxColumns: number;

  constructor(pos: Point, maxColumns: number, velocityX: number) {
    super(pos, HORIZONTAL_ENEMY_SIZE, TYPE_ENEMY);
    this.maxColumns = maxColumns;
    this.velocity.x = velocityX;
    this.gravity.y = 0;
  }

  static defaultConstructor(pos: Point, maxColumns: number): HorizontalEnemy {
    pointAddScalarInPlace(pos, 0.25);
    return new HorizontalEnemy(pos, maxColumns, 3);
  }

  clone(): GameObject {
    return new HorizontalEnemy(
      pointClone(this.pos),
      this.maxColumns,
      this.velocity.x,
    );
  }

  update(dt: number): void {
    this.velocity.x *= boolToSign(
      this.pos.x >= 0 && this.pos.x <= this.maxColumns,
    );
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_BLOCK) {
      this.rectangleCollisionResolution(other as RectangleGameObject);
    } else if (other.type === TYPE_BULLET) {
      this.dead = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = COLOR_ORANGE;
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      ENEMY_SCREEN_WIDTH,
      ENEMY_SCREEN_HEIGHT,
    );
  }
}
