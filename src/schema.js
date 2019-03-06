const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        user(id: ID!): User
        users: [User!]
        entries: [Entry!]
        login(email: String!, password: String!): AuthPayload
    }

    type AuthPayload {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Mutation {
        createUser(UserInput: UserInput): User
        createEntry(EntryInput: EntryInput): Entry
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        entries: [Entry!]
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Entry {
        _id: ID!
        mood: Int!
        note: String
        addedBy: User!
        createdAt: Date
        updatedAt: Date
    }

    input EntryInput {
        mood: Int!
        note: String
    }

    type Goal {
        _id: ID!
        description: String!
        addedBy: User!
        createdAt: Date
        updatedAt: Date
        due: Date!
    }

    scalar Date
`;
