import { AGENT_EMPTY } from "../src/Agents/agentType";
import { idToLevel } from "../src/LevelGeneration/levels";
import { astar } from "../src/aStar";
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
  console.log(`Testing ${file}...`);
  const filePath = `${dir}${file}`;
  const f = Bun.file(filePath);

  const lvl = await f.text();
  const rows = lvl.split("\n");

  let level: string[] = [];
  let index = 0;

  for (let i = 0; i < rows.length; ++i) {
    if (rows[i] == "&") {
      const gm = new GameModel(level, AGENT_EMPTY);
      const [_, c] = astar(gm);

      if (c !== 1.0) {
        console.log(`${file}_${index} was not completable: ${c}.`);
        everyLevelWasCompletable = false;
      }

      level = [];
    } else {
      level.push(rows[i]);
    }
  }

  const gm = new GameModel(level, AGENT_EMPTY);
  const [_, c] = astar(gm);

  if (c !== 1.0) {
    console.log(`${file}_${index} was not completable: ${c}.`);
    everyLevelWasCompletable = false;
  }
}

if (everyLevelWasCompletable) {
  console.log("Every level was completable!");
} else {
  console.log("Done.");
}
