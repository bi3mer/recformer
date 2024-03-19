
import { GameObject } from "./gameObject";
import { InputManager, Key } from "./inputManager";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 30;

export class Player extends GameObject {

  constructor(x: number, y: number) {
    super(x, y);
  }

  update(dt: number): void {

    if (InputManager.isKeyDown(Key.D, Key.RIGHT)) {
      this.x += 4;
    }

    if (InputManager.isKeyDown(Key.A, Key.LEFT)) {
      this.x -= 4;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "rgba(100,100,255,1)";
    ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
} 
