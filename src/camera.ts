import { TileMap } from "./tileMap"

export class Camera {
  private screenWidth: number
  private tileSize: number // assumes square tiles

  constructor(screenWidth: number, tileSize: number) {
    this.screenWidth = screenWidth;
    this.tileSize = tileSize;
  }

  // tilesize is 32 and height is 480. We have 15 rows, and 32*15=480, so we 
  // can ignore the player's y. We only render based on the player's x coordinate
  render(x: number, tileMap: TileMap, ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'white';

    const startCol = Math.max(0, Math.floor(x / this.tileSize));
    const endCol = startCol + Math.ceil(this.screenWidth / this.tileSize);
    const offsetX = -x + startCol * this.tileSize;

    for (let col = startCol; col <= endCol && col < tileMap.columns; ++col) {
      const x = (col - startCol) * this.tileSize + offsetX;

      for (let row = 0; row < 15; ++row) { // see above comment
        if (tileMap.isSolid(col, row)) {
          ctx.strokeRect(x, row * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }
}
