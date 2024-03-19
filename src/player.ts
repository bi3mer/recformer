
import { GameObject } from "./gameObject";
import { InputManager, Key } from "./inputManager";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;
const MAX_MOVE_MOD = 8;
export class Player extends GameObject {
  private movingRight: boolean = false;
  private movingLeft: boolean = false;
  private moveMod: number = 0;

  constructor(x: number, y: number) {
    super(x, y);
  }

  update(dt: number): void {

    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.movingRight = true;
      this.x += 4;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + 1);
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.movingLeft = true;
      this.x -= 4;
      this.moveMod = Math.min(MAX_MOVE_MOD, this.moveMod + 1);
      // this.moveMod = Math.max(-MAX_MOVE_MOD, this.moveMod - 1);
    }

    if (this.movingLeft && this.movingRight) {
      this.movingLeft = false;
      this.movingRight = false;
      this.moveMod = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(150,150,255,1)";

    if (this.movingRight) {
      let region = new Path2D();
      region.moveTo(this.x, this.y);
      region.lineTo(this.x - this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH - this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH, this.y);
      region.closePath();

      ctx.fill(region, "evenodd");

      this.movingRight = false;
    } else if (this.movingLeft) {
      let region = new Path2D();
      region.moveTo(this.x, this.y);
      region.lineTo(this.x + this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH + this.moveMod, this.y + PLAYER_HEIGHT);
      region.lineTo(this.x + PLAYER_WIDTH, this.y);
      region.closePath();

      ctx.fill(region, "evenodd");
      this.movingLeft = false;
    } else {
      ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
  }
} 
