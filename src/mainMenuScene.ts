import { Scene } from "./scene";
import { KEY_GAME } from "./sceneKeys";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { InputManager, Key } from "./inputManager";

export class MainMenuScene extends Scene {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
  }

  onEnter(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '48px Arial'
    this.ctx.fillText('Recformer', 247, 100);

    this.ctx.font = '30px Arial';
    this.ctx.fillText("Press 'space' to start", 220, SCREEN_HEIGHT * 0.6);
  }

  update(dt: number): void {
    if (InputManager.isKeyDown(Key.SPACE)) {
      this.changeScene = KEY_GAME;
    }
  }

  // Rendering only needs to be done once, so no need to use this function
  render(): void { }

  protected _onExit(): void { }
}
