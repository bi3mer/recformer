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
      const d = pointSubtract(
        pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)),
        pointAdd(other.pos, pointMultiplyScalar(other.size, 0.5)),
      );

      const averageSize = pointAdd(this.size, other.size);
      pointMultiplyScalar(averageSize, 0.5);

      if (Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)) {
        this.velocity.x *= -1;
        if (d.x < 0) {
          this.pos.x = other.pos.x - this.size.x;
        } else {
          this.pos.x = other.pos.x + other.size.x;
        }
      }
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
