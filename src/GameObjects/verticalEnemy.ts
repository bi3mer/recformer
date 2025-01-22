import {
  Point,
  pointAdd,
  pointClone,
  pointMultiplyScalar,
  pointSubtract,
} from "../DataStructures/point";
import { COLOR_ORANGE } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  ENEMY_SCREEN_HEIGHT,
  ENEMY_SCREEN_WIDTH,
  NUM_ROWS,
  VERTICAL_ENEMY_SIZE,
} from "../core/constants";
import { GameObject } from "../core/gameObject";
import { RectangleGameObject } from "../core/rectangleGameObject";
import { boolToSign } from "../core/util";
import { TYPE_BLOCK, TYPE_BULLET, TYPE_ENEMY } from "./gameObjectTypes";

export class VerticalEnemy extends RectangleGameObject {
  constructor(pos: Point, velocityY: number) {
    super(pos, VERTICAL_ENEMY_SIZE, TYPE_ENEMY);
    this.velocity.y = velocityY;
    this.gravity.y = 0;
  }

  static defaultConstructor(pos: Point): VerticalEnemy {
    pos.x += 0.25;
    pos.y += 0.1;
    return new VerticalEnemy(pos, 3);
  }

  clone(): GameObject {
    return new VerticalEnemy(pointClone(this.pos), this.velocity.y);
  }

  update(dt: number): void {
    this.velocity.y *= boolToSign(this.pos.y > 0 && this.pos.y <= NUM_ROWS);
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_BLOCK) {
      const d = pointSubtract(
        pointAdd(this.pos, pointMultiplyScalar(this.size, 0.5)),
        pointAdd(other.pos, pointMultiplyScalar(other.size, 0.5)),
      );

      const averageSize = pointAdd(this.size, other.size);
      pointMultiplyScalar(averageSize, 0.5);

      if (Math.abs(d.x / this.size.x) < Math.abs(d.y / this.size.y)) {
        this.velocity.y *= -1;
        if (d.y > 0) {
          this.pos.y = other.pos.y + other.size.y;
        } else {
          this.pos.y = other.pos.y - this.size.y;
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
      ENEMY_SCREEN_HEIGHT,
      ENEMY_SCREEN_WIDTH,
    );
  }
}
