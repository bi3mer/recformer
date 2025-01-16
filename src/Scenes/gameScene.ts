import { Scene } from "../core/scene";
import { Camera } from "../core/camera";
import { LevelDirector } from "../LevelGeneration/levelDirector";
import { TransitionScene } from "./transitionScene";
import { GameModel } from "../gameModel";
import {
  GAME_STATE_LOST,
  GAME_STATE_PLAYING,
  GAME_STATE_WON,
  LEVEL_SEGMENTS_PER_LEVEL,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../core/constants";
import {
  KEY_PLAYER_BEAT_THE_GAME,
  KEY_PLAYER_LOST,
  KEY_PLAYER_WON,
  KEY_TRANSITION,
} from "./sceneKeys";
import { Protaganist } from "../GameObjects/protaganist";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private transitionScene: TransitionScene;

  private agentType: number;
  private game: GameModel;
  private camera: Camera;
  private levelDirector: LevelDirector;

  constructor(
    ctx: CanvasRenderingContext2D,
    transitionScene: TransitionScene,
    agentType: number,
  ) {
    super();

    this.ctx = ctx;
    this.agentType = agentType;
    this.transitionScene = transitionScene;
    this.camera = new Camera();
    this.levelDirector = new LevelDirector();
  }

  onEnter(): void {
    const lvl = this.levelDirector.get(LEVEL_SEGMENTS_PER_LEVEL);
    this.game = new GameModel(lvl, this.agentType);
  }

  update(dt: number): void {
    this.game.update(dt);

    // Change scenes if necessary
    const state = this.game.state();
    switch (state) {
      case GAME_STATE_PLAYING:
        break;
      case GAME_STATE_LOST: {
        this.transitionScene.targetScene = KEY_PLAYER_LOST;
        this.changeScene = KEY_TRANSITION;
        break;
      }
      case GAME_STATE_WON: {
        if (this.levelDirector.playerIsOnLastLevel) {
          this.transitionScene.targetScene = KEY_PLAYER_BEAT_THE_GAME;
        } else {
          this.transitionScene.targetScene = KEY_PLAYER_WON;
        }

        this.changeScene = KEY_TRANSITION;
        break;
      }
      default: {
        console.error(`Unhandled game state type: ${state}`);
        break;
      }
    }
  }

  render(): void {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.game.render(this.ctx, this.camera);
  }

  protected _onExit(): void {
    const fitness = this.game.fitness();
    console.log(`Fitness: ${fitness}`);

    this.levelDirector.update(
      this.transitionScene.targetScene === KEY_PLAYER_WON,
      fitness,
    );
  }
}
