import { SCREEN_WIDTH, TILE_SIZE } from "./constants";
import { TileMap } from "./tileMap"

export class Camera {
  // tilesize is 32 and height is 480. We have 15 rows, and 32*15=480, so we 
  // can ignore the player's y. We only render based on the player's x coordinate
  render(x: number, tileMap: TileMap, ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'white';

    const startCol = Math.max(0, Math.floor(x / TILE_SIZE));
    const endCol = startCol + Math.ceil(SCREEN_WIDTH / TILE_SIZE);
    const offsetX = -x + startCol * TILE_SIZE;

    for (let col = startCol; col <= endCol && col < tileMap.columns; ++col) {
      const x = (col - startCol) * TILE_SIZE + offsetX;

      for (let row = 0; row < 15; ++row) { // see above comment
        if (tileMap.isSolid(col, row)) {
          ctx.strokeRect(x, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
}
