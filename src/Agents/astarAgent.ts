import { InputManager, Key } from "../core/inputManager";
import { GameModel } from "../gameModel";
import { Agent } from "./agent";

export class AStarAgent extends Agent {
  public model: GameModel;

  constructor(model: GameModel) {
    super();
    this.model = model;
  }

  name(): string {
    return "astar";
  }

  update() {
    this.movingRight = InputManager.isKeyDown(Key.D, Key.RIGHT);
    this.movingLeft = InputManager.isKeyDown(Key.A, Key.LEFT);
    this.jumping = InputManager.isKeyDown(Key.SPACE, Key.UP);
  }
}
