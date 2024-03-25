
import { Camera } from "./camera";
import { DEATH_HEIGHT, ENEMY_HEIGHT, ENEMY_SCREEN_HEIGHT, ENEMY_SCREEN_WIDTH, ENEMY_WIDTH } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK, TYPE_ENEMY } from "./gameObjectTypes";

export class Enemy extends GameObject {

  constructor(x: number, y: number) {
    super(x, y + 0.1, ENEMY_WIDTH, ENEMY_HEIGHT, TYPE_ENEMY);
    this.velocity.x = 3;
    this.gravity.y = 0;
  }

  update(dt: number): void {
    if (this.pos.y > DEATH_HEIGHT) {
      this.dead = true;
    }
  }

  handleCollision(other: GameObject): void {
    if (other.type === TYPE_BLOCK) {
      const center = this.pos.add(this.size.scalarMultiply(0.5));
      const otherCenter = other.pos.add(other.size.scalarMultiply(0.5));
      const d = center.subtract(otherCenter);

      const averageSize = this.size.add(other.size);
      averageSize.scalarMultiply(0.5);

      if (Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)) {
        this.velocity.x *= -1;
        if (d.x < 0) {
          this.pos.x = other.pos.x - this.size.x;
        } else {
          this.pos.x = other.pos.x + other.size.x;
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      ENEMY_SCREEN_WIDTH,
      ENEMY_SCREEN_HEIGHT
    );
  }
} 
