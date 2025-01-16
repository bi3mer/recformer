import { InputManager, Key } from "../core/inputManager";
import { Agent } from "./agent";

export class RandomAgent extends Agent {
  movingRight: boolean = false;
  movingLeft: boolean = false;
  jumping: boolean = false;

  name(): string {
    return "random";
  }

  update() {
    this.movingRight = InputManager.isKeyDown(Key.D, Key.RIGHT);
    this.movingLeft = InputManager.isKeyDown(Key.A, Key.LEFT);
    this.jumping = InputManager.isKeyDown(Key.SPACE, Key.UP);
  }
}
