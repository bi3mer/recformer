import { AGENT_EMPTY } from "../src/Agents/agentType";
import { idToLevel } from "../src/LevelGeneration/levels";
import { astar } from "../src/aStar";
import { GameModel } from "../src/gameModel";

import { Glob } from "bun";
const glob = new Glob("*");
const dir = "levels/segments/";

async function testLevel(file: string): Promise<boolean> {
  const filePath = `${dir}${file}`;
  const f = Bun.file(filePath);

  const lvl = await f.text();
  const rows = lvl.split("\n");

  let level: string[] = [];
  let index = 0;

  let completable = true;
  for (let i = 0; i < rows.length; ++i) {
    if (rows[i] == "&") {
      ++index;
      const gm = new GameModel(level, AGENT_EMPTY);
      const [_, c] = astar(gm);

      if (c !== 1.0) {
        console.log(`${file}_${index} was not completable: ${c}.`);
        completable = false;
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
    completable = false;
  }

  return completable;
}

if (Bun.argv.length === 3) {
  const completable = await testLevel(Bun.argv[2]);
  console.log(`${Bun.argv[2]} was completable: ${completable}`);
} else {
  let everyLevelWasCompletable = true;

  for (const file of glob.scanSync(dir)) {
    console.log(`Testing ${file}...`);
    everyLevelWasCompletable &= await testLevel(file);
  }

  if (everyLevelWasCompletable) {
    console.log("Every level was completable!");
  } else {
    console.log("Done.");
  }
}
