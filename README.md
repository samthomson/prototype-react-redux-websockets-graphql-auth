# prototype-react-redux-websockets-graphql-auth
skeleton react app which uses graphql over websockets to communicate with server, redux store locally. authentication with guest/authed routes.

server should have a graphql endpoint exposed to help compose queries, but app will send all queries/mutations over websockets.

- [ ] typescript react app
- [ ] simple server (auto reloading)
- [ ] redux in app
- [ ] websocket middleware connecting to websocket server
- [ ] authenticate websocket connection/session
- [ ] graphql query/mutation over websocket
- [ ] graphql endpoint
- [ ] guest/authed routes in app; auth state in redux