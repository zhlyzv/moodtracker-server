const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        user(id: ID!): User
        users: [User!]
        entries: [Entry!]
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

    scalar Date
`;
