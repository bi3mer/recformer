import { CONFIG } from "./config";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const server = Bun.listen({
  hostname: "127.0.0.1",
  port: 8000,
  socket: {
    data(socket, data) {
      const request = decoder.decode(data);
      if (request == "config") {
        socket.write(encoder.encode(JSON.stringify(CONFIG)));
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
