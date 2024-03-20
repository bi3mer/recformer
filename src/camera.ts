import { NUM_ROWS, SCREEN_WIDTH, TILE_SIZE } from "./constants";

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
}
