import { COLOR_WHITE } from "../colorPalette";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../core/constants";
import { Scene } from "../core/scene";

export class PlayerBeatTheGameScene extends Scene {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    this.ctx = ctx;
  }

  onEnter(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = COLOR_WHITE;
    this.ctx.fillText("You won! Congratulations!", 170, SCREEN_HEIGHT / 2);

    document.getElementById("time")!.style.display = "none";
    document.getElementById("instructions")!.style.display = "none";
    document.getElementById("studyOver")!.style.display = "inline";
  }

  update(dt: number): void {}
  render(): void {}
  protected _onExit(): void {}
}
