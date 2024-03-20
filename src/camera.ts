import { NUM_ROWS, SCREEN_WIDTH, TILE_SIZE } from "./constants";
import { TileMap } from "./tileMap"

export class Camera {
  private startCol: number = 0;
  private endCol: number = 0;
  private offsetX: number = 0;
  private colsPerScreen: number = Math.ceil(SCREEN_WIDTH / TILE_SIZE);


  update(x: number) {
    const halfX = x - this.colsPerScreen / 2;
    this.startCol = Math.max(0, Math.floor(halfX));
    this.endCol = this.startCol + this.colsPerScreen;
    this.offsetX = -halfX * TILE_SIZE + this.startCol * TILE_SIZE;
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

      for (let row = 0; row < NUM_ROWS; ++row) { // see above comment
        if (tileMap.isSolid(col, row)) {
          ctx.strokeRect(x, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
}
