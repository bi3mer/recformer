import { AGENT_EMPTY } from "../src/Agents/agentType";
import { idToLevel } from "../src/LevelGeneration/levels";
import { astar, astarCompletabilitySearch } from "../src/aStar";
import { GameModel } from "../src/gameModel";

// const K = "5-a";
// const gm = new GameModel(idToLevel[K], AGENT_EMPTY);
// const actions = astar(gm);

// console.log(actions);
import { Glob } from "bun";

const glob = new Glob("*");

let everyLevelWasCompletable = true;

const dir = "levels/segments/";
for (const file of glob.scanSync(dir)) {
  const filePath = `${dir}${file}`;
  const f = Bun.file(filePath);

  const lvl = await f.text();
  const rows = lvl.split("\n");

  const gm = new GameModel(rows, AGENT_EMPTY);
  const c = astarCompletabilitySearch(gm);

  if (c !== 1.0) {
    console.log(`${file} was not completable: ${c}.`);
    everyLevelWasCompletable = false;
  }
}

if (everyLevelWasCompletable) {
  console.log("Every level was compeltable!");
} else {
  console.log("Done.");
}
