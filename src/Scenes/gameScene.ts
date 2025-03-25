import { Scene } from "../core/scene";
import { Camera } from "../core/camera";
import { ILevelDirector } from "../LevelGeneration/iLevelDirector";
import { SingleLevelDirector } from "../LevelGeneration/singleLevelDirector";
import { MDPLevelDirector } from "../LevelGeneration/mdpLevelDirector";
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
import { RepeatingTimer } from "../core/repeatingTimer";
import { Logger } from "../logger";

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private transitionScene: TransitionScene;

  private agentType: number;
  private game: GameModel;
  private camera: Camera;
  private levelDirector: ILevelDirector;
  private timer: RepeatingTimer;

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
    this.levelDirector = new SingleLevelDirector();
    // this.levelDirector = new MDPLevelDirector();
  }

  onEnter(): void {
    const lvl = this.levelDirector.get(LEVEL_SEGMENTS_PER_LEVEL);
    this.game = new GameModel(lvl, this.agentType);
    this.timer = new RepeatingTimer(0.1 * 1000, () => {
      const player = this.game.dynamicEntities[0];
      Logger.pushPlayerPositionAndVelocity(player.pos, player.velocity);
    });
  }

  update(dt: number): void {
    this.game.update(dt);
    this.timer.update();

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
        if (this.levelDirector.playerBeatGame()) {
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
