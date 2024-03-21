
import { Camera } from "./camera";
import { NUM_ROWS, PLAYER_HEIGHT, PLAYER_SCREEN_HEIGHT, PLAYER_SCREEN_WIDTH, PLAYER_WIDTH, TILE_SIZE } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK, TYPE_COIN, TYPE_ENEMY, TYPE_PLAYER } from "./gameObjectTypes";
import { InputManager, Key } from "./inputManager";
import { Point } from "./point";

const MOVE = 6;
const JUMP = 9;
const MAX_MOVE_MOD = 8;
const DEATH_HEIGHT = NUM_ROWS + 1;
const MAX_JUMP_TIME = 0.4;

export class Player extends GameObject {
  private movingRight: boolean = false;
  private movingLeft: boolean = false;
  private moveMod: number = 0;

  private jumpTime: number = 0;

  public coinsCollected: number = 0;

  constructor(x: number, y: number) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, TYPE_PLAYER);
  }

  update(dt: number): void {
    this.velocity.x = 0;

    // Handle plaayer input
    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.movingRight = true;
      this.velocity.x = MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      if (this.movingRight) {
        this.movingRight = false;
        this.velocity.x = 0;
      } else {
        this.movingLeft = true;
        this.velocity.x = -MOVE;
        this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
      }
    }

    if (this.jumpTime < MAX_JUMP_TIME && InputManager.isKeyDown(Key.SPACE)) {
      if (this.jumpTime === 0) {
        this.velocity.y = -15;
      } else if (this.jumpTime < 0.2) {
        this.velocity.y -= 2;
      }
      this.jumpTime += dt;
    }

    // check if the player has died from falling through the map
    if (this.pos.y > DEATH_HEIGHT) {
      this.dead = true;
      console.log("Player fell...");
    }
  }

  handleCollision(other: GameObject): void {
    switch (other.type) {
      case TYPE_BLOCK: {
        const center = this.pos.add(this.size.scalarMultiply(0.5));
        const otherCenter = other.pos.add(other.size.scalarMultiply(0.5));
        const d = center.subtract(otherCenter);

        const averageSize = this.size.add(other.size);
        averageSize.scalarMultiply(0.5);

        // This is trying to handle corners. So if the angle is close to 45 
        // degrees between the two rectangles, that is a corner. I have it as 
        // less than 55 and more than 40.
        const theta = Math.abs(Math.atan(d.y / d.x));
        const isCorner = theta < 0.96 && theta > 0.698;

        if (!isCorner && Math.abs(d.x / this.size.x) > Math.abs(d.y / this.size.y)) {
          if (d.x < 0) {
            this.pos.x = other.pos.x - this.size.x;
          } else if (d.x !== 0) {
            this.pos.x = other.pos.x + other.size.x;
          }
        } else {
          if (d.y > 0) {
            this.pos.y = other.pos.y + this.size.y;
          } else {
            this.pos.y = other.pos.y - this.size.y;
            this.velocity.y = 0;
            this.jumpTime = 0;
          }
        }
        break;
      }
      case TYPE_COIN: {
        ++this.coinsCollected;
        break;
      }
      case TYPE_ENEMY: {
        this.dead = true;
        console.log("Ran into an enemy! :/");
        break;
      }
      default: {
        console.warn(`Player unhandled collision type: ${other.type}.`);
        break;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = "rgba(150,150,255,1)";
    const x = camera.columnToScreen(this.pos.x);
    const y = camera.rowToScreen(this.pos.y);

    if (this.movingRight) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x - this.moveMod, y + PLAYER_SCREEN_HEIGHT);
      region.lineTo(x + PLAYER_SCREEN_WIDTH - this.moveMod, y + PLAYER_SCREEN_HEIGHT);
      region.lineTo(x + PLAYER_SCREEN_WIDTH, y);
      region.closePath();

      ctx.fill(region, "evenodd");

      this.movingRight = false;
    } else if (this.movingLeft) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x + this.moveMod, y + PLAYER_SCREEN_HEIGHT);
      region.lineTo(x + PLAYER_SCREEN_WIDTH + this.moveMod, y + PLAYER_SCREEN_HEIGHT);
      region.lineTo(x + PLAYER_SCREEN_WIDTH, y);
      region.closePath();

      ctx.fill(region, "evenodd");
      this.movingLeft = false;
    } else {
      ctx.fillRect(x, y, PLAYER_SCREEN_WIDTH, PLAYER_SCREEN_HEIGHT);
    }
  }
} 
