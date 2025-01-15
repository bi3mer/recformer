import { CircleEnemy } from "./CircleEnemy";
import { Turret } from "./Turret";
import { Block } from "./block";
import { BlueBlock } from "./blueBlock";
import { Bullet } from "./bullet";
import { Camera } from "./camera";
import { Coin } from "./coin";
import {
  GAME_STATE_LOST,
  GAME_STATE_PLAYING,
  GAME_STATE_WON,
  NUM_ROWS,
} from "./constants";
import { GameObject } from "./gameObject";
import { HorizontalEnemy } from "./horizontalEnemy";
import { LaserBlock } from "./laserBlock";
import { Laser } from "./laser";
import { Point } from "./point";
import { VerticalEnemy } from "./verticalEnemy";
import { Protaganist } from "./protaganist";

export class GameModel {
  private staticEntities: GameObject[] = [];
  private dynamicEntities: GameObject[] = [];
  private numCoins: number = 0;

  // @TODO: need to pass in player or agent
  constructor(level: string[]) {
    const rows = level.length;
    if (rows !== NUM_ROWS) {
      console.error("Level should have 15 rows!");
      return;
    }

    this.dynamicEntities.push(new Protaganist(2, 12)); // player is always the first entity

    const columns = level[0].length;
    for (let r = 0; r < rows; ++r) {
      const row = level[r];
      if (columns !== row.length) {
        console.error(
          `Every row in the level should have the same number of columns! (${columns} !== ${row.length}).`,
        );
        return;
      }

      for (let col = 0; col < columns; ++col) {
        const tile = row[col];
        if (tile === "X") {
          this.staticEntities.push(new Block(col, r));
        } else if (tile === "^") {
          this.dynamicEntities.push(
            new LaserBlock(col, r, true, this.dynamicEntities[0].pos, () => {
              const foundObject = this.raycast(new Point(col, r));
              const height =
                foundObject === null ? NUM_ROWS : r - foundObject.pos.y - 1;

              // this.dynamicEntities.push(new Laser(col, r - 1, true, height));
              this.dynamicEntities.push(new Laser(col, r - height, height));
            }),
          );
        } else if (tile === "T") {
          this.dynamicEntities.push(
            new Turret(
              col,
              r,
              this.dynamicEntities[0].pos,
              (bulletCol: number, bulletRow: number) => {
                this.dynamicEntities.push(
                  new Bullet(bulletCol, bulletRow, this.dynamicEntities[0].pos),
                );
              },
            ),
          );
        } else if (tile === "o") {
          ++this.numCoins;
          this.dynamicEntities.push(new Coin(col, r));
        } else if (tile == "b") {
          this.dynamicEntities.push(new BlueBlock(col, r));
        } else if (tile === "H") {
          this.dynamicEntities.push(new HorizontalEnemy(col, r, columns));
        } else if (tile === "V") {
          this.dynamicEntities.push(new VerticalEnemy(col, r));
        } else if (tile === "C") {
          this.dynamicEntities.push(new CircleEnemy(col, r));
        } else if (tile !== "-") {
          console.error(`Unhandled tile type: ${row[col]}`);
        }
      }
    }
  }

  update(dt: number): void {
    // Update and check for collisions
    let dynamicSize = this.dynamicEntities.length;
    const staticSize = this.staticEntities.length;
    let jj: number;
    let i = 0;

    for (; i < dynamicSize; ++i) {
      const e = this.dynamicEntities[i];

      e.update(dt);

      // Check if entity died
      if (e.dead) {
        if (i == 0) {
          // the player died, we're done
          break;
        }

        this.dynamicEntities.splice(i, 1);
        --i;
        --dynamicSize;
      }

      e.physicsUpdate(dt);

      for (jj = i + 1; jj < dynamicSize; ++jj) {
        e.collision(this.dynamicEntities[jj]);
      }

      for (jj = 0; jj < staticSize; ++jj) {
        e.collision(this.staticEntities[jj]);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // Update camera view based on the player before rendering
    camera.update(this.dynamicEntities[0].pos.x);

    // render entitites
    let size = this.staticEntities.length;
    let i = 0;
    for (; i < size; ++i) {
      this.staticEntities[i].render(ctx, camera);
    }

    size = this.dynamicEntities.length;
    for (i = 0; i < size; ++i) {
      this.dynamicEntities[i].render(ctx, camera);
    }
  }

  public state(): number {
    const player = this.dynamicEntities[0] as Protaganist;

    // Slight chance the player collects a coin when hit by the enemy,
    // so we give them the benefit of the doubt
    if (player.coinsCollected >= this.numCoins) return GAME_STATE_WON;
    if (player.dead) return GAME_STATE_LOST;
    return GAME_STATE_PLAYING;
  }

  public protaganist(): Protaganist {
    return this.dynamicEntities[0] as Protaganist;
  }

  // TODO: generalize if required. Rght now it raycasts up, but you could pass
  // a direction vector. Also, it only runs for static entities and that should
  // probably be made clear from the name
  private raycast(start: Point): GameObject | null {
    const size = this.staticEntities.length;
    let i: number;

    while (start.y >= 0) {
      for (i = 0; i < size; ++i) {
        const e = this.staticEntities[i];
        if (start.equals(e.pos)) {
          return e;
        }
      }

      --start.y;
    }

    return null;
  }
}
