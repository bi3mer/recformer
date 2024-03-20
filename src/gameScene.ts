
import { tempLVL } from "./level";
import { Scene } from "./scene";
import { TileMap } from "./tileMap";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";
import { SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from "./constants";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D
  private tileMap: TileMap
  private camera: Camera

  private entities: GameObject[];

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.tileMap = new TileMap(tempLVL);
    this.camera = new Camera();
    this.entities = [];
  }

  onEnter(): void {
    this.entities.push(new Player(0, 13, this.tileMap)); // player is always the first entity 
  }

  update(dt: number): void {
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].update(dt);
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    console.log(this.camera);
    this.camera.update(this.entities[0].x); // Camera is centered on the player
    this.camera.renderTileMap(this.tileMap, this.ctx)

    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].render(this.ctx, this.camera);
    }
  }

  protected _onExit(): void {
    this.entities = []; // remove entities
    // reset camera
    // reset tile map
  }
}
