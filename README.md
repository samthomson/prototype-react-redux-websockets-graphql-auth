# prototype-react-redux-websockets-graphql-auth
skeleton react app which uses graphql over websockets to communicate with server, redux store locally. authentication with guest/authed routes.

server should have a graphql endpoint exposed to help compose queries, but app will send all queries/mutations over websockets.

http://127.0.0.1:3400`

- [x] typescript react app
- [x] simple server (auto reloading)
- [x] redux in app
- [ ] websocket middleware connecting to websocket server
- [ ] authenticate websocket connection/session
- [ ] graphql query/mutation over websocket
- [x] graphql endpoint
- [ ] guest/authed routes in app; auth state in redux