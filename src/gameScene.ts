
import { tempLVL } from "./level";
import { Scene } from "./scene";
import { TileMap } from "./tileMap";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D
  private screenWidth: number
  private screenHeight: number
  private tileSize: number
  private tilemap: TileMap
  private camera: Camera

  private entities: GameObject[];

  constructor(screenWidth: number, screenHeight: number, tileSize: number, ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.tilemap = new TileMap(tempLVL);
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.tileSize = tileSize;
    this.camera = new Camera(screenWidth, tileSize);
    this.entities = [];
  }

  onEnter(): void {
    this.entities.push(new Player(0, 13 * this.tileSize)); // player is always the first entity 
  }

  update(dt: number): void {
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].update(dt);
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.camera.render(this.entities[0].x, this.tilemap, this.ctx)

    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].render(this.ctx);
    }
  }

  protected _onExit(): void {
    this.entities = []; // remove entities
    // reset camera
    // reset tile map
  }
}
