import { audioLoad } from "./core/audio";
import { InputManager } from "./core/inputManager";
import { SceneManager } from "./core/sceneManager";

import { PlayerBeatTheGameScene } from "./Scenes/playerBeatTheGameScene";
import { PlayerBeatLevelScene } from "./Scenes/playerBeatLevelScene";
import { PlayerLostLevelScene } from "./Scenes/playerLostLevelScene";
import { TransitionScene } from "./Scenes/transitionScene";
import { MainMenuScene } from "./Scenes/mainMenuScene";
import { GameScene } from "./Scenes/gameScene";
import * as K from "./Scenes/sceneKeys";

import { SCREEN_WIDTH, SCREEN_HEIGHT, IS_STUDY } from "./core/constants";
import { AGENT_PLAYER } from "./Agents/agentType";
import { Logger } from "./logger";
import { Server } from "./server";

window.addEventListener("load", () => {
  audioLoad(() => {
    Server.getCondition((condition) => {
      InputManager.init();
      Logger.init();

      /////////////////////////////////////////////////////////////////////////
      // Create 2d canvas
      const canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      canvas.width = SCREEN_WIDTH;
      canvas.height = SCREEN_HEIGHT;
      const ctx = canvas.getContext("2d")!;

      document.getElementById("game")!.appendChild(canvas);

      /////////////////////////////////////////////////////////////////////////
      // Set up Scenes
      const sceneManager = new SceneManager();

      const transitionScene = new TransitionScene(ctx);
      sceneManager.registerScene(K.KEY_TRANSITION, transitionScene);

      sceneManager.registerScene(
        K.KEY_MAIN_MENU,
        new MainMenuScene(ctx, transitionScene),
      );

      sceneManager.registerScene(
        K.KEY_GAME,
        new GameScene(ctx, transitionScene, condition, AGENT_PLAYER),
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

      /////////////////////////////////////////////////////////////////////////
      // Set up time limit
      let timeLeft = 60 * 10; // 5 minutes
      const timeField = document.getElementById("time")!;

      if (!IS_STUDY) {
        timeField.style.display = "none";
      }

      /////////////////////////////////////////////////////////////////////////
      // Set current scene and start the game
      let currentScene = sceneManager.getScene(K.KEY_MAIN_MENU)!;
      currentScene.onEnter();

      let previousTimeStamp = 0;
      const gameLoop = (timeStamp: number) => {
        // calculate delta time for the frame
        const dt = Math.min(0.05, (timeStamp - previousTimeStamp) / 1000); // ms to s
        previousTimeStamp = timeStamp;

        // update time
        if (IS_STUDY) {
          if (timeLeft > 0) {
            timeLeft -= dt;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = Math.round(timeLeft - minutes * 60);
            timeField.innerHTML = `${minutes}:${seconds.toString().padStart(2, "0")}`;
          } else {
            // time is over, change the scene
            currentScene.onExit();
            currentScene = sceneManager.getScene(K.KEY_PLAYER_BEAT_THE_GAME)!;
            currentScene.onEnter();
            return; // end game loop
          }
        }

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
});
