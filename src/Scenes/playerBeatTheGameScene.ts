import { COLOR_WHITE } from "../colorPalette";
import { IS_STUDY, SCREEN_HEIGHT, SCREEN_WIDTH } from "../core/constants";
import { Scene } from "../core/scene";
import { Logger } from "../logger";

export class PlayerBeatTheGameScene extends Scene {
  private timer: number = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  onEnter(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = COLOR_WHITE;

    document.getElementById("time")!.style.display = "none";

    if (IS_STUDY) {
      this.ctx.fillText("Thank you for playing!", 240, SCREEN_HEIGHT / 2);
      const url = `https://neu.co1.qualtrics.com/jfe/form/SV_3HO5uG0RlBrJB2e?userid=${Logger.playerID}`;
      document.getElementById("instructions")!.innerHTML = `
        <h3>
  Please continue to to the survey. After you complete the survey, your code will be available:
  <br/>
  <br/>
  <a style="color:yellow" href="${url}">${url}</a>
  </h3>
  `;
    } else {
      this.ctx.fillText("You won! Congratulations!", 170, SCREEN_HEIGHT / 2);
    }
  }

  update(dt: number): void {}

  render(): void {}
  protected _onExit(): void {}
}
