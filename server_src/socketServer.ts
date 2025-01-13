import { CONFIG } from "./config";
import { MDP, idToLevel } from "../src/levels";
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

        // @TODO: this will fail for new MDP format
        const L: string[][] = [];
        for (const l of Object.keys(MDP.nodes)) {
          const level = idToLevel[l];
          if (level !== undefined) {
            L.push(level);
          }
        }

        socket.write(encoder.encode(JSON.stringify(L) + "EOF"));
      } else if (request.substring(0, 6) === "assess") {
        console.log("assess not yet implemented...");
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
