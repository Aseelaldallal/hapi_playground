"use strict";

const Hapi = require("hapi");

// Create a server with host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000
});

// Add the route
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => "hello world"
});

// ONLY THE LAST NAMED parameter in the path can be optional
// i.e you cant do /{one?}/{two}/
// you can have /{filename}.jpg
// you can have /{filename}.{ext} as long as there is a separator between them
server.route({
  method: "GET",
  path: "/hello/{name?}", // optional parameter
  // URI encode name parameter to preent content injection
  handler: (request, h) => {
    const user = request.params.name
      ? encodeURIComponent(request.params.name)
      : "stranger";
    return h.response(`Hello ${user}!`);
  },
  options: {
    description: "Say hello!",
    notes: "The user parameter defaults to 'stranger' if unspecified",
    tags: ["api", "greeting"]
  }
});
// You can add options. Those specific options don't have a functional effect, but are useful when using a plugin like lout to generate API documentation

server.route({
  //respond the same way to put and post
  method: ["PUT", "POST"],
  path: "/{name}",
  handler: (req, h) => `Putting ${encodeURIComponent(req.params.name)}`
});

// start the server
const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
