import { CONFIG } from "./config";
import { MDP, idToLevel } from "../src/LevelGeneration/levels";
import { AGENT_EMPTY } from "../src/Agents/agentType";
import { GameModel } from "../src/gameModel";
import { astarCompletabilitySearch } from "../src/aStar";

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
      } else if (request.substring(0, 6) === "assess") {
        // get level
        let lvl = JSON.parse(request.substring(6, request.length));

        // update level with padding
        lvl[0] = `XX${lvl[0]}XX`;
        lvl[1] = `o-${lvl[1]}--`;
        for (let rowIndex = 2; rowIndex < 15; ++rowIndex) {
          // there can only be 15
          lvl[rowIndex] = `--${lvl[rowIndex]}--`;
        }

        // run game
        const game = new GameModel(lvl, AGENT_EMPTY);
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
