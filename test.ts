import {
  AGENT_A_STAR,
  AGENT_DETERMINISTIC,
  AGENT_EMPTY,
  AGENT_RANDOM,
} from "./src/Agents/agentType";
import {
  GAME_STATE_PLAYING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./src/core/constants";
import { GameModel } from "./src/gameModel";
import { DeterministicAgent } from "./src/Agents/deterministicAgent";
import { ASTAR_FRAME_TIME, ASTAR_UPDATES_PER_FRAME } from "./src/aStar";
import { audioLoad } from "./src/core/audio";
import { idToLevel } from "./src/LevelGeneration/levels";
import { pointStr } from "./src/DataStructures/point";
import { Camera } from "./src/core/camera";

const IS_BROWSER = typeof window !== "undefined";
audioLoad(() => {
  // const lvl = [
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "----------------------",
  //   "---------XXXXX--------",
  //   "--------X-------------",
  //   "--------X-------------",
  //   "--------X--o----------",
  //   "XXXXXXXXXXXXXXX-------",
  // ];
  const lvl = idToLevel["3-a"];

  if (IS_BROWSER) {
    let gm = new GameModel(lvl, AGENT_A_STAR);
    const actions = (gm.protaganist().agent as DeterministicAgent).actions;
    console.log(actions.length);

    console.log(
      pointStr(gm.protaganist().pos),
      pointStr(gm.protaganist().velocity),
    );

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d")!;
    const camera = new Camera();

    document.getElementById("game")!.appendChild(canvas);

    const loop = () => {
      if (gm.state() === GAME_STATE_PLAYING) {
        gm.update(ASTAR_FRAME_TIME);
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        gm.render(ctx, camera);
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  } else {
    let gm = new GameModel(lvl, AGENT_A_STAR);
    const actions = (gm.protaganist().agent as DeterministicAgent).actions;
    // console.log(actions.length);

    // let i = 0;
    // console.log(
    //   i,
    //   pointStr(gm.protaganist().pos),
    //   pointStr(gm.protaganist().velocity),
    // );
    // while (
    //   gm.state() === GAME_STATE_PLAYING &&
    //   gm.protaganist().agent.actions.length > 0
    // ) {
    //   gm.update(ASTAR_FRAME_TIME, ASTAR_UPDATES_PER_FRAME);
    //   console.log(
    //     i,
    //     pointStr(gm.protaganist().pos),
    //     pointStr(gm.protaganist().velocity),
    //   );
    //   ++i;
    // }

    // console.log(`state:   ${gm.state()}`);
    // console.log(`fitness: ${gm.fitness()}`);
  }
});
