import { Scene } from "./scene";
import { KEY_GAME } from "./sceneKeys";
import { BLOCK_HEIGHT, BLOCK_SCREEN_HEIGHT, BLOCK_SCREEN_WIDTH, NUM_ROWS, PLAYER_SCREEN_HEIGHT, PLAYER_SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH, TILE_SIZE } from "./constants";
import { InputManager, Key } from "./inputManager";
import { Point } from "./point";
import { COLOR_PLAYER } from "./colors";

const MAX_COLS = Math.floor(SCREEN_WIDTH / TILE_SIZE) - 1;

export class MainMenuScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private fakePlayerPos: Point;
  private sign: number;

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    this.ctx = ctx;
    this.fakePlayerPos = new Point(10, (NUM_ROWS - 2) * TILE_SIZE);
    this.sign = 1;
  }

  onEnter(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.ctx.fillStyle = COLOR_PLAYER;
    this.ctx.font = '48px Arial'
    this.ctx.fillText('Recformer', 247, 100);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial';
    this.ctx.fillText("Press 'space' to start", 220, SCREEN_HEIGHT * 0.55);

    const startY = this.fakePlayerPos.y + TILE_SIZE;
    this.ctx.strokeStyle = 'white';
    for (let i = 0; i < 25; ++i) {
      this.ctx.strokeRect(
        i * TILE_SIZE,
        startY,
        BLOCK_SCREEN_WIDTH,
        BLOCK_SCREEN_HEIGHT
      );
    }

    // set fill style for render 
    this.ctx.fillStyle = COLOR_PLAYER;
  }

  update(dt: number): void {
    if (InputManager.isKeyDown(Key.SPACE)) {
      this.changeScene = KEY_GAME;
    }

    const x = this.fakePlayerPos.x;
    if (x < 1 || x > MAX_COLS) {
      this.sign *= -1;
    }

    this.fakePlayerPos.x += dt * this.sign;


  }

  // Rendering only needs to be done once, so no need to use this function
  render(): void {
    const x = this.fakePlayerPos.x * TILE_SIZE;
    const y = (NUM_ROWS - 2) * TILE_SIZE;

    this.ctx.clearRect(0, this.fakePlayerPos.y, SCREEN_WIDTH, PLAYER_SCREEN_HEIGHT);
    this.ctx.fillRect(
      x,
      y,
      PLAYER_SCREEN_WIDTH,
      PLAYER_SCREEN_HEIGHT
    );
  }

  protected _onExit(): void { }
}
