
import { Camera } from "./camera";
import { TILE_SIZE } from "./constants";
import { GameObject } from "./gameObject";
import { InputManager, Key } from "./inputManager";
import { TileMap } from "./tileMap";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const MOVE = 0.1;
const MAX_MOVE_MOD = 8;

export class Player extends GameObject {
  private movingRight: boolean = false;
  private movingLeft: boolean = false;
  private moveMod: number = 0;

  private tileMap: TileMap;

  constructor(x: number, y: number, tilemap: TileMap) {
    super(x, y);

    this.tileMap = tilemap;
  }

  update(dt: number): void {
    // Handle plaayer input
    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.movingRight = true;
      this.x += MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.movingLeft = true;
      this.x -= MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + dt);
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.y -= MOVE * 3;
    }

    if (this.movingLeft && this.movingRight) {
      this.movingLeft = false;
      this.movingRight = false;
      this.moveMod = 0;
    }

    // Lazy physics, the player is going downwards!
    if (!this.tileMap.isSolid(Math.floor(this.x), Math.floor(this.y + 1))) {
      this.y += MOVE;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = "rgba(150,150,255,1)";
    const x = camera.columnToScreen(this.x);
    const y = camera.rowToScreen(this.y);

    if (this.movingRight) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x - this.moveMod, y + PLAYER_HEIGHT);
      region.lineTo(x + PLAYER_WIDTH - this.moveMod, y + PLAYER_HEIGHT);
      region.lineTo(x + PLAYER_WIDTH, y);
      region.closePath();

      ctx.fill(region, "evenodd");

      this.movingRight = false;
    } else if (this.movingLeft) {
      let region = new Path2D();
      region.moveTo(x, y);
      region.lineTo(x + this.moveMod, y + PLAYER_HEIGHT);
      region.lineTo(x + PLAYER_WIDTH + this.moveMod, y + PLAYER_HEIGHT);
      region.lineTo(x + PLAYER_WIDTH, y);
      region.closePath();

      ctx.fill(region, "evenodd");
      this.movingLeft = false;
    } else {
      ctx.fillRect(x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
  }
} 
