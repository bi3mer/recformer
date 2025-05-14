import { HAND_MDP } from "../src/LevelGeneration/handcraftedMDP";
import { AUTO_MDP } from "../src/LevelGeneration/autoMDP";
import { Graph } from "../src/LevelGeneration/GDM-TS";

function bfs(mdp: Graph, start: string, end: string) {
  let queue: string[] = [start];
  let cameFrom: { [key: string]: string } = {};

  while (queue.length > 0) {
    let state = queue.shift()!;

    if (state === end) {
      // reconstruct path and return
      let path: string[] = [end];
      let curState = end;
      while (curState !== start) {
        curState = cameFrom[curState];
        path.push(curState);
      }

      return path.reverse();
    }

    for (let nextState of mdp.neighbors(state)) {
      if (nextState in cameFrom) continue;

      cameFrom[nextState] = state;
      queue.push(nextState);
    }
  }

  return [];
}

// console.log(bfs(HAND_MDP, "start", "end"));
console.log(bfs(AUTO_MDP, "start", "end"));
