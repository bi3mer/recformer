import { PriorityQueue } from "../DataStructures/priorityQueue";
import { InputManager, Key } from "../core/inputManager";
import { Point } from "../core/point";
import { GameModel } from "../gameModel";
import { Agent } from "./agent";

class Action {
  moveRight: boolean;
  moveLeft: boolean;
  jump: boolean;

  constructor(moveRight: boolean, moveLeft: boolean, jump: boolean) {
    this.moveRight = moveRight;
    this.moveLeft = moveLeft;
    this.jump = jump;
  }
}

const ACTIONS: Action[] = [
  new Action(false, false, false),
  new Action(true, false, false),
  new Action(false, true, false),
  new Action(false, false, true),
  new Action(true, false, true),
  new Action(false, true, false),
];
const NUM_ACTIONS = ACTIONS.length;

class Node {
  depth: number;
  model: GameModel;
  action: Action;
  pastNode: Node | null; // used for reconstructing tree

  constructor(
    depth: number,
    model: GameModel,
    action: Action,
    pastNode: Node | null = null,
  ) {
    this.depth = depth;
    this.model = model;
    this.action = action;
    this.pastNode = pastNode;
  }
}

function astar(model: GameModel, target: Point): Action[] {
  const nodes = new PriorityQueue<Node>();
  nodes.insert(0, new Node(0, model, new Action(false, false, false)));
  let node;
  let actionIndex = 0;

  while (nodes.length() > 0) {
    const cur = nodes.pop();
    if (cur.model.protaganist().pos.equals(target)) {
      node = cur;
      break;
    }

    for (actionIndex = 0; actionIndex < NUM_ACTIONS; ++actionIndex) {
      const a = ACTIONS[actionIndex];
    }
  }

  return [new Action(true, false, true)];
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
      // ++this.coinIndex;
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
