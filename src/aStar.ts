import { ACTIONS, Action, NUM_ACTIONS } from "./Agents/action";
import {
  Point,
  pointEuclideanDistance,
  pointStr,
} from "./DataStructures/point";
import { PriorityQueue } from "./DataStructures/priorityQueue";
import { GameObject } from "./core/gameObject";
import { GameModel } from "./gameModel";

export const ASTAR_FRAME_TIME = 0.01;

class Node {
  depth: number;
  model: GameModel;
  action: Action;
  pastNode: Node | undefined; // used for reconstructing tree

  constructor(
    depth: number,
    model: GameModel,
    action: Action,
    pastNode: Node | undefined = undefined,
  ) {
    this.depth = depth;
    this.model = model;
    this.action = action;
    this.pastNode = pastNode;
  }
}

function astarSearch(
  model: GameModel,
  target: number,
): [GameModel | undefined, Action[]] {
  // set up search
  const seen = new Set<string>();
  seen.add(model.hash());

  const nodes = new PriorityQueue<Node>();
  nodes.insert(0, new Node(0, model, ACTIONS[0]));

  let node: Node | undefined = undefined;
  let actionIndex = 0;

  // Start search for target
  while (nodes.length() > 0) {
    const curNode = nodes.pop();
    console.log(`depth: ${curNode.depth}, #actions: ${nodes.length()}`);

    const newDepth = curNode.depth + 1;
    for (actionIndex = 0; actionIndex < NUM_ACTIONS; ++actionIndex) {
      // create a new state with an action
      const A = ACTIONS[actionIndex];
      const nextState = curNode.model.clone();
      nextState.protaganist().agent.set(A);
      nextState.update(ASTAR_FRAME_TIME);

      // Skip if the player died
      if (nextState.protaganist().dead) {
        continue;
      }

      // check if we have reached the target
      if (nextState.coins[target].dead) {
        node = curNode;
        nodes.length = 0;
        throw new Error("done!");
        break;
      }

      // check if we have seen this state before
      const hash = nextState.hash();
      if (seen.has(hash)) {
        continue; // if we have seen it, skip it
      }

      // else we haven't, so add it to the seen set
      seen.add(hash);

      // and then make a new node and insert it into the priority queue
      const newNode = new Node(newDepth, nextState, A, curNode);
      nodes.insert(
        newDepth +
          pointEuclideanDistance(
            nextState.protaganist().pos,
            nextState.coins[target].pos,
          ),
        newNode,
      );
    }
  }

  if (node === undefined) {
    console.error("A* Error: Could not find target.");
    return [undefined, []];
  }

  // reconstruct the path and return
  const endModel = node.model;
  const actions: Action[] = [];

  while (node!.depth > 0) {
    actions.push(node!.action);
    node = node!.pastNode;
  }

  // actions are returned with first action last
  return [endModel, actions];
}

export function astar(model: GameModel): Action[] {
  let curModel = model.clone();
  const actions: Action[] = [];
  let i = 0;
  const size = model.coins.length;
  for (; i < size; ++i) {
    if (curModel.coins[i].dead) {
      continue;
    }

    const [nextModel, nextActions] = astarSearch(curModel, i);

    if (nextModel === undefined) {
      console.error(
        `Pathing failed for coin at (${pointStr(curModel.coins[i].pos)})`,
      );
      return [];
    }

    curModel = nextModel;
    const actionsSize = nextActions.length;
    for (let jj = 0; jj < actionsSize; ++jj) {
      actions.push(nextActions[jj]);
    }
  }

  return actions;
}

export function completability(model: GameModel): number {
  return 0;
}
