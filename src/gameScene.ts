
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
    this.entities.push(new Player(0, 13 * TILE_SIZE, this.tileMap)); // player is always the first entity 
  }

  update(dt: number): void {
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].update(dt);
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.camera.render(this.entities[0].x, this.tileMap, this.ctx)

    this.ctx.fillStyle = "rgba(255,255,0,1)";
    this.ctx.beginPath();
    this.ctx.moveTo(TILE_SIZE, 0);
    this.ctx.lineTo(TILE_SIZE, SCREEN_HEIGHT);
    this.ctx.stroke();

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
