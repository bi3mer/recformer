import { Camera } from "../camera";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
  BULLET_WIDTH,
  TURRET_LOAD_TIME,
  TURRET_SQUARED_RANGE,
} from "../constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { Point } from "../point";
import { RectangleGameObject } from "./rectangleGameObject";
import { COLOR_ORANGE, COLOR_YELLOW } from "../colorPalette";

export class Turret extends RectangleGameObject {
  private playerPos: Point;
  private spawnBullet: (bulletCol: number, bulletRow: number) => void;
  private color: string;
  private time: number = 0;
  private state = 0; // 0 -> player not in range, 1 -> loading, 1 -> Fire bullet

  constructor(
    x: number,
    y: number,
    playerPos: Point,
    spawnBullet: (bulletCol: number, bulletRow: number) => void,
  ) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);

    this.playerPos = playerPos;
    this.spawnBullet = spawnBullet;
    this.color = COLOR_YELLOW;
    this.gravity.y = 0;
  }

  update(dt: number): void {
    switch (this.state) {
      case 0: {
        // Idle state until the player is in range
        if (this.pos.squareDistance(this.playerPos) <= TURRET_SQUARED_RANGE) {
          this.color = COLOR_ORANGE;
          this.state = 1;
        }
        break;
      }
      case 1: {
        // Turret is setting up to fire
        this.time += dt;

        if (this.time >= TURRET_LOAD_TIME) {
          this.time = 0;
          this.state = 2;
        }
        break;
      }
      case 2: {
        // Turret fired
        this.state = 0;
        this.color = COLOR_YELLOW;

        // spawn bullet at tip of the turret's barrel
        const angle = this.pos.angle(this.playerPos);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        this.spawnBullet(
          this.pos.x + (BULLET_WIDTH + BLOCK_WIDTH) * cos,
          this.pos.y + (BULLET_WIDTH + BLOCK_WIDTH) * sin,
        );
        break;
      }
      default: {
        console.error(`Should not be able to enter state ${this.state}`);
        this.state = 0; // no need to break on this behavior
        break;
      }
    }
  }

  handleCollision(other: GameObject): void {
    // Nothing happens
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.strokeStyle = this.color;

    const X = camera.columnToScreen(this.pos.x);
    const Y = camera.rowToScreen(this.pos.y);
    const R = BLOCK_SCREEN_WIDTH / 2;
    const RR = 2 * R;
    const T = new Point(X + R, Y);

    // Draw turret base
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(T.x, T.y, R, 0, Math.PI);
    ctx.stroke();

    // Draw turret
    const angle = this.pos.angle(this.playerPos);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(T.x + R * cos, T.y + R * sin);
    ctx.lineTo(T.x + RR * cos, T.y + RR * sin);
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}
