import { Scene } from "../core/scene";
import { Camera } from "../core/camera";
import { ILevelDirector } from "../LevelGeneration/iLevelDirector";
import { SingleLevelDirector } from "../LevelGeneration/singleLevelDirector";
import { MDPLevelDirector } from "../LevelGeneration/mdpLevelDirector";
import { TransitionScene } from "./transitionScene";
import { GameModel } from "../gameModel";
import {
  CONDITION_NOT_FOUND,
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
import { Server } from "../server";
import { HAND_MDP } from "../LevelGeneration/handcraftedMDP";
import { AUTO_MDP } from "../LevelGeneration/autoMDP";
import { CustomNode } from "../LevelGeneration/customNode";
import { choice } from "../LevelGeneration/GDM-TS/src/rand";
import { StaticLevelDirector } from "../LevelGeneration/staticLevelDirector";
import { Protaganist } from "../GameObjects/protaganist";

function createLevelDirector(condition: string): ILevelDirector {
  if (condition === CONDITION_NOT_FOUND) {
    const CONDITIONS = ["auto-r", "auto-d", "static", "hand"];
    const params = new URLSearchParams(document.location.search);

    if (params.has("condition")) {
      const c = params.get("condition")!;
      if (CONDITIONS.includes(c)) {
        condition = c;
      } else {
        condition = choice(CONDITIONS);
      }
    } else {
      condition = choice(CONDITIONS);
    }
  }

  console.log(condition);

  Logger.condition = condition;
  if (condition === "auto-r") {
    console.log("Condition: auto-r");
    return new MDPLevelDirector(AUTO_MDP);
  } else if (condition === "auto-d") {
    console.log("Condition: auto-d");

    const maxDepth = (AUTO_MDP.nodes["end"] as CustomNode).depth - 1;
    for (const nodeName in AUTO_MDP.nodes) {
      const N = AUTO_MDP.nodes[nodeName] as CustomNode;
      N.designerReward = N.depth / maxDepth - 1;
    }

    return new MDPLevelDirector(AUTO_MDP);
  } else if (condition === "static") {
    console.log("Condition: static");
    return new StaticLevelDirector(AUTO_MDP);
  } else if (condition === "hand") {
    console.log("Condition: hand");
    return new MDPLevelDirector(HAND_MDP);
  }

  // no valid condition found, going with a random one
  console.log("y", condition);
  return createLevelDirector(choice(["auto-r", "auto-d", "static", "hand"]));
}

export class GameScene extends Scene {
  private ctx: CanvasRenderingContext2D;
  private transitionScene: TransitionScene;

  private agentType: number;
  private game: GameModel;
  private camera: Camera;
  private levelDirector: ILevelDirector;
  private timer: RepeatingTimer;
  private timePlayed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    transitionScene: TransitionScene,
    condition: string,
    agentType: number,
  ) {
    super();

    this.ctx = ctx;
    this.agentType = agentType;
    this.transitionScene = transitionScene;
    this.camera = new Camera();

    this.levelDirector = createLevelDirector(condition);
  }

  onEnter(): void {
    const lvl = this.levelDirector.get(LEVEL_SEGMENTS_PER_LEVEL);
    this.game = new GameModel(lvl, this.agentType);
    this.timer = new RepeatingTimer(0.1, () => {
      const player = this.game.dynamicEntities[0];
      Logger.pushPlayerPositionAndVelocity(player.pos, player.velocity);
    });
    this.timePlayed = 0;

    Logger.coinsInLevel = this.game.coins.length;
  }

  update(dt: number): void {
    this.game.update(dt, 2);
    this.timer.update(dt);
    this.timePlayed += dt;

    // Change scenes if necessary
    const state = this.game.state();
    switch (state) {
      case GAME_STATE_PLAYING:
        break;
      case GAME_STATE_LOST: {
        Logger.timePlayed = this.timePlayed;

        this.transitionScene.targetScene = KEY_PLAYER_LOST;
        this.changeScene = KEY_TRANSITION;
        break;
      }
      case GAME_STATE_WON: {
        Logger.result = "won";
        Logger.timePlayed = this.timePlayed;

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
    Logger.coinsCollected = (
      this.game.dynamicEntities[0] as Protaganist
    ).coinsCollected;
    Logger.levels = this.levelDirector.getKeys();

    console.log(Logger.result);
    if (Logger.result !== "none") {
      Server.submitAttempt();
    }

    Logger.resetLog();

    const fitness = this.game.fitness();
    console.log(`Fitness: ${fitness}`);

    this.levelDirector.update(
      this.transitionScene.targetScene === KEY_PLAYER_WON,
      fitness,
    );
  }
}
