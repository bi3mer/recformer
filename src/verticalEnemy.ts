import { Camera } from "./camera";
import {
  ENEMY_HEIGHT,
  ENEMY_SCREEN_HEIGHT,
  ENEMY_SCREEN_WIDTH,
  ENEMY_WIDTH,
  NUM_ROWS,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK, TYPE_ENEMY } from "./gameObjectTypes";

export class VerticalEnemy extends GameObject {
  constructor(x: number, y: number) {
    super(x, y + 0.1, ENEMY_HEIGHT, ENEMY_WIDTH, TYPE_ENEMY);
    this.velocity.y = 3;
    this.gravity.y = 0;
    this.pos.x += 0.25;
  }

  update(dt: number): void {
    if (this.pos.y < 0 || this.pos.y >= NUM_ROWS) {
      this.velocity.y *= -1;
    }
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_BLOCK) {
      const center = this.pos.add(this.size.scalarMultiply(0.5));
      const otherCenter = other.pos.add(other.size.scalarMultiply(0.5));
      const d = center.subtract(otherCenter);

      const averageSize = this.size.add(other.size);
      averageSize.scalarMultiply(0.5);

      if (Math.abs(d.x / this.size.x) < Math.abs(d.y / this.size.y)) {
        this.velocity.y *= -1;
        if (d.y > 0) {
          this.pos.y = other.pos.y + other.size.y;
        } else {
          this.pos.y = other.pos.y - this.size.y;
        }
      }
    } else if (other.type === TYPE_ENEMY) {
      this.dead = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      ENEMY_SCREEN_HEIGHT,
      ENEMY_SCREEN_WIDTH,
    );
  }
}
