import { ACTIONS, Action, NUM_ACTIONS } from "./Agents/action";
import { GameModel } from "./gameModel";
import { PriorityQueue } from "./DataStructures/priorityQueue";
import { Point, pointEquals } from "./DataStructures/point";
import { Action } from "./Agents/action";

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

function astarSearch(
  model: GameModel,
  target: Point,
): [boolean, GameModel, Action[]] {
  const nodes = new PriorityQueue<Node>();
  nodes.insert(0, new Node(0, model, new Action(false, false, false)));
  let node;
  let actionIndex = 0;

  while (nodes.length() > 0) {
    const cur = nodes.pop();
    if (pointEquals(cur.model.protaganist().pos, target)) {
      node = cur;
      break;
    }

    for (actionIndex = 0; actionIndex < NUM_ACTIONS; ++actionIndex) {
      const a = ACTIONS[actionIndex];
    }
  }

  return [false, model, [new Action(true, false, true)]];
}

export function astar(model: GameModel): Action[] {
  const actions: Action[] = [];
  let i = 0;
  const size = model.coins.length;
  for (; i < size; ++i) {
    const [error, nextModel, nextActions] = astarSearch(model, model.coins[i]);
    if (error) {
      console.error(`Pathing failed for coin at ${model.coins[i]}`);
    }
    actions.concat(nextActions);
  }
  return [new Action(true, false, true)];
}

//   update(dt: number) {
//     if (this.actions.length == 0) {
//       this.actions = astar(this.model, this.model.coins[this.coinIndex]);
//       // ++this.coinIndex;
//     }

//     this.time += dt;
//     if (this.time > 0.2) {
//       this.time = 0;

//       const action = this.actions.pop()!;
//       this.movingRight = action.moveRight;
//       this.movingLeft = action.moveLeft;
//       this.jumping = action.jump;
//     }
//   }
// }
