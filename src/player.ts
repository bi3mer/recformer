
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
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + 1);
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.movingLeft = true;
      this.x -= MOVE;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + 1);
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.y -= MOVE * 3;
    }

    if (this.movingLeft && this.movingRight) {
      this.movingLeft = false;
      this.movingRight = false;
      this.moveMod = 0;
    }

    // Lazy physics
    if (!this.tileMap.isSolid(Math.floor(this.x), Math.floor(this.y + 1))) {
      this.y += MOVE;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.fillStyle = "rgba(150,150,255,1)";
    ctx.fillRect(camera.columnToScreen(this.x), camera.rowToScreen(this.y), PLAYER_WIDTH, PLAYER_HEIGHT);

    return;
    /**
    if (this.movingRight) {
      const botLeftX = camera.columnToScreen(this.x);
      const top
      const endX = camera.columnToScreen(this.x + PLAYER_WIDTH - this.moveMod);
      let region = new Path2D();
      region.moveTo(startX, this.y);
      region.lineTo(this.x - this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH - this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH, this.y);
      region.closePath();

      ctx.fill(region, "evenodd");

      this.movingRight = false;
    } else if (this.movingLeft) {
      let region = new Path2D();
      region.moveTo(this.x, this.y);
      region.lineTo(this.x + this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH + this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH, this.y);
      region.closePath();

      ctx.fill(region, "evenodd");
      this.movingLeft = false;
    } else {
      ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    */
  }
} 
