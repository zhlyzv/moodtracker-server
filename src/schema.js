const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        user(id: ID!): User
        users: [User!]!
    }

    type Mutation {
        createUser(UserInput: UserInput): User
    }

    type UserInput {
        name: String!
        email: String!
        password: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        entries: [Log!]
    }

    type Log {
        mood: Int!
        note: String
        postedBy: User
        created: Date
    }

    scalar Date
`;
