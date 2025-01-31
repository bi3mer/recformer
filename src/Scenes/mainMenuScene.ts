import { Action } from "../Agents/action";
import { AGENT_EMPTY } from "../Agents/agentType";
import { idToLevel } from "../LevelGeneration/levels";
import { ASTAR_FRAME_TIME, ASTAR_UPDATES_PER_FRAME } from "../aStar";
import { COLOR_YELLOW } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  GAME_STATE_PLAYING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../core/constants";
import { InputManager, Key } from "../core/inputManager";
import { Scene } from "../core/scene";
import { randomInt, randomKey, randomValue } from "../core/util";
import { GameModel } from "../gameModel";
import { KEY_GAME, KEY_TRANSITION } from "./sceneKeys";
import { TransitionScene } from "./transitionScene";
import { replays } from "../replays";

const DT = ASTAR_FRAME_TIME / ASTAR_UPDATES_PER_FRAME;

export class MainMenuScene extends Scene {
  ctx: CanvasRenderingContext2D;
  transitionScene: TransitionScene;
  camera: Camera;
  game: GameModel;
  actions: Action[] = [];
  actionIndex: number;
  frame: number;

  constructor(ctx: CanvasRenderingContext2D, transitionScene: TransitionScene) {
    super();

    this.ctx = ctx;
    this.transitionScene = transitionScene;
    this.camera = new Camera();
  }

  onEnter(): void {
    const temp = randomKey(idToLevel);
    console.log(idToLevel[temp]);
    // this.game = new GameModel(idToLevel[temp], AGENT_RANDOM);
    const easyLevelIDs = ["1-a", "1-b", "2-a", "3-b", "4-a", "4-b", "6-a"];
    const levelID = randomKey(replays);
    this.actions = replays[levelID];
    this.game = new GameModel(idToLevel[levelID], AGENT_EMPTY);
    this.actionIndex = 0;
    this.frame = 0;
  }

  update(dt: number): void {
    if (this.game.state() !== GAME_STATE_PLAYING) {
      this.onEnter();
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }
    if (this.frame >= ASTAR_UPDATES_PER_FRAME) {
      this.frame = 0;
      ++this.actionIndex;
    }
    ++this.frame;
    this.game.protaganist().agent.set(this.actions[this.actionIndex]);
    this.game.update(DT);
  }

  // Rendering only needs to be done once, so no need to use this function
  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.game.render(this.ctx, this.camera);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(240, 60, 240, 47);
    this.ctx.fillRect(210, 234, 295, 39);

    this.ctx.fillStyle = COLOR_YELLOW;
    this.ctx.font = "48px Arial";
    this.ctx.fillText("Recformer", 247, 100);

    this.ctx.font = "30px Arial";
    this.ctx.fillText("Press 'space' to start", 220, SCREEN_HEIGHT * 0.55);
  }

  protected _onExit(): void {}
}
