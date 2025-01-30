import { ACTIONS, Action, NUM_ACTIONS } from "./Agents/action";
import { pointSquareDistance, pointStr } from "./DataStructures/point";
import { PriorityQueue } from "./DataStructures/priorityQueue";
import { GameModel } from "./gameModel";

export const ASTAR_UPDATES_PER_FRAME = 2;
export const ASTAR_FRAME_TIME = 0.01666 * ASTAR_UPDATES_PER_FRAME;

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
  target: number = 0,
): [GameModel, Action[] | undefined] {
  // set up search
  const seen = new Set<number>();
  seen.add(model.hash());

  const nodes = new PriorityQueue<Node>();
  nodes.insert(0, new Node(0, model, null));

  let endNode: Node | undefined = undefined;
  let actionIndex = 0;

  // Start search for target
  while (nodes.length() > 0) {
    const curNode = nodes.pop();

    const newDepth = curNode.depth + 1;
    for (actionIndex = 0; actionIndex < NUM_ACTIONS; ++actionIndex) {
      // Create a new state with an action
      const A = ACTIONS[actionIndex];
      const nextState = curNode.model.clone();
      nextState.protaganist().agent.set(A);
      nextState.update(ASTAR_FRAME_TIME, ASTAR_UPDATES_PER_FRAME);

      // Check if we have reached the target
      if (nextState.coins[target].dead) {
        console.log("found coin!");
        endNode = new Node(newDepth, nextState, A, curNode);
        nodes.queue.length = 0;
        break;
      }

      // Skip if the player died
      if (nextState.protaganist().dead) {
        continue;
      }

      // Check if we have seen this state before
      const hash = nextState.hash();
      if (seen.has(hash)) {
        continue; // If we have, skip it
      }

      // Else we haven't, so add it to the seen set
      seen.add(hash);

      // And then make a new node and insert it into the priority queue
      nodes.insert(
        newDepth +
          pointSquareDistance(
            nextState.protaganist().pos,
            nextState.coins[target].pos,
          ),
        new Node(newDepth, nextState, A, curNode),
      );
    }
  }

  if (endNode === undefined) {
    console.error("A* Error: Could not find target.");
    return [model, undefined];
  }

  // reconstruct the path and return
  const endState = endNode.model;
  const actions: Action[] = [];

  while (endNode!.pastNode !== undefined) {
    actions.push(endNode.action);
    endNode = endNode.pastNode;
  }

  actions.reverse();
  return [endState, actions];
}

export function astar(model: GameModel): Action[] | undefined {
  let curModel = model.clone();
  let temp = model.clone();
  let actions: Action[] = [];

  const numCoins = model.coins.length;
  while (curModel.protaganist().coinsCollected < numCoins) {
    // the next coin will always be at index 0 because it is removed when it
    // dies ans the clone method for game model updates the coins array
    // accordingly
    const [endState, stateActions] = astarSearch(curModel);

    if (stateActions === undefined) {
      console.error(
        `Pathing failed for coin at (${pointStr(curModel.coins[0].pos)})`,
      );
      return undefined;
    }

    curModel = endState;
    actions = actions.concat(stateActions);
  }

  return actions;
}

export function completability(model: GameModel): number {
  return 0;
}
