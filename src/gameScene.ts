
import { tempLVL } from "./level";
import { Scene } from "./scene";
import { TileMap } from "./tileMap";
import { Camera } from "./camera";
import { InputManager, Key } from "./inputManager";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D
  private screenWidth: number
  private screenHeight: number
  private tilemap: TileMap
  private camera: Camera

  private x: number

  constructor(screenWidth: number, screenHeight: number, tileSize: number, ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.tilemap = new TileMap(tempLVL);
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.camera = new Camera(screenWidth, tileSize);
    this.x = 0;
  }

  onEnter(): void {

  }

  update(dt: number): void {
    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.x += 4;
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.x -= 4;
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.camera.render(this.x, this.tilemap, this.ctx)
  }

  protected _onExit(): void {
  }
}
