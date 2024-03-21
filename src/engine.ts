import { Scene } from "./scene";
import { SceneManager } from "./sceneManager";
import { MainMenuScene } from "./mainMenuScene";
import { GameScene } from "./gameScene";
import { KEY_GAME, KEY_MAIN_MENU } from "./sceneKeys";
import { SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE } from "./constants";

export class Engine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  private currentScene: Scene
  private sceneManager: SceneManager

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;


    this.ctx = this.canvas.getContext('2d')!;
    document.getElementById('game')!.appendChild(this.canvas);

    this.sceneManager = new SceneManager();
    this.sceneManager.registerScene(KEY_MAIN_MENU, new MainMenuScene());
    this.sceneManager.registerScene(KEY_GAME, new GameScene(this.ctx));

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
