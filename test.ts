import {
  AGENT_A_STAR,
  AGENT_DETERMINISTIC,
  AGENT_EMPTY,
  AGENT_RANDOM,
} from "./src/Agents/agentType";
import { GAME_STATE_PLAYING } from "./src/core/constants";
import { GameModel } from "./src/gameModel";
import { DeterministicAgent } from "./src/Agents/deterministicAgent";
import { ASTAR_FRAME_TIME } from "./src/aStar";
import { audioLoad } from "./src/core/audio";
import { idToLevel } from "./src/LevelGeneration/levels";
import { pointStr } from "./src/DataStructures/point";

audioLoad(() => {
  const lvl = [
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----------------------",
    "----o-------o---------",
    "XXXXXXXXXXXXXXX-------",
  ];

  // let gm = new GameModel(lvl, AGENT_EMPTY);
  // gm.protaganist().agent.set(new Action(true, false, false));
  // let temp = gm.clone();
  // // let temp = gm;

  // console.log("size:", gm.dynamicEntities.length === temp.dynamicEntities.length);

  // for (let i = 0; i < 44; ++i) {
  //   temp = temp.clone();
  //   temp.update(0.032);
  //   console.log(temp.coins[0].dead);
  // }

  // console.log(`state:   ${temp.state()}`);
  // console.log(`fitness: ${temp.fitness()}`);

  let gm = new GameModel(lvl, AGENT_A_STAR);
  // let gm = new GameModel(idToLevel["2-a"], AGENT_A_STAR);
  console.log(gm.protaganist().pos.x.toFixed(3), gm.coins[0].pos.x.toFixed(3));
  const actions = (gm.protaganist().agent as DeterministicAgent).actions;
  console.log(actions.length);

  let i = 0;
  console.log(
    i,
    pointStr(gm.protaganist().pos),
    pointStr(gm.protaganist().velocity),
  );
  while (
    gm.state() === GAME_STATE_PLAYING &&
    gm.protaganist().agent.actions.length > 0
  ) {
    gm.update(ASTAR_FRAME_TIME);
    console.log(
      i,
      pointStr(gm.protaganist().pos),
      pointStr(gm.protaganist().velocity),
    );
    ++i;
  }

  console.log(`state:   ${gm.state()}`);
  console.log(`fitness: ${gm.fitness()}`);
});
