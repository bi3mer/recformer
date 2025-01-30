import { AGENT_EMPTY } from "./src/Agents/agentType";
import {
  GAME_STATE_PLAYING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./src/core/constants";
import { GameModel } from "./src/gameModel";
import { ASTAR_FRAME_TIME, ASTAR_UPDATES_PER_FRAME, astar } from "./src/aStar";
import { audioLoad } from "./src/core/audio";
import { idToLevel } from "./src/LevelGeneration/levels";
import { pointStr } from "./src/DataStructures/point";
import { Camera } from "./src/core/camera";
import { Action } from "./src/Agents/action";

const IS_BROWSER = typeof window !== "undefined";
audioLoad(() => {
  // const lvl = [
  //   "------------------",
  //   "------------------",
  //   "------------------",
  //   "------------------",
  //   "o-----------------",
  //   "------------------",
  //   "XX----------------",
  //   "------------------",
  //   "------------------",
  //   "o-----------------",
  //   "XXX---------------",
  //   "------------------",
  //   "------------------",
  //   "--------------o---",
  //   "XXXXXXXXXXX-------",
  // ];
  const lvl = idToLevel["5-b"];

  if (IS_BROWSER) {
    let gm = new GameModel(lvl, AGENT_EMPTY);
    let actions = astar(gm);

    if (actions === undefined) {
      throw new Error("could not find solution!");
    }

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d")!;
    const camera = new Camera();

    document.getElementById("game")!.appendChild(canvas);

    // const DT = ASTAR_FRAME_TIME / ASTAR_UPDATES_PER_FRAME;
    // console.log(DT);
    gm = gm.clone();
    gm.render(ctx, camera);

    setTimeout(() => {
      let actionIndex = 0;
      let frame = 0;
      const DT = ASTAR_FRAME_TIME / ASTAR_UPDATES_PER_FRAME;
      const loop = () => {
        if (frame >= ASTAR_UPDATES_PER_FRAME) {
          frame = 0;
          ++actionIndex;
        }
        ++frame;

        if (gm.state() === GAME_STATE_PLAYING) {
          gm.protaganist().agent.set(actions[actionIndex]);
          gm.update(DT);

          ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
          gm.render(ctx, camera);
          window.requestAnimationFrame(loop);
        } else {
          console.log("done");
        }
      };

      window.requestAnimationFrame(loop);
    }, 250);
  } else {
    console.log("terminal running gone!");
    // let gm = new GameModel(lvl, AGENT_A_STAR);
    // const actions = (gm.protaganist().agent as DeterministicAgent).actions;
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
