import { tempLVL } from "./level";
import { Scene } from "./scene";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";
import { Block } from "./block";
import { NUM_ROWS, SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from "./constants";
import { KEY_MAIN_MENU } from "./sceneKeys";
import { QuadTree } from "./quadTree";
import { Point } from "./point";
import { Coin } from "./coin";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private quadTree: QuadTree;
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
    this.quadTree = new QuadTree(
      new Point(-5, 0),
      new Point(tempLVL[0].length + 5, NUM_ROWS + 5)
    );

    this.dynamicEntities.push(new Player(2, 12, this.quadTree)); // player is always the first entity 
    this.quadTree.insert(this.dynamicEntities[0]);
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
          const b = new Block(col, r);
          this.staticEntities.push(b);
          this.quadTree.insert(b);
        } else if (row[col] === 'o') {
          const c = new Coin(col, r);
          ++this.numCoins;
          this.dynamicEntities.push(c);
          this.quadTree.insert(c);
        }
      }
    }

    console.log(this.quadTree);
  }

  update(dt: number): void {
    const size = this.dynamicEntities.length;
    for (let i = 0; i < size; ++i) {
      this.dynamicEntities[i].update(dt);
    }

    this.quadTree.update();
    this.quadTree.physicsUpdate();

    // TODO: handle entity removal, especially for coins

    const player = this.dynamicEntities[0] as Player;
    if (player.coinsCollected >= this.numCoins) {
      console.log("Player won!");
      this.changeScene = KEY_MAIN_MENU;
    }

    // if the player is dead, we're done
    if (player.isDead) {
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
