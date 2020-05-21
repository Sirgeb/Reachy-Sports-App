"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./env");

var _graphqlYoga = require("graphql-yoga");

var _schema = _interopRequireDefault(require("./schema"));

var PORT = process.env.PORT || 4000;
var server = new _graphqlYoga.GraphQLServer({
  schema: _schema.default
});
server.start({
  port: PORT
}, function () {
  return console.log("\u2705 Server running on http://localhost:".concat(PORT));
});