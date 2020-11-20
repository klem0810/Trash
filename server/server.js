// Dependencies
const express = require("express");
const http = require("http");
const webSocket = require("ws");
const fs = require("fs");
const tls = require("tls");

// Websocket server port
const wsPort = 6969;

// TLS client port
const tlsPort = 1515;

// Websocket server creation
const server = http.createServer(express);
const wss = new webSocket.Server({ server });

// Secure permissions for TCP client
var options = {
  key: fs.readFileSync("public/certificats/private-key.pem"),
  cert: fs.readFileSync("public/certificats/public-key.pem"),
  rejectUnauthorized: false,
};

// Websocket connection
wss.on("connection", function connection(ws) {
  // TCP client connection
  var tlsClient = tls.connect(tlsPort, "localhost", options, function () {
    // Check if the authorization worked
    if (tlsClient.authorized) {
      console.log("Connection authorized by a Certificate Authority.");
    } else {
      console.log("Connection not authorized: " + tlsClient.authorizationError);
    }
  });

  // Process message from angular and send it to fusion
  ws.on("message", (data) => {
    // Extract message from Angular
    const mess = JSON.parse(data);

    // Send message to fusion
    // NB: TLS server code needs to 
    // be modified to run without header
    tlsClient.write(`StartMsg|${mess.method}|${mess.id}|${mess.payload}|EndMsg|`);
  });

  // Process message from fusion and send it to angular
  tlsClient.on("data", function (data) {
    // Extract method to call 
    var mess = data.toString().split("|")[3];

    // Send message to Angular
    ws.send(JSON.stringify({ message: mess }));
  });
});

// Listen to the websocket server port
server.listen(wsPort, function () {
  console.log(`Server is listening on ${wsPort}!`);
});
