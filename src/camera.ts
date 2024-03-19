import { SCREEN_WIDTH, TILE_SIZE } from "./constants";
import { TileMap } from "./tileMap"
import { GameObject } from "./gameObject";

export class Camera {
  private startCol: number = 0;
  private endCol: number = 0;
  private offsetX: number = 0;

  update(x: number) {
    this.startCol = Math.max(0, Math.floor(x / TILE_SIZE));
    this.endCol = this.startCol + Math.ceil(SCREEN_WIDTH / TILE_SIZE);
    this.offsetX = -x + this.startCol * TILE_SIZE;
  }

  columnToScreen(col: number): number {
    return (col - this.startCol) * TILE_SIZE + this.offsetX;
  }

  rowToScreen(row: number): number {
    return row * TILE_SIZE;
  }

  // tilesize is 32 and height is 480. We have 15 rows, and 32*15=480, so we 
  // can ignore the player's y. We only render based on the player's x coordinate
  renderTileMap(tileMap: TileMap, ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'white';

    for (let col = this.startCol; col <= this.endCol && col < tileMap.columns; ++col) {
      const x = (col - this.startCol) * TILE_SIZE + this.offsetX;

      for (let row = 0; row < 15; ++row) { // see above comment
        if (tileMap.isSolid(col, row)) {
          ctx.strokeRect(x, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
}
