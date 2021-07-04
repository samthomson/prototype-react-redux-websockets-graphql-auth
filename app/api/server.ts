import { ApolloServer, gql } from 'apollo-server'


const typeDefs = gql`
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

const resolvers = {
    Query: {
        ping: () => 'pinged ' + Math.random(),
    },
    Mutation: {
        login,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*', // <- allow request from all domains
        credentials: true,
    },
})
server.listen().then(({ url }) => {
    console.log(`server ready: url: ${url}`)
})
