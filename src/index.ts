import { audioLoad } from "./audio";
import { Engine } from "./engine";
import { InputManager } from "./inputManager";

window.addEventListener("load", () => {
  audioLoad(() => {
    InputManager.init();

    const engine = new Engine();
    engine.start();
  });
});
