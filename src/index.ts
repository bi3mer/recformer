import { Engine } from "./engine";
import { InputManager } from "./inputManager";

window.addEventListener('load', () => {
  InputManager.init();

  const engine = new Engine();
  engine.start();
});
