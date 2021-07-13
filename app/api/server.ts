import { ApolloServer, gql } from 'apollo-server'
import ws from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { buildSchema } from 'graphql'

const gqlSchema = `
    input AuthInput {
        email: String
    }
    type AuthResponse {
        token: String
        error: String
    }

    type Query {
        ping: String
    }
    type Mutation {
        login(authInput: AuthInput!): AuthResponse
    }
`

const typeDefs = gql`
    ${gqlSchema}
`
type LoginResponse = {
    token?: string
    error?: string
}

// @ts-ignore
const login = (parent, args): LoginResponse => {
    return {
        token: args?.authInput.email ? 'fakeToken' + Math.random() : undefined,
        error: !args?.authInput.email ? `no email provided` : undefined,
    }
}

const queries = {
    ping: () => 'pinged ' + Math.random(),
}

const resolvers = {
    Query: queries,
    Mutation: {
        login,
    },
}


const schema = buildSchema(`
    ${gqlSchema}
`)
const roots = {
    query: queries,
}

const httpServer = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*', // <- allow request from all domains
        credentials: true,
    },
})
httpServer.listen().then(({ url }) => {
    console.log(`server ready: url: ${url}`)
})


const wsServer = new ws.Server({
    port: 4001,
    path: '/wsgraphql',
});
  
useServer(
    // from the previous step
    {
        schema,
        roots,
        onConnect: (ctx) => {
            console.log('Connect', ctx)
        },
        onSubscribe: (ctx, msg) => {
            console.log('Subscribe', { ctx, msg })
        },
        onNext: (ctx, msg, args, result) => {
            console.debug('Next', { ctx, msg, args, result })
        },
        onError: (ctx, msg, errors) => {
            console.error('Error', { ctx, msg, errors })
        },
        onComplete: (ctx, msg) => {
            console.log('Complete', { ctx, msg })
        }
    },
    wsServer,
);

wsServer.on('connection', function connection(ws) {
    console.log('\nserver: connected\n')
    
    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message)
    })
  
    // ws.send('something');
})
