import { CONFIG } from "./config";
import { MDP, idToLevel } from "../src/LevelGeneration/levels";
import { AGENT_EMPTY } from "../src/Agents/agentType";
import { GameModel } from "../src/gameModel";
import { astar } from "../src/aStar";
import { rowsToColumns, columnsToRows } from "./util";
import {
  cirleEnemies as circleEnemies,
  coins,
  gaps,
  horizontalEnemies,
  inverseDensity,
  lasers,
  pathLength,
  turrets,
  verticalEnemies,
} from "./computationalMetrics";

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
        for (const l of Object.keys(MDP.nodes)) {
          const level = idToLevel[l];
          if (level !== undefined) {
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
          gaps: gaps(rows),
          inverseDensity: inverseDensity(rows),
          pathLength: pathLength(rows),
        };

        console.log("=================================================");
        for (let i = 0; i < rows.length; ++i) {
          console.log(rows[i]);
        }

        console.log(`completability: ${completability}`);
        console.log("=================================================");

        socket.write(encoder.encode(JSON.stringify(result)));
      } else if (request.substring(0, 6) === "reward") {
        const result = {
          reward: 0,
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
