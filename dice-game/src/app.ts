import Server from "./models/server";

function app() {
  const server = new Server();
  server.start();
}

app();
