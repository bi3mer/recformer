import { AGENT_EMPTY, typeToAgent } from "./Agents/agentType";
import { Point, pointClone, pointEquals } from "./DataStructures/point";
import { CircleEnemy } from "./GameObjects/CircleEnemy";
import { Turret } from "./GameObjects/Turret";
import { Block } from "./GameObjects/block";
import { BlueBlock } from "./GameObjects/blueBlock";
import { Coin } from "./GameObjects/coin";
import { HorizontalEnemy } from "./GameObjects/horizontalEnemy";
import { LaserBlock } from "./GameObjects/laserBlock";
import { Protaganist } from "./GameObjects/protaganist";
import { VerticalEnemy } from "./GameObjects/verticalEnemy";
import { Camera } from "./core/camera";
import {
  GAME_STATE_LOST,
  GAME_STATE_PLAYING,
  GAME_STATE_WON,
  NUM_ROWS,
} from "./core/constants";
import { GameObject } from "./core/gameObject";

export class GameModel {
  staticEntities: GameObject[] = [];
  dynamicEntities: GameObject[] = [];
  coins: Coin[] = [];

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
      new Protaganist(
        new Point(2, 12),
        new Point(0, 0),
        typeToAgent(agentType, this),
      ),
    ); // player is always the first entity

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
          this.staticEntities.push(new Block(new Point(col, r)));
        } else if (tile === "^") {
          this.dynamicEntities.push(new LaserBlock(new Point(col, r)));
        } else if (tile === "T") {
          this.dynamicEntities.push(new Turret(new Point(col, r)));
        } else if (tile === "o") {
          const c = Coin.defaultConstructor(new Point(col, r));
          this.dynamicEntities.push(c);
          this.coins.push(c);
        } else if (tile == "b") {
          this.dynamicEntities.push(
            BlueBlock.defaultConstructor(new Point(col, r)),
          );
        } else if (tile === "H") {
          this.dynamicEntities.push(
            HorizontalEnemy.defaultConstructor(new Point(col, r), columns),
          );
        } else if (tile === "V") {
          this.dynamicEntities.push(
            VerticalEnemy.defaultConstructor(new Point(col, r)),
          );
        } else if (tile === "C") {
          this.dynamicEntities.push(
            CircleEnemy.defaultConstructor(new Point(col, r)),
          );
        } else if (tile !== "-") {
          console.error(`Unhandled tile type: ${row[col]}`);
        }
      }
    }

    // assign game variable for all the objects we just made
    let i = 0;
    for (; i < this.staticEntities.length; ++i) {
      this.staticEntities[i].game = this;
    }

    for (let i = 0; i < this.dynamicEntities.length; ++i) {
      this.dynamicEntities[i].game = this;
    }

    // order of coins is relevant for A* agent
    this.coins.sort((a, b) => {
      return a.pos.x - b.pos.x;
    });
  }

  // @NOTE: The static entities don't need to be updated, so they aren't cloned
  clone(): GameModel {
    const clone = new GameModel(null, AGENT_EMPTY);
    const dLength = this.dynamicEntities.length;
    let i = 0;

    // clone dynamic entities
    for (; i < dLength; ++i) {
      const currentEntity = this.dynamicEntities[i];
      if (currentEntity.dead) {
        continue;
      }

      const de = currentEntity.clone();
      de.game = clone;
      clone.dynamicEntities.push(de);

      if (de instanceof Coin) {
        clone.coins.push(de);
      }
    }

    // order coins
    clone.coins.sort((a, b) => {
      return a.pos.x - b.pos.x;
    });

    // static entities never change, so we don't need to clone them
    clone.staticEntities = this.staticEntities;

    return clone;
  }

  // @NOTE: This is an imperfect hash for a lot of reasons. One of them is that I
  //        am not including static entities in the hash. This is because the context
  //        that I am using this function is for A*, and the static entities are
  //        always the same, so they aren't important. If we were going to use this to
  //        check if a whole state was the same, though, this would not work because the
  //        static entities could be different.
  // @NOTE: Not currently a hash, it's a string
  hash(): number {
    const pos = this.dynamicEntities[0].pos;
    return Math.round(pos.x * 100) + Math.round(pos.y * 100) * 1000000;
  }

  // @NOTE: This method is pretty bad in the sense that I am using an 0(n^2)
  //        collision detection approach. It could be much better, but...
  //        well, I am lazy and the frame rate is unaffected. If I have time,
  //        I'll come back to this. I may have to for the A* agent.
  update(dt: number, divisor: number = 1): void {
    dt = dt / divisor;
    for (let j = 0; j < divisor; ++j) {
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
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // Update camera view based on the player before rendering
    camera.update(this.dynamicEntities[0].pos.x);

    // render static and dynamic entitites
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

  fitness(): number {
    const protaganist: Protaganist = this.dynamicEntities[0] as Protaganist;
    return 1 - protaganist.coinsCollected / this.coins.length;
  }

  raycastUp(start: Point): GameObject | null {
    const p = pointClone(start);
    p.y -= 1;
    const size = this.staticEntities.length;
    let i: number;

    while (p.y >= 0) {
      for (i = 0; i < size; ++i) {
        const e = this.staticEntities[i];
        if (pointEquals(p, e.pos)) {
          return e;
        }
      }

      p.y -= 1;
    }

    return null;
  }
}
