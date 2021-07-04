"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    input AuthInput {\n        email: String\n    }\n    type AuthResponse {\n        token: String\n        error: String\n    }\n\n    type Query {\n        ping: String\n    }\n    type Mutation {\n        login(authInput: AuthInput!): AuthResponse\n    }\n"], ["\n    input AuthInput {\n        email: String\n    }\n    type AuthResponse {\n        token: String\n        error: String\n    }\n\n    type Query {\n        ping: String\n    }\n    type Mutation {\n        login(authInput: AuthInput!): AuthResponse\n    }\n"])));
// @ts-ignore
var login = function (parent, args) {
    return {
        token: (args === null || args === void 0 ? void 0 : args.authInput.email) ? 'fakeToken' + Math.random() : undefined,
        error: !(args === null || args === void 0 ? void 0 : args.authInput.email) ? "no email provided" : undefined,
    };
};
var resolvers = {
    Query: {
        ping: function () { return 'pinged ' + Math.random(); },
    },
    Mutation: {
        login: login,
    },
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    cors: {
        origin: '*',
        credentials: true,
    },
});
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("server ready: url: " + url);
});
var templateObject_1;
