
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { Scene } from "./scene";
import { KEY_MAIN_MENU } from "./sceneKeys";

export class TransitionScene extends Scene {
  public targetScene: string = KEY_MAIN_MENU;

  private timer: number = 0;
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
  }

  onEnter(): void { }

  update(dt: number): void {
    this.timer += dt;

    if (this.timer > 0.6) {
      this.changeScene = this.targetScene;
    }
  }

  render(): void {
    const t = this.timer / 0.5;
    this.ctx.fillStyle = `rgba(0,0,0, ${t})`;
    this.ctx.fillRect(
      0,
      0,
      SCREEN_WIDTH,
      SCREEN_HEIGHT
    );
  }

  protected _onExit(): void {
    this.timer = 0;
  }
}
