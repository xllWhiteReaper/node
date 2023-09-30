import Server from "./models/server";

function app() {
  const server = new Server();
  server.start();
  console.log("OK");
}

app();
