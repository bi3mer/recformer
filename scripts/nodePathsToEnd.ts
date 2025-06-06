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

const failed = [];
for (const n in AUTO_MDP.nodes) {
  if (bfs(AUTO_MDP, n, "end").length === 0) {
    failed.push(n);
  } else {
    console.log(`${n} passed`);
  }
}

console.log(failed);

// console.log("hand:", bfs(HAND_MDP, "start", "end-0").length);
// console.log("auto:", bfs(AUTO_MDP, "start", "end-0").length);
