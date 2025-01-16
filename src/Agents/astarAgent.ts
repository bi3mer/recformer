import { InputManager, Key } from "../core/inputManager";
import { Point } from "../core/point";
import { GameModel } from "../gameModel";
import { Agent } from "./agent";

class Action {
  moveRight: boolean;
  moveLeft: boolean;
  jump: boolean;
}

class Node {
  depth: number;
  model: GameModel;

  constructor(depth: number, model: GameModel) {
    this.depth = depth;
    this.model = model;
  }
}

function astar(model: GameModel, target: Point): Action[] {
  const nodes = [0, new Node(0, model)];

  while (nodes.length >= 0) {}

  return [];
}

export class AStarAgent extends Agent {
  model: GameModel;
  actions: Action[] = [];
  coinIndex: number = 0;
  time: number = 0;

  constructor(model: GameModel) {
    super();
    this.model = model;
  }

  name(): string {
    return "astar";
  }

  update(dt: number) {
    if (this.actions.length == 0) {
      this.actions = astar(this.model, this.model.coins[this.coinIndex]);
      ++this.coinIndex;
    }

    this.time += dt;
    if (this.time > 0.2) {
      this.time = 0;

      const action = this.actions.pop()!;
      this.movingRight = action.moveRight;
      this.movingLeft = action.moveLeft;
      this.jumping = action.jump;
    }
  }
}
