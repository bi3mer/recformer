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

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private quadTree: QuadTree;
  private tileMap: TileMap;
  private camera: Camera;

  private entities: GameObject[];

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.camera = new Camera();
    this.entities = [];
  }

  onEnter(): void {
    this.quadTree = new QuadTree(
      new Point(0, 0),
      new Point(tempLVL[0].length * TILE_SIZE, 15 * TILE_SIZE)
    );

    this.entities.push(new Player(2, 12, this.quadTree)); // player is always the first entity 
    this.quadTree.insert(this.entities[0]);
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
          this.entities.push(b);
          this.quadTree.insert(b);
        }
      }
    }

    console.log(this.quadTree);
  }

  update(dt: number): void {
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].update(dt);
    }

    this.quadTree.update();
    this.quadTree.physicsUpdate();

    // if the player is dead, we're done
    if ((this.entities[0] as Player).isDead) {
      this.changeScene = KEY_MAIN_MENU;
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Update camera view based on the player before rendering
    this.camera.update(this.entities[0].pos.x);

    // render entitites
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].render(this.ctx, this.camera);
    }
  }

  protected _onExit(): void {
    this.entities = []; // remove entities
    this.quadTree
  }
}
