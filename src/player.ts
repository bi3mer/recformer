
import { Camera } from "./camera";
import { NUM_ROWS, PLAYER_HEIGHT, PLAYER_SCREEN_HEIGHT, PLAYER_SCREEN_WIDTH, PLAYER_WIDTH, TILE_SIZE } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK, TYPE_COIN, TYPE_ENEMY, TYPE_PLAYER } from "./gameObjectTypes";
import { InputManager, Key } from "./inputManager";
import { Point } from "./point";

const MOVE = 0.1;
const MAX_MOVE_MOD = 8;
const DEATH_HEIGHT = NUM_ROWS + 1;

export class Player extends GameObject {
  private movingRight: boolean = false;
  private movingLeft: boolean = false;
  private moveMod: number = 0;
  private deltaMove: Point = new Point(0, 0);

  public coinsCollected: number = 0;

  constructor(x: number, y: number) {
    super(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, TYPE_PLAYER);
  }

  update(dt: number): void {
    this.deltaMove.zero();

    // Handle plaayer input
    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.movingRight = true;
      this.pos.x += MOVE;
      this.deltaMove.x = MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.movingLeft = true;
      this.pos.x -= MOVE;
      this.deltaMove.x = -MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.pos.y -= MOVE * 3;
      this.deltaMove.y = -MOVE * 3;
    }

    if (this.movingLeft && this.movingRight) {
      this.movingLeft = false;
      this.movingRight = false;
      this.moveMod = 0;
    }

    // Gravity
    this.pos.y += 2 * dt;
    this.deltaMove.y += 2 * dt;

    // check if the player has died from falling through the map
    if (this.pos.y > DEATH_HEIGHT) {
      this.dead = true;
      console.log("Player fell...");
    }
  }

  handleCollision(other: GameObject): void {
    switch (other.type) {
      case TYPE_BLOCK: {
        this.pos.x -= this.deltaMove.x;
        this.pos.y -= this.deltaMove.y;
        break;
      }
      case TYPE_COIN: {
        ++this.coinsCollected;
        break;
      }
      case TYPE_ENEMY: {
        this.isDead = true;
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
