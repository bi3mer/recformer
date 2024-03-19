import { TILE_SIZE } from "./constants";

export class TileMap {
  private solids: boolean[];
  public columns: number;

  constructor(lvl: string[]) {
    this.solids = [];

    const rows = lvl.length;
    if (rows !== 15) {
      console.error("Level should have 15 rows!");
      return;
    }

    this.columns = lvl[0].length;
    for (let r = 0; r < rows; ++r) {
      const row = lvl[r];
      if (this.columns !== row.length) {
        console.error(`Every row in the level should have the same number of columns! (${this.columns} !== ${row.length}).`);
        return;
      }

      for (let col = 0; col < this.columns; ++col) {
        this.solids.push(row[col] === 'X');
      }
    }
  }

  public isSolid(x: number, y: number): boolean {
    const index = y * this.columns + x;
    return index >= 0 && index < this.solids.length && this.solids[index];
  }

  public isSolidFromWorldCoordinates(x: number, y: number): boolean {
    return this.isSolid(
      Math.floor(x / TILE_SIZE),
      Math.floor(y / TILE_SIZE));
  }
}
