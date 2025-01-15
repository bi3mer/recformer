import { Scene } from "./Scenes/scene";
import { SceneManager } from "./Scenes/sceneManager";
import { MainMenuScene } from "./Scenes/mainMenuScene";
import { GameScene } from "./Scenes/gameScene";
import { PlayerBeatTheGameScene } from "./Scenes/playerBeatTheGameScene";
import { TransitionScene } from "./Scenes/transitionScene";
import { PlayerBeatLevelScene } from "./Scenes/playerBeatLevelScene";
import { PlayerLostLevelScene } from "./Scenes/playerLostLevelScene";
import {
  KEY_GAME,
  KEY_MAIN_MENU,
  KEY_PLAYER_BEAT_THE_GAME,
  KEY_PLAYER_LOST,
  KEY_PLAYER_WON,
  KEY_TRANSITION,
} from "./Scenes/sceneKeys";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./constants";

export class Engine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private currentScene: Scene;
  private sceneManager: SceneManager;

  constructor() {
    // create 2d canvas
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "canvas");
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    this.ctx = this.canvas.getContext("2d")!;

    document.getElementById("game")!.appendChild(this.canvas);

    const transitionScene = new TransitionScene(this.ctx);

    this.sceneManager = new SceneManager();
    this.sceneManager.registerScene(
      KEY_MAIN_MENU,
      new MainMenuScene(this.ctx, transitionScene),
    );
    this.sceneManager.registerScene(
      KEY_GAME,
      new GameScene(this.ctx, transitionScene),
    );
    this.sceneManager.registerScene(
      KEY_PLAYER_BEAT_THE_GAME,
      new PlayerBeatTheGameScene(this.ctx),
    );
    this.sceneManager.registerScene(KEY_TRANSITION, transitionScene);
    this.sceneManager.registerScene(
      KEY_PLAYER_WON,
      new PlayerBeatLevelScene(this.ctx, transitionScene),
    );
    this.sceneManager.registerScene(
      KEY_PLAYER_LOST,
      new PlayerLostLevelScene(this.ctx, transitionScene),
    );

    this.currentScene = this.sceneManager.getScene(KEY_MAIN_MENU)!;
    this.currentScene.onEnter();
  }

  start() {
    let previousTimeStamp = 0;
    const gameLoop = (timeStamp: number) => {
      // calculate delta time for the frame
      const dt = Math.min(0.05, (timeStamp - previousTimeStamp) / 1000); // ms to s
      previousTimeStamp = timeStamp;

      // run scene
      this.currentScene.update(dt);
      this.currentScene.render();

      // check if the scene has to be changed
      const scene = this.currentScene.changeScene;
      if (scene !== undefined) {
        this.currentScene.onExit();
        this.currentScene = this.sceneManager.getScene(scene)!;
        this.currentScene.onEnter();
      }

      window.requestAnimationFrame(gameLoop);
    };

    window.requestAnimationFrame(gameLoop);
  }
}
