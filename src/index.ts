import { audioLoad } from "./core/audio";
import { InputManager } from "./core/inputManager";
import { SceneManager } from "./core/sceneManager";

import { PlayerBeatTheGameScene } from "./scenes/playerBeatTheGameScene";
import { PlayerBeatLevelScene } from "./Scenes/playerBeatLevelScene";
import { PlayerLostLevelScene } from "./Scenes/playerLostLevelScene";
import { TransitionScene } from "./Scenes/transitionScene";
import { MainMenuScene } from "./Scenes/mainMenuScene";
import { GameScene } from "./Scenes/gameScene";
import * as K from "./Scenes/sceneKeys";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./core/constants";
import { AGENT_PLAYER, AGENT_RANDOM, AGENT_A_STAR } from "./Agents/agentType";

window.addEventListener("load", () => {
  audioLoad(() => {
    InputManager.init();

    //////////////// Create 2d canvas
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d")!;

    document.getElementById("game")!.appendChild(canvas);

    //////////////// Set up Scenes
    const sceneManager = new SceneManager();

    const transitionScene = new TransitionScene(ctx);
    sceneManager.registerScene(K.KEY_TRANSITION, transitionScene);

    sceneManager.registerScene(
      K.KEY_MAIN_MENU,
      new MainMenuScene(ctx, transitionScene),
    );

    sceneManager.registerScene(
      K.KEY_GAME,
      new GameScene(ctx, transitionScene, AGENT_PLAYER),
    );

    sceneManager.registerScene(
      K.KEY_PLAYER_BEAT_THE_GAME,
      new PlayerBeatTheGameScene(ctx),
    );

    sceneManager.registerScene(
      K.KEY_PLAYER_WON,
      new PlayerBeatLevelScene(ctx, transitionScene),
    );

    sceneManager.registerScene(
      K.KEY_PLAYER_LOST,
      new PlayerLostLevelScene(ctx, transitionScene),
    );

    //////////////// Set current scene and start the game
    let currentScene = sceneManager.getScene(K.KEY_MAIN_MENU)!;
    currentScene.onEnter();

    let previousTimeStamp = 0;
    const gameLoop = (timeStamp: number) => {
      // calculate delta time for the frame
      const dt = Math.min(0.05, (timeStamp - previousTimeStamp) / 1000); // ms to s
      previousTimeStamp = timeStamp;

      // run scene
      currentScene.update(dt);
      currentScene.render();

      // check if the scene has to be changed
      const scene = currentScene.changeScene;
      if (scene !== undefined) {
        currentScene.onExit();
        currentScene = sceneManager.getScene(scene)!;
        currentScene.onEnter();
      }

      window.requestAnimationFrame(gameLoop);
    };

    window.requestAnimationFrame(gameLoop);
  });
});
