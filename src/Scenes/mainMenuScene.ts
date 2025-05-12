import { Action } from "../Agents/action";
import { AGENT_EMPTY } from "../Agents/agentType";
import { REPLAY_FRAME_TIME, REPLAY_UPDATES_PER_FRAME } from "../replays";
import { COLOR_YELLOW } from "../colorPalette";
import { Camera } from "../core/camera";
import {
  GAME_STATE_PLAYING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../core/constants";
import { InputManager, Key } from "../core/inputManager";
import { Scene } from "../core/scene";
import { randomInt, randomKey } from "../core/util";
import { GameModel } from "../gameModel";
import { replays } from "../replays";
import { KEY_GAME, KEY_TRANSITION } from "./sceneKeys";
import { TransitionScene } from "./transitionScene";
import { HAND_MDP } from "../LevelGeneration/handcraftedMDP";
import { CustomNode } from "../LevelGeneration/customNode";

const DT = REPLAY_FRAME_TIME / REPLAY_UPDATES_PER_FRAME;

export class MainMenuScene extends Scene {
  ctx: CanvasRenderingContext2D;
  transitionScene: TransitionScene;
  camera: Camera;
  game: GameModel;
  actions: Action[] = [];
  actionIndex: number;
  frame: number;
  time: number;
  previousKey: string = "";

  constructor(ctx: CanvasRenderingContext2D, transitionScene: TransitionScene) {
    super();

    this.ctx = ctx;
    this.transitionScene = transitionScene;
    this.camera = new Camera();
  }

  onEnter(): void {
    // get level that wasn't just shown to the player
    let levelID = randomKey(replays);
    while (
      levelID == this.previousKey ||
      (HAND_MDP.nodes[levelID] as CustomNode).levels.length === 0
    ) {
      levelID = randomKey(replays);
    }
    this.previousKey = levelID;

    // Get index for level and the actions
    const N: CustomNode = HAND_MDP.nodes[levelID] as CustomNode;
    const size = N.levels.length;
    const index = randomInt(0, size - 1);

    // set up replay
    this.actions = replays[levelID][index];
    this.game = new GameModel(N.levels[index], AGENT_EMPTY);
    this.actionIndex = 0;
    this.frame = 0;
    this.time = 0;
  }

  update(dt: number): void {
    if (
      this.game.state() !== GAME_STATE_PLAYING ||
      this.actionIndex >= this.actions.length
    ) {
      this.onEnter();
    }

    if (InputManager.isKeyDown(Key.SPACE)) {
      this.transitionScene.targetScene = KEY_GAME;
      this.changeScene = KEY_TRANSITION;
    }

    this.time += dt;
    if (this.time >= 0.0166666) {
      this.time = this.time - 0.016666;

      if (this.frame >= REPLAY_UPDATES_PER_FRAME) {
        this.frame = 0;
        ++this.actionIndex;
      }

      ++this.frame;

      if (this.actionIndex < this.actions.length) {
        this.game.protaganist().agent.set(this.actions[this.actionIndex]);
        this.game.update(DT);
      }
    }
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
