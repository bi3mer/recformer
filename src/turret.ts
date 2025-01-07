import { Camera } from "./camera";
import {
  BLOCK_HEIGHT,
  BLOCK_SCREEN_HEIGHT,
  BLOCK_SCREEN_WIDTH,
  BLOCK_WIDTH,
  TURRET_LOAD_TIME,
  TURRET_SQUARED_RANGE,
} from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";
import { Player } from "./player";
import { Point } from "./point";

export class Turret extends GameObject {
  private player: Player;
  private spawnBullet: () => void;
  private color: string;
  private time: number = 0;
  private state = 0; // 0 -> player not in range, 1 -> loading, 1 -> Fire bullet

  constructor(x: number, y: number, player: Player, spawnBullet: () => void) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);

    this.player = player;
    this.spawnBullet = spawnBullet;
    this.color = "yellow";
    this.gravity.y = 0;
  }

  update(dt: number): void {
    this.time += dt;

    switch (this.state) {
      case 0: {
        // Idle state until the player is in range
        if (this.pos.squareDistance(this.player.pos) <= TURRET_SQUARED_RANGE) {
          this.color = "red";
          this.state = 1;
        }
        break;
      }
      case 1: {
        // Turret is setting up to fire
        if (this.time >= TURRET_LOAD_TIME) {
          this.time = 0;
          this.state = 2;
        }
        break;
      }
      case 2: {
        // Turret fired
        this.state = 0;
        this.color = "yellow";
        this.spawnBullet();
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

    // draw turret base
    const X = camera.columnToScreen(this.pos.x);
    const Y = camera.rowToScreen(this.pos.y);
    const H = BLOCK_SCREEN_HEIGHT / 2;
    ctx.strokeRect(X, Y, BLOCK_SCREEN_WIDTH, H);

    // draw turret head, which always looks towards the player
    const playerX = camera.columnToScreen(this.player.pos.x);
    const topLeftX = X + BLOCK_SCREEN_WIDTH / 2.7;
    const topLeftY = Y + BLOCK_SCREEN_WIDTH / 2;
    const topRightX = topLeftX + BLOCK_SCREEN_WIDTH / 4;
    const topRightY = topLeftY + BLOCK_HEIGHT / 2;

    const botRightX = Math.max(
      X,
      Math.min(X + BLOCK_SCREEN_WIDTH, topRightX + (playerX - topLeftX)),
    );
    const botRightY = topRightY + H;
    const botLeftX = botRightX - BLOCK_SCREEN_WIDTH / 4;
    const botLeftY = topRightY + H;

    ctx.beginPath();
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(topRightX, topRightY);
    ctx.lineTo(botRightX, botRightY);
    ctx.lineTo(botLeftX, botLeftY);
    ctx.lineTo(topLeftX, topLeftY);
    ctx.stroke();
  }
}
