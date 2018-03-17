"use strict";

const Hapi = require("hapi");

// Create a server with host and port
const server = Hapi.server({
  host: "localhost",
  port: 3000
});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => "hello world"
});

// start the server
const init = async () => {

    // adds inert plugin to hapi application
  await server.register(require("inert"));

  server.route({
    method: "GET",
    path: "/hello",
    handler: (req, h) => h.file("./public/hello.html")
  });

  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
