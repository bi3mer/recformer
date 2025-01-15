import { InputManager, Key } from "../inputManager";
import { Scene } from "./scene";
import { KEY_GAME, KEY_TRANSITION } from "./sceneKeys";
import { TransitionScene } from "./transitionScene";
import { COLOR_ORANGE } from "../colorPalette";

export class PlayerLostLevelScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private transitionScene: TransitionScene;

  constructor(ctx: CanvasRenderingContext2D, transitionScene: TransitionScene) {
    super();

    this.ctx = ctx;
    this.transitionScene = transitionScene;
  }

  onEnter(): void {
    InputManager.clear();
    this.ctx.fillStyle = COLOR_ORANGE;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("YOU LOST", 243, 200);

    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to try again.", 195, 400);
  }

  update(dt: number): void {
    if (InputManager.isKeyDown(Key.SPACE)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }
  }
  render(): void {}

  protected _onExit(): void {}
}
