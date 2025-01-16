import { GameModel } from "../gameModel";

export abstract class Agent {
  model: GameModel;
  movingRight: boolean = false;
  movingLeft: boolean = false;
  jumping: boolean = false;

  abstract name(): string;
  abstract update(dt: number): void;
}
