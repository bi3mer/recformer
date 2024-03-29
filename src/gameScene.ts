import { Scene } from "./scene";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";
import { Block } from "./block";
import { NUM_ROWS, SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { KEY_MAIN_MENU } from "./sceneKeys";
import { Coin } from "./coin";
import { randomKey } from "./util";
import { HorizontalEnemy } from "./horizontalEnemy";
import { VerticalEnemy } from "./verticalEnemy";
import { MDP, idToLevel } from "./levels.ts";

// A test level that I'm keeping around
const tempLVL = [
  "-------------------------------------------",
  "-------------------------------------------",
  "-------------------------------------------",
  "-------------------------------------------",
  "---X-H-X-----------------------------------",
  "---XXXXX----------------------X------------",
  "-------X------------------o---X------------",
  "-------X------------------X---X------------",
  "X------X--------------0-------X------------",
  "X------X-------------XX---V---X------------",
  "XXX----X---------o------------X----------o-",
  "XXX---XX--------XXX---V-------X------------",
  "X----XXX---------V----------o-XX-----X-----",
  "X---XXXX--------V-V-----------XXX-HVXX-----",
  "XXXXXXXX--XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
];

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private camera: Camera;
  private numCoins: number;

  private staticEntities: GameObject[];
  private dynamicEntities: GameObject[];

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.camera = new Camera();
  }

  onEnter(): void {
    this.dynamicEntities = [];
    this.staticEntities = [];

    this.numCoins = 0;
    this.dynamicEntities.push(new Player(2, 12)); // player is always the first entity

    const lvl = tempLVL;
    const rows = lvl.length;
    if (rows !== NUM_ROWS) {
      console.error("Level should have 15 rows!");
      return;
    }

    const columns = lvl[0].length;
    for (let r = 0; r < rows; ++r) {
      const row = lvl[r];
      if (columns !== row.length) {
        console.error(`Every row in the level should have the same number of columns! (${columns} !== ${row.length}).`);
        return;
      }

      for (let col = 0; col < columns; ++col) {
        if (row[col] === 'X') {
          this.staticEntities.push(new Block(col, r));
        } else if (row[col] === 'o') {
          ++this.numCoins;
          this.dynamicEntities.push(new Coin(col, r));
        } else if (row[col] === 'H') {
          this.dynamicEntities.push(new HorizontalEnemy(col, r, columns));
        } else if (row[col] === 'V') {
          this.dynamicEntities.push(new VerticalEnemy(col, r));
        }
      }
    }
  }

  update(dt: number): void {
    // remove dead entities
    let dynamicSize = this.dynamicEntities.length;
    let i = 0;
    for (; i < dynamicSize; ++i) {
      const e = this.dynamicEntities[i];
      if (e.dead) {
        this.dynamicEntities.splice(i, 1);
        --dynamicSize;
        --i;
      }
    }

    const staticSize = this.staticEntities.length;
    let jj: number;
    for (i = 0; i < dynamicSize; ++i) {
      const e = this.dynamicEntities[i];

      // entity updates
      e.update(dt);
      e.physicsUpdate(dt);

      // Check for collisions
      for (jj = i + 1; jj < dynamicSize; ++jj) {
        e.collision(this.dynamicEntities[jj]);
      }
      for (jj = 0; jj < staticSize; ++jj) {
        e.collision(this.staticEntities[jj]);
      }
    }


    const player = this.dynamicEntities[0] as Player;
    if (player.coinsCollected >= this.numCoins) {
      console.log("Player won!");
      this.changeScene = KEY_MAIN_MENU;
    }

    // if the player is dead, we're done. Player needs a special case from
    // the one above
    if (player.dead) {
      this.changeScene = KEY_MAIN_MENU;
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

  }
}
