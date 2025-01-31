import { AGENT_EMPTY } from "../src/Agents/agentType";
import { idToLevel } from "../src/LevelGeneration/levels";
import { astar } from "../src/aStar";
import { GameModel } from "../src/gameModel";

let replaysFile = "// Generated by scripts/replayBuilder.ts\n";
replaysFile += `import { Action } from "./Agents/action"\n\n`;
replaysFile += `export const replays = {\n`;

const keys = Object.keys(idToLevel);

for (let i = 0; i < keys.length; ++i) {
  const K = keys[i];
  console.log(`=================== K = ${K} ===================`);
  const gm = new GameModel(idToLevel[K], AGENT_EMPTY);
  const actions = astar(gm);

  if (actions === undefined) {
    console.log(`A* failed for level ${K}`);
  } else {
    replaysFile += `  "${K}": [\n`;
    for (let jj = 0; jj < actions.length; ++jj) {
      const a = actions[jj];
      replaysFile += `    new Action(${a.moveRight},${a.moveLeft},${a.jump}),\n`;
    }

    replaysFile += "  ],\n";
  }
}

replaysFile += "\n};";

const file = Bun.file("./src/replays.ts");
await Bun.write(file, replaysFile);
console.log("DONE");
