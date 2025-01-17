import { CircleEnemy } from "./GameObjects/CircleEnemy";
import { Turret } from "./GameObjects/Turret";
import { Block } from "./GameObjects/block";
import { BlueBlock } from "./GameObjects/blueBlock";
import { Bullet } from "./GameObjects/bullet";
import { Camera } from "./core/camera";
import { Coin } from "./GameObjects/coin";
import {
  GAME_STATE_LOST,
  GAME_STATE_PLAYING,
  GAME_STATE_WON,
  NUM_ROWS,
} from "./core/constants";
import { GameObject } from "./core/gameObject";
import { HorizontalEnemy } from "./GameObjects/horizontalEnemy";
import { LaserBlock } from "./GameObjects/laserBlock";
import { Laser } from "./GameObjects/laser";
import { Point } from "./DataStructures/point";
import { VerticalEnemy } from "./GameObjects/verticalEnemy";
import { Protaganist } from "./GameObjects/protaganist";
import { typeToAgent } from "./Agents/agentType";

export class GameModel {
  staticEntities: GameObject[] = [];
  dynamicEntities: GameObject[] = [];
  coins: Point[] = [];
  numColumns: number;

  constructor(level: string[] | null, agentType: number) {
    if (level === null) {
      return;
    }

    const rows = level.length;
    if (rows !== NUM_ROWS) {
      console.error("Level should have 15 rows!");
      return;
    }

    this.dynamicEntities.push(
      new Protaganist(2, 12, typeToAgent(agentType, this)),
    ); // player is always the first entity

    const columns = level[0].length;
    this.numColumns = columns;
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
            new LaserBlock(col, r, this.dynamicEntities[0].pos, () => {
              const foundObject = this.raycast(new Point(col, r));
              const height =
                foundObject === null ? NUM_ROWS : r - foundObject.pos.y - 1;

              this.dynamicEntities.push(
                Laser.defaultConstructor(col, r - height, height),
              );
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
                  Bullet.defaultConstructor(
                    bulletCol,
                    bulletRow,
                    this.dynamicEntities[0].pos,
                  ),
                );
              },
            ),
          );
        } else if (tile === "o") {
          this.coins.push(new Point(col, r));
          this.dynamicEntities.push(Coin.defaultConstructor(col, r));
        } else if (tile == "b") {
          this.dynamicEntities.push(BlueBlock.defaultConstructor(col, r));
        } else if (tile === "H") {
          this.dynamicEntities.push(
            HorizontalEnemy.defaultConstructor(col, r, columns),
          );
        } else if (tile === "V") {
          this.dynamicEntities.push(VerticalEnemy.defaultConstructor(col, r));
        } else if (tile === "C") {
          this.dynamicEntities.push(CircleEnemy.defaultConstructor(col, r));
        } else if (tile !== "-") {
          console.error(`Unhandled tile type: ${row[col]}`);
        }
      }
    }
  }

  clone(): GameModel {
    const clone = new GameModel(null, 0);
    const dLength = this.dynamicEntities.length;
    let i = 0;

    for (; i < dLength; ++i) {
      clone.dynamicEntities.push(this.dynamicEntities[i].clone());
    }

    const sLength = this.staticEntities.length;
    for (i = 0; i < sLength; ++i) {
      clone.staticEntities.push(this.staticEntities[i].clone());
    }

    clone.coins = this.coins;

    return clone;
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
    if (player.coinsCollected >= this.coins.length) return GAME_STATE_WON;
    if (player.dead) return GAME_STATE_LOST;
    return GAME_STATE_PLAYING;
  }

  public protaganist(): Protaganist {
    return this.dynamicEntities[0] as Protaganist;
  }

  public fitness(): number {
    const protaganist: Protaganist = this.dynamicEntities[0] as Protaganist;
    return protaganist.coinsCollected / this.coins.length;

    // @NOTE: The code below also has how far the player reached in the level
    //         as part of the fitness calculation. I don't know how I feel
    //         about it, though. For now, I am going with just coins.
    // const won: number = Number(this.state() == GAME_STATE_WON); // apparent 1 + true is slow in js, idk why
    // const protaganist: Protaganist = this.dynamicEntities[0] as Protaganist;
    // const col = won ? this.numColumns : protaganist.maxColumn;

    // return (
    //   (protaganist.coinsCollected + col + won) /
    //   (this.numCoins + this.numColumns + 1)
    // );
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
