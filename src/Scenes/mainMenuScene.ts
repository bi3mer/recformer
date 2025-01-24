import { AGENT_RANDOM } from "../Agents/agentType";
import { idToLevel } from "../LevelGeneration/levels";
import { ASTAR_FRAME_TIME } from "../aStar";
import { COLOR_YELLOW } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  GAME_STATE_PLAYING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../core/constants";
import { InputManager, Key } from "../core/inputManager";
import { Scene } from "../core/scene";
import { randomKey } from "../core/util";
import { GameModel } from "../gameModel";
import { KEY_GAME, KEY_TRANSITION } from "./sceneKeys";
import { TransitionScene } from "./transitionScene";

export class MainMenuScene extends Scene {
  ctx: CanvasRenderingContext2D;
  transitionScene: TransitionScene;
  camera: Camera;
  game: GameModel;

  constructor(ctx: CanvasRenderingContext2D, transitionScene: TransitionScene) {
    super();

    this.ctx = ctx;
    this.transitionScene = transitionScene;
    this.camera = new Camera();
  }

  onEnter(): void {
    const temp = randomKey(idToLevel);
    console.log(idToLevel[temp]);
    this.game = new GameModel(idToLevel[temp], AGENT_RANDOM);
    // this.game = new GameModel(idToLevel[randomKey(idToLevel)], AGENT_RANDOM);
  }

  update(dt: number): void {
    if (this.game.state() !== GAME_STATE_PLAYING) {
      this.onEnter();
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }

    this.game.update(dt);
  }

  // Rendering only needs to be done once, so no need to use this function
  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.game.render(this.ctx, this.camera);

    this.ctx.fillStyle = COLOR_YELLOW;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("Recformer", 247, 100);

    this.ctx.fillStyle = COLOR_YELLOW;
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to start", 220, SCREEN_HEIGHT * 0.55);
  }

  protected _onExit(): void {}
}
