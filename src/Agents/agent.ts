import { GameModel } from "../gameModel";

export abstract class Agent {
  model: GameModel;

  Agent(model: GameModel) {
    this.model = model;
  }

  abstract name(): string;
  abstract action(): string;
}
