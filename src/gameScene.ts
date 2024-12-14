import { Scene } from "./scene";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";
import { Block } from "./block";
import { NUM_ROWS, SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import {
  KEY_PLAYER_BEAT_THE_GAME,
  KEY_PLAYER_LOST,
  KEY_PLAYER_WON,
  KEY_TRANSITION,
} from "./sceneKeys";
import { Coin } from "./coin";
import { HorizontalEnemy } from "./horizontalEnemy";
import { VerticalEnemy } from "./verticalEnemy";
import { LevelDirector } from "./levelDirector.ts";
import { TransitionScene } from "./transitionScene.ts";
import { LaserBlock } from "./laserBlock.ts";
import { Laser } from "./laser.ts";
import { Point } from "./point.ts";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private transitionScene: TransitionScene;

  private camera: Camera;
  private numCoins: number;
  private levelDirector: LevelDirector;

  private staticEntities: GameObject[];
  private dynamicEntities: GameObject[];

  constructor(ctx: CanvasRenderingContext2D, transitionScene: TransitionScene) {
    super();

    this.ctx = ctx;
    this.transitionScene = transitionScene;
    this.camera = new Camera();
    this.levelDirector = new LevelDirector();
  }

  onEnter(): void {
    this.dynamicEntities = [];
    this.staticEntities = [];

    this.numCoins = 0;
    this.dynamicEntities.push(new Player(2, 12)); // player is always the first entity

    const lvl = this.levelDirector.get(2);
    const rows = lvl.length;
    if (rows !== NUM_ROWS) {
      console.error("Level should have 15 rows!");
      return;
    }

    const columns = lvl[0].length;
    for (let r = 0; r < rows; ++r) {
      const row = lvl[r];
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
            new LaserBlock(col, r, true, () => {
              const foundObject = this.raycastUp(new Point(col, r));
              const height =
                foundObject === null ? NUM_ROWS : r - foundObject.pos.y - 1;

              this.dynamicEntities.push(new Laser(col, r - 1, true, height));
            }),
          );
        } else if (tile === "o") {
          ++this.numCoins;
          this.dynamicEntities.push(new Coin(col, r));
        } else if (tile === "H") {
          this.dynamicEntities.push(new HorizontalEnemy(col, r, columns));
        } else if (tile === "V") {
          this.dynamicEntities.push(new VerticalEnemy(col, r));
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

    // Change scenes if necessary
    const player = this.dynamicEntities[0] as Player;
    if (player.coinsCollected >= this.numCoins) {
      if (this.levelDirector.playerIsOnLastLevel) {
        this.transitionScene.targetScene = KEY_PLAYER_BEAT_THE_GAME;
        this.changeScene = KEY_TRANSITION;
      } else {
        this.transitionScene.targetScene = KEY_PLAYER_WON;
        this.changeScene = KEY_TRANSITION;
      }
    }

    // Slight chance the player collects a coin when hit by the enemy,
    // so just give them the benefit of the doubt
    if (player.dead) {
      this.transitionScene.targetScene = KEY_PLAYER_LOST;
      this.changeScene = KEY_TRANSITION;
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Update camera view based on the player before rendering
    this.camera.update(this.dynamicEntities[0].pos.x);

    // render entitites
    let size = this.staticEntities.length;
    let i = 0;
    for (; i < size; ++i) {
      this.staticEntities[i].render(this.ctx, this.camera);
    }

    size = this.dynamicEntities.length;
    for (i = 0; i < size; ++i) {
      this.dynamicEntities[i].render(this.ctx, this.camera);
    }
  }

  protected _onExit(): void {
    const player = this.dynamicEntities[0] as Player;
    this.levelDirector.update(!player.dead, Math.floor(player.maxColumn));
  }

  // TODO: generalize if required
  private raycastUp(start: Point): GameObject | null {
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
