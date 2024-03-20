import { tempLVL } from "./level";
import { Scene } from "./scene";
import { TileMap } from "./tileMap";
import { Camera } from "./camera";
import { GameObject } from "./gameObject";
import { Player } from "./player";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { KEY_MAIN_MENU } from "./sceneKeys";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D
  private tileMap: TileMap
  private camera: Camera

  private entities: GameObject[];

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.tileMap = new TileMap();
    this.camera = new Camera();
    this.entities = [];
  }

  onEnter(): void {
    this.tileMap.readLevel(tempLVL);
    this.entities.push(new Player(2, 13, this.tileMap)); // player is always the first entity 
  }

  update(dt: number): void {
    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].update(dt);
    }

    // if the player is dead, we're done
    if ((this.entities[0] as Player).isDead) {
      this.changeScene = KEY_MAIN_MENU;
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Update camera view based on the player before rendering
    this.camera.update(this.entities[0].pos.x);

    // render the tile map and the entitites
    this.camera.renderTileMap(this.tileMap, this.ctx)

    const size = this.entities.length;
    for (let i = 0; i < size; ++i) {
      this.entities[i].render(this.ctx, this.camera);
    }
  }

  protected _onExit(): void {
    this.entities = []; // remove entities
  }
}
