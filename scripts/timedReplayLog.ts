import { AGENT_EMPTY } from "../src/Agents/agentType";
import { CircleEnemy } from "../src/GameObjects/CircleEnemy";
import { SingleLevelDirector } from "../src/LevelGeneration/singleLevelDirector";
import { GameModel } from "../src/gameModel";

const FRAME_TIME = 0.1;
const MAX_GAME_TIME = (1 / FRAME_TIME) * 60 * 6;

const director = new SingleLevelDirector();
const gm = new GameModel(director.get(1), AGENT_EMPTY);

let entityTypes = [];
for (let i = 1; i < gm.dynamicEntities.length; ++i) {
  entityTypes.push(gm.dynamicEntities[i].constructor.name);
}

let frames: [number, number][][] = [];
for (let gameTime = 0; gameTime <= MAX_GAME_TIME; gameTime += FRAME_TIME) {
  const frameData: [number, number][] = [];
  for (let i = 1; i < gm.dynamicEntities.length; ++i) {
    const pos = gm.dynamicEntities[i].pos;
    frameData.push([pos.x, pos.y]);
  }

  frames.push(frameData);
  gm.update(FRAME_TIME);
}

let data = {
  frame: FRAME_TIME,
  entityTypes,
  frames,
};

const path = "./replay.json";
await Bun.write(path, JSON.stringify(data));
