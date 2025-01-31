import { AGENT_EMPTY } from "../src/Agents/agentType";
import { idToLevel } from "../src/LevelGeneration/levels";
import { astar } from "../src/aStar";
import { GameModel } from "../src/gameModel";

const K = "5-a";
const gm = new GameModel(idToLevel[K], AGENT_EMPTY);
const actions = astar(gm);

console.log(actions);
