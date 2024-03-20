
import { Camera } from "./camera";
import { BLOCK_HEIGHT, BLOCK_SCREEN_HEIGHT, BLOCK_SCREEN_WIDTH, BLOCK_WIDTH, TILE_SIZE } from "./constants";
import { GameObject } from "./gameObject";
import { TYPE_BLOCK } from "./gameObjectTypes";

export class Block extends GameObject {

  constructor(x: number, y: number) {
    super(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, TYPE_BLOCK);
  }

  update(dt: number): void {

  }


  handleCollision(otherType: number): void {
    // Nothing happens, the block is static
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    ctx.strokeStyle = 'white';
    ctx.strokeRect(
      camera.columnToScreen(this.pos.x),
      camera.rowToScreen(this.pos.y),
      BLOCK_SCREEN_WIDTH,
      BLOCK_SCREEN_HEIGHT
    );
  }
} 
