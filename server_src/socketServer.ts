import { CONFIG } from "./config";
import { MDP, idToLevel } from "../src/LevelGeneration/levels";
import { AGENT_EMPTY } from "../src/Agents/agentType";
import { GameModel } from "../src/gameModel";
import { astarCompletabilitySearch } from "../src/aStar";
import { rowsToColumns, columnsToRows } from "./util";

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

        // update level with padding
        lvl.splice(0, 0, "X--------------");
        lvl.splice(1, 0, "X--------------");
        lvl.push("X--------------");
        lvl.push("Xo-------------");

        // run game
        const game = new GameModel(columnsToRows(lvl), AGENT_EMPTY);
        const result = {
          completability: astarCompletabilitySearch(game),
          linearity: Math.random(),
          leniency: Math.random(),
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
