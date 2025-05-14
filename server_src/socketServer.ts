import { CONFIG } from "./config";
import { HAND_MDP } from "../src/LevelGeneration/handcraftedMDP";
import { AGENT_EMPTY } from "../src/Agents/agentType";
import { GameModel } from "../src/gameModel";
import { astar } from "../src/aStar";
import { CustomNode } from "../src/LevelGeneration/customNode";
import { rowsToColumns, columnsToRows } from "./util";
import {
  blueBlocks,
  cirleEnemies as circleEnemies,
  coins,
  gaps,
  horizontalEnemies,
  inverseDensity,
  lasers,
  pathLength,
  turrets,
  ucurveDensity,
  verticalEnemies,
} from "./computationalMetrics";
import { REPLAY_FRAME_TIME, REPLAY_UPDATES_PER_FRAME } from "../src/replays";
import { pointEuclideanDistance } from "../src/DataStructures/point";
import { TYPE_ENEMY } from "../src/GameObjects/gameObjectTypes";

const DT = REPLAY_FRAME_TIME / REPLAY_UPDATES_PER_FRAME;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const server = Bun.listen({
  hostname: "127.0.0.1",
  port: 8000,
  socket: {
    data(socket, data) {
      const request = decoder.decode(data);
      if (request == "config") {
        console.log("sending config.");
        socket.write(encoder.encode(JSON.stringify(CONFIG)));
        socket.persist();
      } else if (request === "levels") {
        console.log("sending levels.");

        const L: string[][] = [];
        for (const N of Object.values(HAND_MDP.nodes)) {
          const level = (N as CustomNode).level;
          if (level !== undefined && level.length > 0) {
            L.push(level);
          }
        }

        socket.write(encoder.encode(JSON.stringify(L) + "EOF"));
        console.log("Sent levels");
      } else if (request.substring(0, 6) === "assess") {
        // get level
        const lvl = JSON.parse(request.substring(6, request.length));

        // run game
        const rows = columnsToRows(lvl);
        console.log("=================================================");
        for (let i = 0; i < rows.length; ++i) {
          console.log(rows[i]);
        }

        const game = new GameModel(rows, AGENT_EMPTY);
        const [actions, completability] = astar(game);
        const result = {
          completability,
          verticalEnemies: verticalEnemies(lvl),
          horizontalEnemies: horizontalEnemies(lvl),
          circleEnemies: circleEnemies(lvl),
          lasers: lasers(lvl),
          turrets: turrets(lvl),
          coins: coins(lvl),
          blueBlocks: blueBlocks(lvl),
          // gaps: gaps(rows),
          inverseDensity: inverseDensity(rows),
          // pathLength: pathLength(rows),
        };

        console.log(`completability: ${completability}`);
        console.log("=================================================");

        socket.write(encoder.encode(JSON.stringify(result)));
      } else if (request.substring(0, 6) === "reward") {
        // get level
        const lvl = JSON.parse(request.substring(6, request.length));

        // run game
        const rows = columnsToRows(lvl);
        console.log("=================================================");
        for (let i = 0; i < rows.length; ++i) {
          console.log(rows[i]);
        }

        const game = new GameModel(rows, AGENT_EMPTY);
        const [actions, completability] = astar(game);
        const numActions = actions!.length;

        const replayGame = new GameModel(rows, AGENT_EMPTY);
        let proximityToEnemy = 0;

        for (let i = 0; i < numActions; ++i) {
          replayGame.protaganist().agent.set(actions![i]);
          replayGame.update(DT);

          // proximityToEnemy
          const de = replayGame.dynamicEntities;
          const deSize = de.length;
          const playerPos = de[0].pos;
          for (let i = 1; i < deSize; ++i) {
            const e = de[i];
            if (e.type === TYPE_ENEMY) {
              const dist = pointEuclideanDistance(e.pos, playerPos);
              proximityToEnemy += 1 / dist;
            }
          }
        }

        console.log(`completability: ${completability}`);
        console.log("=================================================");

        const density = ucurveDensity(rows);

        const result = {
          // reward: proximityToEnemy / numActions,
          reward: density,
        };

        socket.write(encoder.encode(JSON.stringify(result)));
      } else {
        console.log(`Unhandled request type: ${request}`);
      }
    },
    open(socket) {
      console.log("Socket open.");
    },
    close(socket) {
      console.log("Socket closed.");
      server.stop(true);
      server.unref();
      process.exit();
    },
    drain(socket) {
      console.log("drain");
    },
    error(socket, error) {
      console.log(error);
    },
  },
});

console.log("Listening on port: 8000");
