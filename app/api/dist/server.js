"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var ws_1 = __importDefault(require("ws"));
var ws_2 = require("graphql-ws/lib/use/ws");
var graphql_1 = require("graphql");
var gqlSchema = "\n    input AuthInput {\n        email: String\n    }\n    type AuthResponse {\n        token: String\n        error: String\n    }\n\n    type Query {\n        ping: String\n    }\n    type Mutation {\n        login(authInput: AuthInput!): AuthResponse\n    }\n";
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), gqlSchema);
// @ts-ignore
var login = function (parent, args) {
    return {
        token: (args === null || args === void 0 ? void 0 : args.authInput.email) ? 'fakeToken' + Math.random() : undefined,
        error: !(args === null || args === void 0 ? void 0 : args.authInput.email) ? "no email provided" : undefined,
    };
};
var queries = {
    ping: function () { return 'pinged ' + Math.random(); },
};
var resolvers = {
    Query: queries,
    Mutation: {
        login: login,
    },
};
var schema = graphql_1.buildSchema("\n    " + gqlSchema + "\n");
var roots = {
    query: queries,
};
var httpServer = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    cors: {
        origin: '*',
        credentials: true,
    },
});
httpServer.listen().then(function (_a) {
    var url = _a.url;
    console.log("server ready: url: " + url);
});
var wsServer = new ws_1.default.Server({
    port: 4001,
    path: '/wsgraphql',
});
ws_2.useServer(
// from the previous step
{ schema: schema, roots: roots }, wsServer);
wsServer.on('connection', function connection(ws) {
    console.log('\nconnected\n');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    // ws.send('something');
});
var templateObject_1;
